import Code from '$lib/Code.svelte';
import type {Benchmarked_Implementation} from './benchmark_types.js';
import type {Code_Sample} from '$lib/code_sample.js';

// Find appropriate sample for a language
export const find_sample = (samples: Record<string, Code_Sample>, lang: string) => {
	return Object.values(samples).find((s) => s.lang === lang && s.name.includes('complex'));
};

// Simple pre-generation using content.repeat()
export const pre_generate_large_contents = (
	samples: Record<string, Code_Sample>,
	langs: readonly string[],
	multiplier: number,
): Map<string, string> => {
	const large_contents = new Map<string, string>();

	for (const lang of langs) {
		const sample = find_sample(samples, lang);
		if (!sample) continue;

		const large_content = sample.content.repeat(multiplier);
		large_contents.set(lang, large_content);

		// Log the size for debugging
		const size_kb = (new TextEncoder().encode(large_content).length / 1024).toFixed(1);
		console.log(`[Fixtures] Pre-generated ${lang}: ${size_kb}KB (${multiplier}x)`);
	}

	return large_contents;
};

export const implementations: Benchmarked_Implementation[] = [
	{name: 'html', component: Code, mode: 'html'},
	{name: 'ranges', component: Code, mode: 'ranges'},
];

// Languages to test (excluding Svelte for now)
export const languages = ['ts', 'css', 'html', 'json', 'svelte'] as const;
export type Language = (typeof languages)[number];
