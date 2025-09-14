# SVELTE Diagnostics

## Boundaries Detected

| Type    | Start | End  | Length | Language | Snippet                                    |
| ------- | ----- | ---- | ------ | -------- | ------------------------------------------ |
| content | 0     | 25   | 25     | -        | `<script lang="ts" module>`                |
| script  | 25    | 57   | 32     | ts       | `\n\texport const HELLO = 'world';\n`      |
| content | 57    | 86   | 29     | -        | `</script>\n\n<script lang="ts">`          |
| script  | 86    | 1268 | 1182   | ts       | `\n\t// @ts-expect-error\n\timport Thing ` |
| content | 1268  | 1767 | 499    | -        | `</script>\n\n<h1>hello {HELLO}!</h1>\n\n` |
| content | 1804  | 1943 | 139    | -        | `\n{a}\n{b}\n{bound}\n{D}\n\n<br />\n\n<h` |
| style   | 1943  | 2324 | 381    | css      | `\n\t.some_class {\n\t\tcolor: red;\n\t}\` |
| content | 2324  | 2333 | 9      | -        | `</style>\n`                               |

## Match Statistics

**Total matches:** 643

### Distribution by Pattern Type

| Pattern Type        | Count | Percentage |
| ------------------- | ----- | ---------- |
| punctuation         | 266   | 41.4%      |
| operator            | 106   | 16.5%      |
| tag                 | 39    | 6.1%       |
| keyword             | 34    | 5.3%       |
| svelte_expression   | 34    | 5.3%       |
| attr_name           | 31    | 4.8%       |
| attr_value          | 18    | 2.8%       |
| class_name          | 17    | 2.6%       |
| function            | 17    | 2.6%       |
| type                | 16    | 2.5%       |
| number              | 14    | 2.2%       |
| string              | 10    | 1.6%       |
| comment             | 9     | 1.4%       |
| property            | 9     | 1.4%       |
| selector            | 7     | 1.1%       |
| svelte_block        | 6     | 0.9%       |
| boolean             | 5     | 0.8%       |
| template_expression | 2     | 0.3%       |
| regex               | 1     | 0.2%       |
| doctype             | 1     | 0.2%       |
| atrule              | 1     | 0.2%       |

## Sample Matches

| Pattern     | Text                        | Position | Priority |
| ----------- | --------------------------- | -------- | -------- |
| tag         | `<script lang="ts" module>` | 0-25     | 92       |
| tag         | `<script`                   | 0-7      | 60       |
| punctuation | `<`                         | 0-1      | 10       |
| attr_name   | `lang`                      | 8-12     | 55       |
| attr_value  | `="ts"`                     | 12-17    | 70       |
| operator    | `=`                         | 12-13    | 5        |
| punctuation | `>`                         | 24-25    | 10       |
| keyword     | `export`                    | 27-33    | 150      |
| keyword     | `const`                     | 34-39    | 150      |
| class_name  | `HELLO`                     | 40-45    | 130      |
| attr_name   | `HELLO`                     | 40-45    | 55       |
| operator    | `=`                         | 46-47    | 120      |
| attr_value  | `= 'world'`                 | 46-55    | 70       |
| operator    | `=`                         | 46-47    | 5        |
| string      | `'world'`                   | 48-55    | 190      |
| punctuation | `;`                         | 55-56    | 110      |
| tag         | `</script>`                 | 57-66    | 92       |
| attr_name   | `lang`                      | 76-80    | 55       |
| attr_value  | `="ts"`                     | 80-85    | 70       |
| comment     | `// @ts-expect-error`       | 88-107   | 200      |

## Summary

- ✅ Script boundaries detected
- ✅ Style boundaries detected
- 🔧 Embedded languages: ts, css
- 📊 Pattern types: 21
- 🎯 Total matches: 643
