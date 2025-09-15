# SVELTE Complex Sample Report

## Sample Info

- **Language**: svelte
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.svelte
- **Size**: 2333 characters

## Statistics

### Boundaries

- **Total**: 7
- code: [0:25]
- embedded: [25:57]
- code: [57:86]
- embedded: [86:1268]
- code: [1268:1943]
- embedded: [1943:2324]
- code: [2324:2333]

### Matches

- **Total**: 549
- **By Type**:
  - tag: 35
  - punctuation: 248
  - attr_name: 16
  - attr_value: 14
  - operator: 89
  - keyword: 34
  - class_name: 17
  - function: 17
  - boolean: 5
  - type: 16
  - number: 14
  - template_expression: 2
  - svelte_expression: 16
  - svelte_block: 6
  - doctype: 1
  - comment: 1
  - selector: 8
  - property: 9
  - atrule: 1

## Sample Matches

- **tag** [0:7]: `<script`
- **punctuation** [0:1]: `<`
- **attr_name** [8:12]: `lang`
- **attr_value** [12:17]: `="ts"`
- **operator** [12:13]: `=`
- **punctuation** [24:25]: `>`
- **keyword** [27:33]: `export`
- **keyword** [34:39]: `const`
- **class_name** [40:45]: `HELLO`
- **operator** [46:47]: `=`

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

## Rangestyler Output

```html
<span class="token tag">&lt;script</span> <span class="token attr_name">lang</span
><span class="token attr_value">=&quot;ts&quot;</span> module<span class="token punctuation"
	>&gt;</span
>
<span class="token keyword">export</span> <span class="token keyword">const</span>
<span class="token class_name">HELLO</span>
<span class="token operator">=</span> &#039;world&#039;<span class="token punctuation">;</span>
<span class="token tag">&lt;/script</span><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;script</span> <span class="token attr_name">lang</span
><span class="token attr_value">=&quot;ts&quot;</span><span class="token punctuation">&gt;</span>
<span class="token operator">/</span><span class="token operator">/</span> @ts<span
	class="token operator"
	>-</span
>expect<span class="token operator">-</span>error <span class="token keyword">import</span>
<span class="token class_name">Thing</span> <span class="token keyword">from</span> &#039;$lib<span
	class="token operator"
	>/</span
><span class="token class_name">Thing</span
><span class="token punctuation">.</span>svelte&#039;<span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span>
<span class="token punctuation">{</span><span class="token class_name">Snippet</span
><span class="token punctuation">}</span>
<span class="token keyword">from</span> &#039;svelte&#039;<span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span> thing<span
	class="token punctuation"
	>,</span
>
bound <span class="token operator">=</span> $<span class="token function">bindable</span
><span class="token punctuation">(</span><span class="token boolean">true</span
><span class="token punctuation">)</span><span class="token punctuation">,</span> children<span
	class="token punctuation"
	>,</span
>
<span class="token punctuation">}</span><span class="token operator">:</span>
<span class="token punctuation">{</span> thing<span class="token operator">:</span>
<span class="token class_name">Record</span><span class="token operator">&lt;</span
><span class="token type">string</span><span class="token punctuation">,</span>
<span class="token type">any</span><span class="token operator">&gt;</span
><span class="token punctuation">;</span> bound<span class="token operator">?</span
><span class="token operator">:</span> <span class="token type">boolean</span
><span class="token punctuation">;</span> children<span class="token operator">:</span>
<span class="token class_name">Snippet</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> $<span
	class="token function"
	>props</span
><span class="token punctuation">(</span><span class="token punctuation">)</span
><span class="token punctuation">;</span>

<span class="token keyword">const</span> thing_keys <span class="token operator">=</span> $<span
	class="token function"
	>derived</span
><span class="token punctuation">(</span><span class="token class_name">Object</span
><span class="token punctuation">.</span><span class="token function">keys</span
><span class="token punctuation">(</span>thing<span class="token punctuation">)</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> a <span class="token operator">=</span>
<span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> &#039;b&#039;<span
	class="token punctuation"
	>;</span
>

<span class="token keyword">let</span> c<span class="token operator">:</span>
<span class="token type">boolean</span> <span class="token operator">=</span> $<span
	class="token function"
	>state</span
><span class="token punctuation">(</span><span class="token boolean">true</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">type</span>
<span class="token class_name">Some_Type</span> <span class="token operator">=</span>
<span class="token number">1</span> <span class="token operator">|</span> &#039;b&#039;
<span class="token operator">|</span> <span class="token boolean">true</span
><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class_name">D</span>
<span class="token punctuation">{</span> d1<span class="token operator">:</span>
<span class="token type">string</span> <span class="token operator">=</span> &#039;d&#039;<span
	class="token punctuation"
	>;</span
>
d2<span class="token operator">:</span> <span class="token type">number</span
><span class="token punctuation">;</span> d3 <span class="token operator">=</span> $<span
	class="token function"
	>state</span
><span class="token punctuation">(</span><span class="token boolean">false</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">constructor</span><span class="token punctuation">(</span>d2<span
	class="token operator"
	>:</span
>
<span class="token type">number</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token keyword">this</span
><span class="token punctuation">.</span>d2 <span class="token operator">=</span> d2<span
	class="token punctuation"
	>;</span
>
<span class="token punctuation">}</span>

<span class="token function">class_method</span><span class="token punctuation">(</span
><span class="token punctuation">)</span><span class="token operator">:</span>
<span class="token type">string</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> `<span class="token class_name">Hello</span
><span class="token punctuation">,</span>
<span class="token template_expression">${this.d1}</span>`<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

instance_method <span class="token operator">=</span> <span class="token punctuation">(</span
><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span> <span class="token operator">/</span
><span class="token operator">*</span> <span class="token operator">...</span>
<span class="token operator">*</span><span class="token operator">/</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>#<span
	class="token function"
	>private_method</span
><span class="token punctuation">(</span><span class="token punctuation">)</span
><span class="token punctuation">;</span> <span class="token operator">/</span
><span class="token operator">/</span> foo <span class="token punctuation">}</span
><span class="token punctuation">;</span>

#<span class="token function">private_method</span><span class="token punctuation">(</span
><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">throw</span> <span class="token keyword">new</span>
<span class="token function">Error</span><span class="token punctuation">(</span>`<span
	class="token template_expression"
	>${this.d1}</span
>
etc`<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token function">protected_method</span
><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span> console<span class="token punctuation">.</span
><span class="token function">log</span><span class="token punctuation">(</span
><span class="token keyword">new</span> <span class="token function">Date</span
><span class="token punctuation">(</span><span class="token number">123</span
><span class="token punctuation">)</span><span class="token punctuation">)</span
><span class="token punctuation">;</span> <span class="token operator">/</span
><span class="token operator">/</span> eslint<span class="token operator">-</span>disable<span
	class="token operator"
	>-</span
>line no<span class="token operator">-</span>console
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token operator">/</span><span class="token operator">/</span> comment

<span class="token operator">/</span><span class="token operator">*</span>
other comment

<span class="token keyword">const</span> comment <span class="token operator">=</span>
<span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token operator">*</span><span class="token operator">/</span>

<span class="token operator">/</span><span class="token operator">**</span>
<span class="token operator">*</span> <span class="token class_name">JSDoc</span> comment
<span class="token operator">*</span><span class="token operator">/</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span>
<span class="token class_name">Some_E</span> <span class="token punctuation">{</span> name<span
	class="token operator"
	>:</span
>
<span class="token type">string</span><span class="token punctuation">;</span> age<span
	class="token operator"
	>:</span
>
<span class="token type">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> some_e<span
	class="token operator"
	>:</span
>
<span class="token class_name">Some_E</span> <span class="token operator">=</span>
<span class="token punctuation">{</span>name<span class="token operator">:</span> &#039;<span
	class="token class_name"
	>A</span
><span class="token punctuation">.</span> <span class="token class_name">H</span
><span class="token punctuation">.</span>&#039;<span class="token punctuation">,</span> age<span
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
<span class="token type">number</span><span class="token punctuation">,</span> y<span
	class="token operator"
	>:</span
>
<span class="token type">number</span><span class="token punctuation">)</span
><span class="token operator">:</span> <span class="token type">number</span>
<span class="token punctuation">{</span> <span class="token keyword">return</span> x
<span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> plus
<span class="token operator">=</span> <span class="token punctuation">(</span>a<span
	class="token operator"
	>:</span
>
<span class="token type">any</span><span class="token punctuation">,</span> b<span
	class="token operator"
	>:</span
>
<span class="token type">any</span><span class="token punctuation">)</span
><span class="token operator">:</span> <span class="token type">any</span>
<span class="token operator">=&gt;</span> a <span class="token operator">+</span> b<span
	class="token punctuation"
	>;</span
>
<span class="token tag">&lt;/script</span><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;h1</span><span class="token punctuation">&gt;</span>hello
<span class="token svelte_expression">{HELLO}</span>!<span class="token tag">&lt;/h1</span
><span class="token punctuation">&gt;</span>

<span class="token svelte_block">{#each thing_keys as key (key)}</span>
<span class="token svelte_block">{@const value = thing[key]}</span>
<span class="token svelte_expression">{value}</span>
<span class="token svelte_block">{/each}</span>

<span class="token svelte_block">{#if c}</span>
<span class="token tag">&lt;Thing</span> <span class="token attr_name">string_prop</span
><span class="token attr_value">=&quot;a&quot;</span>
<span class="token attr_name">number_prop</span><span class="token attr_value">={1}</span>
<span class="token punctuation">/</span><span class="token punctuation">&gt;</span>
<span class="token svelte_block">{:else}</span>
<span class="token tag">&lt;Thing</span> <span class="token attr_name">string_prop</span
><span class="token attr_value">=&quot;b&quot;</span>
<span class="token attr_name">number_prop</span><span class="token attr_value">={2}</span>
<span class="token attr_name">onthing</span
><span class="token attr_value">={() =&gt; (c = !c)}</span
><span class="token punctuation">&gt;</span>
<span class="token svelte_expression">{@render children()}</span>
<span class="token tag">&lt;/Thing</span><span class="token punctuation">&gt;</span>
<span class="token svelte_block">{/if}</span>

<span class="token doctype">&lt;!DOCTYPE html&gt;</span>

<span class="token tag">&lt;div</span> <span class="token attr_name">class</span
><span class="token attr_value">=&quot;test special&quot;</span>
<span class="token attr_name">id</span><span class="token attr_value">=&quot;unique_id&quot;</span
><span class="token punctuation">&gt;</span> <span class="token tag">&lt;p</span
><span class="token punctuation">&gt;</span>hello world!<span class="token tag">&lt;/p</span
><span class="token punctuation">&gt;</span> <span class="token tag">&lt;/div</span
><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;p</span> <span class="token attr_name">class</span
><span class="token attr_value">=&quot;some_class hypen-class&quot;</span
><span class="token punctuation">&gt;</span> some <span class="token tag">&lt;span</span>
<span class="token attr_name">class</span><span class="token attr_value">=&quot;a b c&quot;</span
><span class="token punctuation">&gt;</span>text<span class="token tag">&lt;/span</span
><span class="token punctuation">&gt;</span> <span class="token tag">&lt;/p</span
><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;button</span> <span class="token attr_name">type</span
><span class="token attr_value">=&quot;button&quot;</span> disabled<span class="token punctuation"
	>&gt;</span
>
click me <span class="token tag">&lt;/button</span><span class="token punctuation">&gt;</span>

<span class="token comment">&lt;!-- comment &lt;div&gt;a&lt;br /&gt; b&lt;/div&gt; --&gt;</span>
<span class="token svelte_expression">{a}</span>
<span class="token svelte_expression">{b}</span>
<span class="token svelte_expression">{bound}</span>
<span class="token svelte_expression">{D}</span>

<span class="token tag">&lt;br</span> <span class="token punctuation">/</span
><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;hr</span> <span class="token punctuation">/</span
><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;img</span> <span class="token attr_name">src</span
><span class="token attr_value">=&quot;image.jpg&quot;</span>
<span class="token attr_name">alt</span><span class="token attr_value">=&quot;access&quot;</span>
<span class="token punctuation">/</span><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;ul</span><span class="token punctuation">&gt;</span>
<span class="token tag">&lt;li</span><span class="token punctuation">&gt;</span>list item 1<span
	class="token tag"
	>&lt;/li</span
><span class="token punctuation">&gt;</span> <span class="token tag">&lt;li</span
><span class="token punctuation">&gt;</span>list item 2<span class="token tag">&lt;/li</span
><span class="token punctuation">&gt;</span> <span class="token tag">&lt;/ul</span
><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;style</span><span class="token punctuation">&gt;</span>
<span class="token selector">.some_class</span> <span class="token punctuation">{</span>
<span class="token property">color</span><span class="token punctuation">:</span> red<span
	class="token punctuation"
	>;</span
>
<span class="token punctuation">}</span>

<span class="token selector">.hypen-class</span> <span class="token punctuation">{</span>
<span class="token property">font-size</span><span class="token punctuation">:</span>
<span class="token number">16px</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">p</span> <span class="token punctuation">{</span>
<span class="token property">box-shadow</span><span class="token punctuation">:</span>
<span class="token number">0</span> <span class="token number">0</span>
<span class="token number">10px</span> <span class="token function">rgba</span
><span class="token punctuation">(</span><span class="token number">0</span
><span class="token punctuation">,</span> <span class="token number">0</span
><span class="token punctuation">,</span> <span class="token number">0</span
><span class="token punctuation">,</span> <span class="token number">0.1</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">/* comment */ /* multi line &lt;comment&gt; */ #unique_id</span>
<span class="token punctuation">{</span> <span class="token property">background-color</span
><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div &gt; p</span> <span class="token punctuation">{</span>
<span class="token property">margin</span><span class="token punctuation">:</span>
<span class="token number">10px</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule">@media (max-width: 600px)</span>
<span class="token punctuation">{</span> <span class="token selector">:global(body)</span>
<span class="token punctuation">{</span> <span class="token property">background-color</span
><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.special::before</span> <span class="token punctuation">{</span>
<span class="token property">content</span><span class="token punctuation">:</span> &#039;&lt; &amp;
&gt;&#039;<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token tag">&lt;/style</span><span class="token punctuation">&gt;</span>
```

## Comparison

- Domstyler size: 23839 bytes
- Rangestyler size: 18582 bytes
- Size difference: 5257 bytes

---

_Generated by src/generated/update.task.ts_
