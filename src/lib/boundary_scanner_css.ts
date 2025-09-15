import {Boundary_Scanner} from './boundary_scanner_base.js';
import type {Found_Boundary, Boundary_Type_Def} from './boundary_scanner_types.js';
import {
	CHAR_SLASH,
	CHAR_STAR,
	CHAR_QUOTE,
	CHAR_SQUOTE,
	CHAR_BACKSLASH,
} from './boundary_scanner_types.js';

/**
 * CSS boundary type definitions
 */
export const css_boundary_types: Array<Boundary_Type_Def> = [
	{
		name: 'css_comment',
		language: 'css',
	},
	{
		name: 'css_string_single',
		language: 'css',
	},
	{
		name: 'css_string_double',
		language: 'css',
	},
	{
		name: 'css_code',
		language: 'css',
	},
];

/**
 * CSS language scanner
 * Handles comments and strings in CSS.
 */
export class Css_Scanner extends Boundary_Scanner {
	id = 'css';

	find_next_boundary(text: string, pos: number, end: number): Found_Boundary | null {
		while (pos < end) {
			const char = text.charCodeAt(pos);

			// Check for comments (CSS only has /* */ style)
			if (char === CHAR_SLASH) {
				const next_char = pos + 1 < end ? text.charCodeAt(pos + 1) : 0;

				if (next_char === CHAR_STAR) {
					// Multi-line comment
					return this.scan_comment(text, pos, end);
				}
			}

			// Check for strings
			if (char === CHAR_QUOTE) {
				return this.scan_string(text, pos, end, CHAR_QUOTE, 'css_string_double');
			}

			if (char === CHAR_SQUOTE) {
				return this.scan_string(text, pos, end, CHAR_SQUOTE, 'css_string_single');
			}

			pos++;
		}

		return null;
	}

	/**
	 * Scan a CSS comment
	 */
	private scan_comment(text: string, start: number, end: number): Found_Boundary {
		let pos = start + 2; // Skip /*

		while (pos < end - 1) {
			if (text.charCodeAt(pos) === CHAR_STAR && text.charCodeAt(pos + 1) === CHAR_SLASH) {
				return {
					boundary_type: 'css_comment',
					start: start,
					end: pos + 2,
					// Comment content is terminal - can fast-forward
					inner_start: start + 2, // After /*
					inner_end: pos, // Before */
				};
			}
			pos++;
		}

		// Unterminated comment
		return {
			boundary_type: 'css_comment',
			start: start,
			end: end,
			inner_start: start + 2,
			inner_end: end,
		};
	}

	/**
	 * Scan a quoted string in CSS
	 * CSS strings can span multiple lines and use backslash escapes
	 */
	private scan_string(
		text: string,
		start: number,
		end: number,
		quote_char: number,
		boundary_type: string,
	): Found_Boundary {
		let pos = start + 1; // Skip opening quote

		while (pos < end) {
			const char = text.charCodeAt(pos);

			if (char === CHAR_BACKSLASH) {
				// Skip escaped character
				// In CSS, backslash can escape any character including newlines
				pos += 2;
				continue;
			}

			if (char === quote_char) {
				// Found closing quote
				return {
					boundary_type: boundary_type,
					start: start,
					end: pos + 1,
					// String content is terminal - can fast-forward
					inner_start: start + 1, // After opening quote
					inner_end: pos, // Before closing quote
				};
			}

			pos++;
		}

		// Unterminated string
		return {
			boundary_type: boundary_type,
			start: start,
			end: end,
			inner_start: start + 1,
			inner_end: end,
		};
	}
}
