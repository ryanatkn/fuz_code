import type {Rangestyler_Language} from '$lib/rangestyler_types.js';

/**
 * CSS language definition
 */
export const css_language: Rangestyler_Language = {
	id: 'css',
	patterns: [
		// Comments
		{
			name: 'comment',
			match: /\/\*[\s\S]*?\*\//g,
			priority: 100,
			greedy: true,
		},

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
			match: /(?:^|[^-\w\xA0-\uFFFF])[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/gi,
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
