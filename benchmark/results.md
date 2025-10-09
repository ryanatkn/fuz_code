# Benchmark Baseline Results

## Benchmark Results

| Sample | Ops/sec | Mean Time (ms) | Samples |
|--------|---------|----------------|---------|
| json_complex | 28746.87 | 0.0373 | 268006 |
| css_complex | 27154.80 | 0.0389 | 257068 |
| ts_complex | 1811.93 | 0.5629 | 17765 |
| html_complex | 7624.85 | 0.1344 | 74425 |
| svelte_complex | 2191.20 | 0.4660 | 21462 |
| md_complex | 1919.49 | 0.5377 | 18599 |
| large:json_complex | 251.14 | 4.0689 | 2458 |
| large:css_complex | 233.08 | 4.3726 | 2287 |
| large:ts_complex | 7.27 | 140.2721 | 72 |
| large:html_complex | 48.17 | 21.6499 | 463 |
| large:svelte_complex | 11.89 | 87.4511 | 115 |
| large:md_complex | 6.47 | 156.3995 | 64 |

**Total samples benchmarked:** 12
**Average ops/sec:** 5833.93

| Sample | Ops/sec | Mean Time (ms) | Samples |
|--------|---------|----------------|---------|
| json_complex | 28865.33 | 0.0359 | 278880 |
| css_complex | 27777.36 | 0.0368 | 272048 |
| ts_complex | 1900.84 | 0.5299 | 18873 |
| html_complex | 8204.91 | 0.1253 | 79783 |
| svelte_complex | 2202.40 | 0.4673 | 21398 |
| md_complex | 1858.77 | 0.5663 | 17658 |
| large:json_complex | 243.87 | 4.2579 | 2349 |
| large:css_complex | 247.65 | 4.1402 | 2417 |
| large:ts_complex | 5.73 | 179.6819 | 64 |
| large:html_complex | 56.14 | 18.5677 | 539 |
| large:svelte_complex | 13.36 | 76.3735 | 131 |
| large:md_complex | 7.64 | 132.1847 | 76 |

**Total samples benchmarked:** 12
**Average ops/sec:** 5948.67

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
