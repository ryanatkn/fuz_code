var W=Object.defineProperty;var D=n=>{throw TypeError(n)};var Z=(n,e,t)=>e in n?W(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var N=(n,e,t)=>Z(n,typeof e!="symbol"?e+"":e,t),$=(n,e,t)=>e.has(n)||D("Cannot "+t);var z=(n,e,t)=>e.has(n)?D("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);var j=(n,e,t)=>($(n,e,"access private method"),t);import"./CWj6FrbW.js";import{o as ee,s as te}from"./Dk1ub_2X.js";import{p as ne,as as oe,J as l,aD as se,K as S,L as b,a as f,f as ae,d as ie,r as le,Y as re,b as p,M as J,c as ce,G as de,t as me}from"./DXl8ODdu.js";import{p as H,i as C}from"./BuRgqgNv.js";import{h as pe}from"./CYSIQ6V0.js";import{s as he,t as ge,e as _e}from"./Cksm_Bk9.js";import{b as O,C as ue}from"./CfeaUy-c.js";import{b as be}from"./BkKNNs0a.js";const je={json_complex:{name:"json_complex",lang:"json",content:`{
	"string": "a string",
	"number": 12345,
	"boolean": true,
	"null": null,
	"empty": "",
	"escaped": "quote: \\"test\\" and backslash: \\\\",
	"object": {
		"array": [1, "b", false],
		"strings": ["1", "2", "3"],
		"mixed": ["start", 123, true, "middle", null, "end"],
		"nested": [["a", "str", ""], {"key": "nested value"}]
	}
}
`},css_complex:{name:"css_complex",lang:"css",content:`.some_class {
	color: red;
}

.hypen-class {
	font-size: 16px;
}

p {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* comment */

/*
multi
.line {
	i: 100px

</style>

@media*/

#id {
	background-color: blue;
}

div > p {
	margin: 10px;
}

@media (max-width: 600px) {
	body {
		background-color: light-dark(lightblue, darkblue);
	}
}

.content::before {
	/* prettier-ignore */
	content: "</style> /* not a comment */";
}

.attr[title='Click: here'] {
	background-image: url('data:image/svg+xml...');
}
`},ts_complex:{name:"ts_complex",lang:"ts",content:`const a = 1;

const b: string = 'b';

const c = true;

export type Some_Type = 1 | 'b' | true;

declare const some_decorator: any;

abstract class Base {
	abstract abstract_method(): void;
}

/* eslint-disable no-console */

@some_decorator
class D extends Base {
	readonly d1: string = 'd';
	d2: number;
	d3 = $state(null);

	@some_decorator
	decorated = true;

	constructor(d2: number) {
		super();
		this.d2 = d2;
	}

	abstract_method(): void {
		// implementation
	}

	@some_decorator('example', {option: true})
	class_method(): string {
		return \`Hello, \${this.d1}\`;
	}

	instance_method = (): void => {
		/* ... */
		let i = 0;
		do {
			i++;
		} while (i < 3);

		for (const c2 of this.d1) {
			if (c2 === 'd') continue;
			if (!c2) break;
			this.#private_method(a, c2);
		}

		switch (this.d1) {
			case 'a':
				console.log('case a');
				break;
			case 'b':
			case 'c':
				console.log('case b or c');
				break;
			default:
				console.log('default');
		}

		const obj: {has_d1?: boolean; is_d: boolean} = {
			has_d1: 'd1' in this,
			is_d: this instanceof D,
		};
		delete obj.has_d1;
		// foo
	};

	#private_method(a2: number, c2: any): void {
		throw new Error(\`\${this.d1}
			multiline
			etc \${a2 + c2}
		\`);
	}

	*generator(): Generator<number | Array<number>> {
		yield 1;
		yield* [2, 3];
	}

	async *async_generator(): AsyncGenerator<number> {
		yield await Promise.resolve(4);
	}

	protected async protected_method(): Promise<void> {
		try {
			await new Promise((resolve) => setTimeout(resolve, 100));
			if (Math.random() > 0.5) {
				console.log(new Date());
			} else if (Math.random() > 0.2) {
				console.log('else if branch');
			} else {
				console.log('else branch');
			}
		} catch (error: unknown) {
			console.error(error);
		} finally {
			console.log('finally block');
		}
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

import {sample_langs, type Sample_Lang} from '../code_sample.js';
import * as A from '../code_sample.js';

export {a, A, b, c, D};

sample_langs as unknown as Sample_Lang satisfies Sample_Lang;

export interface Some_E<T = null> {
	name: string;
	age: number;
	t?: T;
}

const e: {name: string; age: number} = {name: 'A. H.', age: 100};
const v = [['', e]] as const;
export const some_e: Map<string, Some_E> = new Map(v);

export function add(x: number, y: number): number {
	return x + y;
}

export const plus = (a: any, b: any): any => a + b;

// boundary test cases
export const str_with_keywords = 'const class function string';
export const str_with_comment = '// this is not a comment';
export const template_with_expr = \`Value: \${1 + 2}\`;

// regex that looks like comment
export const regex = /\\/\\/.*/g;
export const complex_regex = /^(?:\\/\\*.*?\\*\\/|\\/\\/.*|[^/])+$/;

// string in comment should not be highlighted as string
// const commented = "this string is in a comment";
`},html_complex:{name:"html_complex",lang:"html",content:`<!doctype html>

<div class="test">
	<p>hello world!</p>
</div>

<p class="some_class hypen-class">some <span class="a b c">text</span></p>

<button type="button" disabled>click me</button>

<!-- comment <div>a<br /> b</div> <script> -->

<br />

<hr onclick="console.log('hi')" />

<img src="image.jpg" alt="access" />

<ul>
	<li>list item 1</li>
	<li>list item 2</li>
</ul>

<form action="/submit" method="post">
	<input type="text" name="username" placeholder="Enter name" />
	<select name="option" data-role="dropdown">
		<option value="1">First</option>
		<option value="2">Second</option>
	</select>
</form>

<script>
	const ok = '<style>';
<\/script>

<style type="text/css">
	.special::before {
		content: '< & >';
	}
</style>

<![CDATA[ if (a < 0) alert("b"); <not-a-tag> ]]>
`},svelte_complex:{name:"svelte_complex",lang:"svelte",content:`<script lang="ts" module>
	export const HELLO = 'world';
<\/script>

<script lang="ts">
	// @ts-expect-error
	import Thing from '$lib/Thing.svelte';
	import type {Snippet} from 'svelte';

	const {
		thing,
		bound = $bindable(true),
		children,
		onclick,
	}: {
		thing: Record<string, any>;
		bound?: boolean;
		children: Snippet;
		onclick?: () => void;
	} = $props();

	const thing_keys = $derived(Object.entries(thing));

	const a = 1 as number;

	const b = 'b';

	let c: boolean = $state(true);

	const f = (p: any) => p;

	const attachment = (_p1: string, _p2: number) => {
		return (el: HTMLElement) => {
			element_ref !== el;
		};
	};

	let value = $state(thing['']);
	let element_ref: HTMLElement;
<\/script>

<h1 bind:this={element_ref}>hello {HELLO}!</h1>

{#each thing_keys as [k, { t, u }] (f(k))}
	{@const v = Math.round(t[k + f(u)])}
	{f(v)}
{/each}

{#if f(c)}
	<Thing string_prop="a {f('s')} b" number_prop={f(1)} />
{:else if f(a > 0)}
	bigger
{:else}
	<Thing string_prop="b" onthing={() => (c = f(!c))}>
		{@render children()}
	</Thing>
{/if}

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html '<strong>raw html</strong>'}

<input bind:value type="text" class:active={c} />

<span {@attach attachment('param', f(42))}>...</span>

{@render my_snippet('p')}

{#snippet my_snippet(p: string)}
	<button type="button" {onclick}>{p}</button>
{/snippet}

<p class="some_class hypen-class" id="unique_id">
	some <span class="a b c">text</span>
</p>

<button type="button" disabled> click me </button>

<!-- comment <div>a<br /> {b}</div> -->
{b.repeat(2)}
{bound}

<br />

<hr />

<img src="image.jpg" alt="access" />

<ul>
	<li>list item 1</li>
	<li>list item 2</li>
</ul>

<!-- embedded tags for boundary testing -->
<div>
	<script>
		const inline_js = 'no lang attr';
	<\/script>
	<style>
		.inline {
			color: blue;
		}
	</style>
</div>

<style>
	.some_class {
		color: red;
	}

	.hypen-class {
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

	@media (max-width: 600px) {
		:global(body) {
			background-color: light-dark(lightblue, darkblue);
		}
	}

	:global(.escapehatch)::before {
		content: '< & >';
	}
</style>
`},md_complex:{name:"md_complex",lang:"md",content:`# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Inline formatting

This is **bold text** and this is also __bold text__.

This is _italic text_ and this is also *italic text*.

This is ~~strikethrough text~~.

This is \`inline code\` with backticks.

This is a [link to example](https://example.com) in text.

## Lists

- list item 1
- list item 2
- list item 3

* alternative list item 1
* alternative list item 2
  - indented list item 1
  - indented list item 2
    - Deeply nested item

  - after a newline

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

> Another blockquote with **bold** and _italic_.

## Fenced Code Blocks

### TypeScript

\`\`\`ts
function add(a: number, b: number): number {
	return a + b;
}
\`\`\`

#### TypeScript with alias 'typescript'

\`\`\`typescript
interface User {
	name: string;
	age: number;
}

const user: User = {name: 'Alice', age: 30};
\`\`\`

### JS

\`\`\`js
function add(a, b) {
	return a + b;
}
\`\`\`

#### JS with alias 'javascript'

\`\`\`javascript
const fifteen = multiply(5, 3);
\`\`\`

### CSS

\`\`\`css
.container {
	display: flex;
	font-size: 14px;
}
\`\`\`

### HTML

\`\`\`html
<!doctype html>
<div class="test">
	<p>hello world!</p>
</div>

<button type="button" disabled>click me</button>

<!-- comment -->
\`\`\`

#### HTML with alias 'markup'

\`\`\`markup
<ul>
	<li>a</li>
	<li>b</li>
</ul>
\`\`\`

### JSON

\`\`\`json
{
	"key": "value",
	"array": [1, 2, 3, true, false, null]
}
\`\`\`

### Svelte

\`\`\`svelte
<script lang="ts">
	let count: number = $state(0);
	const increment = () => count++;
<\/script>

<button type="button" onclick={increment}>
	Count: {count}
</button>

<style>
	button {
		padding: 8px 16px;
	}
</style>
\`\`\`

### Unknown Language

\`\`\`python
def hello(name):
    print(f"Hello, {name}!")

hello("world")
\`\`\`

## Edge Cases

**bold** and **bold** in the same line.

_italic_ and _italic_ in the same line.

**bold** with _italic_ and ~~strikethrough~~ all mixed.

\`code\`, **bold**, _italic_ + [a link](https://example.com).

Not bold: ** spaces around **, ** spaces around **.

Not italic: _ spaces around _, _ spaces around _.

Not code: \`
multiline\`.

\`\`\`

Empty fence above.

\`\`\`unknownlang
Plain text for unknown language.
const variable = 2;
\`\`\`

Nested fences (3 to 5):

\`\`\`\`\`md
with \`five\` fences
\`\`\`\`md
with \`four\` fences
\`\`\`html
<style>
	body { color: red; }
</style>
\`\`\`
ending \`four\`
\`\`\`\`
another \`four\`
\`\`\`\`ts
const a = '5';
\`\`\`\`
ending \`five\`
\`\`\`\`\`

## HTML Support

Since Markdown extends HTML, raw HTML is also styled:

<div class="container">
	<p>This HTML is <strong>styled</strong> correctly!</p>
</div>

HTML can wrap code blocks:

<div>

\`\`\`ts
const example = 'embedded code';
\`\`\`

</div>
`}},fe={token_processing_instruction:1,token_doctype:1,token_cdata:1,token_punctuation:1,token_tag:2,token_constant:2,token_symbol:2,token_deleted:2,token_keyword:2,token_null:2,token_boolean:2,token_interpolation_punctuation:2,token_heading:2,token_heading_punctuation:2,token_tag_punctuation:2,token_comment:3,token_char:3,token_inserted:3,token_blockquote:3,token_blockquote_punctuation:3,token_builtin:4,token_class_name:4,token_number:4,token_attr_value:5,token_attr_quote:5,token_string:5,token_template_punctuation:5,token_inline_code:5,token_code_punctuation:5,token_attr_equals:6,token_selector:7,token_function:7,token_regex:7,token_important:7,token_variable:7,token_atrule:8,token_attr_name:9,token_property:9,token_decorator:9,token_decorator_name:9,token_link_text_wrapper:9,token_link_text:9,token_link_punctuation:9,token_special_keyword:10,token_namespace:10,token_rule:10,token_at_keyword:11,token_url:11,token_strikethrough:13,token_bold:14,token_italic:15},B=()=>{var n;return!!((n=globalThis.CSS)!=null&&n.highlights&&globalThis.Highlight)};var T,A;class ke{constructor(){z(this,T);N(this,"element_ranges");if(!B())throw Error("CSS Highlights API not supported");this.element_ranges=new Map}highlight_from_syntax_tokens(e,t){let o=null;for(const s of e.childNodes)if(s.nodeType===Node.TEXT_NODE){o=s;break}if(!o)throw new Error("no text node to highlight");this.clear_element_ranges();const c=new Map;j(this,T,A).call(this,t,o,c,0);for(const[s,a]of c){const r=`token_${s}`;this.element_ranges.set(r,a);let i=CSS.highlights.get(r);i||(i=new Highlight,i.priority=fe[r]??0,CSS.highlights.set(r,i));for(const m of a)i.add(m)}}clear_element_ranges(){for(const[e,t]of this.element_ranges){const o=CSS.highlights.get(e);if(!o)throw new Error("Expected to find CSS highlight: "+e);for(const c of t)o.delete(c);o.size===0&&CSS.highlights.delete(e)}this.element_ranges.clear()}destroy(){this.clear_element_ranges()}}T=new WeakSet,A=function(e,t,o,c){let s=c;for(const a of e){if(typeof a=="string"){s+=a.length;continue}const r=a.length,i=s+r;try{const m=new Range;m.setStart(t,s),m.setEnd(t,i);const k=a.type;o.has(k)||o.set(k,[]),o.get(k).push(m);for(const h of a.alias){o.has(h)||o.set(h,[]);const g=new Range;g.setStart(t,s),g.setEnd(t,i),o.get(h).push(g)}}catch(m){throw new Error(`Failed to create range for ${a.type}: ${m}`)}Array.isArray(a.content)&&j(this,T,A).call(this,a.content,t,o,s),s=i}return s};const P=B();var ye=ae("<code><!></code>");function Ce(n,e){ne(e,!0);const t=H(e,"lang",3,"svelte"),o=H(e,"mode",3,"auto"),c=H(e,"inline",3,!1),s=H(e,"syntax_styler",3,he);let a=se(void 0);const r=P?new ke:null,i=S(()=>P&&(o()==="ranges"||o()==="auto")),m=S(()=>c()?"span":"pre"),k=S(()=>t()!==null&&!!s().langs[t()]),h=S(()=>t()===null||!l(k)),g=S(()=>l(i)||!e.content||l(h)?"":s().stylize(e.content,t(),e.grammar));r&&oe(()=>{if(!l(a)||!e.content||!l(i)||l(h)){r.clear_element_ranges();return}const L=ge(e.content,e.grammar||s().get_lang(t()));r.highlight_from_syntax_tokens(l(a),L)}),ee(()=>{r==null||r.destroy()});var q=b(),R=f(q);_e(R,()=>l(m),!1,(L,F)=>{O(L,d=>({...e.pre_attrs,"data-lang":t(),[ue]:d}),[()=>({code:!0,inline:c(),pre:c()})],void 0,"svelte-9jvl7a");var y=ye();O(y,()=>({...e.code_attrs}),void 0,void 0,"svelte-9jvl7a");var G=ie(y);{var I=d=>{var v=b(),E=f(v);J(E,()=>e.children,()=>e.content),p(d,v)},U=d=>{var v=b(),E=f(v);{var K=_=>{var x=de();me(()=>te(x,e.content)),p(_,x)},V=_=>{var x=b(),X=f(x);{var Y=u=>{var w=b(),M=f(w);J(M,()=>e.children,()=>l(g)),p(u,w)},Q=u=>{var w=b(),M=f(w);pe(M,()=>l(g)),p(u,w)};C(X,u=>{e.children?u(Y):u(Q,!1)},!0)}p(_,x)};C(E,_=>{l(i)||l(h)?_(K):_(V,!1)},!0)}p(d,v)};C(G,d=>{l(i)&&e.children?d(I):d(U,!1)})}le(y),be(y,d=>re(a,d),()=>l(a)),p(F,y)}),p(n,q),ce()}export{Ce as C,je as s};
