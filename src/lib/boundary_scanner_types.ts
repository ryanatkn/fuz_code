/**
 * Core type definitions for the boundary scanner system.
 * This is a high-performance, two-phase scanner for syntax highlighting.
 *
 * Key principles:
 * - Two-phase scanning: Boundary detection followed by tokenization
 * - Language isolation: Each scanner only knows its own syntax
 * - Parent-controlled exit: Parent defines exit conditions for embedded content
 * - Explicit types: All token types are language-prefixed (e.g., 'json_boolean')
 * - Position-based: Track only indices, no string slicing
 * - Performance first: Speed matters more than perfect accuracy
 *
 * Public API returns tokens, boundaries are internal implementation detail.
 */

/**
 * Token - The public API output
 * A flat stream of syntax tokens with language-prefixed types
 */
export interface Token {
	/** Language this token belongs to (e.g., 'json', 'ts', 'css') */
	language: string;

	/** Token type, always language-prefixed (e.g., 'json_boolean', 'ts_keyword') */
	type: string;

	/** Start position in the original text */
	start: number;

	/** End position in the original text */
	end: number;
}

/**
 * Code tokenizer interface
 * Each language implements this to tokenize code regions
 */
export interface Code_Tokenizer {
	/** Language identifier (e.g., 'json', 'ts', 'css') */
	language: string;

	/**
	 * Tokenize a code region using regex patterns
	 * @param text - The full text being tokenized
	 * @param start - Start position of the code region
	 * @param end - End position of the code region
	 * @returns Array of tokens found in the code region
	 */
	tokenize(text: string, start: number, end: number): Array<Token>;
}

/**
 * Definition of a boundary type (e.g., 'ts_string', 'html_script')
 * Each boundary type belongs to a specific language.
 */
export interface Boundary_Type_Def {
	/** Unique name for this boundary type (e.g., 'ts_string_double', 'html_script') */
	name: string;

	/** Which language owns this boundary type */
	language: string;
}

/**
 * A found boundary during scanning
 */
export interface Found_Boundary {
	/** The type of boundary found (e.g., 'ts_comment_single') */
	boundary_type: string;

	/** Start position in text */
	start: number;

	/** End position (for complete boundaries like comments/strings) */
	end?: number;

	/** For known content boundaries (strings, comments) - can fast-forward */
	inner_start?: number;
	inner_end?: number;

	/** Language to switch to after this boundary (for script/style tags) */
	switch_to_language?: string;
}

/**
 * Language scanner interface
 * Each language implements this to find its boundaries.
 */
export interface Language_Scanner {
	/** Language identifier (e.g., 'ts', 'html', 'css') */
	id: string;

	/**
	 * Find the next boundary starting from pos.
	 * Returns null if no boundary found before end.
	 *
	 * @param text - The full text being scanned
	 * @param pos - Current position to start scanning from
	 * @param end - End position to stop scanning
	 * @returns Found boundary or null
	 */
	find_next_boundary(text: string, pos: number, end: number): Found_Boundary | null;

	/**
	 * Optional: Disambiguate syntax at a position
	 * Used for cases like '/' (division vs regex)
	 *
	 * @param text - The full text
	 * @param pos - Position to disambiguate
	 */
	disambiguate?(text: string, pos: number): void;
}

/**
 * Boundary - Internal implementation detail
 * Used during scanning phase, not exposed in public API
 * @internal
 */
export interface Boundary {
	/** Language this boundary belongs to */
	language: string;

	/** Boundary type name (null = top-level content needing tokenization) */
	type: string | null;

	/** Start position */
	start: number;

	/** End position */
	end: number;
}

/**
 * Scan context for the orchestrator
 * Maintains state without recursion.
 */
export interface Scan_Context {
	/** Current language being scanned */
	language: string;

	/** Start position of this context */
	start: number;

	/** End position of this context */
	end: number;

	/** Current boundary type being processed */
	current_boundary_type?: string;
}

/**
 * ASCII character codes for performance
 */
export const CHAR_LT = 60; // <
export const CHAR_GT = 62; // >
export const CHAR_SLASH = 47; // /
export const CHAR_STAR = 42; // *
export const CHAR_QUOTE = 34; // "
export const CHAR_SQUOTE = 39; // '
export const CHAR_BACKTICK = 96; // `
export const CHAR_BACKSLASH = 92; // \
export const CHAR_DOLLAR = 36; // $
export const CHAR_LBRACE = 123; // {
export const CHAR_RBRACE = 125; // }
export const CHAR_LPAREN = 40; // (
export const CHAR_RPAREN = 41; // )
export const CHAR_LBRACKET = 91; // [
export const CHAR_RBRACKET = 93; // ]
export const CHAR_NEWLINE = 10; // \n
export const CHAR_CR = 13; // \r
export const CHAR_TAB = 9; // \t
export const CHAR_SPACE = 32; // space
export const CHAR_EXCLAIM = 33; // !
export const CHAR_MINUS = 45; // -
export const CHAR_EQUALS = 61; // =
export const CHAR_COLON = 58; // :
export const CHAR_SEMICOLON = 59; // ;
export const CHAR_COMMA = 44; // ,
export const CHAR_DOT = 46; // .
export const CHAR_HASH = 35; // #
export const CHAR_AT = 64; // @
export const CHAR_PERCENT = 37; // %
export const CHAR_AMPERSAND = 38; // &
export const CHAR_PIPE = 124; // |
export const CHAR_PLUS = 43; // +
export const CHAR_QUESTION = 63; // ?
export const CHAR_TILDE = 126; // ~
export const CHAR_CARET = 94; // ^

// Lowercase letters
export const CHAR_a = 97;
export const CHAR_z = 122;

// Uppercase letters
export const CHAR_A = 65;
export const CHAR_Z = 90;

// Digits
export const CHAR_0 = 48;
export const CHAR_9 = 57;
