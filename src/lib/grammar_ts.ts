import type {Add_Syntax_Grammar, Syntax_Grammar_Token} from '$lib/syntax_styler.js';

/**
 * Based on Prism (https://github.com/PrismJS/prism)
 * by Lea Verou (https://lea.verou.me/)
 *
 * MIT license
 *
 * @see LICENSE
 */
export const add_grammar_ts: Add_Syntax_Grammar = (syntax_styler) => {
	const grammar_ts = syntax_styler.add_extended_lang('js', 'ts', {
		class_name: {
			pattern:
				/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
			lookbehind: true,
			greedy: true,
			inside: null, // see below
		},
		builtin:
			/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
		// TypeScript arrow functions with type annotations
		function_variable: {
			pattern:
				/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)(?:\s*:\s*(?:(?!=>).)+)?\s*=>|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*=>)))/,
			alias: 'function',
		},
	});

	// The keywords TypeScript adds to JS
	(grammar_ts.keyword as any).push(
		/\b(?:abstract|declare|is|keyof|readonly|require)\b/,
		// keywords that have to be followed by an identifier
		/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
		// This is for `import type *, {}`
		/\btype\b(?=\s*(?:[{*]|$))/,
	);

	// doesn't work with TS because TS is too complex
	delete grammar_ts.parameter;
	delete grammar_ts.literal_property;

	// a version of TS specifically for styling types
	var type_inside = syntax_styler.extend_grammar('ts', {});
	(type_inside as any).class_name = undefined;

	(grammar_ts.class_name as Syntax_Grammar_Token).inside = type_inside;

	syntax_styler.grammar_insert_before('ts', 'function', {
		decorator: {
			pattern: /@[$\w\xA0-\uFFFF]+/,
			inside: {
				at: {
					pattern: /^@/,
					alias: 'operator',
				},
				function: {
					pattern: /^[\s\S]+/,
					alias: 'decorator_name',
				},
			},
		},
		generic_function: {
			// e.g. foo<T extends "bar" | "baz">( ...
			pattern:
				/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
			greedy: true,
			inside: {
				function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
				generic: {
					pattern: /<[\s\S]+/, // everything after the first <
					alias: 'class_name',
					inside: type_inside,
				},
			},
		},
	});
};
