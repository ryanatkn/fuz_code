export class Syntax_Token {
	/**
	 * The type of the token.
	 *
	 * This is usually the key of a pattern in a `Grammar`.
	 */
	type: string;

	/**
	 * The strings or tokens contained by this token.
	 *
	 * This will be a token stream if the pattern matched also defined an `inside` grammar.
	 */
	content: string | Syntax_Token_Stream;

	/**
	 * The alias(es) of the token.
	 */
	alias: string | Array<string>;

	length: number;

	constructor(
		type: string,
		content: string | Syntax_Token_Stream,
		alias: string | Array<string>,
		matched_str: string = '',
	) {
		this.type = type;
		this.content = content;
		this.alias = alias;
		this.length = matched_str.length;
	}
}

/**
 * A token stream is an array of strings and `Syntax_Token` objects.
 *
 * Syntax token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
 * them.
 *
 * 1. No adjacent strings.
 * 2. No empty strings.
 *
 *    The only exception here is the token stream that only contains the empty string and nothing else.
 */
export type Syntax_Token_Stream = Array<string | Syntax_Token>;
