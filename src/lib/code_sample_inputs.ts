// see `styled_json_code` in `./code_sample_outputs.js`
// for the result of `stylize(sample_json_code, Syntax_Styler.langs.json, 'json')`
export const sample_json_code = `

{
	"string": "a string",
	"number": 12345,
	"boolean": true,
	"null": null,
	"object": {
		"array": [1, "b", false]
	} // comments :D
}

`.trim();

// see `styled_html_code` in `./code_sample_outputs.js`
// for the result of `stylize(sample_html_code, Syntax_Styler.langs.markup, 'html')`
export const sample_html_code = `

<!DOCTYPE html>

<div class="test">
	<p>hello world!</p>
</div>

<p class="some_class dash-class">
	some <span class="a b c">text</span>
</p>

<button type="button" disabled>
	click me
</button>

<!-- comment <div>a<br /> b</div> -->

<br>

<hr />

<img src="image.jpg" alt="access">

<ul>
	<li>list item 1</li>
	<li>list item 2</li>
</ul>

<script type="text/javascript">
	const ok = 'yes';
</script>

<style type="text/css">
	.special::before {
		content: "< & >";
	}
</style>

<![CDATA[
	if (a < 0) alert("b");
	<not-a-tag>
]]>
`.trim();

// see `styled_css_code` in `./code_sample_outputs.js`
// for the result of `stylize(sample_css_code, Syntax_Styler.langs.css, 'css')`
export const sample_css_code = `

.some_class {
	color: red;
}

.dash-class {
	font-size: 16px;
}

p {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* comment */

/*
multi
line

<comment>

*/

#unique_id {
	background-color: blue;
}

div > p {
	margin: 10px;
}

@media (max-width: 600px) {
	body {
		background-color: lightblue;
	}
}
`.trim();

// see `styled_ts_code` in `./code_sample_outputs.js`
// for the result of `stylize(sample_ts_code, Syntax_Styler.langs.ts, 'ts')`
export const sample_ts_code = `

const a = 1;

const b = 'b';

const c = true;

export type Some_Type = 1 | 'b' | true;

class D {
	d1: string = 'd';
	d2: number;
	d3 = $state(false);

	constructor(d2: number) {
		this.d2 = d2;
	}

	class_method(): string {
		return \`Hello, \${this.d1}\`;
	}

	instance_method = () => { /* ... */ };

	#private_method() {
		throw new Error(\`\${this.d1} etc\`);
	}

	protected protected_method() {
		console.log(new RegExp('protected'));
	}
}

// comment

/*
other comment

const comment = false;
*/

/**
 * JSDoc comment
 */

export interface Some_E {
	name: string;
	age: number;
}

export const some_e: Some_E = {name: 'A. H.', age: 100};

export function add(x: number, y: number): number {
	return x + y;
}

export const plus = (a: any, b: any): any => a + b;
`.trim();

// see `styled_css_code` in `./code_sample_outputs.js`
// for the result of `stylize(sample_svelte_code, Syntax_Styler.langs.svelte, 'svelte')`
export const sample_svelte_code = `

<script lang="ts" module>
	export const HELLO = 'world';
</script>

<script lang="ts">
	import Thing from '$lib/Thing.svelte';

	interface Props {
		thing: Record<string, any>;
	}
	
	const {thing}: Props = $props();

	const thing_keys = $derived(Object.keys(thing));

${sample_ts_code
	.split('\n')
	.map((line) => `	${line}`)
	.join('\n')}
</script>

<h1>hello {HELLO}!</h1>

{#each thing_keys as key (key)}
	{@const value = thing[key]}
	{value}
{/each}

{#if true}
	<Thing string_prop="a" number_prop={1} />
{:else}
	<Thing string_prop="b" number_prop={2}>
		{@render children()}
	</Thing>
{/if}

${sample_html_code}

<style>
${sample_css_code
	.split('\n')
	.map((line) => `	${line}`)
	.join('\n')}
</style>

`.trim();

export const samples = [
	{
		content: sample_json_code,
		lang: 'json',
	},
	{
		content: sample_html_code,
		lang: 'html',
	},
	{
		content: sample_css_code,
		lang: 'css',
	},
	{
		content: sample_ts_code,
		lang: 'ts',
	},
	{
		content: sample_svelte_code,
		lang: 'svelte',
	},
];
