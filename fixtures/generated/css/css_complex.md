# CSS Complex Sample Report

## Sample Info

- **Language**: css
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.css
- **Size**: 543 characters

## Statistics

### Boundaries

- **Total**: 13
- code: [0:115]
- comment: [115:128]
- code: [128:130]
- comment: [130:176]
- code: [176:313]
- comment: [313:363]
- code: [363:393]
- string: [393:423]
- code: [423:440]
- string: [440:453]
- code: [453:515]
- string: [515:538]
- code: [538:543]

### Matches

- **Total**: 93
- **By Type**:
  - selector: 10
  - punctuation: 50
  - property: 11
  - number: 10
  - function: 2
  - comment: 6
  - atrule: 1
  - string: 3

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

<span class="token comment">/* multi .line { i: 100px &lt;/style> @media*/</span>

<span class="token selector">#id</span> <span class="token punctuation">{</span>
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

<span class="token comment">/* patterns in strings are not falsely detected */</span>
<span class="token selector">.content::before</span> <span class="token punctuation">{</span>
<span class="token property">content</span><span class="token punctuation">:</span>
<span class="token string">'&lt;/style> /* not a comment */'</span
><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.attr[title='Click: here']</span>
<span class="token punctuation">{</span> <span class="token property">cursor</span
><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.background</span> <span class="token punctuation">{</span>
<span class="token property">background-image</span><span class="token punctuation">:</span>
<span class="token url"
	><span class="token function">url</span><span class="token punctuation">(</span
	><span class="token string url">'data:image/svg+xml...'</span
	><span class="token punctuation">)</span></span
><span class="token punctuation">;</span>
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

<span class="token comment">/* multi .line { i: 100px &lt;/style&gt; @media*/</span
><span class="token comment"></span>

<span class="token selector">#id</span> <span class="token punctuation">{</span>
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

<span class="token comment">/* patterns in strings are not falsely detected */</span
><span class="token comment"></span> <span class="token selector">.content::before</span>
<span class="token punctuation">{</span> <span class="token property">content</span
><span class="token punctuation">:</span>
<span class="token string">&#039;&lt;/style&gt; /* not a comment */&#039;</span
><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

.attr[title=<span class="token string">&#039;Click: here&#039;</span
><span class="token selector">]</span> <span class="token punctuation">{</span>
<span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span
	class="token punctuation"
	>;</span
>
<span class="token punctuation">}</span>

<span class="token selector">.background</span> <span class="token punctuation">{</span>
<span class="token property">background-image</span><span class="token punctuation">:</span>
<span class="token function">url</span><span class="token punctuation">(</span
><span class="token string">&#039;data:image/svg+xml...&#039;</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
```

## Boundary Scanner Output

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

<span class="token comment">/* comment */</span>

<span class="token comment">/* multi .line { i: 100px &lt;/style&gt; @media*/</span>

<span class="token selector">#id</span> <span class="token punctuation">{</span>
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

<span class="token comment">/* patterns in strings are not falsely detected */</span>
<span class="token selector">.content::before</span> <span class="token punctuation">{</span>
<span class="token property">content</span><span class="token punctuation">:</span>
<span class="token string">&#039;&lt;/style&gt; /* not a comment */&#039;</span
><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

.attr[title=<span class="token string">&#039;Click: here&#039;</span
><span class="token selector">]</span> <span class="token punctuation">{</span>
<span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span
	class="token punctuation"
	>;</span
>
<span class="token punctuation">}</span>

<span class="token selector">.background</span> <span class="token punctuation">{</span>
<span class="token property">background-image</span><span class="token punctuation">:</span>
<span class="token function">url</span><span class="token punctuation">(</span
><span class="token string">&#039;data:image/svg+xml...&#039;</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
```

## Comparison

- Domstyler size: 3451 bytes
- Rangestyler size: 3715 bytes
- Boundary Scanner size: 3610 bytes
- Size difference: -264 bytes

---

_Generated by src/generated/update.task.ts_
