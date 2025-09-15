# TS Complex Sample Report

## Sample Info

- **Language**: ts
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.ts
- **Size**: 1327 characters

## Statistics

### Boundaries

- **Total**: 43
- code: [0:24]
- string: [24:27]
- code: [27:75]
- string: [75:78]
- code: [78:112]
- string: [112:115]
- code: [115:234]
- string: [234:253]
- code: [253:294]
- comment: [294:303]
- code: [303:332]
- comment: [332:338]
- code: [338:383]
- string: [383:419]
- code: [419:491]
- comment: [491:524]
- code: [524:553]
- comment: [553:563]
- code: [563:565]
- comment: [565:608]
- code: [608:610]
- comment: [610:634]
- code: [634:731]
- string: [731:738]
- code: [738:875]
- comment: [875:897]
- code: [897:931]
- string: [931:960]
- code: [960:994]
- string: [994:1020]
- code: [1020:1056]
- string: [1056:1085]
- code: [1085:1088]
- comment: [1088:1120]
- code: [1120:1142]
- regex: [1142:1151]
- code: [1151:1182]
- regex: [1182:1215]
- code: [1215:1218]
- comment: [1218:1274]
- code: [1274:1275]
- comment: [1275:1326]
- code: [1326:1327]

### Matches

- **Total**: 210
- **By Type**:
  - keyword: 35
  - operator: 38
  - number: 3
  - punctuation: 79
  - string: 9
  - boolean: 3
  - class_name: 7
  - type: 14
  - function: 10
  - comment: 10
  - regex: 2

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
<span class="token keyword">const</span> a <span class="token operator">=</span>
<span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> b <span class="token operator">=</span>
<span class="token string">'b'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> c <span class="token operator">=</span>
<span class="token boolean">true</span><span class="token punctuation">;</span>

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
	><span class="token template_punctuation string">`</span><span class="token string">Hello, </span
	><span class="token interpolation"
		><span class="token interpolation_punctuation punctuation">${</span
		><span class="token keyword">this</span><span class="token punctuation">.</span>d1<span
			class="token interpolation_punctuation punctuation"
			>}</span
		></span
	><span class="token template_punctuation string">`</span></span
><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

instance_method <span class="token operator">=</span> <span class="token punctuation">(</span
><span class="token punctuation">)</span><span class="token operator">:</span>
<span class="token keyword">void</span> <span class="token operator">=></span>
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
	><span class="token string"> multiline etc </span
	><span class="token template_punctuation string">`</span></span
><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token function">protected_method</span
><span class="token punctuation">(</span><span class="token punctuation">)</span
><span class="token operator">:</span> <span class="token keyword">void</span>
<span class="token punctuation">{</span> <span class="token builtin">console</span
><span class="token punctuation">.</span><span class="token function">log</span
><span class="token punctuation">(</span><span class="token keyword">new</span>
<span class="token class_name">Date</span><span class="token punctuation">(</span
><span class="token punctuation">)</span><span class="token punctuation">)</span
><span class="token punctuation">;</span>
<span class="token comment">// eslint-disable-line no-console</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>a<span
	class="token punctuation"
	>,</span
>
b<span class="token punctuation">,</span> c<span class="token punctuation">,</span>
<span class="token constant">D</span><span class="token punctuation">}</span
><span class="token punctuation">;</span>

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

<span class="token comment">// boundary test cases</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> str_with_keywords
<span class="token operator">=</span> <span class="token string">'const class function string'</span
><span class="token punctuation">;</span> <span class="token keyword">export</span>
<span class="token keyword">const</span> str_with_comment <span class="token operator">=</span>
<span class="token string">'// this is not a comment'</span
><span class="token punctuation">;</span> <span class="token keyword">export</span>
<span class="token keyword">const</span> template_with_expr <span class="token operator">=</span>
<span class="token template_string"
	><span class="token template_punctuation string">`</span><span class="token string">Value: </span
	><span class="token interpolation"
		><span class="token interpolation_punctuation punctuation">${</span
		><span class="token number">1</span> <span class="token operator">+</span>
		<span class="token number">2</span
		><span class="token interpolation_punctuation punctuation">}</span></span
	><span class="token string"> and </span
	><span class="token interpolation"
		><span class="token interpolation_punctuation punctuation">${</span
		><span class="token boolean">true</span
		><span class="token interpolation_punctuation punctuation">}</span></span
	><span class="token template_punctuation string">`</span></span
><span class="token punctuation">;</span>

<span class="token comment">// regex that looks like comment</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> regex
<span class="token operator">=</span>
<span class="token regex"
	><span class="token regex_delimiter">/</span
	><span class="token regex_source lang_regex">\/\/.*</span
	><span class="token regex_delimiter">/</span><span class="token regex_flags">g</span></span
><span class="token punctuation">;</span> <span class="token keyword">export</span>
<span class="token keyword">const</span> complex_regex <span class="token operator">=</span>
<span class="token regex"
	><span class="token regex_delimiter">/</span
	><span class="token regex_source lang_regex">^(?:\/\*.*?\*\/|\/\/.*|[^\/])+$</span
	><span class="token regex_delimiter">/</span></span
><span class="token punctuation">;</span>

<span class="token comment">// string in comment should not be highlighted as string</span>
<span class="token comment">// const commented = "this string is in a comment";</span>
```

## Rangestyler Output

```html
<span class="token keyword">const</span> a <span class="token operator">=</span>
<span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> b <span class="token operator">=</span>
<span class="token string">&#039;b&#039;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> c <span class="token operator">=</span>
<span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">type</span>
<span class="token class_name">Some_Type</span> <span class="token operator">=</span>
<span class="token number">1</span> <span class="token operator">|</span>
<span class="token string">&#039;b&#039;</span> <span class="token operator">|</span>
<span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class_name">D</span>
<span class="token punctuation">{</span> d1<span class="token operator">:</span>
<span class="token type">string</span> <span class="token operator">=</span>
<span class="token string">&#039;d&#039;</span><span class="token punctuation">;</span> d2<span
	class="token operator"
	>:</span
>
<span class="token type">number</span><span class="token punctuation">;</span> d3
<span class="token operator">=</span> $<span class="token function">state</span
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
<span class="token keyword">return</span> <span class="token string">`Hello, ${this.d1}`</span
><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

instance_method <span class="token operator">=</span> <span class="token punctuation">(</span
><span class="token punctuation">)</span><span class="token operator">:</span>
<span class="token type">void</span> <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span>
<span class="token comment">/* ... */</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>#<span
	class="token function"
	>private_method</span
><span class="token punctuation">(</span><span class="token punctuation">)</span
><span class="token punctuation">;</span>
<span class="token comment">// foo</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

#<span class="token function">private_method</span><span class="token punctuation">(</span
><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">throw</span> <span class="token keyword">new</span>
<span class="token function">Error</span><span class="token punctuation">(</span
><span class="token string">`${this.d1} multiline etc `</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token function">protected_method</span
><span class="token punctuation">(</span><span class="token punctuation">)</span
><span class="token operator">:</span> <span class="token type">void</span>
<span class="token punctuation">{</span> console<span class="token punctuation">.</span
><span class="token function">log</span><span class="token punctuation">(</span
><span class="token keyword">new</span> <span class="token function">Date</span
><span class="token punctuation">(</span><span class="token punctuation">)</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// eslint-disable-line no-console</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>a<span
	class="token punctuation"
	>,</span
>
b<span class="token punctuation">,</span> c<span class="token punctuation">,</span>
<span class="token class_name">D</span><span class="token punctuation">}</span
><span class="token punctuation">;</span>

<span class="token comment">// comment</span>

<span class="token comment">/* other comment const comment = false; */</span>

<span class="token comment">/** * JSDoc comment */</span>

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
<span class="token punctuation">{</span>name<span class="token operator">:</span>
<span class="token string">&#039;A. H.&#039;</span><span class="token punctuation">,</span> age<span
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

<span class="token comment">// boundary test cases</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> str_with_keywords
<span class="token operator">=</span>
<span class="token string">&#039;const class function string&#039;</span
><span class="token punctuation">;</span> <span class="token keyword">export</span>
<span class="token keyword">const</span> str_with_comment <span class="token operator">=</span>
<span class="token string">&#039;// this is not a comment&#039;</span
><span class="token punctuation">;</span> <span class="token keyword">export</span>
<span class="token keyword">const</span> template_with_expr <span class="token operator">=</span>
<span class="token string">`Value: ${1 + 2} and ${true}`</span
><span class="token punctuation">;</span>

<span class="token comment">// regex that looks like comment</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> regex
<span class="token operator">=</span> <span class="token regex">/\/\/.*/g</span
><span class="token punctuation">;</span> <span class="token keyword">export</span>
<span class="token keyword">const</span> complex_regex <span class="token operator">=</span>
<span class="token regex">/^(?:\/\*.*?\*\/|\/\/.*|[^\/])+$/</span
><span class="token punctuation">;</span>

<span class="token comment">// string in comment should not be highlighted as string</span>
<span class="token comment">// const commented = &quot;this string is in a comment&quot;;</span>
```

## Boundary Scanner Output

```html
<span class="token keyword">const</span> a <span class="token operator">=</span>
<span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> b <span class="token operator">=</span>
<span class="token string">&#039;b&#039;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> c <span class="token operator">=</span>
<span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">type</span>
<span class="token class_name">Some_Type</span> <span class="token operator">=</span>
<span class="token number">1</span> <span class="token operator">|</span>
<span class="token string">&#039;b&#039;</span> <span class="token operator">|</span>
<span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class_name">D</span>
<span class="token punctuation">{</span> d1<span class="token operator">:</span> string
<span class="token operator">=</span> <span class="token string">&#039;d&#039;</span
><span class="token punctuation">;</span> d2<span class="token operator">:</span> number<span
	class="token punctuation"
	>;</span
>
d3 <span class="token operator">=</span> $<span class="token function">state</span
><span class="token punctuation">(</span><span class="token boolean">false</span
><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">constructor</span><span class="token punctuation">(</span>d2<span
	class="token operator"
	>:</span
>
number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>d2
<span class="token operator">=</span> d2<span class="token punctuation">;</span>
}

<span class="token function">class_method</span><span class="token punctuation">(</span
><span class="token punctuation">)</span><span class="token operator">:</span> string
<span class="token punctuation">{</span> <span class="token keyword">return</span>
<span class="token string">`Hello, </span>$<span class="token punctuation">{</span
><span class="token keyword">this</span><span class="token punctuation">.</span>d1}<span
	class="token string"
	>`; } instance_method = (): void =&gt; { /* ... */ this.#private_method(); // foo };
	#private_method() { throw new Error(`</span
>$<span class="token punctuation">{</span><span class="token keyword">this</span
><span class="token punctuation">.</span>d1} multiline etc
<span class="token string"
	>`); } protected protected_method(): void { console.log(new Date()); // eslint-disable-line
	no-console } } export {a, b, c, D}; // comment /* other comment const comment = false; */ /** *
	JSDoc comment */ export interface Some_E { name: string; age: number; } export const some_e:
	Some_E = {name: &#039;A. H.&#039;, age: 100}; export function add(x: number, y: number): number {
	return x + y; } export const plus = (a: any, b: any): any =&gt; a + b; // boundary test cases
	export const str_with_keywords = &#039;const class function string&#039;; export const
	str_with_comment = &#039;// this is not a comment&#039;; export const template_with_expr = `</span
><span class="token class_name">Value</span><span class="token operator">:</span> $<span
	class="token punctuation"
	>{</span
><span class="token number">1</span> <span class="token operator">+</span>
<span class="token number">2</span>} and $<span class="token punctuation">{</span
><span class="token boolean">true</span>}<span class="token string"
	>`; // regex that looks like comment export const regex = /\/\/.*/g; export const complex_regex =
	/^(?:\/\*.*?\*\/|\/\/.*|[^\/])+$/; // string in comment should not be highlighted as string //
	const commented = &quot;this string is in a comment&quot;;
</span>
```

## Comparison

- Domstyler size: 10634 bytes
- Rangestyler size: 8856 bytes
- Boundary Scanner size: 3965 bytes
- Size difference: 1778 bytes

---

_Generated by src/generated/update.task.ts_
