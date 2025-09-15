# TS Complex Sample Report

## Sample Info

- **Language**: ts
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.ts
- **Size**: 1327 characters

## Statistics

### Boundaries

- **Total**: 1
- code: [0:1327]

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
- Boundary Scanner size: 3965 bytes

---

_Generated by src/fixtures/update.task.ts_
