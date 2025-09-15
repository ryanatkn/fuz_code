import {Boundary_Scanner} from './boundary_scanner_base.js';
import type {Found_Boundary, Boundary_Type_Def} from './boundary_scanner_types.js';
import {CHAR_LT, CHAR_GT, CHAR_SLASH} from './boundary_scanner_types.js';

/**
 * HTML boundary type definitions
 */
export const html_boundary_types: Array<Boundary_Type_Def> = [
	{
		name: 'html_comment',
		language: 'html',
	},
	{
		name: 'html_tag',
		language: 'html',
	},
	{
		name: 'html_doctype',
		language: 'html',
	},
	{
		name: 'html_cdata',
		language: 'html',
	},
	{
		name: 'html_code',
		language: 'html',
	},
];

/**
 * HTML language scanner
 * Finds comments, script tags, style tags, and regular HTML content.
 */
export class Html_Scanner extends Boundary_Scanner {
	id = 'html';

	find_next_boundary(text: string, pos: number, end: number): Found_Boundary | null {
		while (pos < end) {
			const char = text.charCodeAt(pos);

			if (char === CHAR_LT) {
				// Check for comment
				if (this.match_at(text, pos, '<!--')) {
					return this.scan_comment(text, pos, end);
				}

				// Check for CDATA
				if (this.match_at(text, pos, '<![CDATA[')) {
					return this.scan_cdata(text, pos, end);
				}

				// Check for DOCTYPE
				if (this.match_at_ignore_case(text, pos, '<!doctype')) {
					return this.scan_doctype(text, pos, end);
				}

				// Check for script tag
				if (this.match_at_ignore_case(text, pos, '<script')) {
					return this.scan_script_tag(text, pos, end);
				}

				// Check for style tag
				if (this.match_at_ignore_case(text, pos, '<style')) {
					return this.scan_style_tag(text, pos, end);
				}

				// Check if this is a tag (not a standalone <)
				if (this.is_tag_start(text, pos + 1, end)) {
					return this.scan_tag(text, pos, end);
				}
			}

			pos++;
		}

		return null;
	}

	/**
	 * Scan an HTML comment
	 */
	private scan_comment(text: string, start: number, end: number): Found_Boundary {
		// Find the end of the comment
		const comment_end = this.find_string(text, start + 4, end, '-->');

		if (comment_end !== -1) {
			return {
				boundary_type: 'html_comment',
				start: start,
				end: comment_end + 3, // Include -->
			};
		}

		// Unterminated comment
		return {
			boundary_type: 'html_comment',
			start: start,
			end: end,
		};
	}

	/**
	 * Check if position starts a valid tag (not standalone <)
	 */
	private is_tag_start(text: string, pos: number, end: number): boolean {
		if (pos >= end) return false;

		const char = text.charCodeAt(pos);

		// Check for / (closing tag)
		if (char === CHAR_SLASH) {
			if (pos + 1 < end) {
				const next = text.charCodeAt(pos + 1);
				// Must be followed by a letter
				return (next >= 65 && next <= 90) || (next >= 97 && next <= 122);
			}
			return false;
		}

		// Must be a letter for opening tag
		return (char >= 65 && char <= 90) || (char >= 97 && char <= 122);
	}

	/**
	 * Scan a regular HTML tag
	 */
	private scan_tag(text: string, start: number, end: number): Found_Boundary {
		const tag_end = this.find_tag_end(text, start, end);

		if (tag_end === -1) {
			// Unterminated tag
			return {
				boundary_type: 'html_tag',
				start: start,
				end: end,
			};
		}

		return {
			boundary_type: 'html_tag',
			start: start,
			end: tag_end,
		};
	}

	/**
	 * Scan a DOCTYPE declaration
	 */
	private scan_doctype(text: string, start: number, end: number): Found_Boundary {
		const tag_end = this.find_tag_end(text, start, end);

		if (tag_end === -1) {
			return {
				boundary_type: 'html_doctype',
				start: start,
				end: end,
			};
		}

		return {
			boundary_type: 'html_doctype',
			start: start,
			end: tag_end,
		};
	}

	/**
	 * Scan a CDATA section
	 */
	private scan_cdata(text: string, start: number, end: number): Found_Boundary {
		const cdata_end = this.find_string(text, start + 9, end, ']]>');

		if (cdata_end !== -1) {
			return {
				boundary_type: 'html_cdata',
				start: start,
				end: cdata_end + 3,
			};
		}

		// Unterminated CDATA
		return {
			boundary_type: 'html_cdata',
			start: start,
			end: end,
		};
	}

	/**
	 * Scan a script tag
	 */
	private scan_script_tag(text: string, start: number, end: number): Found_Boundary {
		// Find the end of the opening tag
		const tag_end = this.find_tag_end(text, start, end);

		if (tag_end === -1) {
			// Malformed tag
			return {
				boundary_type: 'html_tag',
				start: start,
				end: end,
			};
		}

		// Check if it's a self-closing tag
		if (text.charCodeAt(tag_end - 2) === CHAR_SLASH) {
			// Self-closing script tag, just return the tag
			return {
				boundary_type: 'html_tag',
				start: start,
				end: tag_end,
			};
		}

		// Return the tag and signal to switch to TypeScript
		return {
			boundary_type: 'html_tag',
			start: start,
			end: tag_end,
			switch_to_language: 'ts',
		};
	}

	/**
	 * Scan a style tag
	 */
	private scan_style_tag(text: string, start: number, end: number): Found_Boundary {
		// Find the end of the opening tag
		const tag_end = this.find_tag_end(text, start, end);

		if (tag_end === -1) {
			// Malformed tag
			return {
				boundary_type: 'html_tag',
				start: start,
				end: end,
			};
		}

		// Check if it's a self-closing tag
		if (text.charCodeAt(tag_end - 2) === CHAR_SLASH) {
			// Self-closing style tag, just return the tag
			return {
				boundary_type: 'html_tag',
				start: start,
				end: tag_end,
			};
		}

		// Return the tag and signal to switch to CSS
		return {
			boundary_type: 'html_tag',
			start: start,
			end: tag_end,
			switch_to_language: 'css',
		};
	}

	/**
	 * Find the end of an HTML tag (the closing >)
	 */
	private find_tag_end(text: string, start: number, end: number): number {
		let pos = start + 1;
		let in_string = false;
		let string_char = 0;

		while (pos < end) {
			const char = text.charCodeAt(pos);

			if (in_string) {
				if (char === string_char) {
					in_string = false;
				}
			} else {
				if (char === 34 || char === 39) {
					// Quote or apostrophe
					in_string = true;
					string_char = char;
				} else if (char === CHAR_GT) {
					return pos + 1;
				}
			}

			pos++;
		}

		return -1;
	}
}
