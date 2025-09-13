import type {Rangestyler_Pattern, Rangestyler_Match_Result} from './rangestyler_types.js';
import {escape_html} from './helpers.js';

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
): Rangestyler_Match_Result[] => {
	const matches: Rangestyler_Match_Result[] = [];

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
	matches: Rangestyler_Match_Result[],
): Rangestyler_Match_Result[] => {
	if (matches.length === 0) return [];

	const resolved: Rangestyler_Match_Result[] = [];
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
	matches: Rangestyler_Match_Result[],
): Map<string, Range[]> => {
	const ranges_by_name = new Map<string, Range[]>();

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
): {text_node: Text; ranges_by_name: Map<string, Range[]>} => {
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
 * Generate HTML fallback from matches (for unsupported browsers)
 */
export const generate_html_fallback = (
	text: string,
	matches: Rangestyler_Match_Result[],
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
