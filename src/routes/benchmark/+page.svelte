<script lang="ts">
	import {samples as all_samples} from '../../test/fixtures/samples/all.js';
	import Benchmark_Results from './Benchmark_Results.svelte';
	import Benchmark_Harness from './Benchmark_Harness.svelte';
	import {run_all_benchmarks} from './benchmark_runner.js';
	import {implementations, languages} from './benchmark_fixtures.js';
	import type {Benchmark_Config, Benchmark_State} from './benchmark_types.js';

	/* eslint-disable no-console */

	// To run Chromium with `gc` enabled:
	// `chromium --js-flags="--expose-gc"`

	// Configuration
	const config: Benchmark_Config = $state({
		iterations: 10,
		warmup_count: 3,
		cooldown_ms: 100,
		content_multiplier: 20, // 100 is hanging at CSS in html mode
	});

	// UI state
	let running = $state(false);
	let current_test = $state('');
	let progress = $state(0);
	let total_tests = $state(0);
	let should_stop = $state(false);

	// Results state
	let benchmark_state: Benchmark_State | null = $state.raw(null);

	// Harness component reference
	let harness: Benchmark_Harness | undefined;

	// Run benchmark suite
	const run_benchmarks = async () => {
		if (!harness) throw Error();
		if (running) return;

		running = true;
		should_stop = false as boolean;
		current_test = '';
		progress = 0;

		// Reset state
		benchmark_state = {
			results: [],
			warnings: [],
			summary: null,
		};

		// Calculate total for progress bar
		total_tests = implementations.length * languages.length * config.iterations;

		try {
			// Run benchmarks with progress callbacks
			benchmark_state = await run_all_benchmarks(all_samples, config, harness, {
				on_progress: (current, total) => {
					progress = current;
					total_tests = total;
				},
				on_test_start: (test) => {
					current_test = test;
				},
				should_stop: () => should_stop,
			});

			current_test = should_stop ? 'Stopped' : 'Complete';
		} catch (error) {
			console.error('Benchmark failed:', error);
			benchmark_state.warnings.push(`Fatal error: ${error}`);
		} finally {
			running = false;
		}
	};

	// Stop benchmark
	const stop_benchmarks = () => {
		should_stop = true;
		current_test = 'Stopping...';
	};
</script>

<div class="box width_upto_lg mx_auto">
	<h1 class="mt_xl5">benchmark</h1>
	<p>
		<code class="font_weight_400 font_size_sm">chromium --js-flags="--expose-gc"</code>
	</p>

	<section class="panel p_lg">
		<form>
			<fieldset>
				<legend>config</legend>
				<label>
					<div class="title">iterations</div>
					<input type="number" bind:value={config.iterations} min="10" disabled={running} />
				</label>

				<label>
					<div class="title">content multiplier</div>
					<input type="number" bind:value={config.content_multiplier} min="50" disabled={running} />
				</label>

				<label>
					<div class="title">warmup runs</div>
					<input type="number" bind:value={config.warmup_count} min="3" disabled={running} />
				</label>

				<label>
					<div class="title">cooldown (ms)</div>
					<input type="number" bind:value={config.cooldown_ms} min="10" disabled={running} />
				</label>
			</fieldset>

			<button type="button" onclick={run_benchmarks} disabled={running}>
				{running ? 'running...' : 'run benchmarks'}
			</button>
			{#if running}
				<button type="button" class="mt_lg" onclick={stop_benchmarks} style:margin-left="1rem">
					stop benchmark
				</button>
			{/if}
		</form>
	</section>

	{#if running}
		<section class="panel">
			<h3>Progress</h3>
			<div class="progress-info">
				<div>Testing: <strong>{current_test}</strong></div>
				<div>Progress: {progress} / {total_tests}</div>
			</div>
			<progress value={progress} max={total_tests}></progress>
		</section>
	{/if}

	{#if benchmark_state}
		<Benchmark_Results
			results={benchmark_state.results}
			summary={benchmark_state.summary}
			warnings={benchmark_state.warnings}
		/>
	{/if}

	<hr />
</div>

<Benchmark_Harness bind:this={harness} />
