/**
 * TypeScript code tokenizer
 * Tokenizes TypeScript/JavaScript code regions to identify keywords, types, literals, and operators
 */

import type {Code_Tokenizer} from './boundary_scanner_types.js';
import {Pattern_Based_Tokenizer, type Token_Pattern} from './boundary_tokenizer_types.js';

/**
 * TypeScript code tokenizer implementation
 */
export class Ts_Code_Tokenizer extends Pattern_Based_Tokenizer implements Code_Tokenizer {
	language = 'ts';

	patterns: Array<Token_Pattern> = [
		// TypeScript type annotations and keywords (highest priority)
		{
			regex: /\b(?:string|number|boolean|object|symbol|any|unknown|never|void|bigint)\b/g,
			type: 'ts_type',
		},

		// Keywords (including TypeScript-specific)
		{
			regex:
				/\b(?:abstract|as|async|await|break|case|catch|class|const|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|infer|instanceof|interface|is|keyof|let|module|namespace|new|of|package|private|protected|public|readonly|return|satisfies|set|static|super|switch|this|throw|try|type|typeof|var|while|with|yield)\b/g,
			type: 'ts_keyword',
		},

		// Booleans (must come before other word patterns)
		{regex: /\b(?:true|false)\b/g, type: 'ts_boolean'},

		// Null and undefined
		{regex: /\b(?:null|undefined)\b/g, type: 'ts_null'},

		// Numbers (including hex, binary, octal, exponential, and bigint)
		{
			regex:
				/\b(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?|\d+(?:_\d+)*n?(?:\.\d+(?:_\d+)*)?(?:[Ee][+-]?\d+(?:_\d+)*)?)\b/g,
			type: 'ts_number',
		},

		// Function names (identifiers followed by parentheses)
		{regex: /\b[a-zA-Z_$][\w$]*(?=\s*\()/g, type: 'ts_function'},

		// Class names (uppercase identifiers)
		{regex: /\b[A-Z][\w$]*\b/g, type: 'ts_class_name'},

		// Operators
		{
			regex:
				/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/g,
			type: 'ts_operator',
		},

		// Punctuation
		{regex: /[{}[\];(),.<>]/g, type: 'ts_punctuation'},
	];
}
