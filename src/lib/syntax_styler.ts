import {Syntax_Token, type Syntax_Token_Stream} from './syntax_token.js';
import {tokenize_syntax} from './tokenize_syntax.js';

export type Add_Syntax_Grammar = (syntax_styler: Syntax_Styler) => void;

/**
 * Based on Prism (https://github.com/PrismJS/prism)
 * by Lea Verou (https://lea.verou.me/)
 *
 * MIT license
 *
 * @see LICENSE
 */
export class Syntax_Styler {
	langs: Record<string, Syntax_Grammar | undefined> = {
		plaintext: {},
	};

	// constructor() {
	// TODO this API? problem is the grammars rely on mutating existing grammars in the `syntax_styler`,
	// so for now adding grammars will remain inherently stateful
	// export interface Syntax_Styler_Options {
	// 	grammars?: Add_Grammar[];
	// }
	// options: Syntax_Styler_Options = {}
	// const {grammars} = options;
	// if (grammars) {
	// 	for (const add_grammar of grammars) {
	// this.langs[id] =
	// 		add_grammar(this);
	// 	}
	// }
	// }

	add_lang(id: string, grammar: Syntax_Grammar, aliases?: Array<string>): void {
		this.langs[id] = grammar;
		if (aliases !== undefined) {
			for (var alias of aliases) {
				this.langs[alias] = grammar;
			}
		}
	}

	add_extended_lang(
		base_id: string,
		extension_id: string,
		extension: Syntax_Grammar,
		aliases?: Array<string>,
	): Syntax_Grammar {
		var grammar = this.extend_grammar(base_id, extension);
		this.add_lang(extension_id, grammar, aliases);
		return grammar;
	}

	get_lang(id: string): Syntax_Grammar {
		var lang = this.langs[id];
		if (lang === undefined) {
			throw Error(`The language "${id}" has no grammar.`);
		}
		return lang;
	}

	/**
	 * Accepts a string of text as input
	 * and the language definitions to use,
	 * and returns a string with the HTML produced.
	 *
	 * The following hooks will be run:
	 * 1. `before_tokenize`
	 * 2. `after_tokenize`
	 * 3. `wrap`: on each `Syntax_Token`
	 *
	 * @param text - A string with the code to be styled.
	 * @param lang - The name of the language definition passed to `grammar`.
	 * @param grammar - An object containing the tokens to use.
	 *
	 * Usually a language definition like `syntax_styler.get_lang('markup')`.
	 *
	 * @returns the styled HTML
	 *
	 * @example
	 * stylize('var foo = true;', 'ts');
	 *
	 * @example
	 * stylize('var foo = false;', 'ts', custom_grammar);
	 */
	stylize(
		text: string,
		lang: string,
		grammar: Syntax_Grammar | undefined = this.get_lang(lang),
	): string {
		var ctx: Hook_Before_Tokenize_Callback_Context = {
			code: text,
			grammar,
			lang,
			tokens: undefined,
		};
		this.run_hook_before_tokenize(ctx);
		(ctx as any as Hook_After_Tokenize_Callback_Context).tokens = tokenize_syntax(
			ctx.code,
			ctx.grammar,
		);
		this.run_hook_after_tokenize(ctx as any as Hook_After_Tokenize_Callback_Context);
		return this.stringify_token(encode(ctx.tokens), ctx.lang);
	}

	/**
	 * Inserts tokens _before_ another token in a language definition or any other grammar.
	 *
	 * ## Usage
	 *
	 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
	 * not only defines CSS styling for CSS documents, but also needs to define styling for CSS embedded
	 * in HTML through `<style>` elements. To do this, it needs to modify `syntax_styler.get_lang('markup')` and add the
	 * appropriate tokens. However, `syntax_styler.get_lang('markup')` is a regular JS object literal, so if you do
	 * this:
	 *
	 * ```js
	 * syntax_styler.get_lang('markup').style = {
	 *     // token
	 * };
	 * ```
	 *
	 * then the `style` token will be added (and processed) at the end. `insert_before` allows you to insert tokens
	 * before existing tokens. For the CSS example above, you would use it like this:
	 *
	 * ```js
	 * grammar_insert_before('markup', 'cdata', {
	 *     'style': {
	 *         // token
	 *     }
	 * });
	 * ```
	 *
	 * ## Special cases
	 *
	 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
	 * will be ignored.
	 *
	 * This behavior can be used to insert tokens after `before`:
	 *
	 * ```js
	 * grammar_insert_before('markup', 'comment', {
	 *     'comment': syntax_styler.get_lang('markup').comment,
	 *     // tokens after 'comment'
	 * });
	 * ```
	 *
	 * ## Limitations
	 *
	 * The main problem `insert_before` has to solve is iteration order. Since ES2015, the iteration order for object
	 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
	 * differently when keys are deleted and re-inserted. So `insert_before` can't be implemented by temporarily
	 * deleting properties which is necessary to insert at arbitrary positions.
	 *
	 * To solve this problem, `insert_before` doesn't actually insert the given tokens into the target object.
	 * Instead, it will create a new object and replace all references to the target object with the new one. This
	 * can be done without temporarily deleting properties, so the iteration order is well-defined.
	 *
	 * However, only references that can be reached from `syntax_styler.langs` or `insert` will be replaced. I.e. if
	 * you hold the target object in a variable, then the value of the variable will not change.
	 *
	 * ```js
	 * var oldMarkup = syntax_styler.get_lang('markup');
	 * var newMarkup = grammar_insert_before('markup', 'comment', { ... });
	 *
	 * assert(oldMarkup !== syntax_styler.get_lang('markup'));
	 * assert(newMarkup === syntax_styler.get_lang('markup'));
	 * ```
	 *
	 * @param inside - The property of `root` (e.g. a language id in `syntax_styler.langs`) that contains the
	 * object to be modified.
	 * @param before - The key to insert before.
	 * @param insert - An object containing the key-value pairs to be inserted.
	 * @param root - The object containing `inside`, i.e. the object that contains the
	 * object to be modified.
	 *
	 * Defaults to `syntax_styler.langs`.
	 *
	 * @returns the new grammar object
	 */
	grammar_insert_before(
		inside: string,
		before: string,
		insert: Syntax_Grammar,
		root: Record<string, any> = this.langs,
	): Syntax_Grammar {
		var grammar = root[inside];
		var updated: Syntax_Grammar = {};

		for (var token in grammar) {
			if (token === before) {
				for (var new_token in insert) {
					updated[new_token] = insert[new_token];
				}
			}

			// Do not insert tokens which also occur in insert.
			if (!Object.hasOwn(insert, token)) {
				updated[token] = grammar[token];
			}
		}

		var old = root[inside];
		root[inside] = updated;

		// Update references in other language definitions
		depth_first_search(this.langs, (o, key, value) => {
			if (value === old && key !== inside) {
				o[key] = updated;
			}
		});

		return updated;
	}

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * Runs the `wrap` hook on each `Syntax_Token`.
	 *
	 * @param o - The token or token stream to be converted.
	 * @param lang - The name of current language.
	 * @returns The HTML representation of the token or token stream.
	 */
	stringify_token(o: string | Syntax_Token | Syntax_Token_Stream, lang: string): string {
		if (typeof o === 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			for (var e of o) {
				s += this.stringify_token(e, lang);
			}
			return s;
		}

		var ctx: Hook_Wrap_Callback_Context = {
			type: o.type,
			content: this.stringify_token(o.content, lang),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			lang,
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				ctx.classes.push(...aliases);
			} else {
				ctx.classes.push(aliases);
			}
		}

		this.run_hook_wrap(ctx);

		var attributes = '';
		for (var name in ctx.attributes) {
			attributes += ' ' + name + '="' + (ctx.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return (
			'<' +
			ctx.tag +
			' class="' +
			ctx.classes.join(' ') +
			'"' +
			attributes +
			'>' +
			ctx.content +
			'</' +
			ctx.tag +
			'>'
		);
	}

	/**
	 * Creates a deep copy of the language with the given id and appends the given tokens.
	 *
	 * If a token in `extension` also appears in the copied language, then the existing token in the copied language
	 * will be overwritten at its original position.
	 *
	 * ## Best practices
	 *
	 * Since the position of overwriting tokens (token in `extension` that overwrite tokens in the copied language)
	 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
	 * understand the language definition because, normally, the order of tokens matters in the grammars.
	 *
	 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
	 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
	 *
	 * @param base_id - The id of the language to extend. This has to be a key in `syntax_styler.langs`.
	 * @param extension - The new tokens to append.
	 * @returns the new grammar
	 */
	extend_grammar(base_id: string, extension: Syntax_Grammar): Syntax_Grammar {
		return {...deep_clone(this.get_lang(base_id)), ...extension};
	}

	// TODO add some builtins
	plugins: Record<string, any> = {};

	// TODO maybe extend/compose an event listener?
	hooks_before_tokenize: Array<Hook_Before_Tokenize_Callback> = [];
	hooks_after_tokenize: Array<Hook_After_Tokenize_Callback> = [];
	hooks_wrap: Array<Hook_Wrap_Callback> = [];

	add_hook_before_tokenize(cb: Hook_Before_Tokenize_Callback): void {
		this.hooks_before_tokenize.push(cb);
	}
	add_hook_after_tokenize(cb: Hook_After_Tokenize_Callback): void {
		this.hooks_after_tokenize.push(cb);
	}
	add_hook_wrap(cb: Hook_Wrap_Callback): void {
		this.hooks_wrap.push(cb);
	}

	run_hook_before_tokenize(ctx: Hook_Before_Tokenize_Callback_Context): void {
		for (var cb of this.hooks_before_tokenize) {
			cb(ctx);
		}
	}
	run_hook_after_tokenize(ctx: Hook_After_Tokenize_Callback_Context): void {
		for (var cb of this.hooks_after_tokenize) {
			cb(ctx);
		}
	}
	run_hook_wrap(ctx: Hook_Wrap_Callback_Context): void {
		for (var cb of this.hooks_wrap) {
			cb(ctx);
		}
	}
}

export type Syntax_Grammar_Value = RegExp | Syntax_Grammar_Token | Array<Syntax_Grammar_Value>;

export type Syntax_Grammar = Record<string, Syntax_Grammar_Value> & {
	rest?: Syntax_Grammar | undefined;
};

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 */
export interface Syntax_Grammar_Token {
	/**
	 * The regular expression of the token.
	 */
	pattern: RegExp;
	/**
	 * If `true`, then the first capturing group of `pattern` will (effectively)
	 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
	 * @default false
	 */
	lookbehind?: boolean;
	/**
	 * Whether the token is greedy.
	 * @default false
	 */
	greedy?: boolean;
	/**
	 * An optional alias or list of aliases.
	 */
	alias?: string | Array<string>;
	/**
	 * The nested grammar of this token.
	 */
	inside?: Syntax_Grammar | null;
}

const depth_first_search = (
	o: any,
	cb: (obj: any, key: string, value: any) => void,
	visited: Set<number> = new Set(),
): void => {
	for (var key in o) {
		cb(o, key, o[key]);

		var property = o[key];

		if (
			property &&
			typeof property === 'object' &&
			!(property instanceof RegExp) &&
			!visited.has(id_of(property))
		) {
			visited.add(id_of(property));
			depth_first_search(property, cb, visited);
		}
	}
};

export type Hook_Before_Tokenize_Callback = (ctx: Hook_Before_Tokenize_Callback_Context) => void;
export type Hook_After_Tokenize_Callback = (ctx: Hook_After_Tokenize_Callback_Context) => void;
export type Hook_Wrap_Callback = (ctx: Hook_Wrap_Callback_Context) => void;

export interface Hook_Before_Tokenize_Callback_Context {
	code: string;
	grammar: Syntax_Grammar;
	lang: string;
	tokens: undefined;
}
export interface Hook_After_Tokenize_Callback_Context {
	code: string;
	grammar: Syntax_Grammar;
	lang: string;
	tokens: Syntax_Token_Stream;
}
export interface Hook_Wrap_Callback_Context {
	type: string;
	content: string;
	tag: string;
	classes: Array<string>;
	attributes: Record<string, string>;
	lang: string;
}

var unique_id = 0;

const encode = (tokens: any): any => {
	if (tokens instanceof Syntax_Token) {
		return new Syntax_Token(tokens.type, encode(tokens.content), tokens.alias);
	} else if (Array.isArray(tokens)) {
		return tokens.map(encode);
	} else {
		return tokens
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/\u00a0/g, ' ');
	}
};

/**
 * Returns a unique number for the given object. Later calls will still return the same number.
 */
const ID = Symbol('id');
const id_of = (obj: any): number => (obj[ID] ??= ++unique_id);

/**
 * Creates a deep clone of the given object.
 *
 * The main intended use of this function is to clone language definitions.
 */
const deep_clone = <T>(o: T, visited: Map<number, any> = new Map()): T => {
	var clone: any, id, v;
	if (Array.isArray(o)) {
		id = id_of(o as any);
		v = visited.get(id);
		if (v) {
			return v;
		}
		clone = [];
		visited.set(id, clone);

		for (var i = 0; i < (o as any).length; i++) {
			clone[i] = deep_clone((o as any)[i], visited);
		}

		return clone;
	} else if (o && typeof o === 'object' && !(o instanceof RegExp)) {
		id = id_of(o as any);
		v = visited.get(id);
		if (v) {
			return v;
		}
		clone = {};
		visited.set(id, clone);

		for (var key in o) {
			clone[key] = deep_clone(o[key], visited);
		}

		return clone;
	} else {
		return o;
	}
};

// TODO BLOCK document in CLAUDE.md and the README.md more manual patterns, and refactor this module to extract tokenization
