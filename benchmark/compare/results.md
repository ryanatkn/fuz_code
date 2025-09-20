# Syntax Highlighting Performance Comparison

## Results

| Language | Content Size | Implementation  | %    | Ops/sec  | Mean Time (ms) | Samples | Total (ms) |
| -------- | ------------ | --------------- | ---- | -------- | -------------- | ------- | ---------- |
| css      | small        | fuz_code        | 100% | 26158.09 | 0.0427         | 234426  | 10000.0    |
| css      | small        | prism           | 90%  | 23484.90 | 0.0478         | 209059  | 10000.0    |
| css      | small        | shiki_js        | 5%   | 1327.34  | 0.7699         | 12989   | 10000.0    |
| css      | small        | shiki_oniguruma | 2%   | 621.90   | 1.6248         | 6155    | 10000.6    |
| css      | large        | fuz_code        | 100% | 223.32   | 4.6281         | 2161    | 10001.3    |
| css      | large        | prism           | 82%  | 183.72   | 5.6730         | 1763    | 10001.5    |
| css      | large        | shiki_js        | 6%   | 13.59    | 73.7463        | 136     | 10029.5    |
| css      | large        | shiki_oniguruma | 3%   | 6.45     | 155.0611       | 65      | 10079.0    |
| html     | small        | prism           | 100% | 12755.60 | 0.0872         | 114669  | 10000.1    |
| html     | small        | fuz_code        | 95%  | 12171.61 | 0.0917         | 109036  | 10000.0    |
| html     | small        | shiki_js        | 6%   | 781.23   | 1.2930         | 7734    | 10000.4    |
| html     | small        | shiki_oniguruma | 6%   | 768.87   | 1.3152         | 7604    | 10000.7    |
| html     | large        | prism           | 100% | 86.72    | 11.8917        | 841     | 10000.9    |
| html     | large        | fuz_code        | 94%  | 81.75    | 12.8460        | 779     | 10007.0    |
| html     | large        | shiki_js        | 9%   | 8.09     | 123.7635       | 81      | 10024.8    |
| html     | large        | shiki_oniguruma | 9%   | 7.75     | 129.2517       | 78      | 10081.6    |
| json     | small        | fuz_code        | 100% | 29618.39 | 0.0388         | 257616  | 10000.0    |
| json     | small        | prism           | 88%  | 26112.07 | 0.0430         | 232559  | 10000.0    |
| json     | small        | shiki_js        | 7%   | 1933.63  | 0.5351         | 18691   | 10000.8    |
| json     | small        | shiki_oniguruma | 6%   | 1766.19  | 0.5837         | 17132   | 10000.0    |
| json     | large        | fuz_code        | 100% | 243.97   | 4.2315         | 2364    | 10003.2    |
| json     | large        | prism           | 78%  | 189.88   | 5.6221         | 1779    | 10001.8    |
| json     | large        | shiki_js        | 8%   | 18.52    | 54.1609        | 185     | 10019.8    |
| json     | large        | shiki_oniguruma | 7%   | 16.93    | 59.3025        | 169     | 10022.1    |
| svelte   | small        | fuz_code        | 100% | 2267.74  | 0.4721         | 21184   | 10000.0    |
| svelte   | small        | prism           | 90%  | 2043.19  | 0.5110         | 19571   | 10000.3    |
| svelte   | small        | shiki_oniguruma | 3%   | 65.99    | 15.1656        | 660     | 10009.3    |
| svelte   | small        | shiki_js        | 2%   | 53.46    | 18.7112        | 535     | 10010.5    |
| svelte   | large        | fuz_code        | 100% | 14.15    | 71.3003        | 141     | 10053.3    |
| svelte   | large        | prism           | 81%  | 11.46    | 87.8017        | 114     | 10009.4    |
| svelte   | large        | shiki_oniguruma | 4%   | 0.62     | 1615.1240      | 7       | 11305.9    |
| svelte   | large        | shiki_js        | 4%   | 0.50     | 1991.9609      | 6       | 11951.8    |
| ts       | small        | fuz_code        | 100% | 5257.39  | 0.2009         | 49789   | 10000.2    |
| ts       | small        | prism           | 90%  | 4745.15  | 0.2203         | 45384   | 10000.1    |
| ts       | small        | shiki_oniguruma | 4%   | 199.88   | 5.0115         | 1996    | 10002.9    |
| ts       | small        | shiki_js        | 3%   | 135.34   | 7.4001         | 1352    | 10004.9    |
| ts       | large        | fuz_code        | 100% | 31.25    | 32.4047        | 309     | 10013.1    |
| ts       | large        | prism           | 73%  | 22.91    | 43.9850        | 228     | 10028.6    |
| ts       | large        | shiki_oniguruma | 6%   | 1.95     | 511.8613       | 20      | 10237.2    |
| ts       | large        | shiki_js        | 4%   | 1.36     | 736.0991       | 14      | 10305.4    |
