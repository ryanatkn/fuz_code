import {Domstyler} from '$lib/syntax_styler.js';
import {add_grammar_markup} from '$lib/grammar_markup.js';
import {add_grammar_css} from '$lib/grammar_css.js';
import {add_grammar_clike} from '$lib/grammar_clike.js';
import {add_grammar_js} from '$lib/grammar_js.js';
import {add_grammar_ts} from '$lib/grammar_ts.js';
import {add_grammar_svelte} from '$lib/grammar_svelte.js';
import {add_grammar_json} from '$lib/grammar_json.js';

export const domstyler_global = new Domstyler();

add_grammar_markup(domstyler_global);
add_grammar_css(domstyler_global);
add_grammar_clike(domstyler_global);
add_grammar_js(domstyler_global);
add_grammar_ts(domstyler_global);
add_grammar_svelte(domstyler_global);
add_grammar_json(domstyler_global);
