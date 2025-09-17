import {readFileSync} from 'node:fs';
import {search_fs} from '@ryanatkn/gro/search_fs.js';
import {basename, join, relative} from 'node:path';
import {domstyler_global} from '$lib/domstyler_global.js';
import {tokenize_syntax} from '$lib/syntax_styler.js';
import {flatten_domstyler_tokens} from '$lib/domstyler_range_builder.js';

export interface Sample_Spec {
	lang: string;
	variant: string;
	content: string;
	filepath: string;
}

export interface Generated_Output {
	sample: Sample_Spec;
	tokens: Array<any>;
	domstyler_html: string;
}

/**
 * Discover all sample files in src/lib/samples
 */
export const discover_samples = (): Array<Sample_Spec> => {
	const sample_files = search_fs('src/lib/samples', {
		file_filter: (path) => /sample_[^/]+\.(ts|css|html|json|svelte)$/.test(path),
	});

	const samples: Array<Sample_Spec> = [];

	for (const file of sample_files) {
		const filename = basename(file.id);
		const match = filename.match(/sample_([^.]+)\.(.+)$/);
		if (!match) continue;

		const [, variant, lang] = match;
		const content = readFileSync(file.id, 'utf-8');

		samples.push({
			lang,
			variant,
			content,
			filepath: relative(process.cwd(), file.id),
		});
	}

	return samples;
};

/**
 * Get the fixture path for a given language and variant
 */
export const get_fixture_path = (lang: string, variant: string, ext: 'json' | 'txt'): string => {
	return join('fixtures/generated', lang, `${lang}_${variant}.${ext}`);
};

/**
 * Generate domstyler HTML output for a sample
 */
export const generate_domstyler_output = (sample: Sample_Spec): string => {
	return domstyler_global.stylize(sample.content, sample.lang);
};

/**
 * Generate token data from DOM styler
 */
export const generate_token_data = (sample: Sample_Spec): Array<any> => {
	// Get tokens from DOM styler and flatten them with positions
	const grammar = domstyler_global.get_lang(sample.lang);
	const tokens = tokenize_syntax(sample.content, grammar);
	const flat_tokens = flatten_domstyler_tokens(tokens);

	return flat_tokens;
};

/**
 * Process a sample to generate all outputs
 */
export const process_sample = (sample: Sample_Spec): Generated_Output => {
	const domstyler_html = generate_domstyler_output(sample);
	const tokens = generate_token_data(sample);

	return {
		sample,
		tokens,
		domstyler_html,
	};
};

/**
 * Generate debug text output for a sample
 */
export const generate_debug_text = (output: Generated_Output): string => {
	const {sample, tokens} = output;

	let debug = '=== TOKENS ===\n';
	const maxTokens = 40;
	for (const t of tokens.slice(0, maxTokens)) {
		const text = sample.content
			.substring(t.start, t.end)
			.replace(/\n/g, '\\n')
			.replace(/\t/g, '\\t');
		const type = t.type.replace(/^\w+_/, ''); // Remove language prefix
		// Format: text [start-end] type
		debug += `${text.padEnd(25)} [${String(t.start).padStart(3)}-${String(t.end).padEnd(3)}] ${type}\n`;
	}
	if (tokens.length > maxTokens) {
		debug += `... and ${tokens.length - maxTokens} more tokens\n`;
	}

	// Add token statistics
	debug += '\n=== STATS ===\n';
	debug += `Total tokens: ${tokens.length}\n`;
	debug += `Sample length: ${sample.content.length} characters\n`;

	// Count token types
	const tokenTypes: Record<string, number> = {};
	for (const token of tokens) {
		const type = token.type.replace(/^\w+_/, '');
		tokenTypes[type] = (tokenTypes[type] || 0) + 1;
	}
	debug += '\nToken types:\n';
	for (const [type, count] of Object.entries(tokenTypes).sort((a, b) => b[1] - a[1])) {
		debug += `  ${type}: ${count}\n`;
	}

	return debug;
};
