# JSON Diagnostics

## Boundaries Detected

| Type    | Start | End | Length | Language | Snippet                                    |
| ------- | ----- | --- | ------ | -------- | ------------------------------------------ |
| content | 0     | 121 | 121    | -        | `{\n\t"string": "a string",\n\t"number": ` |

## Match Statistics

**Total matches:** 31

### Distribution by Pattern Type

| Pattern Type | Count | Percentage |
| ------------ | ----- | ---------- |
| punctuation  | 12    | 38.7%      |
| property     | 6     | 19.4%      |
| operator     | 6     | 19.4%      |
| number       | 2     | 6.5%       |
| boolean      | 2     | 6.5%       |
| null         | 2     | 6.5%       |
| string       | 1     | 3.2%       |

## Sample Matches

| Pattern     | Text         | Position | Priority |
| ----------- | ------------ | -------- | -------- |
| punctuation | `{`          | 0-1      | 20       |
| property    | `"string"`   | 3-11     | 90       |
| operator    | `:`          | 11-12    | 10       |
| string      | `"a string"` | 13-23    | 85       |
| punctuation | `,`          | 23-24    | 20       |
| property    | `"number"`   | 26-34    | 90       |
| operator    | `:`          | 34-35    | 10       |
| number      | `12345`      | 36-41    | 50       |
| punctuation | `,`          | 41-42    | 20       |
| property    | `"boolean"`  | 44-53    | 90       |
| operator    | `:`          | 53-54    | 10       |
| boolean     | `true`       | 55-59    | 45       |
| null        | `null`       | 63-67    | 40       |
| null        | `null`       | 70-74    | 40       |
| number      | `1`          | 101-102  | 50       |
| boolean     | `false`      | 109-114  | 45       |

## Summary

- 📊 Pattern types: 7
- 🎯 Total matches: 31
