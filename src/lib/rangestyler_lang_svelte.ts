import type {Rangestyler_Language} from './rangestyler_types.js';

/**
 * Svelte language definition
 */
export const svelte_language: Rangestyler_Language = {
	id: 'svelte',
	patterns: [
		// HTML Comments
		{
			name: 'comment',
			match: /<!--[\s\S]*?-->/g,
			priority: 100,
			greedy: true,
		},

		// Svelte blocks (#if, #each, etc.)
		{
			name: 'svelte_block',
			match: /\{[#:/@](?:if|else|each|await|then|catch|html|debug|const|key)\b[^}]*\}/g,
			priority: 95,
			greedy: true,
		},

		// TS expressions in curly braces
		{
			name: 'svelte_expression',
			match: /\{(?:[^{}]|\{[^}]*\})*\}/g,
			priority: 90,
			greedy: true,
		},

		// Script tags
		{
			name: 'script_tag',
			match: /<script(?:\s+[^>]*)?>[\s\S]*?<\/script>/gi,
			priority: 85,
			greedy: true,
		},

		// Style tags
		{
			name: 'style_tag',
			match: /<style(?:\s+[^>]*)?>[\s\S]*?<\/style>/gi,
			priority: 85,
			greedy: true,
		},

		// CDATA sections
		{
			name: 'cdata',
			match: /<!\[CDATA\[[\s\S]*?\]\]>/gi,
			priority: 80,
			greedy: true,
		},

		// Doctype
		{
			name: 'doctype',
			match: /<!DOCTYPE[^>]*>/gi,
			priority: 75,
			greedy: true,
		},

		// Attribute values with Svelte bindings
		{
			name: 'attr_value',
			match: /=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\})/g,
			priority: 70,
			greedy: true,
		},

		// Svelte directives (on:, bind:, use:, etc.)
		{
			name: 'svelte_directive',
			match: /\b(?:on|bind|use|class|style|in|out|transition|animate|let):[^\s>/=]+/g,
			priority: 65,
			greedy: true,
		},

		// Tag names
		{
			name: 'tag',
			match: /<\/?[^\s>/]+/g,
			priority: 60,
			greedy: true,
		},

		// Attribute names
		{
			name: 'attr_name',
			match: /\b[^\s>/=]+(?=\s*=)/g,
			priority: 55,
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
