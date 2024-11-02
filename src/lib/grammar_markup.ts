import type {Create_Grammar, Syntax_Styler, Grammar, Grammar_Token} from '$lib/syntax_styler.js';

/**
 * Based on Prism (https://github.com/PrismJS/prism)
 * by Lea Verou (https://lea.verou.me/)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const create_grammar_markup: Create_Grammar = (syntax_styler) => {
	const grammar_markup = {
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

	grammar_markup.tag.inside.attr_value.inside.entity = grammar_markup.entity;

	syntax_styler.langs.markup = grammar_markup;
	syntax_styler.langs.html = grammar_markup;
	syntax_styler.langs.mathml = grammar_markup;
	syntax_styler.langs.svg = grammar_markup;

	syntax_styler.langs.xml = syntax_styler.extend_grammar('markup', {});
	syntax_styler.langs.ssml = syntax_styler.langs.xml;
	syntax_styler.langs.atom = syntax_styler.langs.xml;
	syntax_styler.langs.rss = syntax_styler.langs.xml;
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
 * grammar_markup_add_inlined(syntax_styler, 'style', 'css');
 */
export const grammar_markup_add_inlined = (
	syntax_styler: Syntax_Styler,
	tag_name: string,
	lang: string,
	inside_lang = 'markup',
): void => {
	const lang_key = 'lang_' + lang;

	syntax_styler.grammar_insert_before(inside_lang, 'cdata', {
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
							inside: syntax_styler.langs[lang],
						},
					},
				},
				[lang_key]: {
					pattern: /[\s\S]+/,
					inside: syntax_styler.langs[lang],
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
 * grammar_markup_add_attribute(syntax_styler, 'style', 'css');
 */
export const grammar_markup_add_attribute = (
	syntax_styler: Syntax_Styler,
	attr_name: string,
	lang: string,
): void => {
	((syntax_styler.langs.markup!.tag as Grammar_Token).inside!.special_attr as Grammar_Token[]).push(
		{
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
							alias: [lang, 'lang_' + lang],
							inside: syntax_styler.langs[lang],
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
		},
	);
};
