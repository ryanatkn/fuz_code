import Code from '$lib/Code.svelte';
import type {Benchmarked_Implementation} from './benchmark_types.js';
import {
	find_sample,
	generate_large_content,
	pre_generate_large_contents,
} from '../../benchmark/generate_benchmark_content.js';

export {find_sample, generate_large_content, pre_generate_large_contents};

export const implementations: Benchmarked_Implementation[] = [
	{name: 'html', component: Code, mode: 'html'},
	{name: 'ranges', component: Code, mode: 'ranges'},
];

// Languages to test (excluding Svelte for now)
export const languages = ['ts', 'css', 'html', 'json', 'svelte'] as const;
export type Language = (typeof languages)[number];
