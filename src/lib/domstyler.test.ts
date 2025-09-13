import {test, assert} from 'vitest';

import {domstyler_global} from '$lib/domstyler_global.js';
import {samples} from '$lib/samples/all.js';

import expected_html from '../fixtures/styled_html_outputs/html.html?raw';
import expected_css from '../fixtures/styled_html_outputs/css.html?raw';
import expected_ts from '../fixtures/styled_html_outputs/ts.html?raw';
import expected_svelte from '../fixtures/styled_html_outputs/svelte.html?raw';
import expected_json from '../fixtures/styled_html_outputs/json.html?raw';

function test_highlighting(lang: string, input: string, expected: string) {
	const actual = domstyler_global.stylize(input, lang);

	assert.strictEqual(actual, expected);
}

test('styles HTML', () => {
	test_highlighting('html', samples.html, expected_html);
});

test('styles CSS', () => {
	test_highlighting('css', samples.css, expected_css);
});

test('styles TypeScript', () => {
	test_highlighting('ts', samples.ts, expected_ts);
});

test('styles Svelte', () => {
	test_highlighting('svelte', samples.svelte, expected_svelte);
});

test('styles JSON', () => {
	test_highlighting('json', samples.json, expected_json);
});
