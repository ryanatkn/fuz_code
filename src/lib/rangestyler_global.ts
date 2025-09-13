import {Rangestyler} from '$lib/rangestyler.js';
import {ts_language} from '$lib/rangestyler_lang_ts.js';
import {css_language} from '$lib/rangestyler_lang_css.js';
import {html_language} from '$lib/rangestyler_lang_html.js';
import {json_language} from '$lib/rangestyler_lang_json.js';
import {svelte_language} from '$lib/rangestyler_lang_svelte.js';

export const rangestyler_global = new Rangestyler();

rangestyler_global.register_language(ts_language);
rangestyler_global.register_language(css_language);
rangestyler_global.register_language(html_language);
rangestyler_global.register_language(json_language);
rangestyler_global.register_language(svelte_language);
