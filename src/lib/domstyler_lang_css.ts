import type {Add_Domstyler_Grammar, Grammar} from '$lib/domstyler.js';
import {
	domstyler_grammar_markup_add_attribute,
	domstyler_grammar_markup_add_inlined,
} from '$lib/domstyler_lang_html.js';

var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

/**
 * Based on Prism (https://github.com/PrismJS/prism)
 * by Lea Verou (https://lea.verou.me/)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const add_domstyler_grammar_css: Add_Domstyler_Grammar = (domstyler) => {
	const domstyler_grammar_css = {
		comment: /\/\*[\s\S]*?\*\//,
		atrule: {
			pattern: RegExp(
				'@[\\w-](?:' +
					/[^;{\s"']|\s+(?!\s)/.source +
					'|' +
					string.source +
					')*?' +
					/(?:;|(?=\s*\{))/.source,
			),
			inside: {
				rule: /^@[\w-]+/,
				selector_function_argument: {
					pattern:
						/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector',
				},
				keyword: {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true,
				},
			} as Grammar, // see `rest` below
		},
		url: {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp(
				'\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)',
				'i',
			),
			greedy: true,
			inside: {
				function: /^url/i,
				punctuation: /^\(|\)$/,
				string: {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url',
				},
			},
		},
		selector: {
			pattern: RegExp(
				'(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)',
			),
			lookbehind: true,
		},
		string: {
			pattern: string,
			greedy: true,
		},
		property: {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true,
		},
		important: /!important\b/i,
		function: {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true,
		},
		punctuation: /[(){};:,]/,
	} satisfies Grammar;

	domstyler_grammar_css.atrule.inside.rest = domstyler_grammar_css;

	domstyler.add_lang('css', domstyler_grammar_css);

	domstyler_grammar_markup_add_inlined(domstyler, 'style', 'css');
	domstyler_grammar_markup_add_attribute(domstyler, 'style', 'css');
};
