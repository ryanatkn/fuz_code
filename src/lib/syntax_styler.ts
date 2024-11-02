export type Add_Grammar = (syntax_styler: Syntax_Styler) => void;

/**
 * Based on Prism (https://github.com/PrismJS/prism)
 * by Lea Verou (https://lea.verou.me/)
 *
 * MIT license
 *
 * @see LICENSE
 */
export class Syntax_Styler {
	langs: Record<string, Grammar | undefined> = {
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

	add_lang(id: string, grammar: Grammar, aliases?: string[]): void {
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
		extension: Grammar,
		aliases?: string[],
	): Grammar {
		var grammar = this.extend_grammar(base_id, extension);
		this.add_lang(extension_id, grammar, aliases);
		return grammar;
	}

	get_lang(id: string): Grammar {
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
	stylize(text: string, lang: string, grammar: Grammar | undefined = this.get_lang(lang)): string {
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
	 * appropriate tokens. However, `syntax_styler.get_lang('markup')` is a regular JavaScript object literal, so if you do
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
		insert: Grammar,
		root: Record<string, any> = this.langs,
	): Grammar {
		var grammar = root[inside];
		var updated: Grammar = {};

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
	extend_grammar(base_id: string, extension: Grammar): Grammar {
		return {...deep_clone(this.get_lang(base_id)), ...extension};
	}

	// TODO add some builtins
	plugins: Record<string, any> = {};

	// TODO maybe extend/compose an event listener?
	hooks_before_tokenize: Hook_Before_Tokenize_Callback[] = [];
	hooks_after_tokenize: Hook_After_Tokenize_Callback[] = [];
	hooks_wrap: Hook_Wrap_Callback[] = [];

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

export type Grammar_Value = RegExp | Grammar_Token | Grammar_Value[];

export type Grammar = Record<string, Grammar_Value> & {rest?: Grammar | undefined};

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
export interface Grammar_Token {
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
	alias?: string | string[];
	/**
	 * The nested grammar of this token.
	 */
	inside?: Grammar | null;
}

/**
 * Accepts a string of text as input and the language definitions to use,
 * and returns an array with the tokenized code.
 *
 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
 *
 * This method could be useful in other contexts as well, as a very crude parser.
 *
 * @param text - a string with the code to be styled
 * @param grammar - an object containing the tokens to use
 *
 * Usually a language definition like `syntax_styler.get_lang('markup')`.
 *
 * @returns an array of strings and tokens, a token stream
 *
 * @example
 * var code = `var foo = 0;`;
 * var tokens = tokenize_syntax(code, Syntax_Styler.langs.js);
 * for (var token of tokens) {
 *     if (token instanceof Syntax_Token && token.type === 'number') {
 *         console.log(`Found numeric literal: ${token.content}`);
 *     }
 * }
 */
export const tokenize_syntax = (text: string, grammar: Grammar): Syntax_Token_Stream => {
	var {rest} = grammar;
	if (rest) {
		for (var token in rest) {
			grammar[token] = rest[token];
		}
		grammar.rest = undefined; // preserve shape
	}

	var token_list = new Linked_List();
	add_after(token_list, token_list.head, text);

	match_grammar(text, token_list, grammar, token_list.head, 0);

	return to_array(token_list);
};

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

export class Syntax_Token {
	/**
	 * The type of the token.
	 *
	 * This is usually the key of a pattern in a `Grammar`.
	 */
	type: string;

	/**
	 * The strings or tokens contained by this token.
	 *
	 * This will be a token stream if the pattern matched also defined an `inside` grammar.
	 */
	content: string | Syntax_Token_Stream;

	/**
	 * The alias(es) of the token.
	 */
	alias: string | string[];

	length: number;

	constructor(
		type: string,
		content: string | Syntax_Token_Stream,
		alias: string | string[],
		matched_str: string = '',
	) {
		this.type = type;
		this.content = content;
		this.alias = alias;
		this.length = matched_str.length;
	}
}

/**
 * A token stream is an array of strings and `Syntax_Token` objects.
 *
 * Syntax token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
 * them.
 *
 * 1. No adjacent strings.
 * 2. No empty strings.
 *
 *    The only exception here is the token stream that only contains the empty string and nothing else.
 */
export type Syntax_Token_Stream = Array<string | Syntax_Token>;

const match_pattern = (
	pattern: RegExp,
	pos: number,
	text: string,
	lookbehind: boolean,
): RegExpExecArray | null => {
	pattern.lastIndex = pos;
	var match = pattern.exec(text);
	if (match && lookbehind && match[1]) {
		// change the match to remove the text matched by the lookbehind group
		var lookbehind_length = match[1].length;
		match.index += lookbehind_length;
		match[0] = match[0].substring(lookbehind_length);
	}
	return match;
};

interface Rematch_Options {
	cause: string;
	reach: number;
}

const match_grammar = (
	text: string,
	token_list: Linked_List,
	grammar: any,
	start_node: Linked_List_Node,
	start_pos: number,
	rematch?: Rematch_Options,
): void => {
	for (var token in grammar) {
		var patterns = grammar[token];

		if (!patterns) {
			continue;
		}

		patterns = Array.isArray(patterns) ? patterns : [patterns];

		for (var j = 0; j < patterns.length; ++j) {
			if (rematch && rematch.cause === token + ',' + j) {
				return;
			}

			var pattern_obj = patterns[j];
			var inside = pattern_obj.inside;
			var lookbehind = !!pattern_obj.lookbehind;
			var greedy = !!pattern_obj.greedy;
			var alias = pattern_obj.alias;

			if (greedy && !pattern_obj.pattern.global) {
				// Without the global flag, lastIndex won't work
				var flags = pattern_obj.pattern.toString().match(/[imsuy]*$/)[0];
				pattern_obj.pattern = RegExp(pattern_obj.pattern.source, flags + 'g');
			}

			var pattern: RegExp = pattern_obj.pattern || pattern_obj;

			for (
				// iterate the token list and keep track of the current token/string position
				var current_node = start_node.next, pos = start_pos;
				current_node !== token_list.tail;
				pos += current_node.value!.length, current_node = current_node.next
			) {
				if (rematch && pos >= rematch.reach) {
					break;
				}

				var str = current_node!.value;

				if (token_list.length > text.length) {
					// Something went terribly wrong, ABORT, ABORT!
					return;
				}

				if (str instanceof Syntax_Token) {
					continue;
				}

				var remove_count = 1;
				var match;

				if (greedy) {
					match = match_pattern(pattern, pos, text, lookbehind);
					if (!match || match.index >= text.length) {
						break;
					}

					var from = match.index;
					var to = match.index + match[0].length;
					var p = pos;

					// find the node that contains the match
					p += current_node!.value!.length;
					while (from >= p) {
						current_node = current_node!.next;
						p += current_node!.value!.length;
					}
					// adjust pos (and p)
					p -= current_node!.value!.length;
					pos = p;

					// the current node is a Token, then the match starts inside another Token, which is invalid
					if (current_node!.value instanceof Syntax_Token) {
						continue;
					}

					// find the last node which is affected by this match
					for (
						var k = current_node;
						k !== token_list.tail && (p < to || typeof k!.value === 'string');
						k = k!.next
					) {
						remove_count++;
						p += k!.value!.length;
					}
					remove_count--;

					// replace with the new match
					str = text.substring(pos, p);
					match.index -= pos;
				} else {
					match = match_pattern(pattern, 0, str!, lookbehind);
					if (!match) {
						continue;
					}
				}

				var from = match.index;
				var match_str = match[0];
				var before = str!.substring(0, from);
				var after = str!.substring(from + match_str.length);

				var reach = pos + str!.length;
				if (rematch && reach > rematch.reach) {
					rematch.reach = reach;
				}

				var remove_from = current_node!.prev;

				if (before) {
					remove_from = add_after(token_list, remove_from!, before);
					pos += before.length;
				}

				remove_range(token_list, remove_from!, remove_count);

				var wrapped = new Syntax_Token(
					token,
					inside ? tokenize_syntax(match_str, inside) : match_str,
					alias,
					match_str,
				);
				current_node = add_after(token_list, remove_from!, wrapped);

				if (after) {
					add_after(token_list, current_node, after);
				}

				if (remove_count > 1) {
					// at least one Token object was removed, so we have to do some rematching
					// this can only happen if the current pattern is greedy

					var nested_rematch: Rematch_Options = {
						cause: token + ',' + j,
						reach,
					};
					match_grammar(text, token_list, grammar, current_node.prev!, pos, nested_rematch);

					// the reach might have been extended because of the rematching
					if (rematch && nested_rematch.reach > rematch.reach) {
						rematch.reach = nested_rematch.reach;
					}
				}
			}
		}
	}
};

class Linked_List<T = string | Syntax_Token> {
	head: Linked_List_Node<T>;
	tail: Linked_List_Node<T>;
	length: number = 0;

	constructor() {
		this.head = {value: null, prev: null, next: null};
		this.tail = {value: null, prev: this.head, next: null};
		this.head.next = this.tail;
	}
}

interface Linked_List_Node<T = string | Syntax_Token> {
	value: T | null;
	prev: Linked_List_Node<T> | null;
	next: Linked_List_Node<T> | null;
}

/**
 * Adds a new node with the given value to the list.
 */
const add_after = <T>(
	list: Linked_List<T>,
	node: Linked_List_Node<T>,
	value: T,
): Linked_List_Node<T> => {
	// assumes that node != list.tail && values.length >= 0
	var next = node.next!;

	var new_node = {value, prev: node, next};
	node.next = new_node;
	next.prev = new_node;
	list.length++;

	return new_node;
};

/**
 * Removes `count` nodes after the given node. The given node will not be removed.
 */
const remove_range = <T>(list: Linked_List<T>, node: Linked_List_Node<T>, count: number) => {
	var next = node.next;
	for (var i = 0; i < count && next !== list.tail; i++) {
		next = next!.next;
	}
	node.next = next;
	next!.prev = node;
	list.length -= i;
};

const to_array = <T>(list: Linked_List<T>): T[] => {
	var array = [];
	var node = list.head.next;
	while (node !== list.tail) {
		array.push(node!.value!);
		node = node!.next;
	}
	return array;
};

export type Hook_Before_Tokenize_Callback = (ctx: Hook_Before_Tokenize_Callback_Context) => void;
export type Hook_After_Tokenize_Callback = (ctx: Hook_After_Tokenize_Callback_Context) => void;
export type Hook_Wrap_Callback = (ctx: Hook_Wrap_Callback_Context) => void;

export interface Hook_Before_Tokenize_Callback_Context {
	code: string;
	grammar: Grammar;
	lang: string;
	tokens: undefined;
}
export interface Hook_After_Tokenize_Callback_Context {
	code: string;
	grammar: Grammar;
	lang: string;
	tokens: Syntax_Token_Stream;
}
export interface Hook_Wrap_Callback_Context {
	type: string;
	content: string;
	tag: string;
	classes: string[];
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
