import {fmt} from './benchmark_stats.js';
import type {Benchmark_Result} from './benchmark_types.js';

/**
 * Column definitions for benchmark results table
 */
export interface Result_Column {
	header: string;
	key: keyof Benchmark_Result;
	format: (value: any, result: Benchmark_Result) => string;
	class?: (value: any, result: Benchmark_Result) => string;
}

export const RESULT_COLUMNS: Result_Column[] = [
	{
		header: 'Language',
		key: 'language',
		format: (v) => v,
	},
	{
		header: 'Implementation',
		key: 'implementation',
		format: (v) => v,
	},
	{
		header: 'Mean (ms)',
		key: 'mean',
		format: (v) => fmt(v),
	},
	{
		header: 'Median (ms)',
		key: 'median',
		format: (v) => fmt(v),
	},
	{
		header: 'Std Dev',
		key: 'std_dev',
		format: (v) => fmt(v),
	},
	{
		header: 'CV',
		key: 'cv',
		format: (v) => `${fmt(v * 100, 1)}%`,
		class: (v) => (v > 0.15 ? 'warning' : ''),
	},
	{
		header: 'P95 (ms)',
		key: 'p95',
		format: (v) => fmt(v),
	},
	{
		header: 'Ops/sec',
		key: 'ops_per_second',
		format: (v) => fmt(v, 0),
	},
	{
		header: 'Outliers',
		key: 'outliers',
		format: (v, result) => `${v}/${result.raw_sample_size}`,
		class: (v, result) => (result.outlier_ratio > 0.1 ? 'warning' : ''),
	},
	{
		header: 'Failed',
		key: 'failed_iterations',
		format: (v) => v.toString(),
		class: (v) => (v > 0 ? 'warning' : ''),
	},
	{
		header: 'Stability',
		key: 'stability_ratio',
		format: (v) => `${fmt(v * 100, 0)}%`,
		class: (v) => (v > 0.9 ? 'good' : ''),
	},
];

/**
 * Convert benchmark results to a markdown table
 */
export const results_to_markdown = (results: Benchmark_Result[]): string => {
	if (results.length === 0) return '';

	// Header
	const headers = RESULT_COLUMNS.map((col) => col.header);
	let markdown = '| ' + headers.join(' | ') + ' |\n';
	markdown += '| ' + headers.map(() => '---').join(' | ') + ' |\n';

	// Add rows
	for (const result of results) {
		const row = RESULT_COLUMNS.map((col) => col.format(result[col.key], result));
		markdown += '| ' + row.join(' | ') + ' |\n';
	}

	return markdown;
};