import {Syntax_Token, type Syntax_Token_Stream} from './syntax_styler.js';

export type Highlight_Mode = 'auto' | 'ranges' | 'html';

/**
 * Check for CSS Highlights API support.
 */
export const supports_css_highlight_api = (): boolean =>
	!!(globalThis.CSS?.highlights && globalThis.Highlight); // eslint-disable-line @typescript-eslint/no-unnecessary-condition

/**
 * Manages highlights for a single element.
 * Tracks ranges per element and only removes its own ranges when clearing.
 */
export class Highlight_Manager {
	element_ranges: Map<string, Array<Range>>;

	constructor() {
		if (!supports_css_highlight_api()) {
			throw Error('CSS Highlights API not supported');
		}
		this.element_ranges = new Map();
	}

	/**
	 * Create ranges for all tokens in the tree
	 */
	#create_all_ranges(
		tokens: Syntax_Token_Stream,
		text_node: Node,
		ranges_by_type: Map<string, Array<Range>>,
		offset: number,
	): number {
		let pos = offset;

		for (const token of tokens) {
			if (typeof token === 'string') {
				// Plain text, just advance position
				pos += token.length;
				continue;
			}

			const start = pos;
			const length = this.#get_token_length(token);
			const end = start + length;

			// Create range for EVERY token - no complex logic
			try {
				const range = new Range();
				range.setStart(text_node, start);
				range.setEnd(text_node, end);

				const type = token.type;
				if (!ranges_by_type.has(type)) {
					ranges_by_type.set(type, []);
				}
				ranges_by_type.get(type)!.push(range);
			} catch (e) {
				throw new Error(`Failed to create range for ${token.type}: ${e}`);
			}

			// Process nested tokens
			if (Array.isArray(token.content)) {
				this.#create_all_ranges(token.content, text_node, ranges_by_type, start);
			}

			pos = end;
		}

		return pos;
	}

	/**
	 * Calculate the total text length of a token
	 */
	#get_token_length(token: Syntax_Token): number {
		if (typeof token.content === 'string') {
			return token.content.length;
		}

		let length = 0;
		for (const item of token.content) {
			if (typeof item === 'string') {
				length += item.length;
			} else {
				length += this.#get_token_length(item);
			}
		}
		return length;
	}

	/**
	 * Highlight from syntax styler token stream
	 */
	highlight_from_syntax_tokens(element: Element, tokens: Syntax_Token_Stream): void {
		// Find the text node (it might not be firstChild due to Svelte comment nodes)
		let text_node: Node | null = null;
		for (const node of element.childNodes) {
			if (node.nodeType === Node.TEXT_NODE) {
				text_node = node;
				break;
			}
		}

		if (!text_node) {
			throw new Error('no text node to highlight');
		}

		// Clear existing highlights
		this.clear_element_ranges();

		// Create ranges for all tokens - simple direct traversal
		const ranges_by_type: Map<string, Array<Range>> = new Map();
		this.#create_all_ranges(tokens, text_node, ranges_by_type, 0);

		// Apply highlights
		for (const [type, ranges] of ranges_by_type) {
			// Track ranges for this element
			this.element_ranges.set(type, ranges);

			// Get or create the shared highlight
			let highlight = CSS.highlights.get(type);
			if (!highlight) {
				highlight = new globalThis.Highlight();
				CSS.highlights.set(type, highlight);
			}

			// Add all ranges to the highlight
			for (const range of ranges) {
				highlight.add(range);
			}
		}
	}

	/**
	 * Clear only this element's ranges from highlights
	 */
	clear_element_ranges(): void {
		for (const [name, ranges] of this.element_ranges) {
			const highlight = CSS.highlights.get(name);
			if (!highlight) {
				throw new Error('Expected to find CSS highlight: ' + name);
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
