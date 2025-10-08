export interface Code_Sample {
	name: string;
	lang: string;
	content: string;
}

// Languages ordered from simple to complex
export const sample_langs = ['json', 'css', 'ts', 'html', 'svelte', 'md'] as const;

export type Sample_Lang = (typeof sample_langs)[number];
