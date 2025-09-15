import type {Rangestyler_Language, Rangestyler_Language_Boundary} from '$lib/rangestyler_types.js';

/**
 * Detect string boundaries in JSON
 */
const detect_json_boundaries = (text: string): Array<Rangestyler_Language_Boundary> => {
	const boundaries: Array<Rangestyler_Language_Boundary> = [];
	// Match all complete strings (handling escapes properly)
	const string_regex = /"(?:[^"\\]|\\.)*"/g;
	let match;
	let last_end = 0;

	while ((match = string_regex.exec(text)) !== null) {
		// Add code boundary before string (only if non-empty)
		if (match.index > last_end) {
			boundaries.push({
				language: 'json',
				type: 'code',
				start: last_end,
				end: match.index,
			});
		}

		// Check if this is a property (followed by colon) or value string
		const after_match = text.slice(match.index + match[0].length).match(/^\s*:/);
		const boundary_type = after_match ? 'property' : 'string';

		boundaries.push({
			language: 'json',
			type: boundary_type,
			start: match.index,
			end: match.index + match[0].length,
			patterns: [
				{
					name: boundary_type,
					match: /.+/s, // Changed from .* to .+ to avoid empty matches
					priority: 100,
					greedy: true,
				},
			],
		});

		last_end = match.index + match[0].length;
	}

	// Add final code boundary if there's text after last string
	if (last_end < text.length) {
		boundaries.push({
			language: 'json',
			type: 'code',
			start: last_end,
			end: text.length,
		});
	}

	// If no strings found, treat entire text as code
	if (boundaries.length === 0) {
		boundaries.push({
			language: 'json',
			type: 'code',
			start: 0,
			end: text.length,
		});
	}

	return boundaries;
};

/**
 * JSON language definition
 */
export const json_language: Rangestyler_Language = {
	id: 'json',
	detect_boundaries: detect_json_boundaries,
	patterns: [
		// Comments (JSON technically doesn't support comments, but many parsers do)
		// These patterns only apply within 'code' boundaries
		{
			name: 'comment',
			match: /\/\*[\s\S]*?\*\/|\/\/.*/g,
			priority: 100,
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
