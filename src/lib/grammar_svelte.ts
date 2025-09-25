import type {Add_Syntax_Grammar, Syntax_Grammar_Token, Syntax_Styler} from '$lib/syntax_styler.js';
import {grammar_markup_add_inlined} from '$lib/grammar_markup.js';

const blocks = '(if|else if|await|then|catch|each|html|debug|snippet)';

/**
 * Based on `prism-svelte` (https://github.com/pngwn/prism-svelte)
 * by pngwn (https://github.com/pngwn)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const add_grammar_svelte: Add_Syntax_Grammar = (syntax_styler) => {
	const grammar_ts = syntax_styler.get_lang('ts');


	const grammar_svelte = syntax_styler.add_extended_lang('markup', 'svelte', {
		at_directive: {
			pattern: /{@(?:render|html|const|debug|attach)\b(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*}/,
			inside: {
				lang_ts: {
					pattern: /(@(?:render|html|const|debug|attach)\s+)[\s\S]*(?=\s*\})/,
					lookbehind: true,
					inside: grammar_ts,
				},
				keyword: /@(?:render|html|const|debug|attach)/,
				punctuation: /{|}/,
			},
		},
		each: {
			pattern: /{[#/]each(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*}/,
			inside: {
				lang_ts: [
					{
						pattern: /(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,
						lookbehind: true,
						inside: grammar_ts,
					},
					{
						pattern: /(as[\s]*)[\s\S]*(?=\s*)/,
						lookbehind: true,
						inside: grammar_ts,
					},
					{
						pattern: /(#each[\s]*)[\s\S]*(?=as)/,
						lookbehind: true,
						inside: grammar_ts,
					},
				],
				special_keyword: /[#/]each/,
				keyword: /as/,
				punctuation: /{|}/,
			},
		},
		block: {
			pattern: new RegExp(
				'{[#:/@]\\s*' + blocks + '(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}',
			),
			inside: {
				punctuation: /^{|}$/,
				special_keyword: new RegExp('[#:/@]' + blocks),
				keyword: [/as/, /then/],
				lang_ts: {
					pattern: /[\s\S]*/,
					inside: grammar_ts,
				},
			},
		},
		tag: {
			pattern:
				/<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,
			greedy: true,
			inside: {
				tag: {
					pattern: /^<\/?[^\s>/]+/i,
					inside: {
						punctuation: /^<\/?/,
						namespace: /^[^\s>/:]+:/,
					},
				},
				lang_ts: {
					pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
					inside: grammar_ts,
				},
				attr_value: {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
					inside: {
						punctuation: [
							/^=/,
							{
								pattern: /^(\s*)["']|["']$/,
								lookbehind: true,
							},
						],
						lang_ts: {
							pattern: /{[\s\S]+}/,
							inside: grammar_ts,
						},
					},
				},
				punctuation: /\/?>/,
				attr_name: {
					pattern: /[^\s>/]+/,
					inside: {
						namespace: /^[^\s>/:]+:/,
					},
				},
			},
		},
		lang_ts: {
			pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
			lookbehind: true,
			inside: grammar_ts,
		},
	});

	// oof lol
	(
		(grammar_svelte.tag as Syntax_Grammar_Token).inside!.attr_value as Syntax_Grammar_Token
	).inside!.entity = grammar_svelte.entity;

	grammar_svelte_add_inlined(syntax_styler, 'style', 'css');
	grammar_svelte_add_inlined(syntax_styler, 'script', 'ts');
};

export const grammar_svelte_add_inlined = (
	syntax_styler: Syntax_Styler,
	tag_name: string,
	lang: string,
): void => {
	grammar_markup_add_inlined(syntax_styler, tag_name, lang, 'svelte');
};
