import type {Rangestyler_Language, Rangestyler_Mode} from '$lib/rangestyler_types.js';
import {
	build_ranges_with_boundaries,
	find_matches_with_boundaries,
	resolve_overlaps,
	generate_html_fallback,
} from '$lib/rangestyler_builder.js';

/**
 * Check for CSS Highlights API support.
 */
export const supports_css_highlight_api = (): boolean =>
	typeof CSS !== 'undefined' &&
	'highlights' in CSS &&
	typeof (globalThis as any).Highlight === 'function';

export class Rangestyler {
	private languages: Map<string, Rangestyler_Language>;
	private active_highlights: Map<Element, Array<string>>;

	constructor() {
		this.languages = new Map();
		this.active_highlights = new Map();
	}

	get supports_native(): boolean {
		return supports_css_highlight_api();
	}

	register_language(language: Rangestyler_Language): void {
		this.languages.set(language.id, language);
	}

	get_language(id: string): Rangestyler_Language | undefined {
		return this.languages.get(id);
	}

	highlight(
		element: Element,
		text: string,
		lang_id: string,
		mode: Rangestyler_Mode = 'auto',
	): void {
		const language = this.get_language(lang_id);
		if (!language) {
			console.error(`Language "${lang_id}" not found`); // eslint-disable-line no-console
			element.textContent = text;
			return;
		}

		const use_ranges = mode === 'ranges' || (mode === 'auto' && this.supports_native);

		if (use_ranges && this.supports_native) {
			this.#highlight_with_ranges(element, text, language, lang_id);
		} else {
			// Fall back to HTML generation or explicitly use HTML mode
			this.#highlight_with_html(element, text, language, lang_id);
		}
	}

	#highlight_with_ranges(
		element: Element,
		text: string,
		language: Rangestyler_Language,
		lang_id: string,
	): void {
		// Clear any existing highlights for this element
		this.clear_highlights(element);

		// Build ranges (use boundary-aware for HTML/Svelte)
		const {ranges_by_name} = build_ranges_with_boundaries(
			element,
			text,
			language.patterns,
			lang_id,
			(id) => this.get_language(id),
			language.detect_boundaries,
			language,
		);

		// Register highlights
		const highlight_names: Array<string> = [];

		for (const [name, ranges] of ranges_by_name) {
			// Names already include proper language prefixes from create_ranges
			highlight_names.push(name);

			// Register with CSS highlights directly
			if (globalThis.CSS?.highlights) {
				try {
					const highlight = new globalThis.Highlight(...ranges);
					CSS.highlights.set(name, highlight);
				} catch (error) {
					console.error(`Failed to register highlight "${name}":`, error); // eslint-disable-line no-console
				}
			}
		}

		// Track active highlights for cleanup
		this.active_highlights.set(element, highlight_names);
	}

	/**
	 * Highlight using HTML generation (fallback)
	 */
	#highlight_with_html(
		element: Element,
		text: string,
		language: Rangestyler_Language,
		lang_id: string,
	): void {
		// Find and resolve matches (use boundary-aware matching for HTML/Svelte)
		const {matches} = find_matches_with_boundaries(
			text,
			language.patterns,
			lang_id,
			(id) => this.get_language(id),
			language.detect_boundaries,
			language,
		);
		const resolved = resolve_overlaps(matches);

		// Generate HTML
		const html = generate_html_fallback(text, resolved);

		// Set innerHTML
		element.innerHTML = html;
	}

	/**
	 * Clear highlights for an element
	 */
	clear_highlights(element: Element): void {
		const highlights = this.active_highlights.get(element);
		if (highlights && globalThis.CSS?.highlights) {
			for (const name of highlights) {
				globalThis.CSS?.highlights.delete(name);
			}
			this.active_highlights.delete(element);
		}
	}

	/**
	 * Clear all highlights
	 */
	clear_all(): void {
		if (globalThis.CSS?.highlights) {
			globalThis.CSS?.highlights.clear();
		}
		this.active_highlights.clear();
	}
}
