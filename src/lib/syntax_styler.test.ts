import {test, assert} from 'vitest';

import {syntax_styler} from '$lib/index.js';
import {
	sample_html_code,
	sample_css_code,
	sample_ts_code,
	sample_svelte_code,
	sample_json_code,
} from '$lib/code_sample_inputs.js';
import {
	styled_html_code,
	styled_css_code,
	styled_ts_code,
	styled_svelte_code,
	styled_json_code,
} from '$lib/code_sample_outputs.js';

test('styles HTML', () => {
	const styled = syntax_styler.stylize(sample_html_code, 'html');
	assert.strictEqual(styled, styled_html_code);
});

test('styles CSS', () => {
	const styled = syntax_styler.stylize(sample_css_code, 'css');
	assert.strictEqual(styled, styled_css_code);
});

test('styles TypeScript', () => {
	const styled = syntax_styler.stylize(sample_ts_code, 'ts');
	assert.strictEqual(styled, styled_ts_code);
});

test('styles Svelte', () => {
	const styled = syntax_styler.stylize(sample_svelte_code, 'svelte');
	assert.strictEqual(styled, styled_svelte_code);
});

test('styles JSON', () => {
	const styled = syntax_styler.stylize(sample_json_code, 'json');
	assert.strictEqual(styled, styled_json_code);
});
