# CSS Complex Sample Report

## Sample Info

- **Language**: css
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.css
- **Size**: 301 characters

## Statistics

### Boundaries

- **Total**: 5
- code: [0:115]
- comment: [115:128]
- code: [128:130]
- comment: [130:158]
- code: [158:301]

### Matches

- **Total**: 64
- **By Type**:
  - selector: 7
  - punctuation: 34
  - property: 7
  - number: 10
  - function: 1
  - comment: 4
  - atrule: 1

## Sample Matches

- **selector** [0:11]: `.some_class`
- **punctuation** [12:13]: `{`
- **property** [15:20]: `color`
- **punctuation** [20:21]: `:`
- **punctuation** [25:26]: `;`
- **selector** [30:42]: `.hypen-class`
- **property** [46:55]: `font-size`
- **number** [57:61]: `16px`
- **selector** [66:67]: `p`
- **property** [71:81]: `box-shadow`

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

<span class="token comment">/* comment */</span><span class="token comment"></span>

<span class="token comment">/* multi line &lt;comment&gt; */</span
><span class="token comment"></span>

<span class="token selector">#unique_id</span> <span class="token punctuation">{</span>
<span class="token property">background-color</span
><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div &gt; p</span> <span class="token punctuation">{</span>
<span class="token property">margin</span><span class="token punctuation">:</span>
<span class="token number">10px</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule">@media (max-width: 600px)</span>
<span class="token punctuation">{</span> <span class="token selector">body</span>
<span class="token punctuation">{</span> <span class="token property">background-color</span
><span class="token punctuation">:</span> lightblue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
```

## Comparison

- Domstyler size: 2270 bytes
- Rangestyler size: 2467 bytes
- Size difference: -197 bytes

---

_Generated by src/generated/update.task.ts_
