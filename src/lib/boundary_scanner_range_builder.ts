import type {Token} from './boundary_scanner_types.js';

/**
 * Check for CSS Highlights API support.
 */
export const supports_css_highlight_api = (): boolean =>
	typeof CSS !== 'undefined' &&
	'highlights' in CSS &&
	typeof (globalThis as any).Highlight === 'function';

/**
 * Build Range objects from tokens (the new public API)
 * Groups tokens by type and creates ranges for CSS Highlights API
 */
export function build_ranges_from_tokens(
	element: Element,
	_text: string,
	tokens: Array<Token>,
): Map<string, Array<Range>> {
	const ranges_by_name = new Map<string, Array<Range>>();

	// Get the text node
	const text_node = element.firstChild;
	if (!text_node || text_node.nodeType !== Node.TEXT_NODE) {
		return ranges_by_name;
	}

	// Process each token
	for (const token of tokens) {
		// Use the token type directly as the highlight name
		// (e.g., 'json_boolean', 'ts_keyword')
		const highlight_name = token.type;

		try {
			// Create a Range for this token
			const range = document.createRange();
			range.setStart(text_node, token.start);
			range.setEnd(text_node, token.end);

			// Add to the appropriate highlight group
			if (!ranges_by_name.has(highlight_name)) {
				ranges_by_name.set(highlight_name, []);
			}
			ranges_by_name.get(highlight_name)!.push(range);
		} catch (error) {
			console.error(`Failed to create range for token ${token.type}:`, error);
		}
	}

	return ranges_by_name;
}

/**
 * Apply CSS highlights from ranges
 */
export function apply_highlights(ranges_by_name: Map<string, Array<Range>>): Array<string> {
	const highlight_names: Array<string> = [];

	if (!globalThis.CSS?.highlights) {
		console.warn('CSS Highlights API not supported');
		return highlight_names;
	}

	for (const [name, ranges] of ranges_by_name) {
		try {
			const highlight = new globalThis.Highlight(...ranges);
			CSS.highlights.set(name, highlight);
			highlight_names.push(name);
		} catch (error) {
			console.error(`Failed to register highlight "${name}":`, error);
		}
	}

	return highlight_names;
}

/**
 * Clear CSS highlights
 */
export function clear_highlights(highlight_names: Array<string>): void {
	if (!globalThis.CSS?.highlights) return;

	for (const name of highlight_names) {
		CSS.highlights.delete(name);
	}
}

/**
 * Highlight element with tokens using Range API (the new public API)
 */
export function highlight_with_tokens(
	element: Element,
	text: string,
	tokens: Array<Token>,
): Array<string> {
	// Build ranges from tokens
	const ranges_by_name = build_ranges_from_tokens(element, text, tokens);

	// Apply highlights and return names for cleanup
	return apply_highlights(ranges_by_name);
}
