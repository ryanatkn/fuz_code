# TS Complex Sample Report

## Sample Info
- **Language**: ts
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.ts
- **Size**: 854 characters

## Statistics

### Boundaries
- **Total**: 1
- content: [0:854]

### Matches
- **Total**: 229
- **By Type**:
  - keyword: 28
  - operator: 57
  - number: 3
  - punctuation: 87
  - string: 6
  - boolean: 4
  - class_name: 11
  - type: 14
  - function: 10
  - template_expression: 2
  - comment: 6
  - regex: 1

## Sample Matches
- **keyword** [0:5]: `const`
- **operator** [8:9]: `=`
- **number** [10:11]: `1`
- **punctuation** [11:12]: `;`
- **keyword** [14:19]: `const`
- **operator** [22:23]: `=`
- **string** [24:27]: `'b'`
- **punctuation** [27:28]: `;`
- **keyword** [30:35]: `const`
- **operator** [38:39]: `=`

## Domstyler Output
```html
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token string">'b'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class_name">Some_Type</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token string">'b'</span> <span class="token operator">|</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class_name"><span class="token constant">D</span></span> <span class="token punctuation">{</span>
	d1<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">'d'</span><span class="token punctuation">;</span>
	d2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
	d3 <span class="token operator">=</span> <span class="token function">$state</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token function">constructor</span><span class="token punctuation">(</span>d2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>d2 <span class="token operator">=</span> d2<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">class_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token template_string"><span class="token template_punctuation string">`</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation_punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>d1<span class="token interpolation_punctuation punctuation">}</span></span><span class="token template_punctuation string">`</span></span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	instance_method <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
		<span class="token comment">/* ... */</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">#private_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// foo</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token function">#private_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class_name">Error</span><span class="token punctuation">(</span><span class="token template_string"><span class="token template_punctuation string">`</span><span class="token interpolation"><span class="token interpolation_punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>d1<span class="token interpolation_punctuation punctuation">}</span></span><span class="token string"> etc</span><span class="token template_punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">protected</span> <span class="token function">protected_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
		<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class_name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// eslint-disable-line no-console</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> <span class="token constant">D</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// comment</span>

<span class="token comment">/*
other comment

const comment = false;
*/</span>

<span class="token comment">/**
 * JSDoc comment
 */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class_name">Some_E</span> <span class="token punctuation">{</span>
	name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
	age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> some_e<span class="token operator">:</span> Some_E <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">'A. H.'</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> plus <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>

```

## Rangestyler Output
```html
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token string">&#039;b&#039;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class_name">Some_Type</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token string">&#039;b&#039;</span> <span class="token operator">|</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class_name">D</span> <span class="token punctuation">{</span>
	d1<span class="token operator">:</span> <span class="token type">string</span> <span class="token operator">=</span> <span class="token string">&#039;d&#039;</span><span class="token punctuation">;</span>
	d2<span class="token operator">:</span> <span class="token type">number</span><span class="token punctuation">;</span>
	d3 <span class="token operator">=</span> $<span class="token function">state</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token function">constructor</span><span class="token punctuation">(</span>d2<span class="token operator">:</span> <span class="token type">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>d2 <span class="token operator">=</span> d2<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">class_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token type">string</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">`Hello, ${this.d1}`</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	instance_method <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token type">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		<span class="token comment">/* ... */</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>#<span class="token function">private_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// foo</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>

	#<span class="token function">private_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">`${this.d1} etc`</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">protected</span> <span class="token function">protected_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token type">void</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// eslint-disable-line no-console</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> <span class="token class_name">D</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// comment</span>

<span class="token comment">/*
other comment

const comment = false;
*/</span>

<span class="token comment">/**
 * JSDoc comment
 */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class_name">Some_E</span> <span class="token punctuation">{</span>
	name<span class="token operator">:</span> <span class="token type">string</span><span class="token punctuation">;</span>
	age<span class="token operator">:</span> <span class="token type">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> some_e<span class="token operator">:</span> <span class="token class_name">Some_E</span> <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">&#039;A. H.&#039;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token type">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token type">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token type">number</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> plus <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token type">any</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token type">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token type">any</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>

```

## Comparison
- Domstyler size: 8147 bytes
- Rangestyler size: 7320 bytes
- Size difference: 827 bytes

---
*Generated by src/generated/update.task.ts*
