// Core benchmark execution functions

import type {
	Benchmarked_Implementation,
	Measurement_Data,
	Benchmark_Config,
	Benchmark_Result,
	Progress_Callbacks,
	Benchmark_State,
	Benchmark_Harness_Controller,
	Benchmark_Component_Props,
} from './benchmark_types.js';
import type {Code_Sample} from '$lib/code_sample.js';
import {inter_test_cooldown} from './benchmark_dom.js';
import {
	check_system_stability,
	get_instability_reason,
	extended_cooldown,
} from './benchmark_stability.js';
import {implementations, languages, pre_generate_large_contents} from './benchmark_fixtures.js';
import {analyze_results, calculate_summary, check_high_variance} from './benchmark_stats.js';

// Timing validation constants
const MIN_VALID_TIMING_MS = 0.01;
const MAX_VALID_TIMING_MS = 60000;
const SUSPICIOUS_MEAN_MS = 0.1;
const HIGH_OUTLIER_RATIO = 0.2;

// Warmup phase using harness with large content
export const warmup_phase = async (
	impl: Benchmarked_Implementation,
	content: string,
	lang: string,
	warmup_count: number,
	cooldown_ms: number,
	harness: Benchmark_Harness_Controller,
): Promise<void> => {
	for (let i = 0; i < warmup_count; i++) {
		const props: Benchmark_Component_Props = {content, lang};
		if (impl.mode !== null) {
			props.mode = impl.mode;
		}

		await harness.run_iteration(impl.component, props);

		await inter_test_cooldown(cooldown_ms);
	}
};

// Run measurements for a single implementation using harness with large content
export const measurement_phase = async (
	impl: Benchmarked_Implementation,
	content: string,
	lang: string,
	config: Benchmark_Config,
	recent_timings: number[],
	harness: Benchmark_Harness_Controller,
	onProgress?: () => void,
	shouldStop?: () => boolean,
): Promise<Measurement_Data> => {
	const times: number[] = [];
	const stability_checks = [];
	const timestamps = [];

	for (let i = 0; i < config.iterations; i++) {
		// Check for stop signal
		if (shouldStop?.()) {
			console.log('[Measurement] Stopped by user');
			break;
		}

		console.log(`[Measurement] Iteration ${i + 1}/${config.iterations}`);

		// Cooldown between tests
		await inter_test_cooldown(config.cooldown_ms);

		const stability = await check_system_stability(recent_timings);
		stability_checks.push(stability);

		if (!stability.is_stable) {
			const reason = get_instability_reason(stability);
			console.log(`[Measurement] System unstable: ${reason}, extended cooldown...`);
			await extended_cooldown(reason);
		}

		const props: Benchmark_Component_Props = {content, lang};
		if (impl.mode !== null) {
			props.mode = impl.mode;
		}

		console.log(`[Measurement] Running iteration ${i + 1}...`);

		try {
			const elapsed = await harness.run_iteration(impl.component, props);

			// Validate the timing
			if (elapsed <= 0) {
				console.warn(`[Measurement] Suspicious timing (${elapsed}ms) - marking as failed`);
				times.push(NaN);
				timestamps.push(Date.now());
			} else if (elapsed < MIN_VALID_TIMING_MS) {
				console.warn(
					`[Measurement] Suspiciously fast timing (${elapsed}ms) - possible no-op render`,
				);
				times.push(elapsed);
				timestamps.push(Date.now());
				recent_timings.push(elapsed);
			} else if (elapsed > MAX_VALID_TIMING_MS) {
				console.warn(`[Measurement] Extremely slow timing (${elapsed}ms) - possible hang`);
				times.push(NaN);
				timestamps.push(Date.now());
			} else {
				console.log(`[Measurement] Iteration ${i + 1} complete: ${elapsed.toFixed(2)}ms`);
				times.push(elapsed);
				timestamps.push(Date.now());
				recent_timings.push(elapsed);
			}
		} catch (error) {
			console.error(`[Measurement] Iteration ${i + 1} failed:`, error);
			// Continue with next iteration instead of failing entire test
			// Record a null/NaN to indicate failure
			times.push(NaN);
			timestamps.push(Date.now());
		}

		if (onProgress) {
			onProgress();
		}

		if (typeof globalThis.gc !== 'undefined') {
			globalThis.gc();
		}
	}

	return {times, stability_checks, timestamps};
};

// Run complete benchmark suite
export const run_all_benchmarks = async (
	samples: Record<string, Code_Sample>,
	config: Benchmark_Config,
	harness: Benchmark_Harness_Controller,
	callbacks?: Progress_Callbacks,
	customImplementations?: Benchmarked_Implementation[],
	customLanguages?: string[],
): Promise<Benchmark_State> => {
	const impls = customImplementations || implementations;
	const langs = customLanguages || languages;
	const results: Benchmark_Result[] = [];
	const warnings: string[] = [];
	const recent_timings: number[] = [];

	const total_tests = impls.length * langs.length;
	const total_iterations = total_tests * config.iterations;
	let current_progress = 0;

	// Pre-generate all large content before benchmarking
	console.log(`[Runner] Pre-generating large content (${config.content_multiplier}x)...`);
	const contents = pre_generate_large_contents(samples, langs, config.content_multiplier);
	console.log('[Runner] Pre-generation complete');

	for (const lang of langs) {
		// Check for stop signal
		if (callbacks?.should_stop?.()) {
			console.log('[Runner] Benchmark stopped by user');
			break;
		}

		// Get pre-generated large content for this language
		const content = contents.get(lang);

		if (!content) {
			warnings.push(`No complex sample found for ${lang}`);
			continue;
		}

		for (const impl of impls) {
			// Check for stop signal
			if (callbacks?.should_stop?.()) {
				console.log('[Runner] Benchmark stopped by user');
				break;
			}
			const test_name = `${impl.name} / ${lang}`;
			console.log(`\n[Runner] Starting test: ${test_name}`);

			if (callbacks?.on_test_start) {
				callbacks.on_test_start(test_name);
			}

			try {
				// Warmup with large content
				await warmup_phase(impl, content, lang, config.warmup_count, config.cooldown_ms, harness);

				// Measurement with progress tracking and large content
				const measurement_data = await measurement_phase(
					impl,
					content,
					lang,
					config,
					recent_timings,
					harness,
					() => {
						current_progress++;
						if (callbacks?.on_progress) {
							callbacks.on_progress(current_progress, total_iterations);
						}
					},
					callbacks?.should_stop,
				);

				// Analysis
				const stats = analyze_results(measurement_data);
				console.log(
					`[Runner] ${test_name} complete - mean: ${stats.mean.toFixed(2)}ms, ops/sec: ${stats.ops_per_second.toFixed(2)}`,
				);

				// Check for suspicious results
				if (stats.failed_iterations > 0) {
					warnings.push(`${test_name}: ${stats.failed_iterations} failed iterations`);
				}
				if (stats.mean < SUSPICIOUS_MEAN_MS) {
					warnings.push(`${test_name}: Suspiciously fast mean time (${stats.mean.toFixed(3)}ms)`);
				}
				if (stats.outlier_ratio > HIGH_OUTLIER_RATIO) {
					warnings.push(
						`${test_name}: High outlier ratio (${(stats.outlier_ratio * 100).toFixed(1)}%)`,
					);
				}

				results.push({
					implementation: impl.name,
					language: lang,
					...stats,
				});

				if (callbacks?.on_test_complete) {
					callbacks.on_test_complete();
				}
			} catch (error) {
				console.error(`Error testing ${impl.name}/${lang}:`, error);
				warnings.push(`Failed: ${impl.name}/${lang}`);
			}
		}
	}

	// Calculate summary statistics
	const summary = calculate_summary(results);

	// Check for high variance
	const variance_warnings = check_high_variance(results);
	warnings.push(...variance_warnings);

	// Add stopped message if applicable
	if (callbacks?.should_stop?.()) {
		warnings.push('Benchmark was stopped by user');
	}

	// Clean up harness
	await harness.cleanup();

	return {results, warnings, summary};
};
