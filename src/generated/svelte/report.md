# SVELTE Diagnostics

## Boundaries Detected

| Type    | Start | End  | Length | Language | Snippet                                    |
| ------- | ----- | ---- | ------ | -------- | ------------------------------------------ |
| content | 0     | 25   | 25     | -        | `<script lang="ts" module>`                |
| script  | 25    | 57   | 32     | ts       | `\n\texport const HELLO = 'world';\n`      |
| content | 57    | 86   | 29     | -        | `</script>\n\n<script lang="ts">`          |
| script  | 86    | 1268 | 1182   | ts       | `\n\t// @ts-expect-error\n\timport Thing ` |
| content | 1268  | 1943 | 675    | -        | `</script>\n\n<h1>hello {HELLO}!</h1>\n\n` |
| style   | 1943  | 2324 | 381    | css      | `\n\t.some_class {\n\t\tcolor: red;\n\t}\` |
| content | 2324  | 2333 | 9      | -        | `</style>\n`                               |

## Match Statistics

**Total matches:** 568

### Distribution by Pattern Type

| Pattern Type        | Count | Percentage |
| ------------------- | ----- | ---------- |
| punctuation         | 248   | 43.7%      |
| operator            | 89    | 15.7%      |
| tag                 | 35    | 6.2%       |
| keyword             | 34    | 6.0%       |
| class_name          | 17    | 3.0%       |
| function            | 17    | 3.0%       |
| attr_name           | 16    | 2.8%       |
| type                | 16    | 2.8%       |
| svelte_expression   | 16    | 2.8%       |
| attr_value          | 14    | 2.5%       |
| number              | 14    | 2.5%       |
| string              | 10    | 1.8%       |
| comment             | 10    | 1.8%       |
| property            | 9     | 1.6%       |
| selector            | 7     | 1.2%       |
| svelte_block        | 6     | 1.1%       |
| boolean             | 5     | 0.9%       |
| template_expression | 2     | 0.4%       |
| regex               | 1     | 0.2%       |
| doctype             | 1     | 0.2%       |
| atrule              | 1     | 0.2%       |

## Sample Matches

| Pattern     | Text                  | Position | Priority |
| ----------- | --------------------- | -------- | -------- |
| tag         | `<script`             | 0-7      | 60       |
| punctuation | `<`                   | 0-1      | 10       |
| attr_name   | `lang`                | 8-12     | 55       |
| attr_value  | `="ts"`               | 12-17    | 70       |
| operator    | `=`                   | 12-13    | 5        |
| punctuation | `>`                   | 24-25    | 10       |
| keyword     | `export`              | 27-33    | 50       |
| keyword     | `const`               | 34-39    | 50       |
| class_name  | `HELLO`               | 40-45    | 30       |
| operator    | `=`                   | 46-47    | 20       |
| string      | `'world'`             | 48-55    | 90       |
| punctuation | `;`                   | 55-56    | 10       |
| tag         | `</script`            | 57-65    | 60       |
| tag         | `<script`             | 68-75    | 60       |
| attr_name   | `lang`                | 76-80    | 55       |
| attr_value  | `="ts"`               | 80-85    | 70       |
| operator    | `=`                   | 80-81    | 5        |
| comment     | `// @ts-expect-error` | 88-107   | 100      |
| keyword     | `import`              | 109-115  | 50       |
| class_name  | `Thing`               | 116-121  | 30       |

## Summary

- ✅ Script boundaries detected
- ✅ Style boundaries detected
- 🔧 Embedded languages: ts, css
- 📊 Pattern types: 21
- 🎯 Total matches: 568
