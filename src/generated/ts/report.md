# TS Diagnostics

## Boundaries Detected

| Type    | Start | End | Length | Language | Snippet                                    |
| ------- | ----- | --- | ------ | -------- | ------------------------------------------ |
| content | 0     | 854 | 854    | -        | `const a = 1;\n\nconst b = 'b';\n\nconst ` |

## Match Statistics

**Total matches:** 229

### Distribution by Pattern Type

| Pattern Type        | Count | Percentage |
| ------------------- | ----- | ---------- |
| punctuation         | 87    | 38.0%      |
| operator            | 57    | 24.9%      |
| keyword             | 28    | 12.2%      |
| type                | 14    | 6.1%       |
| class_name          | 11    | 4.8%       |
| function            | 10    | 4.4%       |
| string              | 6     | 2.6%       |
| comment             | 6     | 2.6%       |
| boolean             | 4     | 1.7%       |
| number              | 3     | 1.3%       |
| template_expression | 2     | 0.9%       |
| regex               | 1     | 0.4%       |

## Sample Matches

| Pattern     | Text        | Position | Priority |
| ----------- | ----------- | -------- | -------- |
| keyword     | `const`     | 0-5      | 50       |
| operator    | `=`         | 8-9      | 20       |
| number      | `1`         | 10-11    | 40       |
| punctuation | `;`         | 11-12    | 10       |
| keyword     | `const`     | 14-19    | 50       |
| operator    | `=`         | 22-23    | 20       |
| string      | `'b'`       | 24-27    | 90       |
| punctuation | `;`         | 27-28    | 10       |
| keyword     | `const`     | 30-35    | 50       |
| operator    | `=`         | 38-39    | 20       |
| boolean     | `true`      | 40-44    | 45       |
| punctuation | `;`         | 44-45    | 10       |
| class_name  | `Some_Type` | 59-68    | 30       |
| number      | `1`         | 71-72    | 40       |
| string      | `'b'`       | 75-78    | 90       |
| boolean     | `true`      | 81-85    | 45       |
| class_name  | `D`         | 94-95    | 30       |
| type        | `string`    | 103-109  | 55       |
| string      | `'d'`       | 112-115  | 90       |
| type        | `number`    | 122-128  | 55       |

## Summary

- 📊 Pattern types: 12
- 🎯 Total matches: 229
