import {Syntax_Token, type Syntax_Token_Stream} from './syntax_styler.js';

export type Domstyler_Range_Mode = 'auto' | 'ranges' | 'html';

/**
 * Simple token format for range building
 */
export interface Flat_Token {
	type: string;
	start: number;
	end: number;
}

/**
 * Check for CSS Highlights API support.
 */
export const supports_css_highlight_api = (): boolean =>
	typeof CSS !== 'undefined' &&
	'highlights' in CSS &&
	typeof (globalThis as any).Highlight === 'function';

/**
 * Calculate the total text length of a token's content
 */
const get_content_length = (content: Syntax_Token_Stream | string): number => {
	if (typeof content === 'string') {
		return content.length;
	}

	let length = 0;
	for (const item of content) {
		if (typeof item === 'string') {
			length += item.length;
		} else {
			// Recursively get the length of nested token content
			length += get_content_length(item.content);
		}
	}
	return length;
};

/**
 * Flatten a DOM styler token stream into a flat array of tokens with positions.
 * This traverses nested tokens and calculates absolute positions by walking the tree.
 *
 * TODO: Handle edge cases:
 * - Tokens with aliases might need special handling for CSS classes
 * - Very deeply nested tokens might have performance implications
 */
export const flatten_domstyler_tokens = (
	tokens: Syntax_Token_Stream,
	offset: number = 0,
): Array<Flat_Token> => {
	const result: Array<Flat_Token> = [];
	let current_pos = offset;

	for (const token of tokens) {
		if (typeof token === 'string') {
			// Plain text, advance position but don't create a token
			current_pos += token.length;
		} else if (token instanceof Syntax_Token) {
			const token_start = current_pos;

			// If the token has nested content (array), we need to process it recursively
			if (Array.isArray(token.content)) {
				// For tokens with nested content, we typically want the nested tokens
				// not the parent wrapper (e.g., we want the individual keywords inside
				// a function, not the whole function as one highlight)
				const nested = flatten_domstyler_tokens(token.content, token_start);
				result.push(...nested);

				// Still need to advance position by the total content length
				current_pos += get_content_length(token.content);
			} else {
				// Simple token with string content - add it to results
				const token_end = token_start + token.content.length;

				result.push({
					type: token.type,
					start: token_start,
					end: token_end,
				});

				current_pos = token_end;
			}
		}
	}

	return result;
};

/**
 * Highlight Manager - Manages highlights for a single element
 * Tracks ranges per element and only removes its own ranges when clearing
 */
export class Domstyler_Highlight_Manager {
	private element_ranges: Map<string, Array<Range>>;

	constructor() {
		this.element_ranges = new Map();
	}

	/**
	 * Highlight tokens by creating ranges and adding them to shared highlights
	 */
	highlight_from_tokens(element: Element, tokens: Array<Flat_Token>): void {
		if (!globalThis.CSS?.highlights) {
			console.warn('CSS Highlights API not supported');
			return;
		}

		// Get the text node
		const text_node = element.firstChild;
		if (!text_node || text_node.nodeType !== Node.TEXT_NODE) {
			return;
		}

		// Group tokens by type and create ranges
		const ranges_by_name = new Map<string, Array<Range>>();

		for (const token of tokens) {
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

		// Add ranges to highlights and track them
		for (const [name, ranges] of ranges_by_name) {
			// Track ranges for this element
			this.element_ranges.set(name, ranges);

			// Get or create the shared highlight
			let highlight = CSS.highlights.get(name);
			if (!highlight) {
				highlight = new globalThis.Highlight();
				CSS.highlights.set(name, highlight);
			}

			// Add ranges to the highlight
			for (const range of ranges) {
				highlight.add(range);
			}
		}
	}

	/**
	 * Highlight from DOM styler token stream
	 */
	highlight_from_domstyler_tokens(element: Element, tokens: Syntax_Token_Stream): void {
		const flat_tokens = flatten_domstyler_tokens(tokens);
		this.highlight_from_tokens(element, flat_tokens);
	}

	/**
	 * Clear only this element's ranges from highlights
	 */
	clear_element_ranges(): void {
		if (!globalThis.CSS?.highlights) return;

		for (const [name, ranges] of this.element_ranges) {
			const highlight = CSS.highlights.get(name);
			if (!highlight) {
				console.error('Expected to find CSS highlight:', name);
				continue;
			}
			// Remove only this element's ranges
			for (const range of ranges) {
				highlight.delete(range);
			}

			// If highlight is now empty, remove it from registry
			if (highlight.size === 0) {
				CSS.highlights.delete(name);
			}
		}

		// Clear our tracking
		this.element_ranges.clear();
	}

	/**
	 * Destroy this manager and clean up
	 */
	destroy(): void {
		this.clear_element_ranges();
	}
}
