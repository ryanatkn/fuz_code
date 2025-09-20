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

Language Implementation Mean (ms) Median (ms) Std Dev CV P95 (ms) Ops/sec Outliers Failed Stability
ts html 101.65 100.30 10.80 10.6% 121.80 10 0/10 0 100%
ts ranges 30.16 27.30 6.37 21.1% 41.30 33 0/10 0 100%
css html 993.90 993.95 2.86 0.3% 998.10 1 0/10 0 90%
css ranges 14.28 13.75 1.37 9.6% 17.40 70 2/10 0 90%
html html 95.50 96.75 7.10 7.4% 104.20 10 0/10 0 100%
html ranges 18.76 18.25 3.45 18.4% 23.40 53 0/10 0 100%
json html 317.05 318.65 14.80 4.7% 334.90 3 0/10 0 100%
json ranges 15.71 15.60 2.26 14.4% 20.50 64 0/10 0 100%
svelte html 227.66 230.45 7.06 3.1% 235.00 4 0/10 0 100%
svelte ranges 97.48 97.25 5.64 5.8% 105.90 10 0/10 0 100%
