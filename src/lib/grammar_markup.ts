import type {Syntax_Styler, Add_Grammar, Grammar, Grammar_Token} from '$lib/syntax_styler.js';

/**
 * Based on Prism (https://github.com/PrismJS/prism)
 * by Lea Verou (https://lea.verou.me/)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const add_grammar_markup: Add_Grammar = (domstyler) => {
	const domstyler_grammar_markup = {
		comment: {
			pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
			greedy: true,
		},
		prolog: {
			pattern: /<\?[\s\S]+?\?>/,
			greedy: true,
		},
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		doctype: {
			pattern: /<!DOCTYPE.*>/i, // vastly simplified compared to the original implementation, but may be lacking in some cases
		},
		cdata: {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			greedy: true,
		},
		tag: {
			pattern:
				/<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
			greedy: true,
			inside: {
				tag: {
					pattern: /^<\/?[^\s>/]+/,
					inside: {
						punctuation: /^<\/?/,
						namespace: /^[^\s>/:]+:/,
					},
				},
				special_attr: [],
				attr_value: {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
					inside: {
						punctuation: [
							{
								pattern: /^=/,
								alias: 'attr_equals',
							},
							{
								pattern: /^(\s*)["']|["']$/,
								lookbehind: true,
							},
						],
						entity: undefined as any, // see below
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
		entity: [
			{
				pattern: /&[\da-z]{1,8};/i,
				alias: 'named_entity',
			},
			/&#x?[\da-f]{1,8};/i,
		],
	} satisfies Grammar;

	domstyler_grammar_markup.tag.inside.attr_value.inside.entity = domstyler_grammar_markup.entity;

	domstyler.add_lang('markup', domstyler_grammar_markup, ['html', 'mathml', 'svg']);
	domstyler.add_extended_lang('markup', 'xml', {}, ['ssml', 'atom', 'rss']);
};

/**
 * Adds an inlined language to markup.
 *
 * An example of an inlined language is CSS with `<style>` tags.
 *
 * @param tag_name - The name of the tag that contains the inlined language. This name will be treated as
 * case insensitive.
 * @param lang - The language key.
 * @example
 * domstyler_grammar_markup_add_inlined(domstyler, 'style', 'css');
 */
export const domstyler_grammar_markup_add_inlined = (
	domstyler: Syntax_Styler,
	tag_name: string,
	lang: string,
	inside_lang = 'markup',
): void => {
	const lang_key = 'lang_' + lang;

	domstyler.domstyler_grammar_insert_before(inside_lang, 'cdata', {
		[tag_name]: {
			pattern: RegExp(
				/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
					/__/g,
					() => {
						return tag_name;
					},
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
						[lang_key]: {
							pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
							lookbehind: true,
							inside: domstyler.get_lang(lang),
						},
					},
				},
				[lang_key]: {
					pattern: /[\s\S]+/,
					inside: domstyler.get_lang(lang),
				},
			},
		},
	});
};

/**
 * Adds an pattern to style languages embedded in HTML attributes.
 *
 * An example of an inlined language is CSS with `style` attributes.
 *
 * @param attr_name - The name of the tag that contains the inlined language. This name will be treated as
 * case insensitive.
 * @param lang - The language key.
 * @example
 * domstyler_grammar_markup_add_attribute(domstyler, 'style', 'css');
 */
export const domstyler_grammar_markup_add_attribute = (
	domstyler: Syntax_Styler,
	attr_name: string,
	lang: string,
): void => {
	(
		(domstyler.get_lang('markup').tag as Grammar_Token).inside!.special_attr as Array<Grammar_Token>
	).push({
		pattern: RegExp(
			/(^|["'\s])/.source +
				'(?:' +
				attr_name +
				')' +
				/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
			'i',
		),
		lookbehind: true,
		inside: {
			attr_name: /^[^\s=]+/,
			attr_value: {
				pattern: /=[\s\S]+/,
				inside: {
					value: {
						pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
						lookbehind: true,
						alias: [lang, 'lang_' + lang], // TODO remove this alias?
						inside: domstyler.get_lang(lang),
					},
					punctuation: [
						{
							pattern: /^=/,
							alias: 'attr_equals',
						},
						/"|'/,
					],
				},
			},
		},
	});
};
