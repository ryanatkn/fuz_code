# JSON Complex Sample Report

## Sample Info

- **Language**: json
- **Variant**: complex
- **Source**: src/lib/samples/sample_complex.json
- **Size**: 381 characters

## Statistics

### Boundaries

- **Total**: 53
- code: [0:3]
- property: [3:11]
- code: [11:13]
- string: [13:23]
- code: [23:26]
- property: [26:34]
- code: [34:44]
- property: [44:53]
- code: [53:62]
- property: [62:68]
- code: [68:77]
- property: [77:84]
- code: [84:86]
- string: [86:88]
- code: [88:91]
- property: [91:100]
- code: [100:102]
- string: [102:137]
- code: [137:140]
- property: [140:148]
- code: [148:154]
- property: [154:161]
- code: [161:167]
- string: [167:170]
- code: [170:182]
- property: [182:191]
- code: [191:194]
- string: [194:197]
- code: [197:199]
- string: [199:202]
- code: [202:204]
- string: [204:207]
- code: [207:212]
- property: [212:219]
- code: [219:222]
- string: [222:239]
- code: [239:252]
- string: [252:270]
- code: [270:278]
- string: [278:293]
- code: [293:298]
- property: [298:306]
- code: [306:310]
- string: [310:318]
- code: [318:320]
- string: [320:327]
- code: [327:329]
- string: [329:338]
- code: [338:342]
- property: [342:347]
- code: [347:349]
- string: [349:373]
- code: [373:381]

### Matches

- **Total**: 83
- **By Type**:
  - punctuation: 37
  - property: 12
  - operator: 12
  - string: 14
  - number: 3
  - boolean: 3
  - null: 2

## Sample Matches

- **punctuation** [0:1]: `{`
- **property** [3:11]: `"string"`
- **operator** [11:12]: `:`
- **string** [13:23]: `"a string"`
- **punctuation** [23:24]: `,`
- **property** [26:34]: `"number"`
- **operator** [34:35]: `:`
- **number** [36:41]: `12345`
- **punctuation** [41:42]: `,`
- **property** [44:53]: `"boolean"`

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
<span class="token punctuation">[</span><span class="token string">"string at start"</span
><span class="token punctuation">,</span> <span class="token number">123</span
><span class="token punctuation">,</span> <span class="token boolean">true</span
><span class="token punctuation">,</span> <span class="token string">"string in middle"</span
><span class="token punctuation">,</span> <span class="token null keyword">null</span
><span class="token punctuation">,</span> <span class="token string">"string at end"</span
><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">"nested"</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token punctuation">[</span
><span class="token string">"nested"</span><span class="token punctuation">,</span>
<span class="token string">"array"</span><span class="token punctuation">,</span>
<span class="token string">"strings"</span><span class="token punctuation">]</span
><span class="token punctuation">,</span> <span class="token punctuation">{</span
><span class="token property">"key"</span><span class="token operator">:</span>
<span class="token string">"value in nested object"</span><span class="token punctuation">}</span
><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
```

## Rangestyler Output

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
<span class="token punctuation">[</span><span class="token string">&quot;string at start&quot;</span
><span class="token punctuation">,</span> <span class="token number">123</span
><span class="token punctuation">,</span> <span class="token boolean">true</span
><span class="token punctuation">,</span>
<span class="token string">&quot;string in middle&quot;</span
><span class="token punctuation">,</span> <span class="token null">null</span
><span class="token punctuation">,</span> <span class="token string">&quot;string at end&quot;</span
><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token property">&quot;nested&quot;</span><span class="token operator">:</span>
<span class="token punctuation">[</span><span class="token punctuation">[</span
><span class="token string">&quot;nested&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;array&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;strings&quot;</span><span class="token punctuation">]</span
><span class="token punctuation">,</span> <span class="token punctuation">{</span
><span class="token property">&quot;key&quot;</span><span class="token operator">:</span>
<span class="token string">&quot;value in nested object&quot;</span
><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
```

## Comparison

- Domstyler size: 3451 bytes
- Rangestyler size: 3705 bytes
- Size difference: -254 bytes

---

_Generated by src/generated/update.task.ts_
