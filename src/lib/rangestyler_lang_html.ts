import type {Rangestyler_Language} from './rangestyler_types.js';

/**
 * HTML language definition
 */
export const html_language: Rangestyler_Language = {
	id: 'html',
	patterns: [
		// Comments
		{
			name: 'comment',
			match: /<!--[\s\S]*?-->/g,
			priority: 100,
			greedy: true,
		},

		// CDATA sections
		{
			name: 'cdata',
			match: /<!\[CDATA\[[\s\S]*?\]\]>/gi,
			priority: 95,
			greedy: true,
		},

		// Doctype
		{
			name: 'doctype',
			match: /<!DOCTYPE[^>]*>/gi,
			priority: 90,
			greedy: true,
		},

		// Prolog (XML declaration)
		{
			name: 'prolog',
			match: /<\?[\s\S]+?\?>/g,
			priority: 85,
			greedy: true,
		},

		// Attribute values (strings in quotes)
		{
			name: 'attr_value',
			match: /=\s*(?:"[^"]*"|'[^']*')/g,
			priority: 80,
			greedy: true,
		},

		// Tag names
		{
			name: 'tag',
			match: /<\/?[^\s>/]+/g,
			priority: 70,
			greedy: true,
		},

		// Attribute names
		{
			name: 'attr_name',
			match: /\b[^\s>/=]+(?=\s*=)/g,
			priority: 60,
			greedy: true,
		},

		// HTML entities
		{
			name: 'entity',
			match: /&[a-z0-9]+;|&#x?[0-9a-f]+;/gi,
			priority: 50,
			greedy: true,
		},

		// Punctuation (tag delimiters)
		{
			name: 'punctuation',
			match: /[</>]/g,
			priority: 10,
			greedy: true,
		},

		// Equals sign (for attributes)
		{
			name: 'operator',
			match: /=/g,
			priority: 5,
			greedy: true,
		},
	],
};
