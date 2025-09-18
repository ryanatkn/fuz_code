import {Bench} from 'tinybench';

import {samples as all_samples} from '$lib/samples/all.js';
import {syntax_styler_global} from '$lib/syntax_styler_global.js';
import {generate_large_content} from './generate_benchmark_content.js';

/* eslint-disable no-console */

export interface Benchmark_Result {
	name: string;
	ops_per_sec: number;
	mean_time: number;
	samples: number;
}

export const run_benchmark = async (filter?: string): Promise<Array<Benchmark_Result>> => {
	const bench = new Bench({
		time: 10000,
		warmupTime: 1000,
		warmupIterations: 50,
	});

	const samples = Object.values(all_samples);
	const samples_to_run = filter
		? samples.filter((s) => s.name.includes(filter) || s.lang === filter)
		: samples;

	// Add baseline benchmarks (existing behavior)
	for (const sample of samples_to_run) {
		bench.add(`baseline:${sample.name}`, () => {
			syntax_styler_global.stylize(sample.content, sample.lang);
		});
	}

	// Add large content benchmarks (100x multiplier) for all languages with complex samples
	const complex_samples = Object.values(all_samples).filter((s) => s.name.includes('complex'));
	for (const sample of complex_samples) {
		// Skip if filter is specified and doesn't match this sample
		if (filter && !sample.name.includes(filter) && !sample.lang.includes(filter) && filter !== sample.lang) {
			continue;
		}

		const large_content = generate_large_content(sample.content, sample.lang, 100);

		bench.add(`large:${sample.name}`, () => {
			syntax_styler_global.stylize(large_content, sample.lang);
		});
	}

	await bench.run();

	const results: Array<Benchmark_Result> = [];

	for (const task of bench.tasks) {
		if (task.result) {
			results.push({
				name: task.name,
				ops_per_sec: task.result.throughput.mean,
				mean_time: task.result.latency.mean,
				samples: task.result.latency.samples.length,
			});
		}
	}

	return results;
};

export const format_benchmark_results = (results: Array<Benchmark_Result>): string => {
	const lines: Array<string> = [
		'## Benchmark Results',
		'',
		'| Sample | Ops/sec | Mean Time (ms) | Samples |',
		'|--------|---------|----------------|---------|',
	];

	for (const result of results) {
		const name = result.name.replace('baseline:', '');
		const ops_per_sec = result.ops_per_sec.toFixed(2);
		const mean_time = result.mean_time.toFixed(4);
		lines.push(`| ${name} | ${ops_per_sec} | ${mean_time} | ${result.samples} |`);
	}

	lines.push('');
	lines.push(`**Total samples benchmarked:** ${results.length}`);

	const avg_ops = results.reduce((sum, r) => sum + r.ops_per_sec, 0) / results.length;
	lines.push(`**Average ops/sec:** ${avg_ops.toFixed(2)}`);

	return lines.join('\n');
};

export const run_and_print_benchmark = async (filter?: string): Promise<void> => {
	console.log('Starting benchmark...\n');

	const results = await run_benchmark(filter);

	console.log(format_benchmark_results(results));

	console.log('\n✅ All samples validated successfully');
};
