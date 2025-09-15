import type {Token} from './boundary_scanner_types.js';

export type Boundaryscanner_Mode = 'auto' | 'ranges' | 'html';

/**
 * Check for CSS Highlights API support.
 */
export const supports_css_highlight_api = (): boolean =>
	typeof CSS !== 'undefined' &&
	'highlights' in CSS &&
	typeof (globalThis as any).Highlight === 'function';

/**
 * Highlight Manager - Properly manages highlights for a single element
 * Tracks ranges per element and only removes its own ranges when clearing
 */
export class Highlight_Manager {
	private element_ranges: Map<string, Array<Range>>;

	constructor() {
		this.element_ranges = new Map();
	}

	/**
	 * Highlight tokens by creating ranges and adding them to shared highlights
	 */
	highlight_from_tokens(element: Element, tokens: Array<Token>): void {
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
	 * Clear only this element's ranges from highlights
	 */
	clear_element_ranges(): void {
		if (!globalThis.CSS?.highlights) return;

		for (const [name, ranges] of this.element_ranges) {
			const highlight = CSS.highlights.get(name);
			if (highlight) {
				// Remove only this element's ranges
				for (const range of ranges) {
					highlight.delete(range);
				}

				// If highlight is now empty, remove it from registry
				if (highlight.size === 0) {
					CSS.highlights.delete(name);
				}
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

