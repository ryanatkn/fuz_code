import {Syntax_Token, type Syntax_Token_Stream} from './syntax_token.js';

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
	 * Highlight from syntax styler token stream.
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

		this.clear_element_ranges();

		const ranges_by_type: Map<string, Array<Range>> = new Map();
		this.#create_all_ranges(tokens, text_node, ranges_by_type, 0);

		// Apply highlights
		for (const [type, ranges] of ranges_by_type) {
			// Track ranges for this element
			this.element_ranges.set(type, ranges);

			// Get or create the shared highlight
			let highlight = CSS.highlights.get(type);
			if (!highlight) {
				highlight = new Highlight();
				CSS.highlights.set(type, highlight);
			}

			// Add all ranges to the highlight
			for (const range of ranges) {
				highlight.add(range);
			}
		}
	}

	/**
	 * Clear only this element's ranges from highlights.
	 */
	clear_element_ranges(): void {
		for (const [name, ranges] of this.element_ranges) {
			const highlight = CSS.highlights.get(name);
			if (!highlight) {
				throw new Error('Expected to find CSS highlight: ' + name);
			}

			for (const range of ranges) {
				highlight.delete(range);
			}

			if (highlight.size === 0) {
				CSS.highlights.delete(name);
			}
		}

		this.element_ranges.clear();
	}

	destroy(): void {
		this.clear_element_ranges();
	}

	/**
	 * Create ranges for all tokens in the tree.
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
				pos += token.length;
				continue;
			}

			const length = this.#get_token_length(token);
			const end_pos = pos + length;

			try {
				const range = new Range();
				range.setStart(text_node, pos);
				range.setEnd(text_node, end_pos);

				// Add range for the token type
				const type = token.type;
				if (!ranges_by_type.has(type)) {
					ranges_by_type.set(type, []);
				}
				ranges_by_type.get(type)!.push(range);

				// Also add range for any aliases
				if (token.alias) {
					const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];
					for (const alias of aliases) {
						if (!ranges_by_type.has(alias)) {
							ranges_by_type.set(alias, []);
						}
						// Create a new range for each alias (ranges can't be reused)
						const aliasRange = new Range();
						aliasRange.setStart(text_node, pos);
						aliasRange.setEnd(text_node, end_pos);
						ranges_by_type.get(alias)!.push(aliasRange);
					}
				}
			} catch (e) {
				throw new Error(`Failed to create range for ${token.type}: ${e}`);
			}

			// Process nested tokens
			if (Array.isArray(token.content)) {
				this.#create_all_ranges(token.content, text_node, ranges_by_type, pos);
			}

			pos = end_pos;
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
}
