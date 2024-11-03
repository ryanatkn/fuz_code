import{a as l,t as b,e as $}from"../chunks/disclose-version.x8Kwb08J.js";import{c as s,o as k,s as u,r as e,t as j,q as h}from"../chunks/runtime.BV8fNuL_.js";import{s as w}from"../chunks/render.DgViPNrz.js";import{e as T,i as E}from"../chunks/string.CgiQkm2j.js";import{B as D}from"../chunks/Breadcrumb.BXV0qU0p.js";import{C}from"../chunks/Code.BTTS5pms.js";const H=`

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
`.trim(),L=`

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

`.trim(),O=[{content:H,lang:"json"},{content:_,lang:"html"},{content:v,lang:"css"},{content:x,lang:"ts"},{content:L,lang:"svelte"}];var P=b("<div><h2> </h2> <pre><!></pre></div>"),S=b('<main class="box w_100 svelte-1itab2p"><!> <div class="flex flex_wrap justify_content_space_around"></div></main>');function Y(t){var n=S(),m=s(n);D(m,{children:(o,r)=>{k();var a=$("🎨");l(o,a)},$$slots:{default:!0}});var p=u(m,2);T(p,21,()=>O,E,(o,r)=>{let a=()=>h(r).content,d=()=>h(r).lang;var c=P(),i=s(c),f=s(i,!0);e(i);var g=u(i,2),y=s(g);C(y,{get content(){return a()},get lang(){return d()}}),e(g),e(c),j(()=>w(f,d())),l(o,c)}),e(p),e(n),l(t,n)}export{Y as component};
