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

export interface Comparison_Result {
	implementation: string;
	language: string;
	ops_per_sec: number;
	mean_time: number;
	samples: number;
	content_size: 'small' | 'large';
}

// Language mapping between different systems
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

// Setup Shiki highlighters
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

// Get sample content for a language
const getSampleContent = (lang: SupportedLanguage, large = false) => {
	const sample = Object.values(all_samples).find((s) => s.lang === LANGUAGE_MAP[lang].fuz);
	if (!sample) {
		throw new Error(`No sample found for language: ${lang}`);
	}
	return large ? sample.content.repeat(100) : sample.content;
};

export const run_comparison_benchmark = async (
	filter?: string,
): Promise<Array<Comparison_Result>> => {
	const bench = new Bench({
		time: 5000,
		warmupTime: 1000,
		warmupIterations: 20,
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
			const [implementation, language, size] = task.name.split('_');
			results.push({
				implementation,
				language,
				ops_per_sec: task.result.throughput.mean,
				mean_time: task.result.latency.mean,
				samples: task.result.latency.samples.length,
				content_size: size as 'small' | 'large',
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
		'| Implementation | Language | Content Size | Ops/sec | Mean Time (ms) | Samples |',
		'|----------------|----------|--------------|---------|----------------|---------|',
	];

	// Sort results for better readability
	const sorted_results = results.sort((a, b) => {
		if (a.language !== b.language) return a.language.localeCompare(b.language);
		if (a.content_size !== b.content_size) return a.content_size.localeCompare(b.content_size);
		return b.ops_per_sec - a.ops_per_sec; // Fastest first
	});

	for (const result of sorted_results) {
		const impl = result.implementation.replace('_', ' ');
		const ops = result.ops_per_sec.toFixed(2);
		const time = result.mean_time.toFixed(4);
		lines.push(
			`| ${impl} | ${result.language} | ${result.content_size} | ${ops} | ${time} | ${result.samples} |`,
		);
	}

	lines.push('');
	lines.push('## Summary');
	lines.push('');

	// Calculate averages by implementation
	const by_impl = new Map<string, Array<Comparison_Result>>();
	for (const result of results) {
		const impl_results = by_impl.get(result.implementation) || [];
		impl_results.push(result);
		by_impl.set(result.implementation, impl_results);
	}

	for (const [impl, impl_results] of by_impl) {
		const avg_ops = impl_results.reduce((sum, r) => sum + r.ops_per_sec, 0) / impl_results.length;
		const avg_time = impl_results.reduce((sum, r) => sum + r.mean_time, 0) / impl_results.length;
		lines.push(
			`- **${impl.replace('_', ' ')}**: ${avg_ops.toFixed(2)} avg ops/sec, ${avg_time.toFixed(4)}ms avg time`,
		);
	}

	lines.push('');
	lines.push('## Notes');
	lines.push('');
	lines.push('- **fuz_code**: Optimized for runtime usage with regex-based tokenization');
	lines.push('- **Prism**: Established regex-based highlighter, similar approach to fuz_code');
	lines.push('- **Shiki JS**: JavaScript regex engine, lighter than Oniguruma');
	lines.push('- **Shiki Oniguruma**: Full TextMate engine, more accurate but slower');
	lines.push('- **Content sizes**: "small" = original samples, "large" = 100x repetition');
	lines.push('');
	lines.push(`Generated: ${new Date().toISOString()}`);

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
