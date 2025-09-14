# SVELTE Diagnostics

## Boundaries Detected

| Type    | Start | End  | Length | Language | Snippet                                    |
| ------- | ----- | ---- | ------ | -------- | ------------------------------------------ |
| script  | 25    | 57   | 32     | ts       | `\n\texport const HELLO = 'world';\n`      |
| content | 66    | 68   | 2      | -        | `\n\n`                                     |
| script  | 86    | 1268 | 1182   | ts       | `\n\t// @ts-expect-error\n\timport Thing ` |
| content | 1277  | 1767 | 490    | -        | `\n\n<h1>hello {HELLO}!</h1>\n\n{#each th` |
| content | 1804  | 1936 | 132    | -        | `\n{a}\n{b}\n{bound}\n{D}\n\n<br />\n\n<h` |
| style   | 1943  | 2324 | 381    | css      | `\n\t.some_class {\n\t\tcolor: red;\n\t}\` |
| content | 2332  | 2333 | 1      | -        | `\n`                                       |

## Match Statistics

**Total matches:** 610

### Distribution by Pattern Type

| Pattern Type        | Count | Percentage |
| ------------------- | ----- | ---------- |
| punctuation         | 251   | 41.1%      |
| operator            | 104   | 17.0%      |
| keyword             | 34    | 5.6%       |
| svelte_expression   | 34    | 5.6%       |
| attr_name           | 29    | 4.8%       |
| tag                 | 27    | 4.4%       |
| class_name          | 17    | 2.8%       |
| function            | 17    | 2.8%       |
| attr_value          | 16    | 2.6%       |
| type                | 16    | 2.6%       |
| number              | 14    | 2.3%       |
| string              | 10    | 1.6%       |
| comment             | 9     | 1.5%       |
| property            | 9     | 1.5%       |
| selector            | 7     | 1.1%       |
| svelte_block        | 6     | 1.0%       |
| boolean             | 5     | 0.8%       |
| template_expression | 2     | 0.3%       |
| regex               | 1     | 0.2%       |
| doctype             | 1     | 0.2%       |
| atrule              | 1     | 0.2%       |

## Sample Matches

| Pattern           | Text                                   | Position | Priority |
| ----------------- | -------------------------------------- | -------- | -------- |
| keyword           | `export`                               | 27-33    | 150      |
| keyword           | `const`                                | 34-39    | 150      |
| class_name        | `HELLO`                                | 40-45    | 130      |
| attr_name         | `HELLO`                                | 40-45    | 55       |
| operator          | `=`                                    | 46-47    | 120      |
| attr_value        | `= 'world'`                            | 46-55    | 70       |
| operator          | `=`                                    | 46-47    | 5        |
| string            | `'world'`                              | 48-55    | 190      |
| punctuation       | `;`                                    | 55-56    | 110      |
| comment           | `// @ts-expect-error`                  | 88-107   | 200      |
| operator          | `/`                                    | 88-89    | 120      |
| punctuation       | `/`                                    | 88-89    | 10       |
| punctuation       | `/`                                    | 89-90    | 10       |
| keyword           | `import`                               | 109-115  | 150      |
| class_name        | `Thing`                                | 116-121  | 130      |
| string            | `'$lib/Thing.svelte'`                  | 127-146  | 190      |
| class_name        | `Thing`                                | 133-138  | 130      |
| svelte_expression | `{Snippet}`                            | 161-170  | 95       |
| string            | `'svelte'`                             | 176-184  | 190      |
| svelte_expression | `{\n\t\tthing,\n\t\tbound = $bindable` | 194-246  | 95       |

## Summary

- ✅ Script boundaries detected
- ✅ Style boundaries detected
- 🔧 Embedded languages: ts, css
- 📊 Pattern types: 21
- 🎯 Total matches: 610
