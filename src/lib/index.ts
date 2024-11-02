import {Syntax_Styler} from '$lib/syntax_styler.js';
import {create_grammar_markup} from '$lib/grammar_markup.js';
import {create_grammar_css} from '$lib/grammar_css.js';
import {create_grammar_clike} from '$lib/grammar_clike.js';
import {create_grammar_js} from '$lib/grammar_js.js';
import {create_grammar_ts} from '$lib/grammar_ts.js';
import {create_grammar_svelte} from '$lib/grammar_svelte.js';
import {create_grammar_json} from '$lib/grammar_json.js';

export const syntax_styler = new Syntax_Styler({
	grammars: [
		create_grammar_markup,
		create_grammar_css,
		create_grammar_clike,
		create_grammar_js,
		create_grammar_ts,
		create_grammar_svelte,
		create_grammar_json,
	],
});
