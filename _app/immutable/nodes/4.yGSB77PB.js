import{t as b,a as l,d as $}from"../chunks/BIwJdAGd.js";import{c as o,s as u,y as k,r as s,z as h,t as j}from"../chunks/ChH5WMfS.js";import{s as w}from"../chunks/C9nCr4_7.js";import{e as T}from"../chunks/HHKd7Ysr.js";import{B as E}from"../chunks/BPiOiXVC.js";import{C as D}from"../chunks/CBrqqfBX.js";const C=`

{
	"string": "a string",
	"number": 12345,
	"boolean": true,
	"null": null,
	"object": {
		"array": [1, "b", false]
	} // comments :D
}

`.trim(),_=`

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
<\/script>

<style type="text/css">
	.special::before {
		content: "< & >";
	}
</style>

<![CDATA[
	if (a < 0) alert("b");
	<not-a-tag>
]]>
`.trim(),v=`

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
`.trim(),x=`

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
`.trim(),H=`

<script lang="ts" module>
	export const HELLO = 'world';
<\/script>

<script lang="ts">
	import Thing from '$lib/Thing.svelte';

	interface Props {
		thing: Record<string, any>;
	}
	
	const {thing}: Props = $props();

	const thing_keys = $derived(Object.keys(thing));

${x.split(`
`).map(t=>`	${t}`).join(`
`)}
<\/script>

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

${_}

<style>
${v.split(`
`).map(t=>`	${t}`).join(`
`)}
</style>

`.trim(),L=[{content:C,lang:"json"},{content:_,lang:"html"},{content:v,lang:"css"},{content:x,lang:"ts"},{content:H,lang:"svelte"}];var O=b("<div><h2> </h2> <pre><!></pre></div>"),P=b('<main class="box w_100 svelte-1itab2p"><!> <div class="display_flex flex_wrap justify_content_space_around"></div></main>');function J(t){var r=P(),m=o(r);E(m,{children:(n,e)=>{k();var a=$("🎨");l(n,a)},$$slots:{default:!0}});var p=u(m,2);T(p,21,()=>L,({content:n,lang:e})=>e,(n,e)=>{let a=()=>h(e).content,d=()=>h(e).lang;var c=O(),i=o(c),y=o(i,!0);s(i);var g=u(i,2),f=o(g);D(f,{get content(){return a()},get lang(){return d()}}),s(g),s(c),j(()=>w(y,d())),l(n,c)}),s(p),s(r),l(t,r)}export{J as component};
