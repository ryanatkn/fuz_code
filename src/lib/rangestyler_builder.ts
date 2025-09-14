import type {
	Rangestyler_Pattern,
	Rangestyler_Match_Result,
	Rangestyler_Language_Boundary,
} from '$lib/rangestyler_types.js';
import {escape_html} from '$lib/helpers.js';

/**
 * Create a text node in an element and return it
 */
export const create_text_node = (element: Element, text: string): Text => {
	// Clear element first
	element.textContent = '';

	// Create and append text node
	const text_node = document.createTextNode(text);
	element.appendChild(text_node);

	return text_node;
};

/**
 * Find all pattern matches in text
 */
export const find_matches = (
	text: string,
	patterns: Array<Rangestyler_Pattern>,
): Array<Rangestyler_Match_Result> => {
	const matches: Array<Rangestyler_Match_Result> = [];

	for (const pattern of patterns) {
		const regex = pattern.match;

		// Ensure global flag for multiple matches
		const global_regex = regex.global ? regex : new RegExp(regex.source, regex.flags + 'g');

		let match: RegExpExecArray | null;

		while ((match = global_regex.exec(text)) !== null) {
			const full_match = match[0];
			let start_offset = match.index;

			// Handle lookbehind by adjusting start position
			if (pattern.lookbehind && match.length > 1) {
				// The first capture group is the lookbehind part
				start_offset += match[1].length;
			}

			const result: Rangestyler_Match_Result = {
				pattern,
				start: start_offset,
				end: start_offset + full_match.length,
				text: full_match,
			};

			// Handle capture groups if specified
			if (pattern.captures && pattern.captures.length > 0) {
				result.captures = [];

				for (const capture_index of pattern.captures) {
					if (match[capture_index]) {
						const capture_start = text.indexOf(match[capture_index], start_offset);
						result.captures.push({
							start: capture_start,
							end: capture_start + match[capture_index].length,
							text: match[capture_index],
						});
					}
				}
			}

			matches.push(result);

			// Prevent infinite loop on zero-width matches
			if (match.index === global_regex.lastIndex) {
				global_regex.lastIndex++;
			}

			// For non-greedy patterns, don't continue matching
			if (!pattern.greedy) {
				break;
			}
		}
	}

	// Sort by start position, then by priority
	matches.sort((a, b) => {
		if (a.start !== b.start) {
			return a.start - b.start;
		}
		// Higher priority wins
		return (b.pattern.priority || 0) - (a.pattern.priority || 0);
	});

	return matches;
};

/**
 * Remove overlapping matches based on priority
 */
export const resolve_overlaps = (
	matches: Array<Rangestyler_Match_Result>,
): Array<Rangestyler_Match_Result> => {
	if (matches.length === 0) return [];

	const resolved: Array<Rangestyler_Match_Result> = [];
	let last_end = -1;

	for (const match of matches) {
		// Skip if this match overlaps with a previous one
		if (match.start < last_end) {
			continue;
		}

		resolved.push(match);
		last_end = match.end;
	}

	return resolved;
};

/**
 * Create Range objects from matches
 */
export const create_ranges = (
	text_node: Text,
	matches: Array<Rangestyler_Match_Result>,
): Map<string, Array<Range>> => {
	const ranges_by_name: Map<string, Array<Range>> = new Map();

	for (const match of matches) {
		const name = match.pattern.name;

		if (!ranges_by_name.has(name)) {
			ranges_by_name.set(name, []);
		}

		const ranges = ranges_by_name.get(name)!;

		// If we have capture groups, create ranges for those
		if (match.captures && match.captures.length > 0) {
			for (const capture of match.captures) {
				const range = document.createRange();
				range.setStart(text_node, capture.start);
				range.setEnd(text_node, capture.end);
				ranges.push(range);
			}
		} else {
			// Create range for the entire match
			const range = document.createRange();
			range.setStart(text_node, match.start);
			range.setEnd(text_node, match.end);
			ranges.push(range);
		}
	}

	return ranges_by_name;
};

/**
 * Build ranges from text and patterns
 */
export const build_ranges = (
	element: Element,
	text: string,
	patterns: Array<Rangestyler_Pattern>,
): {text_node: Text; ranges_by_name: Map<string, Array<Range>>} => {
	// Create text node
	const text_node = create_text_node(element, text);

	// Find all matches
	const matches = find_matches(text, patterns);

	// Resolve overlaps
	const resolved = resolve_overlaps(matches);

	// Create ranges
	const ranges_by_name = create_ranges(text_node, resolved);

	return {text_node, ranges_by_name};
};

/**
 * Build ranges from text and patterns with boundary awareness
 */
export const build_ranges_with_boundaries = (
	element: Element,
	text: string,
	patterns: Array<Rangestyler_Pattern>,
	lang_id: string,
	get_language_patterns: (lang_id: string) => Array<Rangestyler_Pattern> | undefined,
): {text_node: Text; ranges_by_name: Map<string, Array<Range>>} => {
	// Create text node
	const text_node = create_text_node(element, text);

	// Find all matches with boundaries
	const matches = find_matches_with_boundaries(text, patterns, lang_id, get_language_patterns);

	// Resolve overlaps
	const resolved = resolve_overlaps(matches);

	// Create ranges
	const ranges_by_name = create_ranges(text_node, resolved);

	return {text_node, ranges_by_name};
};

/**
 * Generate HTML fallback from matches (for unsupported browsers)
 */
export const generate_html_fallback = (
	text: string,
	matches: Array<Rangestyler_Match_Result>,
): string => {
	if (matches.length === 0) {
		return escape_html(text);
	}

	let html = '';
	let last_end = 0;

	for (const match of matches) {
		// Add text before this match
		if (match.start > last_end) {
			html += escape_html(text.substring(last_end, match.start));
		}

		// Add the highlighted match
		const class_name = `token ${match.pattern.name}`;

		if (match.captures && match.captures.length > 0) {
			// Handle captures
			let capture_html = '';
			let last_capture_end = match.start;

			for (const capture of match.captures) {
				if (capture.start > last_capture_end) {
					capture_html += escape_html(text.substring(last_capture_end, capture.start));
				}
				capture_html += `<span class="${class_name}">${escape_html(capture.text)}</span>`;
				last_capture_end = capture.end;
			}

			if (last_capture_end < match.end) {
				capture_html += escape_html(text.substring(last_capture_end, match.end));
			}

			html += capture_html;
		} else {
			html += `<span class="${class_name}">${escape_html(match.text)}</span>`;
		}

		last_end = match.end;
	}

	// Add remaining text
	if (last_end < text.length) {
		html += escape_html(text.substring(last_end));
	}

	return html;
};

/**
 * Detect language boundaries in text (script, style)
 * Comments and CDATA are handled by normal pattern matching
 */
export const detect_boundaries = (text: string): Array<Rangestyler_Language_Boundary> => {
	const boundaries: Array<Rangestyler_Language_Boundary> = [];
	const processed_regions = new Set<string>();

	// 1. Find HTML comments first (highest priority - they prevent script/style detection)
	const comment_regex = /<!--[\s\S]*?-->/g;
	let match: RegExpExecArray | null;

	while ((match = comment_regex.exec(text)) !== null) {
		// Mark this region as processed so script/style tags inside comments are ignored
		for (let i = match.index; i < match.index + match[0].length; i++) {
			processed_regions.add(`${i}`);
		}
	}

	// 2. Find script tags (non-greedy to handle strings with </script> inside)
	const script_regex = /(<script(?:\s+[^>]*)?>)([\s\S]*?)(<\/script>)/gi;
	while ((match = script_regex.exec(text)) !== null) {
		const full_match = match[0];
		const opening_tag = match[1];
		const content = match[2];

		// Check if any part overlaps with processed regions
		let overlaps = false;
		for (let i = match.index; i < match.index + full_match.length; i++) {
			if (processed_regions.has(`${i}`)) {
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
				language: 'ts', // Default to TypeScript for script tags
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

		// Check if any part overlaps with processed regions
		let overlaps = false;
		for (let i = match.index; i < match.index + full_match.length; i++) {
			if (processed_regions.has(`${i}`)) {
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
 * Get appropriate patterns for a given boundary type
 */
export const get_boundary_patterns = (
	boundary: Rangestyler_Language_Boundary,
	patterns: Array<Rangestyler_Pattern>,
	get_language_patterns: (lang_id: string) => Array<Rangestyler_Pattern> | undefined,
): Array<Rangestyler_Pattern> => {
	switch (boundary.type) {
		case 'script':
			// Merge TypeScript patterns (with boosted priority) and HTML patterns
			// This allows both the script structure and content to be highlighted
			const ts_patterns = get_language_patterns('ts') || [];
			const boosted_ts = ts_patterns.map((p) => ({
				...p,
				priority: (p.priority || 0) + 100, // Boost priority to override HTML patterns
			}));
			return [...boosted_ts, ...patterns];
		case 'style':
			// Merge CSS patterns (with boosted priority) and HTML patterns
			// This allows both the style structure and content to be highlighted
			const css_patterns = get_language_patterns('css') || [];
			const boosted_css = css_patterns.map((p) => ({
				...p,
				priority: (p.priority || 0) + 100, // Boost priority to override HTML patterns
			}));
			return [...boosted_css, ...patterns];
		case 'content':
		default:
			// Use current language patterns for regular content
			return patterns;
	}
};

/**
 * Find all pattern matches within boundaries
 */
export const find_matches_with_boundaries = (
	text: string,
	patterns: Array<Rangestyler_Pattern>,
	lang: string,
	get_language_patterns: (lang_id: string) => Array<Rangestyler_Pattern> | undefined,
): Array<Rangestyler_Match_Result> => {
	// Special handling for HTML and Svelte files
	const needs_boundaries = lang === 'html' || lang === 'svelte';

	if (!needs_boundaries) {
		// For non-HTML/Svelte files, use regular matching
		return find_matches(text, patterns);
	}

	// Detect boundaries first
	const boundaries = detect_boundaries(text);
	const all_matches: Array<Rangestyler_Match_Result> = [];

	for (const boundary of boundaries) {
		// Extract text for this boundary
		const boundary_text = text.slice(boundary.start, boundary.end);

		// Get appropriate patterns for this boundary
		const boundary_patterns = get_boundary_patterns(boundary, patterns, get_language_patterns);

		// Skip if no patterns to apply
		if (boundary_patterns.length === 0) {
			continue;
		}

		// Find matches within boundary
		const matches = find_matches(boundary_text, boundary_patterns);

		// Adjust offsets to global positions
		for (const match of matches) {
			match.start += boundary.start;
			match.end += boundary.start;

			// Also adjust capture group positions if present
			if (match.captures) {
				for (const capture of match.captures) {
					capture.start += boundary.start;
					capture.end += boundary.start;
				}
			}

			all_matches.push(match);
		}
	}

	// Sort matches by start position, then by priority
	all_matches.sort((a, b) => {
		if (a.start !== b.start) {
			return a.start - b.start;
		}
		// Higher priority wins
		return (b.pattern.priority || 0) - (a.pattern.priority || 0);
	});

	return all_matches;
};
