import type {Add_Syntax_Grammar, Syntax_Grammar} from '$lib/syntax_styler.js';

/**
 * Markdown grammar extending markup
 * Supports: headings, fenced code blocks, lists, blockquotes,
 * bold, italic, strikethrough, inline code, and links
 */
export const add_grammar_markdown: Add_Syntax_Grammar = (syntax_styler) => {
	syntax_styler.add_extended_lang(
		'markup',
		'md',
		{
		// Block elements (processed first)

		// Fenced code blocks with language-specific highlighting
		fenced_code_ts: {
			pattern: /^```(?:ts|typescript)[^\n\r]*(?:\r?\n|\r)[\s\S]*?^```$/m,
			greedy: true,
			inside: {
				code_fence: {
					pattern: /^```[^\n\r]*|^```$/m,
					alias: 'punctuation',
				},
				lang_ts: {
					pattern: /[\s\S]+/,
					inside: syntax_styler.get_lang('ts'),
				},
			},
		},
		fenced_code_js: {
			pattern: /^```(?:js|javascript)[^\n\r]*(?:\r?\n|\r)[\s\S]*?^```$/m,
			greedy: true,
			inside: {
				code_fence: {
					pattern: /^```[^\n\r]*|^```$/m,
					alias: 'punctuation',
				},
				lang_js: {
					pattern: /[\s\S]+/,
					inside: syntax_styler.get_lang('js'),
				},
			},
		},
		fenced_code_css: {
			pattern: /^```css[^\n\r]*(?:\r?\n|\r)[\s\S]*?^```$/m,
			greedy: true,
			inside: {
				code_fence: {
					pattern: /^```[^\n\r]*|^```$/m,
					alias: 'punctuation',
				},
				lang_css: {
					pattern: /[\s\S]+/,
					inside: syntax_styler.get_lang('css'),
				},
			},
		},
		fenced_code_html: {
			pattern: /^```(?:html|markup)[^\n\r]*(?:\r?\n|\r)[\s\S]*?^```$/m,
			greedy: true,
			inside: {
				code_fence: {
					pattern: /^```[^\n\r]*|^```$/m,
					alias: 'punctuation',
				},
				lang_markup: {
					pattern: /[\s\S]+/,
					inside: syntax_styler.get_lang('markup'),
				},
			},
		},
		fenced_code_json: {
			pattern: /^```json[^\n\r]*(?:\r?\n|\r)[\s\S]*?^```$/m,
			greedy: true,
			inside: {
				code_fence: {
					pattern: /^```[^\n\r]*|^```$/m,
					alias: 'punctuation',
				},
				lang_json: {
					pattern: /[\s\S]+/,
					inside: syntax_styler.get_lang('json'),
				},
			},
		},
		fenced_code_svelte: {
			pattern: /^```svelte[^\n\r]*(?:\r?\n|\r)[\s\S]*?^```$/m,
			greedy: true,
			inside: {
				code_fence: {
					pattern: /^```[^\n\r]*|^```$/m,
					alias: 'punctuation',
				},
				lang_svelte: {
					pattern: /[\s\S]+/,
					inside: syntax_styler.get_lang('svelte'),
				},
			},
		},

		// Catch-all for unknown languages (plain text)
		fenced_code: {
			pattern: /^```[^\n\r]*(?:\r?\n|\r)[\s\S]*?^```$/m,
			greedy: true,
			inside: {
				code_fence: {
					pattern: /^```[^\n\r]*|^```$/m,
					alias: 'punctuation',
				},
			},
		},

		// Headings (# through ######)
		heading: {
			pattern: /^#{1,6}\s+.+$/m,
			inside: {
				punctuation: /^#{1,6}/,
			},
		},

		// Blockquotes (> at line start)
		blockquote: {
			pattern: /^>\s*.+$/m,
			inside: {
				punctuation: /^>/,
			},
		},

		// Lists (* or - with any preceding whitespace)
		list: {
			pattern: /^\s*[-*]\s+.+$/m,
			inside: {
				punctuation: /^\s*[-*]/,
			},
		},

		// Inline elements

		// Links [text](url)
		link: {
			pattern: /\[[^\[\]\n\r]+\]\([^\)\n\r]+\)/,
			inside: {
				link_text: {
					pattern: /^\[[^\]]+\]/,
					inside: {
						punctuation: /^\[|\]$/,
					},
				},
				url: {
					pattern: /\([^\)]+\)$/,
					inside: {
						punctuation: /^\(|\)$/,
					},
				},
			},
		},

		// Inline code `text`
		inline_code: {
			pattern: /`[^`\n\r]+`/,
			alias: 'code',
			inside: {
				punctuation: /^`|`$/,
			},
		},

		// Bold **text** or __text__
		bold: [
			{
				// **text** - no asterisks inside
				pattern: /\*\*[^\s*][^*]*[^\s*]\*\*|\*\*[^\s*]\*\*/,
				inside: {
					punctuation: /^\*\*|\*\*$/,
				},
			},
			{
				// __text__ - at word boundaries, no underscores inside
				pattern: /\b__[^\s_][^_]*[^\s_]__\b|\b__[^\s_]__\b/,
				inside: {
					punctuation: /^__|__$/,
				},
			},
		],

		// Italic *text* or _text_
		italic: [
			{
				// *text* - no asterisks inside
				pattern: /\*[^\s*][^*]*[^\s*]\*|\*[^\s*]\*/,
				inside: {
					punctuation: /^\*|\*$/,
				},
			},
			{
				// _text_ - at word boundaries, no underscores inside
				pattern: /\b_[^\s_][^_]*[^\s_]_\b|\b_[^\s_]_\b/,
				inside: {
					punctuation: /^_|_$/,
				},
			},
		],

		// Strikethrough ~~text~~
		strikethrough: {
			pattern: /~~[^\s~][^~]*[^\s~]~~|~~[^\s~]~~/,
			inside: {
				punctuation: /^~~|~~$/,
			},
		},
	} satisfies Syntax_Grammar);
};
