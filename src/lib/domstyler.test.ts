import {test, assert} from 'vitest';

import {domstyler_global} from '$lib/domstyler_global.js';
import {
	find_matches_with_boundaries,
	resolve_overlaps,
	generate_html_fallback,
} from '$lib/rangestyler_builder.js';
import {rangestyler_global} from '$lib/rangestyler_global.js';
import {samples} from '$lib/samples/all.js';

import expected_html_domstyler from '../../fixtures/styled_html_outputs/html_domstyler.html?raw';
import expected_css_domstyler from '../../fixtures/styled_html_outputs/css_domstyler.html?raw';
import expected_ts_domstyler from '../../fixtures/styled_html_outputs/ts_domstyler.html?raw';
import expected_svelte_domstyler from '../../fixtures/styled_html_outputs/svelte_domstyler.html?raw';
import expected_json_domstyler from '../../fixtures/styled_html_outputs/json_domstyler.html?raw';

import expected_html_rangestyler from '../../fixtures/styled_html_outputs/html_rangestyler.html?raw';
import expected_css_rangestyler from '../../fixtures/styled_html_outputs/css_rangestyler.html?raw';
import expected_ts_rangestyler from '../../fixtures/styled_html_outputs/ts_rangestyler.html?raw';
import expected_svelte_rangestyler from '../../fixtures/styled_html_outputs/svelte_rangestyler.html?raw';
import expected_json_rangestyler from '../../fixtures/styled_html_outputs/json_rangestyler.html?raw';

function test_domstyler_highlighting(lang: string, input: string, expected: string) {
	const actual = domstyler_global.stylize(input, lang);

	assert.strictEqual(actual, expected);
}

function test_rangestyler_highlighting(lang: string, input: string, expected: string) {
	const language = rangestyler_global.get_language(lang);
	assert.ok(language, `Language "${lang}" should be available in rangestyler_global`);

	const {matches} = find_matches_with_boundaries(
		input,
		language.patterns,
		lang,
		(id) => rangestyler_global.get_language(id)?.patterns,
		language.detect_boundaries,
	);
	const resolved = resolve_overlaps(matches);
	const actual = generate_html_fallback(input, resolved);

	assert.strictEqual(actual, expected);
}

test('domstyler styles HTML', () => {
	test_domstyler_highlighting('html', samples.html, expected_html_domstyler);
});

test('domstyler styles CSS', () => {
	test_domstyler_highlighting('css', samples.css, expected_css_domstyler);
});

test('domstyler styles TypeScript', () => {
	test_domstyler_highlighting('ts', samples.ts, expected_ts_domstyler);
});

test('domstyler styles Svelte', () => {
	test_domstyler_highlighting('svelte', samples.svelte, expected_svelte_domstyler);
});

test('domstyler styles JSON', () => {
	test_domstyler_highlighting('json', samples.json, expected_json_domstyler);
});

test('rangestyler styles HTML', () => {
	test_rangestyler_highlighting('html', samples.html, expected_html_rangestyler);
});

test('rangestyler styles CSS', () => {
	test_rangestyler_highlighting('css', samples.css, expected_css_rangestyler);
});

test('rangestyler styles TypeScript', () => {
	test_rangestyler_highlighting('ts', samples.ts, expected_ts_rangestyler);
});

test('rangestyler styles Svelte', () => {
	test_rangestyler_highlighting('svelte', samples.svelte, expected_svelte_rangestyler);
});

test('rangestyler styles JSON', () => {
	test_rangestyler_highlighting('json', samples.json, expected_json_rangestyler);
});
