import type {Rangestyler_Language, Rangestyler_Language_Boundary} from '$lib/rangestyler_types.js';

/**
 * Detect comment boundaries in CSS
 */
const detect_css_boundaries = (text: string): Array<Rangestyler_Language_Boundary> => {
	const boundaries: Array<Rangestyler_Language_Boundary> = [];
	const comment_regex = /\/\*[\s\S]*?\*\//g;
	let last_end = 0;
	let match;

	// Find all comments
	while ((match = comment_regex.exec(text)) !== null) {
		// Add CSS code boundary before comment (only if non-empty)
		if (match.index > last_end) {
			boundaries.push({
				language: 'css',
				type: 'code',
				start: last_end,
				end: match.index,
			});
		}

		// Add comment as its own boundary
		boundaries.push({
			language: 'css',
			type: 'comment',
			start: match.index,
			end: match.index + match[0].length,
			patterns: [
				{
					name: 'comment',
					match: /.*/s,
					priority: 100,
					greedy: true,
				},
			],
		});

		last_end = match.index + match[0].length;
	}

	// Add final CSS code boundary if there's text after last comment
	if (last_end < text.length) {
		boundaries.push({
			language: 'css',
			type: 'code',
			start: last_end,
			end: text.length,
		});
	}

	// If no comments found, treat entire text as CSS code
	if (boundaries.length === 0) {
		boundaries.push({
			language: 'css',
			type: 'code',
			start: 0,
			end: text.length,
		});
	}

	return boundaries;
};

/**
 * CSS language definition
 */
export const css_language: Rangestyler_Language = {
	id: 'css',
	detect_boundaries: detect_css_boundaries,
	patterns: [
		// Strings (single and double quoted)
		{
			name: 'string',
			match: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*'/g,
			priority: 90,
			greedy: true,
		},

		// URLs
		{
			name: 'url',
			match:
				/url\((?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*'|[^)'"]+)\)/gi,
			priority: 85,
			greedy: true,
		},

		// At-rules (@media, @import, etc.)
		{
			name: 'atrule',
			match: /@[\w-]+(?:[^;{]|\/\*[\s\S]*?\*\/)*?(?:;|(?=\s*\{))/g,
			priority: 80,
			greedy: true,
		},

		// Important
		{
			name: 'important',
			match: /!important\b/gi,
			priority: 75,
			greedy: true,
		},

		// Selectors - match identifiers and combinators before opening brace
		{
			name: 'selector',
			match: /[^{}\s][^{}]*?(?=\s*\{)/g,
			priority: 70,
			greedy: true,
		},

		// Properties (CSS property names)
		{
			name: 'property',
			match: /(^|[^-\w\xA0-\uFFFF])[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/gi,
			priority: 60,
			greedy: true,
			lookbehind: true,
		},

		// Functions
		{
			name: 'function',
			match: /[-a-z0-9]+(?=\()/gi,
			priority: 50,
			greedy: true,
		},

		// Numbers with units
		{
			name: 'number',
			match:
				/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vw|vmin|vmax|%)?/g,
			priority: 45,
			greedy: true,
		},

		// Hex colors
		{
			name: 'color',
			match: /#(?:[0-9a-fA-F]{3}){1,2}\b/g,
			priority: 40,
			greedy: true,
		},

		// Keywords (common CSS keywords)
		{
			name: 'keyword',
			match:
				/\b(?:inherit|initial|unset|auto|none|normal|bold|italic|underline|solid|dotted|dashed|absolute|relative|fixed|static|sticky|block|inline|inline-block|flex|grid|hidden|visible|left|right|top|bottom|center)\b/g,
			priority: 35,
			greedy: true,
		},

		// Punctuation
		{
			name: 'punctuation',
			match: /[{}();:,]/g,
			priority: 10,
			greedy: true,
		},
	],
};
