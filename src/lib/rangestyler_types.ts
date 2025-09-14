export interface Rangestyler_Language {
	id: string;
	patterns: Array<Rangestyler_Pattern>;
}

export interface Rangestyler_Pattern {
	name: string;
	match: RegExp;
	priority?: number;
	captures?: Array<number>;
	greedy?: boolean;
	lookbehind?: boolean;
}

export interface Rangestyler_Match_Result {
	pattern: Rangestyler_Pattern;
	start: number;
	end: number;
	text: string;
	captures?: Array<{start: number; end: number; text: string}>;
}

export interface Rangestyler_Language_Boundary {
	type: 'script' | 'style' | 'content';
	start: number;
	end: number;
	language?: string; // 'ts', 'css', etc.
}

export type Rangestyler_Mode = 'auto' | 'ranges' | 'html';
