/**
 * HTML tokenizers
 * Separate tokenizers for different HTML boundary types
 */

import type {Code_Tokenizer, Token} from './boundary_scanner_types.js';
import {Pattern_Based_Tokenizer, type Token_Pattern} from './boundary_tokenizer_types.js';

/**
 * HTML tag tokenizer - for inside html_tag boundaries
 * Tokenizes tag names, attributes, and punctuation
 */
export class Html_Tag_Tokenizer extends Pattern_Based_Tokenizer implements Code_Tokenizer {
	language = 'html';

	patterns: Array<Token_Pattern> = [
		// Attribute values (quoted strings) - highest priority
		{regex: /=\s*(?:"[^"]*"|'[^']*')/g, type: 'html_attr_value'},

		// Tag names (after < or </)
		{regex: /(?<=<\/?)[^\s>/]+/g, type: 'html_tag'},

		// Attribute names (word before equals sign)
		{regex: /\b[^\s>/=]+(?=\s*=)/g, type: 'html_attr_name'},

		// Boolean attributes (words not followed by =)
		{regex: /\b[^\s>/=]+\b(?!\s*=)/g, type: 'html_attr_name'},

		// Punctuation (tag delimiters)
		{regex: /[</>]/g, type: 'html_punctuation'},

		// Operators (equals sign for attributes)
		{regex: /=/g, type: 'html_operator'},
	];
}

/**
 * HTML code tokenizer - for html_code regions
 * Tokenizes entities and text content
 */
export class Html_Code_Tokenizer extends Pattern_Based_Tokenizer implements Code_Tokenizer {
	language = 'html';

	patterns: Array<Token_Pattern> = [
		// HTML entities
		{regex: /&[a-z0-9]+;|&#x?[0-9a-f]+;/gi, type: 'html_entity'},

		// Standalone < as punctuation (not part of a tag)
		{regex: /<(?![a-zA-Z/!])/g, type: 'html_punctuation'},
	];
}

/**
 * HTML special tokenizers for specific boundary types
 */
export class Html_Doctype_Tokenizer implements Code_Tokenizer {
	language = 'html';

	tokenize(_text: string, start: number, end: number): Array<Token> {
		// DOCTYPE is a single token
		return [
			{
				language: 'html',
				type: 'html_doctype',
				start: start,
				end: end,
			},
		];
	}
}

export class Html_Cdata_Tokenizer implements Code_Tokenizer {
	language = 'html';

	tokenize(_text: string, start: number, end: number): Array<Token> {
		// CDATA is a single token
		return [
			{
				language: 'html',
				type: 'html_cdata',
				start: start,
				end: end,
			},
		];
	}
}

export class Html_Comment_Tokenizer implements Code_Tokenizer {
	language = 'html';

	tokenize(_text: string, start: number, end: number): Array<Token> {
		// Comment is a single token
		return [
			{
				language: 'html',
				type: 'html_comment',
				start: start,
				end: end,
			},
		];
	}
}
