import {Domstyler} from '$lib/domstyler.js';
import {add_domstyler_grammar_markup} from '$lib/grammar_html.js';
import {add_domstyler_grammar_css} from '$lib/grammar_css.js';
import {add_domstyler_grammar_clike} from '$lib/grammar_clike.js';
import {add_domstyler_grammar_js} from '$lib/grammar_js.js';
import {add_domstyler_grammar_ts} from '$lib/grammar_ts.js';
import {add_domstyler_grammar_svelte} from '$lib/grammar_svelte.js';
import {add_domstyler_grammar_json} from '$lib/grammar_json.js';

export const domstyler_global = new Domstyler();

add_domstyler_grammar_markup(domstyler_global);
add_domstyler_grammar_css(domstyler_global);
add_domstyler_grammar_clike(domstyler_global);
add_domstyler_grammar_js(domstyler_global);
add_domstyler_grammar_ts(domstyler_global);
add_domstyler_grammar_svelte(domstyler_global);
add_domstyler_grammar_json(domstyler_global);
