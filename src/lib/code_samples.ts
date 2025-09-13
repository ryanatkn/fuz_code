import {samples as sample_content} from './samples/all.js';

export interface Code_Sample {
	name: string;
	lang: string;
	content: string;
}

export const sample_json: Code_Sample = {
	name: 'json',
	lang: 'json',
	content: sample_content.json,
};

export const sample_html: Code_Sample = {
	name: 'html',
	lang: 'html',
	content: sample_content.html,
};

export const sample_css: Code_Sample = {
	name: 'css',
	lang: 'css',
	content: sample_content.css,
};

export const sample_ts: Code_Sample = {
	name: 'ts',
	lang: 'ts',
	content: sample_content.ts,
};

export const sample_svelte: Code_Sample = {
	name: 'svelte',
	lang: 'svelte',
	content: sample_content.svelte,
};

export const samples: Array<Code_Sample> = [
	sample_json,
	sample_html,
	sample_css,
	sample_ts,
	sample_svelte,
];
