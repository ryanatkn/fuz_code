import type {Token} from './boundary_scanner_types.js';
import {escape_html} from './helpers.js';

/**
 * Generate HTML from tokens (the new public API)
 * Maps language-prefixed token types to CSS classes
 */
export function generate_html_from_tokens(text: string, tokens: Array<Token>): string {
	if (tokens.length === 0) {
		return escape_html(text);
	}

	let html = '';
	let pos = 0;

	for (const token of tokens) {
		// Add any text before this token
		if (token.start > pos) {
			html += escape_html(text.substring(pos, token.start));
		}

		// Get the text for this token
		const token_text = text.substring(token.start, token.end);

		// Map token type to CSS class (remove language prefix)
		const css_class = get_css_class_from_token_type(token.type);

		if (css_class) {
			html += `<span class="token ${css_class}">${escape_html(token_text)}</span>`;
		} else {
			html += escape_html(token_text);
		}

		pos = token.end;
	}

	// Add any remaining text
	if (pos < text.length) {
		html += escape_html(text.substring(pos));
	}

	return html;
}

/**
 * Map language-prefixed token types to CSS classes
 * Removes language prefix and maps to standard token classes
 */
function get_css_class_from_token_type(type: string): string | null {
	// Remove language prefix (e.g., 'json_boolean' -> 'boolean')
	const without_prefix = type.replace(/^[a-z]+_/, '');

	// Map to CSS classes used by the theme
	switch (without_prefix) {
		// Literals
		case 'boolean':
		case 'null':
		case 'number':
			return without_prefix;
		case 'string':
		case 'string_single': // CSS/HTML strings
		case 'string_double': // CSS/HTML strings
			return 'string'; // Map all string types to 'string' class
		case 'regex':
			return 'regex';

		// Comments
		case 'comment':
		case 'comment_single':
		case 'comment_multi':
			return 'comment';

		// Templates
		case 'template':
			return 'string';

		// JSON-specific
		case 'property':
			return 'property';
		case 'punctuation':
			return 'punctuation';
		case 'operator':
			return 'operator';

		// TypeScript/JavaScript
		case 'keyword':
			return 'keyword';
		case 'function':
			return 'function';
		case 'class_name':
			return 'class_name';

		// HTML
		case 'tag':
		case 'script':
		case 'style':
		case 'script_close':
		case 'style_close':
			return 'tag';
		case 'attr_name':
			return 'attr_name';
		case 'attr_value':
			return 'attr_value';
		case 'entity':
			return 'entity';
		case 'doctype':
			return 'doctype';
		case 'cdata':
			return 'cdata';

		// CSS
		case 'selector':
			return 'selector';
		case 'atrule':
			return 'atrule';
		case 'important':
			return 'important';
		case 'color':
			return 'color';

		// Code blocks (shouldn't normally appear after tokenization)
		case 'code':
			return null;

		default:
			return null;
	}
}
