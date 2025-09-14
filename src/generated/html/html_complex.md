# HTML Complex Sample Report

## Sample Info

- **Language**: html
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.html
- **Size**: 528 characters

## Statistics

### Boundaries

- **Total**: 5
- code: [0:371]
- embedded: [371:391]
- code: [391:425]
- embedded: [425:469]
- code: [469:528]

### Matches

- **Total**: 148
- **By Type**:
  - doctype: 1
  - tag: 30
  - punctuation: 85
  - attr_name: 8
  - attr_value: 8
  - operator: 9
  - comment: 1
  - keyword: 1
  - string: 1
  - selector: 1
  - property: 2
  - cdata: 1

## Sample Matches

- **doctype** [0:15]: `<!doctype html>`
- **tag** [0:9]: `<!doctype`
- **punctuation** [0:1]: `<`
- **punctuation** [14:15]: `>`
- **tag** [17:21]: `<div`
- **punctuation** [17:18]: `<`
- **attr_name** [22:27]: `class`
- **attr_value** [27:34]: `="test"`
- **operator** [27:28]: `=`
- **tag** [37:39]: `<p`

## Domstyler Output

```html
<span class="token doctype">&lt;!doctype html></span>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
	<span class="token attr_name">class</span
	><span class="token attr_value"
		><span class="token punctuation attr_equals">=</span
		><span class="token punctuation">"</span>test<span class="token punctuation">"</span></span
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
		><span class="token punctuation attr_equals">=</span
		><span class="token punctuation">"</span>some_class hypen-class<span class="token punctuation"
			>"</span
		></span
	><span class="token punctuation">></span></span
>some
<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>span</span>
	<span class="token attr_name">class</span
	><span class="token attr_value"
		><span class="token punctuation attr_equals">=</span><span class="token punctuation">"</span>a b
		c<span class="token punctuation">"</span></span
	><span class="token punctuation">></span></span
>text<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>span</span
	><span class="token punctuation">></span></span
><span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>p</span
	><span class="token punctuation">></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
	<span class="token attr_name">type</span
	><span class="token attr_value"
		><span class="token punctuation attr_equals">=</span
		><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span
	>
	<span class="token attr_name">disabled</span><span class="token punctuation">></span></span
>click me<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>button</span
	><span class="token punctuation">></span></span
>

<span class="token comment">&lt;!-- comment &lt;div>a&lt;br /> b&lt;/div> --></span>

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
		><span class="token punctuation attr_equals">=</span
		><span class="token punctuation">"</span>image.jpg<span class="token punctuation">"</span></span
	>
	<span class="token attr_name">alt</span
	><span class="token attr_value"
		><span class="token punctuation attr_equals">=</span
		><span class="token punctuation">"</span>access<span class="token punctuation">"</span></span
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
	><span class="token tag"><span class="token punctuation">&lt;</span>script</span>
	<span class="token attr_name">type</span
	><span class="token attr_value"
		><span class="token punctuation attr_equals">=</span
		><span class="token punctuation">"</span>text/javascript<span class="token punctuation"
			>"</span
		></span
	><span class="token punctuation">></span></span
><span class="token script"
	><span class="token lang_js">
		<span class="token keyword">const</span> ok <span class="token operator">=</span>
		<span class="token string">'yes'</span><span class="token punctuation">;</span>
	</span></span
><span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>script</span
	><span class="token punctuation">></span></span
>

<span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;</span>style</span>
	<span class="token attr_name">type</span
	><span class="token attr_value"
		><span class="token punctuation attr_equals">=</span
		><span class="token punctuation">"</span>text/css<span class="token punctuation">"</span></span
	><span class="token punctuation">></span></span
><span class="token style"
	><span class="token lang_css">
		<span class="token selector">.special::before</span> <span class="token punctuation">{</span>
		<span class="token property">content</span><span class="token punctuation">:</span>
		<span class="token string">'&lt; &amp; >'</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	</span></span
><span class="token tag"
	><span class="token tag"><span class="token punctuation">&lt;/</span>style</span
	><span class="token punctuation">></span></span
>

<span class="token cdata">&lt;![CDATA[ if (a &lt; 0) alert("b"); &lt;not-a-tag> ]]></span>
```

## Rangestyler Output

```html
<span class="token doctype">&lt;!doctype html&gt;</span>

<span class="token tag">&lt;div</span> <span class="token attr_name">class</span
><span class="token attr_value">=&quot;test&quot;</span><span class="token punctuation">&gt;</span>
<span class="token tag">&lt;p</span><span class="token punctuation">&gt;</span>hello world!<span
	class="token tag"
	>&lt;/p</span
><span class="token punctuation">&gt;</span> <span class="token tag">&lt;/div</span
><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;p</span> <span class="token attr_name">class</span
><span class="token attr_value">=&quot;some_class hypen-class&quot;</span
><span class="token punctuation">&gt;</span>some <span class="token tag">&lt;span</span>
<span class="token attr_name">class</span><span class="token attr_value">=&quot;a b c&quot;</span
><span class="token punctuation">&gt;</span>text<span class="token tag">&lt;/span</span
><span class="token punctuation">&gt;</span><span class="token tag">&lt;/p</span
><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;button</span> <span class="token attr_name">type</span
><span class="token attr_value">=&quot;button&quot;</span> disabled<span class="token punctuation"
	>&gt;</span
>click me<span class="token tag">&lt;/button</span><span class="token punctuation">&gt;</span>

<span class="token comment">&lt;!-- comment &lt;div&gt;a&lt;br /&gt; b&lt;/div&gt; --&gt;</span>

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

<span class="token tag">&lt;script</span> <span class="token attr_name">type</span
><span class="token attr_value">=&quot;text/javascript&quot;</span
><span class="token punctuation">&gt;</span> <span class="token keyword">const</span> ok
<span class="token operator">=</span> <span class="token string">&#039;yes&#039;</span
><span class="token punctuation">;</span> <span class="token tag">&lt;/script</span
><span class="token punctuation">&gt;</span>

<span class="token tag">&lt;style</span> <span class="token attr_name">type</span
><span class="token attr_value">=&quot;text/css&quot;</span
><span class="token punctuation">&gt;</span> <span class="token selector">.special::before</span>
<span class="token punctuation">{</span> <span class="token property">content</span
><span class="token punctuation">:</span> &#039;&lt; &amp; &gt;&#039;<span class="token punctuation"
	>;</span
>
<span class="token punctuation">}</span>
<span class="token tag">&lt;/style</span><span class="token punctuation">&gt;</span>

<span class="token cdata"
	>&lt;![CDATA[ if (a &lt; 0) alert(&quot;b&quot;); &lt;not-a-tag&gt; ]]&gt;</span
>
```

## Comparison

- Domstyler size: 6164 bytes
- Rangestyler size: 3633 bytes
- Size difference: 2531 bytes

---

_Generated by src/generated/update.task.ts_
