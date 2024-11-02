import {Syntax_Styler} from '$lib/syntax_styler.js';
import {add_grammar_markup} from '$lib/grammar_markup.js';
import {add_grammar_css} from '$lib/grammar_css.js';
import {add_grammar_clike} from '$lib/grammar_clike.js';
import {add_grammar_js} from '$lib/grammar_js.js';
import {add_grammar_ts} from '$lib/grammar_ts.js';
import {add_grammar_svelte} from '$lib/grammar_svelte.js';
import {add_grammar_json} from '$lib/grammar_json.js';

export const syntax_styler = new Syntax_Styler({
	grammars: [
		add_grammar_markup,
		add_grammar_css,
		add_grammar_clike,
		add_grammar_js,
		add_grammar_ts,
		add_grammar_svelte,
		add_grammar_json,
	],
});
