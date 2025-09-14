# CSS Complex Sample Report

## Sample Info

- **Language**: css
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.css
- **Size**: 301 characters

## Statistics

### Boundaries

- **Total**: 1
- content: [0:301]

### Matches

- **Total**: 61
- **By Type**:
  - selector: 6
  - punctuation: 34
  - property: 7
  - number: 10
  - function: 1
  - comment: 2
  - atrule: 1

## Sample Matches

- **selector** [0:12]: `.some_class `
- **punctuation** [12:13]: `{`
- **property** [14:20]: `	color`
- **punctuation** [20:21]: `:`
- **punctuation** [25:26]: `;`
- **selector** [27:43]: `}

.hypen-class `

- **property** [45:55]: `	font-size`
- **number** [57:61]: `16px`
- **selector** [63:68]: `}

p `

- **property** [70:81]: `	box-shadow`

## Domstyler Output

```html
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
	><span class="token property">max-width</span><span class="token punctuation">:</span> 600px<span
		class="token punctuation"
		>)</span
	></span
>
<span class="token punctuation">{</span> <span class="token selector">body</span>
<span class="token punctuation">{</span> <span class="token property">background-color</span
><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
```

## Rangestyler Output

```html
<span class="token selector">.some_class </span><span class="token punctuation">{</span>
<span class="token property"> color</span><span class="token punctuation">:</span> red<span
	class="token punctuation"
	>;</span
>
<span class="token selector">} .hypen-class </span><span class="token punctuation">{</span>
<span class="token property"> font-size</span><span class="token punctuation">:</span>
<span class="token number">16px</span><span class="token punctuation">;</span>
<span class="token selector">} p </span><span class="token punctuation">{</span>
<span class="token property"> box-shadow</span><span class="token punctuation">:</span>
<span class="token number">0</span> <span class="token number">0</span>
<span class="token number">10px</span> <span class="token function">rgba</span
><span class="token punctuation">(</span><span class="token number">0</span
><span class="token punctuation">,</span> <span class="token number">0</span
><span class="token punctuation">,</span> <span class="token number">0</span
><span class="token punctuation">,</span> <span class="token number">0.1</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token selector">} /* comment */ /* multi line &lt;comment&gt; */ #unique_id </span
><span class="token punctuation">{</span> <span class="token property"> background-color</span
><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token selector">} div &gt; p </span><span class="token punctuation">{</span>
<span class="token property"> margin</span><span class="token punctuation">:</span>
<span class="token number">10px</span><span class="token punctuation">;</span>
<span class="token selector">} @media (max-width: 600px) </span
><span class="token punctuation">{</span> body <span class="token punctuation">{</span>
<span class="token property"> background-color</span
><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
```

## Comparison

- Domstyler size: 2270 bytes
- Rangestyler size: 2098 bytes
- Size difference: 172 bytes

---

_Generated by src/generated/update.task.ts_
