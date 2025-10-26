// Statistical analysis functions for benchmark results

import type {
	Benchmark_Result,
	Benchmark_Stats,
	Measurement_Data,
	Summary_Stats,
} from './benchmark_types.js';

// Statistical constants
const QUARTILE_Q1 = 0.25;
const QUARTILE_Q3 = 0.75;
const IQR_MULTIPLIER = 1.5;
const MAD_Z_SCORE_THRESHOLD = 3.5;
const MAD_Z_SCORE_EXTREME = 5.0;
const MAD_CONSTANT = 0.6745; // For normal distribution approximation
const OUTLIER_RATIO_HIGH = 0.3;
const OUTLIER_RATIO_EXTREME = 0.4;
const OUTLIER_KEEP_RATIO = 0.8;
const PERCENTILE_95 = 0.95;
const PERCENTILE_99 = 0.99;
const CONFIDENCE_INTERVAL_Z = 1.96;
const MS_PER_SECOND = 1000;
const MIN_SAMPLE_SIZE = 3;

// Calculate median
const calculate_median = (sorted_array: Array<number>): number => {
	const mid = Math.floor(sorted_array.length / 2);
	return sorted_array.length % 2 === 0
		? (sorted_array[mid - 1]! + sorted_array[mid]!) / 2
		: sorted_array[mid]!;
};

// Outlier detection using MAD (Median Absolute Deviation) method
export const detect_outliers = (
	times: Array<number>,
): {
	cleaned_times: Array<number>;
	outliers: Array<number>;
} => {
	if (times.length < MIN_SAMPLE_SIZE) {
		return {cleaned_times: times, outliers: []};
	}

	const sorted = [...times].sort((a, b) => a - b);
	const median = calculate_median(sorted);

	// Calculate MAD (Median Absolute Deviation)
	const deviations = times.map((t) => Math.abs(t - median));
	const sorted_deviations = [...deviations].sort((a, b) => a - b);
	const mad = calculate_median(sorted_deviations);

	if (mad === 0) {
		const q1 = sorted[Math.floor(sorted.length * QUARTILE_Q1)]!;
		const q3 = sorted[Math.floor(sorted.length * QUARTILE_Q3)]!;
		const iqr = q3 - q1;

		if (iqr === 0) {
			return {cleaned_times: times, outliers: []};
		}

		const lower_bound = q1 - IQR_MULTIPLIER * iqr;
		const upper_bound = q3 + IQR_MULTIPLIER * iqr;

		const cleaned_times: Array<number> = [];
		const outliers: Array<number> = [];

		for (const time of times) {
			if (time < lower_bound || time > upper_bound) {
				outliers.push(time);
			} else {
				cleaned_times.push(time);
			}
		}

		return {cleaned_times, outliers};
	}

	// Use modified Z-score with MAD
	const cleaned_times: Array<number> = [];
	const outliers: Array<number> = [];

	for (const time of times) {
		const modified_z_score = (MAD_CONSTANT * (time - median)) / mad;
		if (Math.abs(modified_z_score) > MAD_Z_SCORE_THRESHOLD) {
			outliers.push(time);
		} else {
			cleaned_times.push(time);
		}
	}

	// If too many outliers, increase threshold and try again
	if (outliers.length > times.length * OUTLIER_RATIO_HIGH) {
		cleaned_times.length = 0;
		outliers.length = 0;

		for (const time of times) {
			const modified_z_score = (MAD_CONSTANT * (time - median)) / mad;
			if (Math.abs(modified_z_score) > MAD_Z_SCORE_EXTREME) {
				outliers.push(time);
			} else {
				cleaned_times.push(time);
			}
		}

		if (outliers.length > times.length * OUTLIER_RATIO_EXTREME) {
			// Sort by distance from median and keep closest values
			const with_distances = times.map((t) => ({
				time: t,
				distance: Math.abs(t - median),
			}));
			with_distances.sort((a, b) => a.distance - b.distance);

			const keep_count = Math.floor(times.length * OUTLIER_KEEP_RATIO);
			cleaned_times.length = 0;
			outliers.length = 0;

			for (let i = 0; i < with_distances.length; i++) {
				if (i < keep_count) {
					cleaned_times.push(with_distances[i]!.time);
				} else {
					outliers.push(with_distances[i]!.time);
				}
			}
		}
	}

	return {cleaned_times, outliers};
};

// Statistical analysis
export const analyze_results = (data: Measurement_Data): Benchmark_Stats => {
	// Filter out invalid values (failed iterations)
	const valid_times: Array<number> = [];
	let failed_count = 0;

	for (const t of data.times) {
		if (!isNaN(t) && isFinite(t) && t > 0) {
			valid_times.push(t);
		} else {
			failed_count++;
		}
	}

	// If no valid times, return empty stats
	if (valid_times.length === 0) {
		return {
			mean: NaN,
			median: NaN,
			std_dev: NaN,
			min: NaN,
			max: NaN,
			p95: NaN,
			p99: NaN,
			cv: NaN,
			confidence_interval: [NaN, NaN],
			outliers: 0,
			outlier_ratio: 0,
			sample_size: 0,
			raw_sample_size: data.times.length,
			stability_ratio: 0,
			unstable_iterations: data.times.length,
			ops_per_second: 0,
			failed_iterations: failed_count,
		};
	}

	const {cleaned_times, outliers} = detect_outliers(valid_times);
	const final_sorted = [...cleaned_times].sort((a, b) => a - b);

	const mean = cleaned_times.reduce((a, b) => a + b, 0) / cleaned_times.length;
	const median = calculate_median(final_sorted);

	const variance =
		cleaned_times.reduce((sum, val) => sum + (val - mean) ** 2, 0) / cleaned_times.length;
	const std_dev = Math.sqrt(variance);

	const min = final_sorted[0]!;
	const max = final_sorted[final_sorted.length - 1]!;
	const p95 = final_sorted[Math.floor(final_sorted.length * PERCENTILE_95)]!;
	const p99 = final_sorted[Math.floor(final_sorted.length * PERCENTILE_99)]!;

	const cv = std_dev / mean;

	const se = std_dev / Math.sqrt(cleaned_times.length);
	const ci_margin = CONFIDENCE_INTERVAL_Z * se;
	const ci_lower = mean - ci_margin;
	const ci_upper = mean + ci_margin;

	// Stability analysis
	const unstable_count = data.stability_checks.filter((s) => !s.is_stable).length;
	const stability_ratio = 1 - unstable_count / data.stability_checks.length;

	// Throughput calculation (operations per second)
	const ops_per_second = mean > 0 ? MS_PER_SECOND / mean : 0;

	return {
		mean,
		median,
		std_dev,
		min,
		max,
		p95,
		p99,
		cv,
		confidence_interval: [ci_lower, ci_upper],
		outliers: outliers.length,
		outlier_ratio: outliers.length / valid_times.length,
		sample_size: cleaned_times.length,
		raw_sample_size: data.times.length,
		stability_ratio,
		unstable_iterations: unstable_count,
		ops_per_second,
		failed_iterations: failed_count,
	};
};

// Calculate summary across all tests
export const calculate_summary = (
	results: Array<Benchmark_Result>,
): Record<string, Summary_Stats> => {
	const by_impl: Record<string, Array<Benchmark_Result>> = {};

	// Group results by implementation
	for (const result of results) {
		if (!(by_impl as Record<string, Array<Benchmark_Result> | undefined>)[result.implementation]) {
			by_impl[result.implementation] = [];
		}
		by_impl[result.implementation]!.push(result);
	}

	const summary: Record<string, Summary_Stats> = {};

	// Calculate averages for each implementation
	for (const [impl, impl_results] of Object.entries(by_impl)) {
		const mean_times = impl_results.map((r) => r.mean);
		const avg_mean = mean_times.reduce((a, b) => a + b, 0) / mean_times.length;
		const avg_ops =
			impl_results.map((r) => r.ops_per_second).reduce((a, b) => a + b, 0) / impl_results.length;
		const avg_cv = impl_results.map((r) => r.cv).reduce((a, b) => a + b, 0) / impl_results.length;

		summary[impl] = {
			avg_mean,
			avg_ops,
			avg_cv,
			languages: impl_results.length,
		};
	}

	// Calculate relative performance (only if baseline exists)
	const baseline_mean = summary.html!.avg_mean;
	for (const impl of Object.keys(summary)) {
		summary[impl]!.relative_speed = baseline_mean / summary[impl]!.avg_mean;
		summary[impl]!.improvement = (summary[impl]!.relative_speed - 1) * 100;
	}

	return summary;
};

// Check for high variance
export const check_high_variance = (
	results: Array<Benchmark_Result>,
	threshold = 0.15,
): Array<string> => {
	const warnings: Array<string> = [];

	for (const result of results) {
		if (result.cv > threshold) {
			warnings.push(
				`High variance for ${result.implementation}/${result.language}: CV=${(result.cv * 100).toFixed(1)}%`,
			);
		}
	}

	return warnings;
};

// Format number for display
export const fmt = (n: number, decimals = 2): string => {
	return n.toFixed(decimals);
};
