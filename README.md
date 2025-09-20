# @ryanatkn/fuz_code

[<img src="static/logo.svg" alt="a friendly pink spider facing you" align="right" width="192" height="192">](https://code.fuz.dev/)

> syntax styling utilities and components for TypeScript, Svelte, SvelteKit 🎨

**[code.fuz.dev](https://code.fuz.dev/)**

fuz_code is a rework of [Prism](https://github.com/PrismJS/prism)
([prismjs.com](https://prismjs.com/)).
The main changes:

- has a minimal and explicit API to generate stylized HTML, and knows nothing about the DOM
- uses stateless ES modules, instead of globals with side effects and pseudo-module behaviors
- has various incompatible changes, so using Prism grammars requires some tweaks
- smaller (by 7kB minified and 3kB gzipped, ~1/3 less) and [faster](#benchmarks)
- written in TypeScript
- is a fork, see the [MIT license](https://github.com/ryanatkn/fuz_code/blob/main/LICENSE)

Like Prism, there are zero dependencies (unless you count Prism's `@types/prismjs`),
but there are two optional dependencies:

- fuz_code provides optional builtin [Svelte](https://svelte.dev/) support
  with a [Svelte grammar](src/lib/grammar_svelte.ts)
  based on [`prism-svelte`](https://github.com/pngwn/prism-svelte)
  and a [Svelte component](src/lib/Code.svelte) for convenient usage.
- The [default theme](src/lib/theme.css) integrates
  with my CSS library [Moss](https://github.com/ryanatkn/moss) for colors that adapt to the user's runtime `color-scheme` preference.
  A [zero-dependency theme](src/lib/theme_standalone.css)
  is also provided that uses the less-customizable `light-dark()`, see below for more.

Compared to [Shiki](https://github.com/shikijs/shiki),
this library is much lighter
(with its faster `shiki/engine/javascript`, 503kB minified to 16kB, 63kb gzipped to 5.6kB),
and [vastly faster](#benchmarks)
for runtime usage because it uses JS regexps instead of
the [Onigurama regexp engine](https://shiki.matsu.io/guide/regex-engines)
used by TextMate grammars.
Shiki also has 38 dependencies instead of 0.
However this is not a fair comparison because Shiki is designed mainly for buildtime usage,
and Prism grammars are much simpler and less powerful than TextMate's.

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
on my CSS library [Moss](https://github.com/ryanatkn/moss)
for [color-scheme](https://moss.ryanatkn.com/docs/themes) awareness.
See the [Moss docs](https://moss.ryanatkn.com/) for its usage.

[A dependency-free version](src/lib/theme_standalone.css) of the default theme is provided,
but note that the colors are staticly defined instead of using
Moss' [style variables](https://moss.ryanatkn.com/docs/variables).
They use [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)
which means they're hardcoded to the inferred `color-scheme`,
rather than being settable by a user option unlike the Moss version. This could be improved using a class convention like `.dark`.

```ts
// no dependencies:
import '@ryanatkn/fuz_code/theme_standalone.css';
```

### Modules

- [@ryanatkn/fuz_code](src/lib/index.ts) - index with default grammars,
  use this as a guide if you want custom grammars
- [@ryanatkn/fuz_code/syntax_styler.js](src/lib/syntax_styler.ts) - utilities for custom grammars
- [@ryanatkn/fuz_code/theme.css](src/lib/theme.css) -
  default theme that depends on [Moss](https://github.com/ryanatkn/moss)
- [@ryanatkn/fuz_code/theme_standalone.css](src/lib/theme_standalone.css) -
  default theme with no dependencies
- [@ryanatkn/fuz_code/Code.svelte](src/lib/Code.svelte) -
  Svelte component with a convenient API

I encourage you to poke around [`src/lib`](src/lib) if you're interested in using fuz_code.

### Grammars

Enabled [by default](src/lib/index.ts):

- [`markup`](src/lib/grammar_markup.ts) (html, xml, etc)
- [`svelte`](src/lib/grammar_svelte.ts)
- [`ts`](src/lib/grammar_ts.ts)
- [`css`](src/lib/grammar_css.ts)
- [`js`](src/lib/grammar_js.ts)
- [`json`](src/lib/grammar_json.ts)
- [`clike`](src/lib/grammar_clike.ts)

### More

Docs are a work in progress:

- this readme has basic usage instructions
- [code.fuz.dev](https://code.fuz.dev/) has usage examples with the Svelte component
- [samples](https://code.fuz.dev/samples) on the website
  (also see the [sample files](src/lib/samples/))
- [tests](src/lib/syntax_styler.test.ts)

Please open issues if you need any help.

## Todo

- add builtin grammars for `markdown` and `regexp`
- lazy load the builtin grammars in `Code.svelte`
- improve the default theme colors
- add more themes
- add a Vite plugin to do syntax styling at build-time for static cases
- add a worker helper module
- add some useful plugins, flesh out the API (start with line emphasis)
- improve the TypeScript grammar to tokenize types
- improve the grammars in subtle ways

## Benchmarks

Performance is prioritized for dynamic runtime usage, as opposed to static pre-generation.
See [`./benchmark/`](./benchmark/) for detailed benchmarking setup and results.

To run the benchmarks:

```bash
npm run benchmark
```

## License [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

based on [Prism](https://github.com/PrismJS/prism)
by [Lea Verou](https://lea.verou.me/)

the [Svelte grammar](src/lib/grammar_svelte.ts)
is based on [`prism-svelte`](https://github.com/pngwn/prism-svelte)
by [@pngwn](https://github.com/pngwn)

[MIT](LICENSE)
