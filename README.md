# @ryanatkn/fuz_code

[<img src="static/logo.svg" alt="a friendly pink spider facing you" align="right" width="192" height="192">](https://code.fuz.dev/)

> syntax styling utilities and components for Svelte, SvelteKit, TypeScript 🎨

**[code.fuz.dev](https://code.fuz.dev/)**

fuz_code is a rework of [Prism](https://github.com/PrismJS/prism). The main changes:

- has a minimal, explicit API to generate stylized HTML, and knows nothing about the DOM
- uses stateless ES modules instead of globals with side effects and pseudo-module behaviors
- has various incompatible changes, so using Prism grammars requires some tweaks
- smaller (by 6.5kB, 3kB gzipped) and [faster](#benchmarks)
- written in TypeScript

It also has builtin [Svelte](https://svelte.dev/) support
with a [Svelte grammar](src/lib/grammar_svelte.ts)
based on [`prism-svelte`](https://github.com/pngwn/prism-svelte)
and a [Svelte component](src/lib/Code.svelte) for convenient usage.

Compared to [Shiki](https://github.com/shikijs/shiki),
this library is lighter and [vastly faster](#benchmarks)
for runtime usage because it uses JS regexps instead of
the [Onigurama regexp engine](https://shiki.matsu.io/guide/regex-engines)
used by TextMate grammars.
However, Prism grammars are much simpler and less powerful than TextMate's.

The [default theme](src/lib/theme.css) integrates
with my CSS design system [Moss](https://github.com/ryanatkn/moss).
A [zero-dependency theme](src/lib/theme_standalone.css)
is provided with some caveats, see below for more.

## Usage

```bash
npm i -D @ryanatkn/fuz_code
```

```ts
import {syntax_styler} from '@ryanatkn/fuz_code';

syntax_styler.stylize('<h1>hello world</h1>', 'svelte');
```

Themes are just CSS files, so they work with any JS framework.

With SvelteKit:

```ts
// +layout.svelte
import '@ryanatkn/fuz_code/theme.css';
```

The primary themes (currently just [one](src/lib/theme.css)) have a dependency
on my CSS framework [Moss](https://github.com/ryanatkn/moss)
for [color-scheme](https://moss.ryanatkn.com/library/themes) awareness.

[A dependency-free version](src/lib/theme_standalone.css) of the initial theme is provided,
but note that the colors are staticly defined instead of using
Moss' [style variables](https://moss.ryanatkn.com/library/variables).
They use [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)
which means they're hardcoded to the inferred `color-scheme`,
rather than being settable by a user option unlike the Moss version.

```ts
// no dependencies:
import '@ryanatkn/fuz_code/theme_standalone.css';
```

Docs are a work in progress, open issues if you need help:

- [code.fuz.dev](https://code.fuz.dev/)
- [samples](https://code.fuz.dev/samples) on the website
  (also see the [inputs](src/lib/code_sample_inputs.ts)
  and [outputs](src/lib/code_sample_outputs.ts))
- [tests](src/lib/syntax_styler.test.ts)

## Grammars

For now, all of these are [enabled by default](src/lib/index.ts):

- [`markup`](src/lib/grammar_markup.ts) (html, xml, etc)
- [`svelte`](src/lib/grammar_svelte.ts)
- [`ts`](src/lib/grammar_ts.ts)
- [`css`](src/lib/grammar_css.ts)
- [`js`](src/lib/grammar_js.ts)
- [`json`](src/lib/grammar_json.ts)
- [`clike`](src/lib/grammar_clike.ts)

## TODO

- add builtin grammars for `markdown` and `regexp`
- lazy load the builtin grammars in `Code.svelte`
- improve the default theme colors
- add more themes
- add a Vite plugin to do syntax styling at build-time for static cases
- add some useful plugins, flesh out the API (start with line emphasis)
- better worker support
- improve the TypeScript grammar to tokenize types
- improve the grammars in subtle ways

## Benchmarks

Performance is a high priority to best support runtime usage.
This project is still early and there are more gains to be had.

Note that this benchmark is somewhat unfair to Shiki
because it's not designed for runtime usage,
and it probably does a significantly better job at the task at hand
because it uses TextMate grammars.

Results styling the [Svelte sample](src/lib/code_sample_inputs.ts):

| Task name             | Throughput average (ops/s) | Throughput median (ops/s) | Samples |
| --------------------- | -------------------------- | ------------------------- | ------- |
| syntax_styler.stylize | 3149 ± 0.56%               | 3333                      | 6004    |
| Prism.highlight       | 2748 ± 0.51%               | 2500                      | 5293    |
| Shiki js regexp       | 69 ± 0.59%                 | 69                        | 138     |
| Shiki builtin regexp  | 41 ± 0.27%                 | 40                        | 82      |

Directly runnable benchmarks are not included yet -
I don't know if I'll add them here or make a separate project.

To run the benchmarks yourself:

```bash
npm i -D shiki prismjs prism-svelte @types/prismjs
```

Then add this file and import it somewhere like `$routes/+page.svelte`:

```ts
// $lib/benchmark.ts

import {Bench} from 'tinybench';
import Prism from 'prismjs';
import 'prism-svelte';
import {createHighlighterCoreSync} from 'shiki/core';
import {createJavaScriptRegexEngine} from 'shiki/engine/javascript';
import svelte_shiki from 'shiki/langs/svelte.mjs';
import nord from 'shiki/themes/nord.mjs';
import {createOnigurumaEngine} from 'shiki/engine/oniguruma';

import {syntax_styler} from '$lib/index.js';
import {sample_svelte_code} from '$lib/code_sample_inputs.js';

console.log('benchmarking');
const bench = new Bench({name: 'syntax styling', time: 2000});

const shiki_highlighter_js = createHighlighterCoreSync({
	themes: [nord],
	langs: [svelte_shiki],
	engine: createJavaScriptRegexEngine(),
});

const shiki_highlighter_builtin = createHighlighterCoreSync({
	themes: [nord],
	langs: [svelte_shiki],
	engine: await createOnigurumaEngine(import('shiki/wasm')),
});

bench
	.add('syntax_styler.stylize', () => {
		syntax_styler.stylize(sample_svelte_code, 'svelte');
	})
	.add('Prism.highlight', () => {
		Prism.highlight(sample_svelte_code, Prism.languages.svelte, 'svelte');
	})
	.add('Shiki js regexp', () => {
		shiki_highlighter_js.codeToHtml(sample_svelte_code, {lang: 'svelte', theme: 'nord'});
	})
	.add('Shiki builtin regexp', () => {
		shiki_highlighter_builtin.codeToHtml(sample_svelte_code, {lang: 'svelte', theme: 'nord'});
	});

await bench.run();

console.log(bench.name);
console.table(bench.table());
```

## License [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

based on [Prism](https://github.com/PrismJS/prism) by [Lea Verou](https://lea.verou.me/)
and [`prism-svelte`](https://github.com/pngwn/prism-svelte) by [@pngwn](https://github.com/pngwn)

[MIT](LICENSE)
