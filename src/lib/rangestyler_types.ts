export interface Rangestyler_Language {
	id: string;
	patterns: Array<Rangestyler_Pattern>;

	// Optional boundary detection for languages with embedded content
	detect_boundaries?: (text: string) => Array<Rangestyler_Language_Boundary>;

	// Optional method to provide patterns for a specific boundary type
	get_boundary_patterns?: (
		boundary: Rangestyler_Language_Boundary,
	) => Array<Rangestyler_Pattern> | undefined;
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
	language: string; // Which language this boundary belongs to: 'css', 'ts', 'html', etc.
	type: string; // Semantic type: 'comment', 'string', 'code', 'embedded', etc.
	start: number;
	end: number;
	patterns?: Array<Rangestyler_Pattern>; // Optional custom patterns for this boundary
	embedded_language?: string; // For 'embedded' type, specifies the language to use
}

export type Rangestyler_Mode = 'auto' | 'ranges' | 'html';
