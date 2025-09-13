import {Domstyler} from '$lib/domstyler.js';
import {add_domstyler_grammar_markup} from '$lib/domstyler_lang_html.js';
import {add_domstyler_grammar_css} from '$lib/domstyler_lang_css.js';
import {add_domstyler_grammar_clike} from '$lib/domstyler_lang_clike.js';
import {add_domstyler_grammar_js} from '$lib/domstyler_lang_js.js';
import {add_domstyler_grammar_ts} from '$lib/domstyler_lang_ts.js';
import {add_domstyler_grammar_svelte} from '$lib/domstyler_lang_svelte.js';
import {add_domstyler_grammar_json} from '$lib/domstyler_lang_json.js';

export const domstyler_global = new Domstyler();

add_domstyler_grammar_markup(domstyler_global);
add_domstyler_grammar_css(domstyler_global);
add_domstyler_grammar_clike(domstyler_global);
add_domstyler_grammar_js(domstyler_global);
add_domstyler_grammar_ts(domstyler_global);
add_domstyler_grammar_svelte(domstyler_global);
add_domstyler_grammar_json(domstyler_global);
