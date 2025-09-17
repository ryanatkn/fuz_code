import type {Add_Grammar, Grammar} from '$lib/syntax_styler.js';

/**
 * Based on Prism (https://github.com/PrismJS/prism)
 * by Lea Verou (https://lea.verou.me/)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const add_grammar_clike: Add_Grammar = (syntax_styler) => {
	const grammar_clike = {
		comment: [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
				lookbehind: true,
				greedy: true,
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true,
			},
		],
		string: {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true,
		},
		class_name: {
			pattern:
				/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: {
				punctuation: /[.\\]/,
			},
		},
		keyword:
			/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		boolean: /\b(?:false|true)\b/,
		function: /\b\w+(?=\()/,
		number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		punctuation: /[{}[\];(),.:]/,
	} satisfies Grammar;

	syntax_styler.add_lang('clike', grammar_clike);
};
