# Benchmark Baseline Results

## Benchmark Results

| Sample               | Ops/sec  | Mean Time (ms) | Samples |
| -------------------- | -------- | -------------- | ------- |
| json_complex         | 29707.28 | 0.0342         | 292265  |
| css_complex          | 26703.36 | 0.0379         | 263940  |
| ts_complex           | 5496.57  | 0.1830         | 54637   |
| html_complex         | 12288.62 | 0.0823         | 121459  |
| svelte_complex       | 2423.58  | 0.4155         | 24066   |
| large:json_complex   | 264.05   | 3.8202         | 2618    |
| large:css_complex    | 232.02   | 4.3518         | 2298    |
| large:ts_complex     | 31.75    | 31.9106        | 314     |
| large:html_complex   | 85.34    | 11.8801        | 842     |
| large:svelte_complex | 13.46    | 75.2167        | 133     |

**Total samples benchmarked:** 10
**Average ops/sec:** 7724.60

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
