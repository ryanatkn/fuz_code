/**
 * CSS code tokenizer
 * Tokenizes CSS code regions to identify selectors, properties, functions, and other syntax elements
 */

import type {Code_Tokenizer} from './boundary_scanner_types.js';
import {Pattern_Based_Tokenizer, type Token_Pattern} from './boundary_tokenizer_types.js';

/**
 * CSS code tokenizer implementation
 */
export class Css_Code_Tokenizer extends Pattern_Based_Tokenizer implements Code_Tokenizer {
	language = 'css';

	patterns: Array<Token_Pattern> = [
		// At-rules (@media, @import, @keyframes, etc.) - highest priority
		{
			regex: /@[\w-]+(?:[^;{]|\/\*[\s\S]*?\*\/)*?(?:;|(?=\s*\{))/g,
			type: 'css_atrule',
		},

		// Important declarations (!important)
		{
			regex: /!important\b/gi,
			type: 'css_important',
		},

		// Selectors - match identifiers and combinators before opening brace
		{
			regex: /[^{}\s][^{}]*?(?=\s*\{)/g,
			type: 'css_selector',
		},

		// Properties (CSS property names) - match identifiers before colon
		// Use \S to ensure we start with a non-whitespace character
		{
			regex: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/gi,
			type: 'css_property',
		},

		// Functions (like url(), rgb(), calc()) - match function names before parentheses
		{
			regex: /[-a-z0-9]+(?=\()/gi,
			type: 'css_function',
		},

		// Hex color values
		{
			regex: /#(?:[0-9a-fA-F]{3}){1,2}\b/g,
			type: 'css_color',
		},

		// Numbers with units (px, em, %, etc.)
		{
			regex:
				/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vw|vmin|vmax|%)?/g,
			type: 'css_number',
		},

		// CSS keywords (inherit, initial, auto, none, etc.)
		{
			regex:
				/\b(?:inherit|initial|unset|auto|none|normal|bold|italic|underline|solid|dotted|dashed|absolute|relative|fixed|static|sticky|block|inline|inline-block|flex|grid|hidden|visible|left|right|top|bottom|center)\b/g,
			type: 'css_keyword',
		},

		// CSS punctuation - lowest priority to avoid conflicts
		{
			regex: /[{}();:,]/g,
			type: 'css_punctuation',
		},
	];
}
