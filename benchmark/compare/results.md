# Syntax Highlighting Performance Comparison

Comparing fuz_code vs Prism vs Shiki across multiple languages and content sizes.

## Setup

This benchmark compares four implementations:

- **fuz_code**: The main project's syntax highlighter
- **Prism**: Established regex-based highlighter
- **Shiki JS**: Shiki with JavaScript regex engine
- **Shiki Oniguruma**: Shiki with full TextMate engine

## Test Matrix

**Languages tested:**

- TypeScript (`ts`)
- CSS (`css`)
- HTML (`html`)
- JSON (`json`)
- Svelte (`svelte`)

**Content sizes:**

- **small**: Original sample files (~100-500 lines)
- **large**: 100x repetition of sample content

## Running the Benchmark

```bash
# Run all languages
npm run benchmark-compare

# Filter by language
npm run benchmark-compare ts
npm run benchmark-compare css
```

## Results

_(Results will be generated when benchmark is run)_

## Notes

- **Performance context**: These results reflect runtime syntax highlighting performance
- **Fair comparison**: All implementations use the same sample content
- **Engine differences**:
  - fuz_code & Prism use JavaScript regex engines
  - Shiki JS uses JavaScript regex (similar performance profile)
  - Shiki Oniguruma uses WebAssembly TextMate engine (more accurate, slower)
- **Use cases**: Different tools optimized for different scenarios
  - fuz_code: Optimized for runtime usage
  - Prism: General-purpose, established ecosystem
  - Shiki: Primarily designed for build-time usage

## Environment

- Node.js version and system specs will vary
- Benchmark uses `tinybench` with 5s runtime per test
- Results include ops/sec, mean time, and sample count

## Results

| Implementation | Language  | Content Size | Ops/sec  | Mean Time (ms) | Samples |
| -------------- | --------- | ------------ | -------- | -------------- | ------- |
| fuz            | code      | css          | 26273.45 | 0.0416         | 120278  |
| fuz            | code      | css          | 226.93   | 4.5105         | 1109    |
| fuz            | code      | html         | 11995.02 | 0.0918         | 54491   |
| fuz            | code      | html         | 84.50    | 12.2158        | 410     |
| fuz            | code      | json         | 29091.49 | 0.0386         | 129534  |
| fuz            | code      | json         | 240.52   | 4.2820         | 1168    |
| fuz            | code      | svelte       | 2345.87  | 0.4445         | 11250   |
| fuz            | code      | svelte       | 13.76    | 73.3339        | 69      |
| fuz            | code      | ts           | 5396.05  | 0.1953         | 25606   |
| fuz            | code      | ts           | 31.72    | 32.0142        | 157     |
| prism          | css       | large        | 185.40   | 5.5851         | 896     |
| prism          | css       | small        | 23556.26 | 0.0466         | 107390  |
| prism          | html      | large        | 88.14    | 11.6189        | 431     |
| prism          | html      | small        | 12839.92 | 0.0860         | 58121   |
| shiki          | js        | css          | 1366.69  | 0.7446         | 6716    |
| shiki          | js        | css          | 13.80    | 72.6286        | 69      |
| shiki          | js        | html         | 794.03   | 1.2694         | 3939    |
| shiki          | js        | html         | 8.01     | 124.9942       | 64      |
| shiki          | js        | json         | 1949.40  | 0.5263         | 9501    |
| shiki          | js        | json         | 19.04    | 52.6481        | 95      |
| shiki          | js        | svelte       | 50.85    | 19.6725        | 255     |
| shiki          | js        | svelte       | 0.49     | 2030.3752      | 64      |
| shiki          | js        | ts           | 140.29   | 7.1358         | 701     |
| shiki          | js        | ts           | 1.39     | 721.4038       | 64      |
| prism          | json      | large        | 195.73   | 5.3808         | 930     |
| prism          | json      | small        | 26472.38 | 0.0423         | 118284  |
| shiki          | oniguruma | css          | 646.98   | 1.5523         | 3221    |
| shiki          | oniguruma | css          | 6.55     | 152.7431       | 64      |
| shiki          | oniguruma | html         | 785.87   | 1.2810         | 3904    |
| shiki          | oniguruma | html         | 7.99     | 125.1391       | 64      |
| shiki          | oniguruma | json         | 1799.58  | 0.5658         | 8838    |
| shiki          | oniguruma | json         | 17.80    | 56.2871        | 89      |
| shiki          | oniguruma | svelte       | 60.83    | 16.4459        | 305     |
| shiki          | oniguruma | svelte       | 0.58     | 1711.3046      | 64      |
| shiki          | oniguruma | ts           | 204.70   | 4.8918         | 1023    |
| shiki          | oniguruma | ts           | 1.96     | 511.7807       | 64      |
| prism          | svelte    | large        | 11.59    | 86.7170        | 64      |
| prism          | svelte    | small        | 2040.72  | 0.5084         | 9835    |
| prism          | ts        | large        | 22.29    | 45.1674        | 111     |
| prism          | ts        | small        | 4697.92  | 0.2224         | 22479   |

## Summary

- **fuz**: 7569.93 avg ops/sec, 12.7168ms avg time
- **prism**: 7011.04 avg ops/sec, 15.5375ms avg time
- **shiki**: 393.84 avg ops/sec, 280.6695ms avg time

## Notes

- **fuz_code**: Optimized for runtime usage with regex-based tokenization
- **Prism**: Established regex-based highlighter, similar approach to fuz_code
- **Shiki JS**: JavaScript regex engine, lighter than Oniguruma
- **Shiki Oniguruma**: Full TextMate engine, more accurate but slower
- **Content sizes**: "small" = original samples, "large" = 100x repetition

Generated: 2025-09-20T13:29:39.672Z
