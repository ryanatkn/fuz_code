/**
 * Shared types and utilities for code tokenizers
 */

import type {Token} from './boundary_scanner_types.js';

/**
 * Pattern definition for tokenization
 */
export interface Token_Pattern {
	/** Regular expression to match tokens (must have global flag) */
	regex: RegExp;

	/** Token type to assign to matches (should be language-prefixed) */
	type: string;
}

/**
 * Base class for pattern-based tokenizers
 * Provides common tokenization logic
 */
export abstract class Pattern_Based_Tokenizer {
	abstract language: string;
	abstract patterns: Array<Token_Pattern>;

	/**
	 * Tokenize a code region using the defined patterns
	 */
	tokenize(text: string, start: number, end: number): Array<Token> {
		const tokens: Array<Token> = [];
		const code = text.substring(start, end);

		// Apply each pattern to find tokens
		for (const pattern of this.patterns) {
			// Reset regex state
			pattern.regex.lastIndex = 0;

			let match;
			while ((match = pattern.regex.exec(code)) !== null) {
				tokens.push({
					language: this.language,
					type: pattern.type,
					start: start + match.index,
					end: start + match.index + match[0].length,
				});
			}
		}

		// Sort tokens by position (patterns may find them out of order)
		tokens.sort((a, b) => a.start - b.start);

		// Remove overlapping tokens (keep first)
		const non_overlapping: Array<Token> = [];
		let last_end = -1;

		for (const token of tokens) {
			if (token.start >= last_end) {
				non_overlapping.push(token);
				last_end = token.end;
			}
		}

		return non_overlapping;
	}
}
