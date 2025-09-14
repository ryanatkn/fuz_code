import type {Rangestyler_Language, Rangestyler_Language_Boundary} from '$lib/rangestyler_types.js';

/**
 * Detect language boundaries in Svelte text (script, style, content)
 * Similar to HTML but handles Svelte-specific script tags (e.g., <script lang="ts" module>)
 */
const detect_svelte_boundaries = (text: string): Array<Rangestyler_Language_Boundary> => {
	const boundaries: Array<Rangestyler_Language_Boundary> = [];
	const script_style_blocked = new Set<string>(); // Regions where script/style detection is blocked
	const processed_regions = new Set<string>(); // Regions already in a boundary (script/style content)

	// 1. Find HTML comments to block script/style detection (but don't mark as processed)
	const comment_regex = /<!--[\s\S]*?-->/g;
	let match: RegExpExecArray | null;

	while ((match = comment_regex.exec(text)) !== null) {
		// Mark this region to block script/style detection only
		for (let i = match.index; i < match.index + match[0].length; i++) {
			script_style_blocked.add(`${i}`);
		}
	}

	// 2. Find script tags (including Svelte-specific attributes like lang="ts" module)
	const script_regex = /(<script(?:\s+[^>]*)?>)([\s\S]*?)(<\/script>)/gi;
	while ((match = script_regex.exec(text)) !== null) {
		const full_match = match[0];
		const opening_tag = match[1];
		const content = match[2];

		// Check if any part overlaps with blocked regions
		let overlaps = false;
		for (let i = match.index; i < match.index + full_match.length; i++) {
			if (script_style_blocked.has(`${i}`)) {
				overlaps = true;
				break;
			}
		}

		if (!overlaps && content) {
			// Add boundary for the content only (not the tags)
			const content_start = match.index + opening_tag.length;
			const content_end = content_start + content.length;
			boundaries.push({
				type: 'script',
				start: content_start,
				end: content_end,
				language: 'ts', // Default to TypeScript for Svelte script tags
			});
			// Mark only the content region as processed (not the tags)
			for (let i = content_start; i < content_end; i++) {
				processed_regions.add(`${i}`);
			}
		}
	}

	// 3. Find style tags
	const style_regex = /(<style(?:\s+[^>]*)?>)([\s\S]*?)(<\/style>)/gi;
	while ((match = style_regex.exec(text)) !== null) {
		const full_match = match[0];
		const opening_tag = match[1];
		const content = match[2];

		// Check if any part overlaps with blocked regions
		let overlaps = false;
		for (let i = match.index; i < match.index + full_match.length; i++) {
			if (script_style_blocked.has(`${i}`)) {
				overlaps = true;
				break;
			}
		}

		if (!overlaps && content) {
			// Add boundary for the content only (not the tags)
			const content_start = match.index + opening_tag.length;
			const content_end = content_start + content.length;
			boundaries.push({
				type: 'style',
				start: content_start,
				end: content_end,
				language: 'css',
			});
			// Mark only the content region as processed (not the tags)
			for (let i = content_start; i < content_end; i++) {
				processed_regions.add(`${i}`);
			}
		}
	}

	// 4. Add content boundaries for remaining unprocessed regions
	let last_end = 0;
	const sorted_processed: Array<number> = Array.from(processed_regions)
		.map((s) => parseInt(s))
		.sort((a, b) => a - b);

	// Find contiguous processed regions
	const ranges: Array<{start: number; end: number}> = [];
	if (sorted_processed.length > 0) {
		let range_start = sorted_processed[0];
		let range_end = sorted_processed[0];

		for (let i = 1; i < sorted_processed.length; i++) {
			if (sorted_processed[i] === range_end + 1) {
				range_end = sorted_processed[i];
			} else {
				ranges.push({start: range_start, end: range_end + 1});
				range_start = sorted_processed[i];
				range_end = sorted_processed[i];
			}
		}
		ranges.push({start: range_start, end: range_end + 1});
	}

	// Add content boundaries for gaps
	for (const range of ranges) {
		if (last_end < range.start) {
			boundaries.push({
				type: 'content',
				start: last_end,
				end: range.start,
			});
		}
		last_end = range.end;
	}

	// Add final content boundary if needed
	if (last_end < text.length) {
		boundaries.push({
			type: 'content',
			start: last_end,
			end: text.length,
		});
	}

	// If no special regions found, entire text is content
	if (boundaries.length === 0) {
		boundaries.push({
			type: 'content',
			start: 0,
			end: text.length,
		});
	}

	// Sort boundaries by start position
	boundaries.sort((a, b) => a.start - b.start);

	return boundaries;
};

/**
 * Svelte language definition
 */
export const svelte_language: Rangestyler_Language = {
	id: 'svelte',
	detect_boundaries: detect_svelte_boundaries,
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
