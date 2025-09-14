import {test, assert, describe} from 'vitest';

import {detect_boundaries, find_matches_with_boundaries} from '$lib/rangestyler_builder.js';
import {rangestyler_global} from '$lib/rangestyler_global.js';

describe('detect_boundaries', () => {
	test('detects script tags', () => {
		const html = `<html>
<script>const x = 1;</script>
<p>text</p>
</html>`;

		const boundaries = detect_boundaries(html);

		// Should have content before script, script content, and content after
		const script_boundary = boundaries.find((b) => b.type === 'script');
		assert.ok(script_boundary);
		assert.strictEqual(html.slice(script_boundary.start, script_boundary.end), 'const x = 1;');
	});

	test('detects style tags', () => {
		const html = `<html>
<style>.red { color: red; }</style>
<p>text</p>
</html>`;

		const boundaries = detect_boundaries(html);

		const style_boundary = boundaries.find((b) => b.type === 'style');
		assert.ok(style_boundary);
		assert.strictEqual(
			html.slice(style_boundary.start, style_boundary.end),
			'.red { color: red; }',
		);
	});

	test('comments prevent script/style detection', () => {
		const html = `<html>
<!-- <script>fake()</script> -->
<p>text</p>
</html>`;

		const boundaries = detect_boundaries(html);

		// Should not detect script inside comment
		const script_boundary = boundaries.find((b) => b.type === 'script');
		assert.strictEqual(script_boundary, undefined);
	});

	test('handles multiple script and style tags', () => {
		const html = `
<script>const a = 1;</script>
<style>body { margin: 0; }</style>
<script>const b = 2;</script>
<style>p { padding: 0; }</style>
`;

		const boundaries = detect_boundaries(html);

		const script_boundaries = boundaries.filter((b) => b.type === 'script');
		const style_boundaries = boundaries.filter((b) => b.type === 'style');

		assert.strictEqual(script_boundaries.length, 2);
		assert.strictEqual(style_boundaries.length, 2);

		assert.strictEqual(
			html.slice(script_boundaries[0].start, script_boundaries[0].end),
			'const a = 1;',
		);
		assert.strictEqual(
			html.slice(script_boundaries[1].start, script_boundaries[1].end),
			'const b = 2;',
		);
	});

	test('handles empty script and style tags', () => {
		const html = `
<script></script>
<style></style>
`;

		const boundaries = detect_boundaries(html);

		// Should only have content boundaries for empty tags
		const script_boundaries = boundaries.filter((b) => b.type === 'script');
		const style_boundaries = boundaries.filter((b) => b.type === 'style');

		assert.strictEqual(script_boundaries.length, 0);
		assert.strictEqual(style_boundaries.length, 0);
	});

	test('preserves boundary order', () => {
		const html = `
<style>/* css */</style>
<script>// js</script>
<p>text</p>
`;

		const boundaries = detect_boundaries(html);

		// Filter out content boundaries
		const special_boundaries = boundaries.filter((b) => b.type !== 'content');

		assert.strictEqual(special_boundaries.length, 2);
		assert.strictEqual(special_boundaries[0].type, 'style');
		assert.strictEqual(special_boundaries[1].type, 'script');

		// Verify boundaries are sorted by start position
		for (let i = 1; i < boundaries.length; i++) {
			assert.ok(boundaries[i].start >= boundaries[i - 1].end);
		}
	});
});

describe('find_matches_with_boundaries', () => {
	test('applies TypeScript patterns in script tags', () => {
		const html = `<script>const x: number = 1;</script>`;

		const matches = find_matches_with_boundaries(
			html,
			rangestyler_global.get_language('html')?.patterns || [],
			'html',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		// Should have matches for TypeScript keywords and types
		const keyword_matches = matches.filter((m) => m.pattern.name === 'keyword');
		const type_matches = matches.filter((m) => m.pattern.name === 'type');

		assert.ok(keyword_matches.length > 0);
		assert.ok(type_matches.length > 0);
	});

	test('applies CSS patterns in style tags', () => {
		const html = `<style>.class { color: red; }</style>`;

		const matches = find_matches_with_boundaries(
			html,
			rangestyler_global.get_language('html')?.patterns || [],
			'html',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		// Should have matches for CSS selectors and properties
		const selector_matches = matches.filter((m) => m.pattern.name === 'selector');
		const property_matches = matches.filter((m) => m.pattern.name === 'property');

		assert.ok(selector_matches.length > 0);
		assert.ok(property_matches.length > 0);
	});

	test('comments are matched but prevent nested language detection', () => {
		const html = `<!-- <script>const x = 1;</script> -->`;

		const matches = find_matches_with_boundaries(
			html,
			rangestyler_global.get_language('html')?.patterns || [],
			'html',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		// Should have the comment match
		const comment_matches = matches.filter((m) => m.pattern.name === 'comment');
		assert.strictEqual(comment_matches.length, 1);

		// Should not have any keyword matches from the fake script
		const keyword_matches = matches.filter((m) => m.pattern.name === 'keyword');
		assert.strictEqual(keyword_matches.length, 0);
	});

	test('handles mixed content correctly', () => {
		const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { color: red; }
  </style>
</head>
<body>
  <script>
    console.log("Hello");
  </script>
  <p class="test">Text</p>
</body>
</html>`;

		const matches = find_matches_with_boundaries(
			html,
			rangestyler_global.get_language('html')?.patterns || [],
			'html',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		// Should have various match types
		const tag_matches = matches.filter((m) => m.pattern.name === 'tag');
		const property_matches = matches.filter((m) => m.pattern.name === 'property');
		const doctype_matches = matches.filter((m) => m.pattern.name === 'doctype');
		const function_matches = matches.filter((m) => m.pattern.name === 'function');

		assert.ok(tag_matches.length > 0);
		assert.ok(property_matches.length > 0); // From style
		assert.ok(doctype_matches.length > 0);
		// console.log should be matched as a function from TypeScript patterns
		assert.ok(function_matches.length > 0); // From script
	});
});

describe('Svelte language patterns', () => {
	test('highlights Svelte control blocks', () => {
		const svelte = `
{#if condition}
  <p>True</p>
{:else}
  <p>False</p>
{/if}`;

		const matches = find_matches_with_boundaries(
			svelte,
			rangestyler_global.get_language('svelte')?.patterns || [],
			'svelte',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		const svelte_blocks = matches.filter((m) => m.pattern.name === 'svelte_block');
		assert.ok(svelte_blocks.length >= 3); // #if, :else, /if
	});

	test('highlights Svelte each blocks', () => {
		const svelte = `
{#each items as item}
  <li>{item.name}</li>
{/each}`;

		const matches = find_matches_with_boundaries(
			svelte,
			rangestyler_global.get_language('svelte')?.patterns || [],
			'svelte',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		const svelte_blocks = matches.filter((m) => m.pattern.name === 'svelte_block');
		assert.ok(svelte_blocks.length >= 2); // #each and /each
	});

	test('highlights Svelte directives', () => {
		const svelte = `
<button on:click={handleClick} bind:value={value} use:tooltip>
  Click me
</button>`;

		const matches = find_matches_with_boundaries(
			svelte,
			rangestyler_global.get_language('svelte')?.patterns || [],
			'svelte',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		const directives = matches.filter((m) => m.pattern.name === 'svelte_directive');
		assert.ok(directives.length >= 3); // on:click, bind:value, use:tooltip
	});

	test('highlights TypeScript in Svelte script tags', () => {
		const svelte = `
<script lang="ts">
  let count: number = 0;
  const increment = () => count++;
</script>`;

		const matches = find_matches_with_boundaries(
			svelte,
			rangestyler_global.get_language('svelte')?.patterns || [],
			'svelte',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		// Should have TypeScript patterns applied
		const type_matches = matches.filter((m) => m.pattern.name === 'type');
		const keyword_matches = matches.filter((m) => m.pattern.name === 'keyword');

		assert.ok(type_matches.length > 0); // 'number' type
		assert.ok(keyword_matches.length > 0); // 'let', 'const'
	});

	test('highlights CSS in Svelte style tags', () => {
		const svelte = `
<style>
  .container {
    display: flex;
    color: #333;
  }
</style>`;

		const matches = find_matches_with_boundaries(
			svelte,
			rangestyler_global.get_language('svelte')?.patterns || [],
			'svelte',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		// Should have CSS patterns applied
		const selector_matches = matches.filter((m) => m.pattern.name === 'selector');
		const property_matches = matches.filter((m) => m.pattern.name === 'property');

		assert.ok(selector_matches.length > 0);
		assert.ok(property_matches.length > 0);
	});
});

describe('Edge cases', () => {
	test('handles strings with closing tags', () => {
		// Note: This is a known limitation - regex-based parsing can't perfectly handle
		// strings containing closing tags. A full parser would be needed for this.
		const html = `
<script>
  const html = "</script>";
</script>`;

		const boundaries = detect_boundaries(html);
		const script_boundary = boundaries.find((b) => b.type === 'script');

		// The regex will incorrectly match the first </script> even though it's in a string
		// This is a known limitation of regex-based parsing
		assert.ok(script_boundary);
		const content = html.slice(script_boundary.start, script_boundary.end);
		// The content will be truncated at the string's </script>
		assert.strictEqual(content.trim(), 'const html = "');
	});

	test('handles nested curly braces in Svelte', () => {
		const svelte = `{#each items as { id, name }}{name}{/each}`;

		const matches = find_matches_with_boundaries(
			svelte,
			rangestyler_global.get_language('svelte')?.patterns || [],
			'svelte',
			(id) => rangestyler_global.get_language(id)?.patterns,
		);

		const svelte_blocks = matches.filter((m) => m.pattern.name === 'svelte_block');
		assert.ok(svelte_blocks.length >= 2); // Should match the each block correctly
	});

	test('handles script tags with attributes', () => {
		const html = `
<script type="module" lang="ts">
  import { something } from '$lib/module.js';
</script>`;

		const boundaries = detect_boundaries(html);
		const script_boundary = boundaries.find((b) => b.type === 'script');

		assert.ok(script_boundary);
		const content = html.slice(script_boundary.start, script_boundary.end);
		assert.ok(content.includes('import'));
	});

	test('handles style tags with media queries', () => {
		const html = `
<style>
  @media (max-width: 600px) {
    body { font-size: 14px; }
  }
</style>`;

		const boundaries = detect_boundaries(html);
		const style_boundary = boundaries.find((b) => b.type === 'style');

		assert.ok(style_boundary);
		const content = html.slice(style_boundary.start, style_boundary.end);
		assert.ok(content.includes('@media'));
	});
});
