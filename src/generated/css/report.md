# CSS Diagnostics

## Boundaries Detected

| Type    | Start | End | Length | Language | Snippet                                    |
| ------- | ----- | --- | ------ | -------- | ------------------------------------------ |
| content | 0     | 301 | 301    | -        | `.some_class {\n\tcolor: red;\n}\n\n.hype` |

## Match Statistics

**Total matches:** 61

### Distribution by Pattern Type

| Pattern Type | Count | Percentage |
| ------------ | ----- | ---------- |
| punctuation  | 34    | 55.7%      |
| number       | 10    | 16.4%      |
| property     | 7     | 11.5%      |
| selector     | 6     | 9.8%       |
| comment      | 2     | 3.3%       |
| function     | 1     | 1.6%       |
| atrule       | 1     | 1.6%       |

## Sample Matches

| Pattern     | Text                                 | Position | Priority |
| ----------- | ------------------------------------ | -------- | -------- |
| selector    | `.some_class `                       | 0-12     | 70       |
| punctuation | `{`                                  | 12-13    | 10       |
| property    | `\tcolor`                            | 14-20    | 60       |
| punctuation | `:`                                  | 20-21    | 10       |
| punctuation | `;`                                  | 25-26    | 10       |
| selector    | `}\n\n.hypen-class `                 | 27-43    | 70       |
| property    | `\tfont-size`                        | 45-55    | 60       |
| number      | `16px`                               | 57-61    | 45       |
| selector    | `}\n\np `                            | 63-68    | 70       |
| property    | `\tbox-shadow`                       | 70-81    | 60       |
| number      | `0`                                  | 83-84    | 45       |
| number      | `0`                                  | 85-86    | 45       |
| function    | `rgba`                               | 92-96    | 50       |
| comment     | `/* comment */`                      | 115-128  | 100      |
| comment     | `/*\nmulti\nline\n\n<comment>\n\n*/` | 130-158  | 100      |
| atrule      | `@media (max-width: 600px)`          | 229-254  | 80       |

## Summary

- 📊 Pattern types: 7
- 🎯 Total matches: 61
