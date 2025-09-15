import {Scanner_Orchestrator} from '$lib/boundary_scanner_orchestrator.js';
import {Html_Scanner, html_boundary_types} from '$lib/boundary_scanner_html.js';
import {Ts_Scanner, ts_boundary_types} from '$lib/boundary_scanner_ts.js';
import {Css_Scanner, css_boundary_types} from '$lib/boundary_scanner_css.js';
import {Json_Scanner, json_boundary_types} from '$lib/boundary_scanner_json.js';
import {Json_Code_Tokenizer} from '$lib/boundary_tokenizer_json.js';
import {Ts_Code_Tokenizer} from '$lib/boundary_tokenizer_ts.js';
import {Css_Code_Tokenizer} from '$lib/boundary_tokenizer_css.js';
import {
	Html_Tag_Tokenizer,
	Html_Code_Tokenizer,
	Html_Doctype_Tokenizer,
	Html_Cdata_Tokenizer,
	Html_Comment_Tokenizer,
} from '$lib/boundary_tokenizer_html.js';

export const boundary_scanner_global = new Scanner_Orchestrator();

// Register HTML scanner and boundary types
boundary_scanner_global.register_language(new Html_Scanner());
for (const boundary_type of html_boundary_types) {
	boundary_scanner_global.register_boundary_type(boundary_type);
}

// Register TypeScript scanner and boundary types
boundary_scanner_global.register_language(new Ts_Scanner());
for (const boundary_type of ts_boundary_types) {
	boundary_scanner_global.register_boundary_type(boundary_type);
}

// Register CSS scanner and boundary types
boundary_scanner_global.register_language(new Css_Scanner());
for (const boundary_type of css_boundary_types) {
	boundary_scanner_global.register_boundary_type(boundary_type);
}

// Register JSON scanner and boundary types
boundary_scanner_global.register_language(new Json_Scanner());
for (const boundary_type of json_boundary_types) {
	boundary_scanner_global.register_boundary_type(boundary_type);
}
// Register code tokenizers
boundary_scanner_global.register_tokenizer(new Json_Code_Tokenizer());
boundary_scanner_global.register_tokenizer(new Ts_Code_Tokenizer());
boundary_scanner_global.register_tokenizer(new Css_Code_Tokenizer());

// Register HTML-specific tokenizers for different boundary types
boundary_scanner_global.register_boundary_tokenizer('html_tag', new Html_Tag_Tokenizer());
boundary_scanner_global.register_boundary_tokenizer('html_code', new Html_Code_Tokenizer());
boundary_scanner_global.register_boundary_tokenizer('html_doctype', new Html_Doctype_Tokenizer());
boundary_scanner_global.register_boundary_tokenizer('html_cdata', new Html_Cdata_Tokenizer());
boundary_scanner_global.register_boundary_tokenizer('html_comment', new Html_Comment_Tokenizer());

// TODO: Register Svelte scanner when implemented
