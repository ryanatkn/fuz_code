import {Boundary_Scanner} from './boundary_scanner_base.js';
import {
	CHAR_COLON,
	type Boundary_Type_Def,
	type Found_Boundary,
	type Language_Scanner,
	CHAR_QUOTE,
} from './boundary_scanner_types.js';

// Define boundary types for JSON
export const json_boundary_types: Array<Boundary_Type_Def> = [
	{name: 'json_string', language: 'json'},
	{name: 'json_property', language: 'json'},
];

/**
 * JSON language scanner
 */
export class Json_Scanner extends Boundary_Scanner implements Language_Scanner {
	id = 'json';

	/**
	 * Find the next boundary in JSON text
	 */
	find_next_boundary(text: string, pos: number, end: number): Found_Boundary | null {
		while (pos < end) {
			const char = text.charCodeAt(pos);

			// String (both property names and values)
			if (char === CHAR_QUOTE) {
				// Check if this is a property name or value
				// Look ahead to see if there's a colon after the closing quote
				const string_end = this.find_string_end(text, pos + 1, end, CHAR_QUOTE);
				if (string_end === -1) {
					// Unclosed string, treat rest as string
					return {
						boundary_type: 'json_string',
						start: pos,
						end,
					};
				}

				// Skip whitespace after the string
				let after = string_end;
				while (after < end && this.is_whitespace(text.charCodeAt(after))) {
					after++;
				}

				// If followed by colon, it's a property name
				if (after < end && text.charCodeAt(after) === CHAR_COLON) {
					return {
						boundary_type: 'json_property',
						start: pos,
						end: string_end,
					};
				}

				// Otherwise it's a regular string value
				return {
					boundary_type: 'json_string',
					start: pos,
					end: string_end,
				};
			}

			pos++;
		}

		return null;
	}

	/**
	 * Find the end of a JSON string
	 */
	private find_string_end(text: string, pos: number, end: number, quote_char: number): number {
		while (pos < end) {
			const char = text.charCodeAt(pos);

			// Check for escape sequence
			if (char === CHAR_BACKSLASH) {
				// Skip the escaped character
				pos += 2;
				continue;
			}

			// Check for closing quote
			if (char === quote_char) {
				return pos + 1;
			}

			pos++;
		}

		return -1; // Unclosed string
	}
}

// Character constants for JSON
const CHAR_BACKSLASH = 92; // \
