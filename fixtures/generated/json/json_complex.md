# JSON Complex Sample Report

## Sample Info

- **Language**: json
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.json
- **Size**: 327 characters

## Statistics

### Boundaries

- **Total**: 1
- code: [0:327]

## Domstyler Output

```html
<span class="token punctuation">{</span> <span class="token property">"string"</span
><span class="token operator">:</span> <span class="token string">"a string"</span
><span class="token punctuation">,</span> <span class="token property">"number"</span
><span class="token operator">:</span> <span class="token number">12345</span
><span class="token punctuation">,</span> <span class="token property">"boolean"</span
><span class="token operator">:</span> <span class="token boolean">true</span
><span class="token punctuation">,</span> <span class="token property">"null"</span
><span class="token operator">:</span> <span class="token null keyword">null</span
><span class="token punctuation">,</span> <span class="token property">"empty"</span
><span class="token operator">:</span> <span class="token string">""</span
><span class="token punctuation">,</span> <span class="token property">"escaped"</span
><span class="token operator">:</span>
<span class="token string">"quote: \"test\" and backslash: \\"</span
><span class="token punctuation">,</span> <span class="token property">"object"</span
><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token property">"array"</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token number">1</span
><span class="token punctuation">,</span> <span class="token string">"b"</span
><span class="token punctuation">,</span> <span class="token boolean">false</span
><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">"strings"</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token string">"1"</span
><span class="token punctuation">,</span> <span class="token string">"2"</span
><span class="token punctuation">,</span> <span class="token string">"3"</span
><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">"mixed"</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token string">"start"</span
><span class="token punctuation">,</span> <span class="token number">123</span
><span class="token punctuation">,</span> <span class="token boolean">true</span
><span class="token punctuation">,</span> <span class="token string">"middle"</span
><span class="token punctuation">,</span> <span class="token null keyword">null</span
><span class="token punctuation">,</span> <span class="token string">"end"</span
><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">"nested"</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token punctuation">[</span
><span class="token string">"a"</span><span class="token punctuation">,</span>
<span class="token string">"str"</span><span class="token punctuation">,</span>
<span class="token string">""</span><span class="token punctuation">]</span
><span class="token punctuation">,</span> <span class="token punctuation">{</span
><span class="token property">"key"</span><span class="token operator">:</span>
<span class="token string">"nested value"</span><span class="token punctuation">}</span
><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
```

## Boundary Scanner Output

```html
<span class="token punctuation">{</span> <span class="token property">&quot;string&quot;</span
><span class="token operator">:</span> <span class="token string">&quot;a string&quot;</span
><span class="token punctuation">,</span> <span class="token property">&quot;number&quot;</span
><span class="token operator">:</span> <span class="token number">12345</span
><span class="token punctuation">,</span> <span class="token property">&quot;boolean&quot;</span
><span class="token operator">:</span> <span class="token boolean">true</span
><span class="token punctuation">,</span> <span class="token property">&quot;null&quot;</span
><span class="token operator">:</span> <span class="token null">null</span
><span class="token punctuation">,</span> <span class="token property">&quot;empty&quot;</span
><span class="token operator">:</span> <span class="token string">&quot;&quot;</span
><span class="token punctuation">,</span> <span class="token property">&quot;escaped&quot;</span
><span class="token operator">:</span>
<span class="token string">&quot;quote: \&quot;test\&quot; and backslash: \\&quot;</span
><span class="token punctuation">,</span> <span class="token property">&quot;object&quot;</span
><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token property">&quot;array&quot;</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token number">1</span
><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span
><span class="token punctuation">,</span> <span class="token boolean">false</span
><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">&quot;strings&quot;</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token string">&quot;1&quot;</span
><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span
><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span
><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">&quot;mixed&quot;</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token string">&quot;start&quot;</span
><span class="token punctuation">,</span> <span class="token number">123</span
><span class="token punctuation">,</span> <span class="token boolean">true</span
><span class="token punctuation">,</span> <span class="token string">&quot;middle&quot;</span
><span class="token punctuation">,</span> <span class="token null">null</span
><span class="token punctuation">,</span> <span class="token string">&quot;end&quot;</span
><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">&quot;nested&quot;</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token punctuation">[</span
><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;str&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;&quot;</span><span class="token punctuation">]</span
><span class="token punctuation">,</span> <span class="token punctuation">{</span
><span class="token property">&quot;key&quot;</span><span class="token operator">:</span>
<span class="token string">&quot;nested value&quot;</span><span class="token punctuation">}</span
><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
```

## Comparison

- Domstyler size: 3397 bytes
- Boundary Scanner size: 3651 bytes

---

_Generated by src/fixtures/update.task.ts_
