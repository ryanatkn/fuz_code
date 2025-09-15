# SVELTE Complex Sample Report

## Sample Info

- **Language**: svelte
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.svelte
- **Size**: 2333 characters

## Statistics

### Boundaries

- **Total**: 1
- code: [0:2333]

## Domstyler Output

```html
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>script</span>
	<span class="token attr_name">lang</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>ts<span
			class="token punctuation"
			>"</span
		></span
	>
	<span class="token attr_name">module</span><span class="token punctuation">></span></span
><span class="token script"
	><span class="token lang_ts">
		<span class="token keyword">export</span> <span class="token keyword">const</span>
		<span class="token constant">HELLO</span> <span class="token operator">=</span>
		<span class="token string">'world'</span><span class="token punctuation">;</span>
	</span></span
><span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>script</span
	><span class="token punctuation">></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>script</span>
	<span class="token attr_name">lang</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>ts<span
			class="token punctuation"
			>"</span
		></span
	><span class="token punctuation">></span></span
><span class="token script"
	><span class="token lang_ts">
		<span class="token comment">// @ts-expect-error</span>
		<span class="token keyword">import</span> Thing <span class="token keyword">from</span>
		<span class="token string">'$lib/Thing.svelte'</span><span class="token punctuation">;</span>
		<span class="token keyword">import</span> <span class="token keyword">type</span>
		<span class="token punctuation">{</span>Snippet<span class="token punctuation">}</span>
		<span class="token keyword">from</span> <span class="token string">'svelte'</span
		><span class="token punctuation">;</span>

		<span class="token keyword">const</span> <span class="token punctuation">{</span> thing<span
			class="token punctuation"
			>,</span
		>
		bound <span class="token operator">=</span> <span class="token function">$bindable</span
		><span class="token punctuation">(</span><span class="token boolean">true</span
		><span class="token punctuation">)</span><span class="token punctuation">,</span> children<span
			class="token punctuation"
			>,</span
		>
		<span class="token punctuation">}</span><span class="token operator">:</span>
		<span class="token punctuation">{</span> thing<span class="token operator">:</span> Record<span
			class="token operator"
			>&lt;</span
		><span class="token builtin">string</span><span class="token punctuation">,</span>
		<span class="token builtin">any</span><span class="token operator">></span
		><span class="token punctuation">;</span> bound<span class="token operator">?</span
		><span class="token operator">:</span> <span class="token builtin">boolean</span
		><span class="token punctuation">;</span> children<span class="token operator">:</span>
		Snippet<span class="token punctuation">;</span> <span class="token punctuation">}</span>
		<span class="token operator">=</span> <span class="token function">$props</span
		><span class="token punctuation">(</span><span class="token punctuation">)</span
		><span class="token punctuation">;</span>

		<span class="token keyword">const</span> thing_keys <span class="token operator">=</span>
		<span class="token function">$derived</span><span class="token punctuation">(</span>Object<span
			class="token punctuation"
			>.</span
		><span class="token function">keys</span><span class="token punctuation">(</span>thing<span
			class="token punctuation"
			>)</span
		><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">const</span> a <span class="token operator">=</span>
		<span class="token number">1</span><span class="token punctuation">;</span>

		<span class="token keyword">const</span> b <span class="token operator">=</span>
		<span class="token string">'b'</span><span class="token punctuation">;</span>

		<span class="token keyword">let</span> c<span class="token operator">:</span>
		<span class="token builtin">boolean</span> <span class="token operator">=</span>
		<span class="token function">$state</span><span class="token punctuation">(</span
		><span class="token boolean">true</span><span class="token punctuation">)</span
		><span class="token punctuation">;</span>

		<span class="token keyword">export</span> <span class="token keyword">type</span>
		<span class="token class_name">Some_Type</span> <span class="token operator">=</span>
		<span class="token number">1</span> <span class="token operator">|</span>
		<span class="token string">'b'</span> <span class="token operator">|</span>
		<span class="token boolean">true</span><span class="token punctuation">;</span>

		<span class="token keyword">class</span>
		<span class="token class_name"><span class="token constant">D</span></span>
		<span class="token punctuation">{</span> d1<span class="token operator">:</span>
		<span class="token builtin">string</span> <span class="token operator">=</span>
		<span class="token string">'d'</span><span class="token punctuation">;</span> d2<span
			class="token operator"
			>:</span
		>
		<span class="token builtin">number</span><span class="token punctuation">;</span> d3
		<span class="token operator">=</span> <span class="token function">$state</span
		><span class="token punctuation">(</span><span class="token boolean">false</span
		><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token function">constructor</span><span class="token punctuation">(</span>d2<span
			class="token operator"
			>:</span
		>
		<span class="token builtin">number</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span> <span class="token keyword">this</span
		><span class="token punctuation">.</span>d2 <span class="token operator">=</span> d2<span
			class="token punctuation"
			>;</span
		>
		<span class="token punctuation">}</span>

		<span class="token function">class_method</span><span class="token punctuation">(</span
		><span class="token punctuation">)</span><span class="token operator">:</span>
		<span class="token builtin">string</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
		<span class="token template_string"
			><span class="token template_punctuation string">`</span
			><span class="token string">Hello, </span
			><span class="token interpolation"
				><span class="token interpolation_punctuation punctuation">${</span
				><span class="token keyword">this</span><span class="token punctuation">.</span>d1<span
					class="token interpolation_punctuation punctuation"
					>}</span
				></span
			><span class="token template_punctuation string">`</span></span
		><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token function_variable function">instance_method</span>
		<span class="token operator">=</span> <span class="token punctuation">(</span
		><span class="token punctuation">)</span> <span class="token operator">=></span>
		<span class="token punctuation">{</span>
		<span class="token comment">/* ... */</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span
		><span class="token function">#private_method</span><span class="token punctuation">(</span
		><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// foo</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>

		<span class="token function">#private_method</span><span class="token punctuation">(</span
		><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">throw</span> <span class="token keyword">new</span>
		<span class="token class_name">Error</span><span class="token punctuation">(</span
		><span class="token template_string"
			><span class="token template_punctuation string">`</span
			><span class="token interpolation"
				><span class="token interpolation_punctuation punctuation">${</span
				><span class="token keyword">this</span><span class="token punctuation">.</span>d1<span
					class="token interpolation_punctuation punctuation"
					>}</span
				></span
			><span class="token string"> etc</span
			><span class="token template_punctuation string">`</span></span
		><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">protected</span> <span class="token function">protected_method</span
		><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span> <span class="token builtin">console</span
		><span class="token punctuation">.</span><span class="token function">log</span
		><span class="token punctuation">(</span><span class="token keyword">new</span>
		<span class="token class_name">Date</span><span class="token punctuation">(</span
		><span class="token number">123</span><span class="token punctuation">)</span
		><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// eslint-disable-line no-console</span>
		<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// comment</span>

		<span class="token comment">/* other comment const comment = false; */</span>

		<span class="token comment">/** * JSDoc comment */</span>

		<span class="token keyword">export</span> <span class="token keyword">interface</span>
		<span class="token class_name">Some_E</span> <span class="token punctuation">{</span> name<span
			class="token operator"
			>:</span
		>
		<span class="token builtin">string</span><span class="token punctuation">;</span> age<span
			class="token operator"
			>:</span
		>
		<span class="token builtin">number</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">export</span> <span class="token keyword">const</span> some_e<span
			class="token operator"
			>:</span
		>
		Some_E <span class="token operator">=</span> <span class="token punctuation">{</span>name<span
			class="token operator"
			>:</span
		>
		<span class="token string">'A. H.'</span><span class="token punctuation">,</span> age<span
			class="token operator"
			>:</span
		>
		<span class="token number">100</span><span class="token punctuation">}</span
		><span class="token punctuation">;</span>

		<span class="token keyword">export</span> <span class="token keyword">function</span>
		<span class="token function">add</span><span class="token punctuation">(</span>x<span
			class="token operator"
			>:</span
		>
		<span class="token builtin">number</span><span class="token punctuation">,</span> y<span
			class="token operator"
			>:</span
		>
		<span class="token builtin">number</span><span class="token punctuation">)</span
		><span class="token operator">:</span> <span class="token builtin">number</span>
		<span class="token punctuation">{</span> <span class="token keyword">return</span> x
		<span class="token operator">+</span> y<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">export</span> <span class="token keyword">const</span> plus
		<span class="token operator">=</span> <span class="token punctuation">(</span>a<span
			class="token operator"
			>:</span
		>
		<span class="token builtin">any</span><span class="token punctuation">,</span> b<span
			class="token operator"
			>:</span
		>
		<span class="token builtin">any</span><span class="token punctuation">)</span
		><span class="token operator">:</span> <span class="token builtin">any</span>
		<span class="token operator">=></span> a <span class="token operator">+</span> b<span
			class="token punctuation"
			>;</span
		>
	</span></span
><span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>script</span
	><span class="token punctuation">></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>h1</span
	><span class="token punctuation">></span></span
>hello
<span class="token lang_ts"
	><span class="token punctuation">{</span><span class="token constant">HELLO</span
	><span class="token punctuation">}</span></span
>!<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span
	><span class="token punctuation">></span></span
>

<span class="token each"
	><span class="token punctuation">{</span><span class="token keyword">#each</span>
	<span class="token lang_ts">thing_keys </span><span class="token keyword">as</span>
	<span class="token lang_ts">key </span
	><span class="token lang_ts"
		><span class="token punctuation">(</span>key<span class="token punctuation">)</span></span
	><span class="token punctuation">}</span></span
>
<span class="token lang_ts"
	><span class="token punctuation">{</span>@<span class="token keyword">const</span> value
	<span class="token operator">=</span> thing<span class="token punctuation">[</span>key<span
		class="token punctuation"
		>]</span
	><span class="token punctuation">}</span></span
>
<span class="token lang_ts"
	><span class="token punctuation">{</span>value<span class="token punctuation">}</span></span
>
<span class="token each"
	><span class="token punctuation">{</span><span class="token keyword">/each</span
	><span class="token punctuation">}</span></span
>

<span class="token lang_ts"
	><span class="token punctuation">{</span>#<span class="token keyword">if</span> c<span
		class="token punctuation"
		>}</span
	></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>Thing</span>
	<span class="token attr_name">string_prop</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>a<span
			class="token punctuation"
			>"</span
		></span
	>
	<span class="token attr_name">number_prop=</span
	><span class="token lang_ts"
		><span class="token punctuation">{</span><span class="token number">1</span
		><span class="token punctuation">}</span></span
	>
	<span class="token punctuation">/></span></span
>
<span class="token lang_ts"
	><span class="token punctuation">{</span><span class="token operator">:</span
	><span class="token keyword">else</span><span class="token punctuation">}</span></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>Thing</span>
	<span class="token attr_name">string_prop</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>b<span
			class="token punctuation"
			>"</span
		></span
	>
	<span class="token attr_name">number_prop=</span
	><span class="token lang_ts"
		><span class="token punctuation">{</span><span class="token number">2</span
		><span class="token punctuation">}</span></span
	>
	<span class="token attr_name">onthing=</span
	><span class="token lang_ts"
		><span class="token punctuation">{</span><span class="token punctuation">(</span
		><span class="token punctuation">)</span> <span class="token operator">=></span>
		<span class="token punctuation">(</span>c <span class="token operator">=</span>
		<span class="token operator">!</span>c<span class="token punctuation">)</span
		><span class="token punctuation">}</span></span
	><span class="token punctuation">></span></span
>
<span class="token lang_ts"
	><span class="token punctuation">{</span
	><span class="token decorator"
		><span class="token at operator">@</span><span class="token function">render</span></span
	>
	<span class="token function">children</span><span class="token punctuation">(</span
	><span class="token punctuation">)</span><span class="token punctuation">}</span></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>Thing</span
	><span class="token punctuation">></span></span
>
<span class="token lang_ts"
	><span class="token punctuation">{</span><span class="token operator">/</span
	><span class="token keyword">if</span><span class="token punctuation">}</span></span
>

<span class="token doctype">&lt;!DOCTYPE html></span>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
	<span class="token attr_name">class</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>test
		special<span class="token punctuation">"</span></span
	>
	<span class="token attr_name">id</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>unique_id<span
			class="token punctuation"
			>"</span
		></span
	><span class="token punctuation">></span></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>p</span
	><span class="token punctuation">></span></span
>hello world!<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>p</span
	><span class="token punctuation">></span></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>div</span
	><span class="token punctuation">></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>p</span>
	<span class="token attr_name">class</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>some_class
		hypen-class<span class="token punctuation">"</span></span
	><span class="token punctuation">></span></span
>
some
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>span</span>
	<span class="token attr_name">class</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>a b c<span
			class="token punctuation"
			>"</span
		></span
	><span class="token punctuation">></span></span
>text<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>span</span
	><span class="token punctuation">></span></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>p</span
	><span class="token punctuation">></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
	<span class="token attr_name">type</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span
			class="token punctuation"
			>"</span
		></span
	>
	<span class="token attr_name">disabled</span><span class="token punctuation">></span></span
>
click me
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>button</span
	><span class="token punctuation">></span></span
>

<span class="token comment">&lt;!-- comment &lt;div>a&lt;br /> b&lt;/div> --></span>
<span class="token lang_ts"
	><span class="token punctuation">{</span>a<span class="token punctuation">}</span></span
>
<span class="token lang_ts"
	><span class="token punctuation">{</span>b<span class="token punctuation">}</span></span
>
<span class="token lang_ts"
	><span class="token punctuation">{</span>bound<span class="token punctuation">}</span></span
>
<span class="token lang_ts"
	><span class="token punctuation">{</span><span class="token constant">D</span
	><span class="token punctuation">}</span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>br</span>
	<span class="token punctuation">/></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>hr</span>
	<span class="token punctuation">/></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
	<span class="token attr_name">src</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>image.jpg<span
			class="token punctuation"
			>"</span
		></span
	>
	<span class="token attr_name">alt</span
	><span class="token attr_value"
		><span class="token punctuation">=</span><span class="token punctuation">"</span>access<span
			class="token punctuation"
			>"</span
		></span
	>
	<span class="token punctuation">/></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>ul</span
	><span class="token punctuation">></span></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>li</span
	><span class="token punctuation">></span></span
>list item 1<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>li</span
	><span class="token punctuation">></span></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>li</span
	><span class="token punctuation">></span></span
>list item 2<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>li</span
	><span class="token punctuation">></span></span
>
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span
	><span class="token punctuation">></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>style</span
	><span class="token punctuation">></span></span
><span class="token style"
	><span class="token lang_css">
		<span class="token selector">.some_class</span> <span class="token punctuation">{</span>
		<span class="token property">color</span><span class="token punctuation">:</span> red<span
			class="token punctuation"
			>;</span
		>
		<span class="token punctuation">}</span>

		<span class="token selector">.hypen-class</span> <span class="token punctuation">{</span>
		<span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span
			class="token punctuation"
			>;</span
		>
		<span class="token punctuation">}</span>

		<span class="token selector">p</span> <span class="token punctuation">{</span>
		<span class="token property">box-shadow</span><span class="token punctuation">:</span> 0 0 10px
		<span class="token function">rgba</span><span class="token punctuation">(</span>0<span
			class="token punctuation"
			>,</span
		>
		0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.1<span
			class="token punctuation"
			>)</span
		><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">/* comment */</span>

		<span class="token comment">/* multi line &lt;comment> */</span>

		<span class="token selector">#unique_id</span> <span class="token punctuation">{</span>
		<span class="token property">background-color</span
		><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token selector">div > p</span> <span class="token punctuation">{</span>
		<span class="token property">margin</span><span class="token punctuation">:</span> 10px<span
			class="token punctuation"
			>;</span
		>
		<span class="token punctuation">}</span>

		<span class="token atrule"
			><span class="token rule">@media</span> <span class="token punctuation">(</span
			><span class="token property">max-width</span
			><span class="token punctuation">:</span> 600px<span class="token punctuation">)</span></span
		>
		<span class="token punctuation">{</span> <span class="token selector">:global(body)</span>
		<span class="token punctuation">{</span> <span class="token property">background-color</span
		><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token selector">.special::before</span> <span class="token punctuation">{</span>
		<span class="token property">content</span><span class="token punctuation">:</span>
		<span class="token string">'&lt; &amp; >'</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	</span></span
><span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>style</span
	><span class="token punctuation">></span></span
>
```

## Boundary Scanner Output

```html
&lt;script lang=&quot;ts&quot; module&gt; export const HELLO = &#039;world&#039;; &lt;/script&gt;
&lt;script lang=&quot;ts&quot;&gt; // @ts-expect-error import Thing from
&#039;$lib/Thing.svelte&#039;; import type {Snippet} from &#039;svelte&#039;; const { thing, bound =
$bindable(true), children, }: { thing: Record&lt;string, any&gt;; bound?: boolean; children:
Snippet; } = $props(); const thing_keys = $derived(Object.keys(thing)); const a = 1; const b =
&#039;b&#039;; let c: boolean = $state(true); export type Some_Type = 1 | &#039;b&#039; | true;
class D { d1: string = &#039;d&#039;; d2: number; d3 = $state(false); constructor(d2: number) {
this.d2 = d2; } class_method(): string { return `Hello, ${this.d1}`; } instance_method = () =&gt; {
/* ... */ this.#private_method(); // foo }; #private_method() { throw new Error(`${this.d1} etc`); }
protected protected_method() { console.log(new Date(123)); // eslint-disable-line no-console } } //
comment /* other comment const comment = false; */ /** * JSDoc comment */ export interface Some_E {
name: string; age: number; } export const some_e: Some_E = {name: &#039;A. H.&#039;, age: 100};
export function add(x: number, y: number): number { return x + y; } export const plus = (a: any, b:
any): any =&gt; a + b; &lt;/script&gt; &lt;h1&gt;hello {HELLO}!&lt;/h1&gt; {#each thing_keys as key
(key)} {@const value = thing[key]} {value} {/each} {#if c} &lt;Thing string_prop=&quot;a&quot;
number_prop={1} /&gt; {:else} &lt;Thing string_prop=&quot;b&quot; number_prop={2} onthing={() =&gt;
(c = !c)}&gt; {@render children()} &lt;/Thing&gt; {/if} &lt;!DOCTYPE html&gt; &lt;div
class=&quot;test special&quot; id=&quot;unique_id&quot;&gt; &lt;p&gt;hello world!&lt;/p&gt;
&lt;/div&gt; &lt;p class=&quot;some_class hypen-class&quot;&gt; some &lt;span class=&quot;a b
c&quot;&gt;text&lt;/span&gt; &lt;/p&gt; &lt;button type=&quot;button&quot; disabled&gt; click me
&lt;/button&gt; &lt;!-- comment &lt;div&gt;a&lt;br /&gt; b&lt;/div&gt; --&gt; {a} {b} {bound} {D}
&lt;br /&gt; &lt;hr /&gt; &lt;img src=&quot;image.jpg&quot; alt=&quot;access&quot; /&gt; &lt;ul&gt;
&lt;li&gt;list item 1&lt;/li&gt; &lt;li&gt;list item 2&lt;/li&gt; &lt;/ul&gt; &lt;style&gt;
.some_class { color: red; } .hypen-class { font-size: 16px; } p { box-shadow: 0 0 10px rgba(0, 0, 0,
0.1); } /* comment */ /* multi line &lt;comment&gt; */ #unique_id { background-color: blue; } div
&gt; p { margin: 10px; } @media (max-width: 600px) { :global(body) { background-color: lightblue; }
} .special::before { content: &#039;&lt; &amp; &gt;&#039;; } &lt;/style&gt;
```

## Comparison

- Domstyler size: 23839 bytes
- Boundary Scanner size: 2767 bytes

---

_Generated by src/fixtures/update.task.ts_
