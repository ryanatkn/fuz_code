import {Boundary_Scanner} from './boundary_scanner_base.js';
import type {Found_Boundary, Boundary_Type_Def} from './boundary_scanner_types.js';
import {
	CHAR_SLASH,
	CHAR_STAR,
	CHAR_QUOTE,
	CHAR_SQUOTE,
	CHAR_BACKTICK,
	CHAR_BACKSLASH,
	CHAR_DOLLAR,
	CHAR_LBRACE,
	CHAR_RBRACE,
	CHAR_NEWLINE,
	CHAR_CR,
	CHAR_LBRACKET,
	CHAR_EQUALS,
	CHAR_LPAREN,
	CHAR_COMMA,
	CHAR_SEMICOLON,
	CHAR_COLON,
	CHAR_EXCLAIM,
	CHAR_AMPERSAND,
	CHAR_PIPE,
} from './boundary_scanner_types.js';

/**
 * TypeScript boundary type definitions
 */
export const ts_boundary_types: Array<Boundary_Type_Def> = [
	{
		name: 'ts_comment_single',
		language: 'ts',
	},
	{
		name: 'ts_comment_multi',
		language: 'ts',
	},
	{
		name: 'ts_string_single',
		language: 'ts',
	},
	{
		name: 'ts_string_double',
		language: 'ts',
	},
	{
		name: 'ts_template',
		language: 'ts',
	},
	{
		name: 'ts_template_expression',
		language: 'ts',
	},
	{
		name: 'ts_regex',
		language: 'ts',
	},
	{
		name: 'ts_code',
		language: 'ts',
	},
];

/**
 * TypeScript/JavaScript language scanner
 * Handles comments, strings, template literals with expressions, and regex literals.
 */
export class Ts_Scanner extends Boundary_Scanner {
	id = 'ts';

	find_next_boundary(text: string, pos: number, end: number): Found_Boundary | null {
		while (pos < end) {
			const char = text.charCodeAt(pos);

			// Check for comments
			if (char === CHAR_SLASH) {
				const next_char = pos + 1 < end ? text.charCodeAt(pos + 1) : 0;

				if (next_char === CHAR_SLASH) {
					// Single-line comment
					return this.scan_single_line_comment(text, pos, end);
				}

				if (next_char === CHAR_STAR) {
					// Multi-line comment
					return this.scan_multi_line_comment(text, pos, end);
				}

				// Could be regex - check context
				if (this.is_regex_context(text, pos)) {
					return this.scan_regex(text, pos, end);
				}
			}

			// Check for strings
			if (char === CHAR_QUOTE) {
				return this.scan_string(text, pos, end, CHAR_QUOTE, 'ts_string_double');
			}

			if (char === CHAR_SQUOTE) {
				return this.scan_string(text, pos, end, CHAR_SQUOTE, 'ts_string_single');
			}

			// Check for template literals
			if (char === CHAR_BACKTICK) {
				return this.scan_template_literal(text, pos, end);
			}

			// Check for template expression continuation
			// This handles the case where we're inside a template and hit a }
			if (char === CHAR_RBRACE) {
				// This might be the end of a template expression
				// The orchestrator will handle context switching
				return {
					boundary_type: 'ts_code',
					start: pos,
					end: pos + 1,
				};
			}

			pos++;
		}

		return null;
	}

	/**
	 * Scan a single-line comment
	 */
	private scan_single_line_comment(text: string, start: number, end: number): Found_Boundary {
		const line_end = this.find_line_end(text, start + 2, end);
		return {
			boundary_type: 'ts_comment_single',
			start: start,
			end: line_end,
			// Comment content is terminal - can fast-forward
			inner_start: start + 2, // After //
			inner_end: line_end,
		};
	}

	/**
	 * Scan a multi-line comment
	 */
	private scan_multi_line_comment(text: string, start: number, end: number): Found_Boundary {
		let pos = start + 2; // Skip /*

		while (pos < end - 1) {
			if (text.charCodeAt(pos) === CHAR_STAR && text.charCodeAt(pos + 1) === CHAR_SLASH) {
				const comment_end = pos + 2;
				return {
					boundary_type: 'ts_comment_multi',
					start: start,
					end: comment_end,
					// Comment content is terminal - can fast-forward
					inner_start: start + 2, // After /*
					inner_end: pos, // Before */
				};
			}
			pos++;
		}

		// Unterminated comment
		return {
			boundary_type: 'ts_comment_multi',
			start: start,
			end: end,
			inner_start: start + 2,
			inner_end: end,
		};
	}

	/**
	 * Scan a quoted string
	 */
	private scan_string(
		text: string,
		start: number,
		end: number,
		quote_char: number,
		boundary_type: string,
	): Found_Boundary {
		const string_end = this.scan_quoted_string(text, start, end, quote_char);
		return {
			boundary_type: boundary_type,
			start: start,
			end: string_end,
			// String content is terminal - can fast-forward
			inner_start: start + 1, // After opening quote
			inner_end: string_end - 1, // Before closing quote
		};
	}

	/**
	 * Scan a template literal
	 * This only scans up to the first ${ or the closing backtick
	 */
	private scan_template_literal(text: string, start: number, end: number): Found_Boundary {
		let pos = start + 1; // Skip opening backtick

		while (pos < end) {
			const char = text.charCodeAt(pos);

			// Check for escape sequence
			if (char === CHAR_BACKSLASH) {
				pos += 2; // Skip escaped character
				continue;
			}

			// Check for template expression
			if (char === CHAR_DOLLAR && pos + 1 < end && text.charCodeAt(pos + 1) === CHAR_LBRACE) {
				// Found ${, return template boundary up to here
				// The expression will be handled as a separate boundary
				return {
					boundary_type: 'ts_template',
					start: start,
					end: pos,
				};
			}

			// Check for closing backtick
			if (char === CHAR_BACKTICK) {
				return {
					boundary_type: 'ts_template',
					start: start,
					end: pos + 1,
				};
			}

			pos++;
		}

		// Unterminated template
		return {
			boundary_type: 'ts_template',
			start: start,
			end: end,
		};
	}

	/**
	 * Scan a template expression ${...}
	 * This scans from the ${ to the matching }
	 */
	scan_template_expression(text: string, start: number, end: number): Found_Boundary {
		let pos = start + 2; // Skip ${
		let brace_depth = 1;

		while (pos < end && brace_depth > 0) {
			const char = text.charCodeAt(pos);

			// Skip strings and comments inside expression
			if (char === CHAR_QUOTE || char === CHAR_SQUOTE) {
				pos = this.scan_quoted_string(text, pos, end, char);
				continue;
			}

			if (char === CHAR_BACKTICK) {
				// Nested template literal
				const nested = this.scan_template_literal(text, pos, end);
				pos = nested.end || end;
				continue;
			}

			if (char === CHAR_SLASH) {
				const next_char = pos + 1 < end ? text.charCodeAt(pos + 1) : 0;
				if (next_char === CHAR_SLASH) {
					// Skip single-line comment
					pos = this.find_line_end(text, pos, end);
					continue;
				}
				if (next_char === CHAR_STAR) {
					// Skip multi-line comment
					const comment = this.scan_multi_line_comment(text, pos, end);
					pos = comment.end || end;
					continue;
				}
			}

			if (char === CHAR_LBRACE) {
				brace_depth++;
			} else if (char === CHAR_RBRACE) {
				brace_depth--;
				if (brace_depth === 0) {
					// Found matching closing brace
					return {
						boundary_type: 'ts_template_expression',
						start: start,
						end: pos + 1,
					};
				}
			}

			pos++;
		}

		// Unterminated expression
		return {
			boundary_type: 'ts_template_expression',
			start: start,
			end: end,
		};
	}

	/**
	 * Scan a regex literal
	 */
	private scan_regex(text: string, start: number, end: number): Found_Boundary {
		let pos = start + 1; // Skip opening /
		let in_bracket = false;

		while (pos < end) {
			const char = text.charCodeAt(pos);

			// Handle escape sequences
			if (char === CHAR_BACKSLASH) {
				pos += 2; // Skip escaped character
				continue;
			}

			// Track character classes [...]
			if (char === CHAR_LBRACKET) {
				in_bracket = true;
			} else if (char === 93 && in_bracket) {
				// ] character
				in_bracket = false;
			}

			// Check for end of regex (not inside bracket)
			if (char === CHAR_SLASH && !in_bracket) {
				// Found closing /, now skip flags
				pos++;
				while (pos < end) {
					const flag_char = text.charCodeAt(pos);
					// Check for regex flags: dgimsuvy
					if (
						flag_char === 100 || // d
						flag_char === 103 || // g
						flag_char === 105 || // i
						flag_char === 109 || // m
						flag_char === 115 || // s
						flag_char === 117 || // u
						flag_char === 118 || // v
						flag_char === 121 // y
					) {
						pos++;
					} else {
						break;
					}
				}
				return {
					boundary_type: 'ts_regex',
					start: start,
					end: pos,
				};
			}

			// Check for newline (invalid in regex)
			if (char === CHAR_NEWLINE || char === CHAR_CR) {
				// Invalid regex, treat as division
				return {
					boundary_type: 'ts_code',
					start: start,
					end: start + 1,
				};
			}

			pos++;
		}

		// Unterminated regex
		return {
			boundary_type: 'ts_regex',
			start: start,
			end: end,
		};
	}

	/**
	 * Determine if a '/' at the given position starts a regex or is division
	 * Uses simple heuristics based on preceding context
	 */
	private is_regex_context(text: string, pos: number): boolean {
		// Look back to find the last non-whitespace character
		let look_back = pos - 1;
		while (look_back >= 0 && this.is_whitespace(text.charCodeAt(look_back))) {
			look_back--;
		}

		if (look_back < 0) {
			// At start of file, likely regex
			return true;
		}

		const prev_char = text.charCodeAt(look_back);

		// Check for operators and keywords that precede regex
		// =, (, [, {, ,, ;, :, !, &, |, return, new, throw, etc.
		if (
			prev_char === CHAR_EQUALS ||
			prev_char === CHAR_LPAREN ||
			prev_char === CHAR_LBRACKET ||
			prev_char === CHAR_LBRACE ||
			prev_char === CHAR_COMMA ||
			prev_char === CHAR_SEMICOLON ||
			prev_char === CHAR_COLON ||
			prev_char === CHAR_EXCLAIM ||
			prev_char === CHAR_AMPERSAND ||
			prev_char === CHAR_PIPE
		) {
			return true;
		}

		// Check for keywords (simplified - just check for 'return' and 'new')
		if (look_back >= 5 && this.match_at(text, look_back - 5, 'return')) {
			return true;
		}
		if (look_back >= 2 && this.match_at(text, look_back - 2, 'new')) {
			return true;
		}

		// Default to division
		return false;
	}
}
