import {Syntax_Styler} from '$lib/syntax_styler.js';
import {add_grammar_markup} from '$lib/grammar_markup.js';
import {add_grammar_css} from '$lib/grammar_css.js';
import {add_grammar_clike} from '$lib/grammar_clike.js';
import {add_grammar_js} from '$lib/grammar_js.js';
import {add_grammar_ts} from '$lib/grammar_ts.js';
import {add_grammar_svelte} from '$lib/grammar_svelte.js';
import {add_grammar_json} from '$lib/grammar_json.js';

export const syntax_styler_global = new Syntax_Styler();

add_grammar_markup(syntax_styler_global);
add_grammar_css(syntax_styler_global);
add_grammar_clike(syntax_styler_global);
add_grammar_js(syntax_styler_global);
add_grammar_ts(syntax_styler_global);
add_grammar_svelte(syntax_styler_global);
add_grammar_json(syntax_styler_global);
