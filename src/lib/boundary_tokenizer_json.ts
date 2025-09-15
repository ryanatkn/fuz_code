/**
 * JSON code tokenizer
 * Tokenizes JSON code regions to identify keywords, literals, and operators
 */

import type {Code_Tokenizer} from './boundary_scanner_types.js';
import {Pattern_Based_Tokenizer, type Token_Pattern} from './boundary_tokenizer_types.js';

/**
 * JSON code tokenizer implementation
 */
export class Json_Code_Tokenizer extends Pattern_Based_Tokenizer implements Code_Tokenizer {
	language = 'json';

	patterns: Array<Token_Pattern> = [
		// Booleans (must come before other word patterns)
		{regex: /\btrue\b/g, type: 'json_boolean'},
		{regex: /\bfalse\b/g, type: 'json_boolean'},

		// Null
		{regex: /\bnull\b/g, type: 'json_null'},

		// Numbers (including decimals, exponentials, and negative)
		{regex: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'json_number'},

		// Punctuation (brackets, braces, commas)
		{regex: /[{}\[\],]/g, type: 'json_punctuation'},

		// Operators (colon)
		{regex: /:/g, type: 'json_operator'},
	];
}
