import type {Language_Scanner, Found_Boundary} from './boundary_scanner_types.js';
import {
	CHAR_BACKSLASH,
	CHAR_NEWLINE,
	CHAR_CR,
	CHAR_a,
	CHAR_z,
	CHAR_A,
	CHAR_Z,
	CHAR_0,
	CHAR_9,
} from './boundary_scanner_types.js';

/**
 * Base scanner class with shared utilities for character-level operations.
 * All scanners extend this for common functionality.
 */
export abstract class Boundary_Scanner implements Language_Scanner {
	abstract id: string;
	abstract find_next_boundary(text: string, pos: number, end: number): Found_Boundary | null;

	/**
	 * Check if a string matches at a position
	 */
	protected match_at(text: string, pos: number, pattern: string): boolean {
		const pattern_len = pattern.length;
		if (pos + pattern_len > text.length) {
			return false;
		}

		for (let i = 0; i < pattern_len; i++) {
			if (text.charCodeAt(pos + i) !== pattern.charCodeAt(i)) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Check if a string matches at a position (case-insensitive)
	 */
	protected match_at_ignore_case(text: string, pos: number, pattern: string): boolean {
		const pattern_len = pattern.length;
		if (pos + pattern_len > text.length) {
			return false;
		}

		const pattern_lower = pattern.toLowerCase();
		for (let i = 0; i < pattern_len; i++) {
			const text_char = text.charCodeAt(pos + i);
			const pattern_char = pattern_lower.charCodeAt(i);

			// Convert text char to lowercase if needed
			let text_char_lower = text_char;
			if (text_char >= CHAR_A && text_char <= CHAR_Z) {
				text_char_lower = text_char + 32; // Convert to lowercase
			}

			if (text_char_lower !== pattern_char) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Find next occurrence of a character
	 */
	protected find_char(text: string, start: number, end: number, char_code: number): number {
		for (let i = start; i < end; i++) {
			if (text.charCodeAt(i) === char_code) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Find next occurrence of a string
	 */
	protected find_string(text: string, start: number, end: number, pattern: string): number {
		const pattern_len = pattern.length;
		const search_end = end - pattern_len + 1;

		for (let i = start; i < search_end; i++) {
			if (this.match_at(text, i, pattern)) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Find next occurrence of a string (case-insensitive)
	 */
	protected find_string_ignore_case(
		text: string,
		start: number,
		end: number,
		pattern: string,
	): number {
		const pattern_len = pattern.length;
		const search_end = end - pattern_len + 1;

		for (let i = start; i < search_end; i++) {
			if (this.match_at_ignore_case(text, i, pattern)) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Skip whitespace and return new position
	 */
	protected skip_whitespace(text: string, pos: number, end: number): number {
		while (pos < end) {
			const char = text.charCodeAt(pos);
			if (char !== 32 && char !== 9 && char !== CHAR_NEWLINE && char !== CHAR_CR) {
				break;
			}
			pos++;
		}
		return pos;
	}

	/**
	 * Check if character is alphanumeric
	 */
	protected is_alnum(char_code: number): boolean {
		return (
			(char_code >= CHAR_a && char_code <= CHAR_z) ||
			(char_code >= CHAR_A && char_code <= CHAR_Z) ||
			(char_code >= CHAR_0 && char_code <= CHAR_9)
		);
	}

	/**
	 * Check if character is a letter
	 */
	protected is_alpha(char_code: number): boolean {
		return (
			(char_code >= CHAR_a && char_code <= CHAR_z) || (char_code >= CHAR_A && char_code <= CHAR_Z)
		);
	}

	/**
	 * Check if character is a digit
	 */
	protected is_digit(char_code: number): boolean {
		return char_code >= CHAR_0 && char_code <= CHAR_9;
	}

	/**
	 * Check if character is whitespace
	 */
	protected is_whitespace(char_code: number): boolean {
		return (
			char_code === 32 || char_code === 9 || char_code === CHAR_NEWLINE || char_code === CHAR_CR
		);
	}

	/**
	 * Find the end of a line
	 */
	protected find_line_end(text: string, pos: number, end: number): number {
		for (let i = pos; i < end; i++) {
			const char = text.charCodeAt(i);
			if (char === CHAR_NEWLINE || char === CHAR_CR) {
				return i;
			}
		}
		return end;
	}

	/**
	 * Scan a quoted string with escape sequences
	 * @param quote_char - The quote character code (CHAR_QUOTE or CHAR_SQUOTE)
	 */
	protected scan_quoted_string(
		text: string,
		start: number,
		end: number,
		quote_char: number,
	): number {
		let pos = start + 1; // Skip opening quote

		while (pos < end) {
			const char = text.charCodeAt(pos);

			if (char === CHAR_BACKSLASH) {
				// Skip escaped character
				pos += 2;
				continue;
			}

			if (char === quote_char) {
				// Found closing quote
				return pos + 1;
			}

			// Check for newline in single-line string
			if (char === CHAR_NEWLINE || char === CHAR_CR) {
				// Unterminated string - return position at newline
				return pos;
			}

			pos++;
		}

		// Unterminated string
		return end;
	}
}

/**
 * Scanner pool for reusing scanner instances
 */
export class Scanner_Pool<T extends Boundary_Scanner> {
	private available: T[] = [];
	private in_use: Set<T> = new Set();
	private readonly max_size: number;
	private readonly factory: () => T;

	constructor(factory: () => T, max_size = 10) {
		this.factory = factory;
		this.max_size = max_size;
	}

	/**
	 * Get a scanner from the pool
	 */
	acquire(): T {
		let scanner = this.available.pop();
		if (!scanner) {
			scanner = this.factory();
		}
		this.in_use.add(scanner);
		return scanner;
	}

	/**
	 * Return a scanner to the pool
	 */
	release(scanner: T): void {
		if (!this.in_use.has(scanner)) {
			return;
		}

		this.in_use.delete(scanner);

		if (this.available.length < this.max_size) {
			this.available.push(scanner);
		}
	}

	/**
	 * Clear the pool
	 */
	clear(): void {
		this.available = [];
		this.in_use.clear();
	}
}
