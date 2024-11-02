import {Syntax_Styler, type Grammar, type Grammar_Token} from '$lib/syntax_styler.js';

/**
 * Based on Prism (https://github.com/PrismJS/prism)
 * by Lea Verou (https://lea.verou.me/)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const create_grammar_markup = (syntax_styler: Syntax_Styler): void => {
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

	syntax_styler.languages.markup = grammar_markup;

	grammar_markup.tag.inside.attr_value.inside.entity = grammar_markup.entity;

	syntax_styler.languages.html = grammar_markup;
	syntax_styler.languages.mathml = grammar_markup;
	syntax_styler.languages.svg = grammar_markup;

	syntax_styler.languages.xml = syntax_styler.extend_grammar('markup', {});
	syntax_styler.languages.ssml = syntax_styler.languages.xml;
	syntax_styler.languages.atom = syntax_styler.languages.xml;
	syntax_styler.languages.rss = syntax_styler.languages.xml;
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
 * grammar_markup_add_inlined('style', 'css');
 */
export const grammar_markup_add_inlined = (
	syntax_styler: Syntax_Styler,
	tag_name: string,
	lang: string,
): void => {
	const language_key = 'language_' + lang;

	syntax_styler.grammar_insert_before('markup', 'cdata', {
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

/**
 * Adds an pattern to style languages embedded in HTML attributes.
 *
 * An example of an inlined language is CSS with `style` attributes.
 *
 * @param attr_name - The name of the tag that contains the inlined language. This name will be treated as
 * case insensitive.
 * @param lang - The language key.
 * @example
 * grammar_markup_add_attribute('style', 'css');
 */
export const grammar_markup_add_attribute = (
	syntax_styler: Syntax_Styler,
	attr_name: string,
	lang: string,
): void => {
	(
		(syntax_styler.languages.markup!.tag as Grammar_Token).inside!.special_attr as Grammar_Token[]
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
						alias: [lang, 'language_' + lang],
						inside: syntax_styler.languages[lang],
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