/**
 * Legacy Code Samples
 * ===================
 *
 * This file provides code samples for demo pages and benchmarks.
 * It currently wraps the new sample system (samples_complex from all.js).
 *
 * Status: TRANSITIONAL
 * - Still used by: benchmark.ts, demo pages (/compare, /rangestyler, /domstyler, /benchmark)
 * - Replaced by: src/lib/samples/sample_*.{lang} files for testing
 *
 * TODO: Future migration
 * - Update demo pages to use samples directly from all.js
 * - Support multiple sample variants (basic, complex, edge) in demos
 * - Then remove this file
 */

import {samples_complex} from '$lib/samples/all.js';

export interface Code_Sample {
	name: string;
	lang: string;
	content: string;
}

export const sample_json: Code_Sample = {
	name: 'json',
	lang: 'json',
	content: samples_complex.json,
};

export const sample_html: Code_Sample = {
	name: 'html',
	lang: 'html',
	content: samples_complex.html,
};

export const sample_css: Code_Sample = {
	name: 'css',
	lang: 'css',
	content: samples_complex.css,
};

export const sample_ts: Code_Sample = {
	name: 'ts',
	lang: 'ts',
	content: samples_complex.ts,
};

export const sample_svelte: Code_Sample = {
	name: 'svelte',
	lang: 'svelte',
	content: samples_complex.svelte,
};

export const samples: Array<Code_Sample> = [
	sample_json,
	sample_html,
	sample_css,
	sample_ts,
	sample_svelte,
];
