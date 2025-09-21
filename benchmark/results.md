# Benchmark Baseline Results

## Benchmark Results

| Sample               | Ops/sec  | Mean Time (ms) | Samples |
| -------------------- | -------- | -------------- | ------- |
| json_complex         | 29821.82 | 0.0341         | 293671  |
| css_complex          | 26826.07 | 0.0381         | 262506  |
| ts_complex           | 5479.79  | 0.1845         | 54198   |
| html_complex         | 12268.33 | 0.0832         | 120121  |
| svelte_complex       | 2404.65  | 0.4203         | 23791   |
| large:json_complex   | 258.37   | 3.9305         | 2545    |
| large:css_complex    | 239.62   | 4.2260         | 2367    |
| large:ts_complex     | 30.66    | 33.1579        | 302     |
| large:html_complex   | 84.14    | 12.1397        | 824     |
| large:svelte_complex | 13.55    | 74.7600        | 134     |

**Total samples benchmarked:** 10
**Average ops/sec:** 7742.70

## Browser Benchmark Results

| Language | Implementation | Mean (ms) | Median (ms) | Std Dev | CV    | P95 (ms) | Ops/sec | Outliers | Failed | Stability |
| -------- | -------------- | --------- | ----------- | ------- | ----- | -------- | ------- | -------- | ------ | --------- |
| ts       | html           | 82.39     | 80.95       | 3.98    | 4.8%  | 87.60    | 12      | 0/10     | 0      | 100%      |
| ts       | ranges         | 38.74     | 38.60       | 3.02    | 7.8%  | 43.80    | 26      | 0/10     | 0      | 100%      |
| css      | html           | 840.65    | 840.20      | 9.26    | 1.1%  | 854.80   | 1       | 0/10     | 0      | 90%       |
| css      | ranges         | 14.01     | 14.30       | 0.78    | 5.6%  | 14.90    | 71      | 1/10     | 0      | 90%       |
| html     | html           | 62.01     | 64.90       | 9.28    | 15.0% | 71.30    | 16      | 0/10     | 0      | 100%      |
| html     | ranges         | 20.65     | 21.45       | 2.26    | 10.9% | 23.60    | 48      | 0/10     | 0      | 100%      |
| json     | html           | 402.64    | 401.80      | 3.07    | 0.8%  | 407.80   | 2       | 3/10     | 0      | 90%       |
| json     | ranges         | 13.29     | 13.40       | 0.74    | 5.6%  | 14.20    | 75      | 1/10     | 0      | 90%       |
| svelte   | html           | 175.48    | 166.10      | 21.47   | 12.2% | 218.10   | 6       | 0/10     | 0      | 100%      |
| svelte   | ranges         | 100.58    | 101.70      | 7.36    | 7.3%  | 113.70   | 10      | 1/10     | 0      | 100%      |
