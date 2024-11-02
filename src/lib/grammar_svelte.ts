import type {Create_Grammar, Grammar_Token, Syntax_Styler} from '$lib/syntax_styler.js';

const blocks = '(if|else if|await|then|catch|each|html|debug)';

/**
 * Based on `prism-svelte` (https://github.com/pngwn/prism-svelte)
 * by pngwn (https://github.com/pngwn)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const create_grammar_svelte: Create_Grammar = (syntax_styler) => {
	const grammar_ts = syntax_styler.languages.ts;
	if (!grammar_ts) {
		throw Error('grammar_ts must be created before grammar_svelte');
	}

	const grammar_svelte = syntax_styler.extend_grammar('markup', {
		each: {
			pattern: /{[#/]each(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*}/,
			inside: {
				language_ts: [
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
				language_ts: {
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
				language_ts: {
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
						language_ts: {
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
		language_ts: {
			pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
			lookbehind: true,
			inside: grammar_ts,
		},
	});

	syntax_styler.languages.svelte = grammar_svelte;

	// oof lol
	((grammar_svelte.tag as Grammar_Token).inside!.attr_value as Grammar_Token).inside!.entity =
		grammar_svelte.entity;

	grammar_svelte_add_inlined(syntax_styler, 'style', 'css');
	grammar_svelte_add_inlined(syntax_styler, 'script', 'ts');
};

export const grammar_svelte_add_inlined = (
	syntax_styler: Syntax_Styler,
	tag_name: string,
	lang: string,
): void => {
	const language_key = 'language_' + lang;

	// TODO BLOCK share code with `grammar_markup_add_inlined`?
	syntax_styler.grammar_insert_before('svelte', 'cdata', {
		[tag_name]: {
			pattern: RegExp(
				/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(
					/__/g,
					tag_name,
				),
				'i',
			),
			lookbehind: true,
			greedy: true,
			inside: {
				included_cdata: {
					pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
					inside: {
						cdata: /^<!\[CDATA\[|\]\]>$/i,
						[language_key]: {
							pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
							lookbehind: true,
							inside: syntax_styler.languages[lang],
						},
					},
				},
				[language_key]: {
					pattern: /[\s\S]+/,
					inside: syntax_styler.languages[lang],
				},
			},
		},
	});
};
