import type {Rangestyler_Language} from '$lib/rangestyler_types.js';

/**
 * Svelte language definition
 */
export const svelte_language: Rangestyler_Language = {
	id: 'svelte',
	patterns: [
		// HTML Comments (handled by boundary detection but kept for highlighting)
		{
			name: 'comment',
			match: /<!--[\s\S]*?-->/g,
			priority: 110,
			greedy: true,
		},

		// Svelte each blocks (complex nested pattern from domstyler)
		{
			name: 'svelte_block',
			match: /\{[#/]each(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/g,
			priority: 105,
			greedy: true,
		},

		// Svelte control blocks (#if, :else, /if, @html, @debug, etc.)
		{
			name: 'svelte_block',
			match: /\{[#:/@](?:if|else if|else|await|then|catch|html|debug|const|key)\b[^}]*\}/g,
			priority: 100,
			greedy: true,
		},

		// Svelte snippet blocks
		{
			name: 'svelte_block',
			match: /\{#snippet\s+\w+[^}]*\}[\s\S]*?\{\/snippet\}/g,
			priority: 98,
			greedy: true,
		},

		// TS expressions in curly braces (simpler pattern to avoid nested complexity)
		{
			name: 'svelte_expression',
			match: /\{[^{}]*\}/g,
			priority: 95,
			greedy: true,
		},

		// Script and style tags (just the tags themselves, content handled by boundaries)
		{
			name: 'tag',
			match: /<\/?(?:script|style)(?:\s+[^>]*)?>|<\/(?:script|style)>/gi,
			priority: 92,
			greedy: true,
		},

		// CDATA sections (handled by boundary detection)
		{
			name: 'cdata',
			match: /<!\[CDATA\[[\s\S]*?\]\]>/gi,
			priority: 90,
			greedy: true,
		},

		// Doctype
		{
			name: 'doctype',
			match: /<!DOCTYPE[^>]*>/gi,
			priority: 85,
			greedy: true,
		},

		// Prolog (XML declaration)
		{
			name: 'prolog',
			match: /<\?[\s\S]+?\?>/g,
			priority: 83,
			greedy: true,
		},

		// Svelte directives (on:, bind:, use:, class:, style:, in:, out:, transition:, animate:, let:)
		{
			name: 'svelte_directive',
			match: /(?:on|bind|use|class|style|in|out|transition|animate|let):[^\s>/=]+/g,
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
