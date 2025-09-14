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
 * Create Range objects from matches with language prefixes
 */
export const create_ranges = (
	text_node: Text,
	matches: Array<Rangestyler_Match_Result>,
	language_map?: Map<Rangestyler_Match_Result, string>,
): Map<string, Array<Range>> => {
	const ranges_by_name: Map<string, Array<Range>> = new Map();

	for (const match of matches) {
		// Get the language for this match (if available)
		const language = language_map?.get(match);
		const name = language ? `${language}_${match.pattern.name}` : match.pattern.name;

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
	detect_boundaries_fn?: (text: string) => Array<Rangestyler_Language_Boundary>,
): {text_node: Text; ranges_by_name: Map<string, Array<Range>>} => {
	// Create text node
	const text_node = create_text_node(element, text);

	// Find all matches with boundaries and language mapping
	const {matches, language_map} = find_matches_with_boundaries(
		text,
		patterns,
		lang_id,
		get_language_patterns,
		detect_boundaries_fn,
	);

	// Resolve overlaps
	const resolved = resolve_overlaps(matches);

	// Create language map for resolved matches
	const resolved_language_map = new Map<Rangestyler_Match_Result, string>();
	for (const match of resolved) {
		const lang = language_map.get(match);
		if (lang) {
			resolved_language_map.set(match, lang);
		}
	}

	// Create ranges with language prefixes
	const ranges_by_name = create_ranges(text_node, resolved, resolved_language_map);

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

// This function is now deprecated - boundary detection has moved to language definitions
// Keeping for backwards compatibility during migration

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
			// Use ONLY TypeScript patterns inside script tags
			// The script/style tags themselves are in content boundaries
			return get_language_patterns('ts') || [];
		case 'style':
			// Use ONLY CSS patterns inside style tags
			return get_language_patterns('css') || [];
		case 'content':
		default:
			// Use base language patterns for HTML content
			return patterns;
	}
};

/**
 * Find all pattern matches within boundaries
 * Returns matches along with their language context
 */
export const find_matches_with_boundaries = (
	text: string,
	patterns: Array<Rangestyler_Pattern>,
	lang: string,
	get_language_patterns: (lang_id: string) => Array<Rangestyler_Pattern> | undefined,
	detect_boundaries_fn?: (text: string) => Array<Rangestyler_Language_Boundary>,
): {matches: Array<Rangestyler_Match_Result>; language_map: Map<Rangestyler_Match_Result, string>} => {
	// Use language-specific boundary detection if provided, otherwise treat as single boundary
	const boundaries = detect_boundaries_fn?.(text) || [{
		type: 'content' as const,
		start: 0,
		end: text.length,
	}];
	const all_matches: Array<Rangestyler_Match_Result> = [];
	const language_map = new Map<Rangestyler_Match_Result, string>();

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

		// Determine language for all matches in this boundary
		const boundary_language = boundary.language || lang;

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

			// All matches in this boundary use the boundary's language
			language_map.set(match, boundary_language);
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

	return {matches: all_matches, language_map};
};
