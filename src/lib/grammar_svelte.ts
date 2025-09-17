import type {Add_Grammar, Grammar_Token, Syntax_Styler} from '$lib/syntax_styler.js';
import {domstyler_grammar_markup_add_inlined} from '$lib/grammar_markup.js';

const blocks = '(if|else if|await|then|catch|each|html|debug)';

/**
 * Based on `prism-svelte` (https://github.com/pngwn/prism-svelte)
 * by pngwn (https://github.com/pngwn)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const add_grammar_svelte: Add_Grammar = (domstyler) => {
	const domstyler_grammar_ts = domstyler.get_lang('ts');

	const domstyler_grammar_svelte = domstyler.add_extended_lang('markup', 'svelte', {
		each: {
			pattern: /{[#/]each(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*}/,
			inside: {
				lang_ts: [
					{
						pattern: /(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,
						lookbehind: true,
						inside: domstyler_grammar_ts,
					},
					{
						pattern: /(as[\s]*)[\s\S]*(?=\s*)/,
						lookbehind: true,
						inside: domstyler_grammar_ts,
					},
					{
						pattern: /(#each[\s]*)[\s\S]*(?=as)/,
						lookbehind: true,
						inside: domstyler_grammar_ts,
					},
				],
				keyword: /[#/]each|as/,
				punctuation: /{|}/,
			},
		},
		block: {
			pattern: new RegExp(
				'{[#:/@]/s' + blocks + '(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}',
			),
			inside: {
				punctuation: /^{|}$/,
				keyword: [new RegExp('[#:/@]' + blocks + '( )*'), /as/, /then/],
				lang_ts: {
					pattern: /[\s\S]*/,
					inside: domstyler_grammar_ts,
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
					inside: domstyler_grammar_ts,
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
							inside: domstyler_grammar_ts,
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
			inside: domstyler_grammar_ts,
		},
	});

	// oof lol
	(
		(domstyler_grammar_svelte.tag as Grammar_Token).inside!.attr_value as Grammar_Token
	).inside!.entity = domstyler_grammar_svelte.entity;

	domstyler_grammar_svelte_add_inlined(domstyler, 'style', 'css');
	domstyler_grammar_svelte_add_inlined(domstyler, 'script', 'ts');
};

export const domstyler_grammar_svelte_add_inlined = (
	domstyler: Syntax_Styler,
	tag_name: string,
	lang: string,
): void => {
	domstyler_grammar_markup_add_inlined(domstyler, tag_name, lang, 'svelte');
};
