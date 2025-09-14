import type {Rangestyler_Language} from '$lib/rangestyler_types.js';

/**
 * JSON language definition
 */
export const json_language: Rangestyler_Language = {
	id: 'json',
	patterns: [
		// Comments (JSON technically doesn't support comments, but many parsers do)
		{
			name: 'comment',
			match: /\/\*[\s\S]*?\*\/|\/\/.*/g,
			priority: 100,
			greedy: true,
		},

		// Property names (strings before colons)
		{
			name: 'property',
			match: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/g,
			priority: 90,
			greedy: true,
		},

		// String values (complete strings that are not property names)
		{
			name: 'string',
			match: /(?<=:\s*)"(?:\\.|[^\\"\r\n])*"/g,
			priority: 85,
			greedy: true,
		},

		// Numbers
		{
			name: 'number',
			match: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g,
			priority: 50,
			greedy: true,
		},

		// Booleans
		{
			name: 'boolean',
			match: /\b(?:true|false)\b/g,
			priority: 45,
			greedy: true,
		},

		// Null
		{
			name: 'null',
			match: /\bnull\b/g,
			priority: 40,
			greedy: true,
		},

		// Punctuation
		{
			name: 'punctuation',
			match: /[{}[\],]/g,
			priority: 20,
			greedy: true,
		},

		// Operator (colon)
		{
			name: 'operator',
			match: /:/g,
			priority: 10,
			greedy: true,
		},
	],
};
