import type {Rangestyler_Language, Rangestyler_Language_Boundary} from '$lib/rangestyler_types.js';

/**
 * Detect language boundaries in HTML text (script, style, content)
 */
const detect_html_boundaries = (text: string): Array<Rangestyler_Language_Boundary> => {
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

	// 2. Find script tags (non-greedy to handle strings with </script> inside)
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
				language: 'html',
				type: 'embedded',
				start: content_start,
				end: content_end,
				embedded_language: 'ts', // TypeScript for script tags
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
				language: 'html',
				type: 'embedded',
				start: content_start,
				end: content_end,
				embedded_language: 'css', // CSS for style tags
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
				language: 'html',
				type: 'code',
				start: last_end,
				end: range.start,
			});
		}
		last_end = range.end;
	}

	// Add final content boundary if needed
	if (last_end < text.length) {
		boundaries.push({
			language: 'html',
			type: 'code',
			start: last_end,
			end: text.length,
		});
	}

	// If no special regions found, entire text is content
	if (boundaries.length === 0) {
		boundaries.push({
			language: 'html',
			type: 'code',
			start: 0,
			end: text.length,
		});
	}

	// Sort boundaries by start position
	boundaries.sort((a, b) => a.start - b.start);

	return boundaries;
};

/**
 * HTML language definition
 */
export const html_language: Rangestyler_Language = {
	id: 'html',
	detect_boundaries: detect_html_boundaries,
	patterns: [
		// Comments (handled by boundary detection but kept for highlighting the delimiters)
		{
			name: 'comment',
			match: /<!--[\s\S]*?-->/g,
			priority: 100,
			greedy: true,
		},

		// CDATA sections (handled by boundary detection but kept for highlighting the delimiters)
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
