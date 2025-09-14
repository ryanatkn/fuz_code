# HTML Diagnostics

## Boundaries Detected

| Type    | Start | End | Length | Language | Snippet                                    |
| ------- | ----- | --- | ------ | -------- | ------------------------------------------ |
| content | 0     | 191 | 191    | -        | `<!doctype html>\n\n<div class="test">\n\` |
| content | 228   | 340 | 112    | -        | `\n\n<br />\n\n<hr />\n\n<img src="image.` |
| script  | 371   | 391 | 20     | ts       | `\n\tconst ok = 'yes';\n`                  |
| content | 400   | 402 | 2      | -        | `\n\n`                                     |
| style   | 425   | 469 | 44     | css      | `\n\t.special::before {\n\t\tcontent: '< ` |
| content | 477   | 528 | 51     | -        | `\n\n<![CDATA[ if (a < 0) alert("b"); <no` |

## Match Statistics

**Total matches:** 117

### Distribution by Pattern Type

| Pattern Type | Count | Percentage |
| ------------ | ----- | ---------- |
| punctuation  | 65    | 55.6%      |
| tag          | 22    | 18.8%      |
| operator     | 8     | 6.8%       |
| attr_name    | 7     | 6.0%       |
| attr_value   | 7     | 6.0%       |
| string       | 2     | 1.7%       |
| property     | 2     | 1.7%       |
| doctype      | 1     | 0.9%       |
| keyword      | 1     | 0.9%       |
| selector     | 1     | 0.9%       |
| cdata        | 1     | 0.9%       |

## Sample Matches

| Pattern     | Text                        | Position | Priority |
| ----------- | --------------------------- | -------- | -------- |
| doctype     | `<!doctype html>`           | 0-15     | 90       |
| tag         | `<!doctype`                 | 0-9      | 70       |
| punctuation | `<`                         | 0-1      | 10       |
| punctuation | `>`                         | 14-15    | 10       |
| tag         | `<div`                      | 17-21    | 70       |
| punctuation | `<`                         | 17-18    | 10       |
| attr_name   | `class`                     | 22-27    | 60       |
| attr_value  | `="test"`                   | 27-34    | 80       |
| operator    | `=`                         | 27-28    | 5        |
| tag         | `<p`                        | 37-39    | 70       |
| attr_name   | `class`                     | 68-73    | 60       |
| attr_value  | `="some_class hypen-class"` | 73-98    | 80       |
| operator    | `=`                         | 73-74    | 5        |
| attr_name   | `class`                     | 110-115  | 60       |
| attr_value  | `="a b c"`                  | 115-123  | 80       |
| operator    | `=`                         | 115-116  | 5        |
| keyword     | `const`                     | 373-378  | 150      |
| string      | `'yes'`                     | 384-389  | 190      |
| selector    | `\n\t.special::before `     | 425-444  | 170      |
| property    | `.special`                  | 427-435  | 160      |

## Summary

- ✅ Script boundaries detected
- ✅ Style boundaries detected
- 🔧 Embedded languages: ts, css
- 📊 Pattern types: 11
- 🎯 Total matches: 117
