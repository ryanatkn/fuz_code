import {Bench} from 'tinybench';

// Prism imports
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-json.js';
import 'prism-svelte';

// Shiki imports
import {createHighlighterCoreSync} from 'shiki/core';
import {createJavaScriptRegexEngine} from 'shiki/engine/javascript';
import {createOnigurumaEngine} from 'shiki/engine/oniguruma';
import typescript from 'shiki/langs/typescript.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import css from 'shiki/langs/css.mjs';
import html from 'shiki/langs/html.mjs';
import json from 'shiki/langs/json.mjs';
import svelte from 'shiki/langs/svelte.mjs';
import nord from 'shiki/themes/nord.mjs';

// Fuz Code imports
import {samples as all_samples} from '../../src/lib/samples/all.js';
import {syntax_styler_global} from '../../src/lib/syntax_styler_global.js';

/* eslint-disable no-console */

const BENCHMARK_TIME = 10000; //  10000
const WARMUP_TIME = 1000; //  1000
const WARMUP_ITERATIONS = 20; //  20
const LARGE_CONTENT_MULTIPLIER = 100; //  100
const MIN_ITERATIONS = 3; // Tiny minimum samples cause of Shiki's pathological cases with TS

export interface Comparison_Result {
	implementation: string;
	language: string;
	ops_per_sec: number;
	mean_time: number;
	samples: number;
	content_size: 'small' | 'large';
	total_time: number;
}

const LANGUAGE_MAP = {
	ts: {
		prism: 'typescript',
		shiki: 'typescript',
		fuz: 'ts',
	},
	js: {
		prism: 'javascript',
		shiki: 'javascript',
		fuz: 'js',
	},
	css: {
		prism: 'css',
		shiki: 'css',
		fuz: 'css',
	},
	html: {
		prism: 'markup',
		shiki: 'html',
		fuz: 'html',
	},
	json: {
		prism: 'json',
		shiki: 'json',
		fuz: 'json',
	},
	svelte: {
		prism: 'svelte',
		shiki: 'svelte',
		fuz: 'svelte',
	},
} as const;

type SupportedLanguage = keyof typeof LANGUAGE_MAP;

const setupShiki = async () => {
	const langs = [typescript, javascript, css, html, json, svelte];

	const shiki_js = createHighlighterCoreSync({
		themes: [nord],
		langs,
		engine: createJavaScriptRegexEngine(),
	});

	const shiki_oniguruma = createHighlighterCoreSync({
		themes: [nord],
		langs,
		engine: await createOnigurumaEngine(import('shiki/wasm')),
	});

	return {shiki_js, shiki_oniguruma};
};

const getSampleContent = (lang: SupportedLanguage, large = false) => {
	const sample = Object.values(all_samples).find((s) => s.lang === LANGUAGE_MAP[lang].fuz);
	if (!sample) {
		throw new Error(`No sample found for language: ${lang}`);
	}
	return large ? sample.content.repeat(LARGE_CONTENT_MULTIPLIER) : sample.content;
};

export const run_comparison_benchmark = async (
	filter?: string,
): Promise<Array<Comparison_Result>> => {
	const bench = new Bench({
		time: BENCHMARK_TIME,
		warmupTime: WARMUP_TIME,
		warmupIterations: WARMUP_ITERATIONS,
		iterations: MIN_ITERATIONS,
	});

	// Setup Shiki
	console.log('Setting up Shiki highlighters...');
	const {shiki_js, shiki_oniguruma} = await setupShiki();
	console.log('Shiki setup complete');

	// Determine languages to test
	const supported_languages: SupportedLanguage[] = ['ts', 'css', 'html', 'json', 'svelte'];
	const languages_to_test = filter
		? supported_languages.filter((lang) => lang === filter || lang.includes(filter))
		: supported_languages;

	console.log(`Testing languages: ${languages_to_test.join(', ')}`);

	// Add benchmarks for each language and content size
	for (const lang of languages_to_test) {
		const prism_lang = LANGUAGE_MAP[lang].prism;
		const shiki_lang = LANGUAGE_MAP[lang].shiki;
		const fuz_lang = LANGUAGE_MAP[lang].fuz;

		// Test both small and large content
		for (const large of [false, true]) {
			const content = getSampleContent(lang, large);
			const size_label = large ? 'large' : 'small';

			// Fuz Code benchmark
			bench.add(`fuz_code_${lang}_${size_label}`, () => {
				syntax_styler_global.stylize(content, fuz_lang);
			});

			// Prism benchmark
			if (Prism.languages[prism_lang]) {
				bench.add(`prism_${lang}_${size_label}`, () => {
					Prism.highlight(content, Prism.languages[prism_lang], prism_lang);
				});
			} else {
				console.warn(`Prism language not available: ${prism_lang}`);
			}

			// Shiki JavaScript engine benchmark
			bench.add(`shiki_js_${lang}_${size_label}`, () => {
				shiki_js.codeToHtml(content, {lang: shiki_lang, theme: 'nord'});
			});

			// Shiki Oniguruma engine benchmark
			bench.add(`shiki_oniguruma_${lang}_${size_label}`, () => {
				shiki_oniguruma.codeToHtml(content, {lang: shiki_lang, theme: 'nord'});
			});
		}
	}

	console.log('Running benchmarks...');
	await bench.run();

	// Process results
	const results: Array<Comparison_Result> = [];

	for (const task of bench.tasks) {
		if (task.result) {
			// Parse benchmark name: implementation_language_size
			// Handle multi-word implementations like 'fuz_code' and 'shiki_js'
			const parts = task.name.split('_');
			let implementation: string;
			let language: string;
			let content_size: 'small' | 'large';

			if (task.name.startsWith('fuz_code_')) {
				implementation = 'fuz_code';
				language = parts[2];
				content_size = parts[3] as 'small' | 'large';
			} else if (task.name.startsWith('shiki_js_')) {
				implementation = 'shiki_js';
				language = parts[2];
				content_size = parts[3] as 'small' | 'large';
			} else if (task.name.startsWith('shiki_oniguruma_')) {
				implementation = 'shiki_oniguruma';
				language = parts[2];
				content_size = parts[3] as 'small' | 'large';
			} else if (task.name.startsWith('prism_')) {
				implementation = 'prism';
				language = parts[1];
				content_size = parts[2] as 'small' | 'large';
			} else {
				console.warn(`Unknown benchmark name format: ${task.name}`);
				continue;
			}

			results.push({
				implementation,
				language,
				ops_per_sec: task.result.throughput.mean,
				mean_time: task.result.latency.mean,
				samples: task.result.latency.samples.length,
				content_size,
				total_time: task.result.totalTime,
			});
		}
	}

	return results;
};

export const format_comparison_results = (results: Array<Comparison_Result>): string => {
	const lines: Array<string> = [
		'# Syntax Highlighting Performance Comparison',
		'',
		'Comparing fuz_code vs Prism vs Shiki across multiple languages and content sizes.',
		'',
		'## Results',
		'',
		'| Language+Size | Impl | % | Ops/sec | Mean Time (ms) | Samples | Total (ms) |',
		'|---------------|------|---|---------|----------------|---------|------------|',
	];

	// Group results by language+size to find fastest in each group
	const grouped = new Map<string, Array<Comparison_Result>>();
	for (const result of results) {
		const key = `${result.language}_${result.content_size}`;
		const group = grouped.get(key) || [];
		group.push(result);
		grouped.set(key, group);
	}

	// Calculate fastest ops/sec for each group
	const fastest_by_group = new Map<string, number>();
	for (const [key, group] of grouped) {
		const fastest = Math.max(...group.map((r) => r.ops_per_sec));
		fastest_by_group.set(key, fastest);
	}

	// Sort by: language -> content_size (small first) -> ops/sec (fastest first)
	const sorted_results = results.sort((a, b) => {
		if (a.language !== b.language) return a.language.localeCompare(b.language);
		if (a.content_size !== b.content_size) return a.content_size === 'small' ? -1 : 1;
		return b.ops_per_sec - a.ops_per_sec; // Fastest first
	});

	for (const result of sorted_results) {
		const group_key = `${result.language}_${result.content_size}`;
		const fastest = fastest_by_group.get(group_key) || 1;
		const percent = ((result.ops_per_sec / fastest) * 100).toFixed(0);

		const ops = result.ops_per_sec.toFixed(2);
		const time = result.mean_time.toFixed(4);
		// Use this to diagnose pathological cases to tweak `MIN_ITERATIONS`
		// const total_time = result.total_time.toFixed(1);

		lines.push(
			`| ${result.language} ${result.content_size} | ${result.implementation} | ${percent}% | ${ops} | ${time} | ${result.samples} |`,
		);
	}

	return lines.join('\n');
};

export const run_and_print_comparison = async (filter?: string): Promise<void> => {
	console.log('Starting comparison benchmark...\n');

	try {
		const results = await run_comparison_benchmark(filter);
		const report = format_comparison_results(results);

		console.log(report);
		console.log('\n✅ Comparison benchmark complete');
	} catch (error) {
		console.error('Comparison benchmark failed:', error);
		throw error;
	}
};
