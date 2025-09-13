# Module Restructuring Plan

## Overview

Restructure the codebase to use clearer naming with `domstyler` and `rangestyler` prefixes, remove all barrel files, and flatten to a single directory.

## File Mapping

### DOM Styler (Current → New)

```
src/lib/syntax_styler.ts               → src/lib/domstyler.ts
src/lib/syntax_styler.test.ts          → src/lib/domstyler_test.ts
src/lib/Code.svelte                    → src/lib/Domstyler_Code.svelte
src/lib/grammar_js.ts                  → src/lib/domstyler_lang_js.ts
src/lib/grammar_ts.ts                  → src/lib/domstyler_lang_ts.ts
src/lib/grammar_css.ts                 → src/lib/domstyler_lang_css.ts
src/lib/grammar_markup.ts              → src/lib/domstyler_lang_html.ts
src/lib/grammar_json.ts                → src/lib/domstyler_lang_json.ts
src/lib/grammar_svelte.ts              → src/lib/domstyler_lang_svelte.ts
src/lib/grammar_clike.ts               → src/lib/domstyler_lang_clike.ts
src/lib/theme.css                      → src/lib/domstyler_theme.css
src/lib/theme_standalone.css           → src/lib/domstyler_theme_standalone.css
src/lib/index.ts                       → DELETE (no barrel files)
```

### Range Styler (Current → New)

```
src/lib/highlight/highlight_styler.ts  → src/lib/rangestyler.ts
src/lib/highlight/range_builder.ts     → src/lib/rangestyler_builder.ts
src/lib/highlight/types.ts             → src/lib/rangestyler_types.ts
src/lib/highlight/Highlight_Code.svelte → src/lib/Rangestyler_Code.svelte
src/lib/highlight/language_ts.ts       → src/lib/rangestyler_lang_ts.ts
src/lib/highlight/language_css.ts      → src/lib/rangestyler_lang_css.ts
src/lib/highlight/language_html.ts     → src/lib/rangestyler_lang_html.ts
src/lib/highlight/language_json.ts     → src/lib/rangestyler_lang_json.ts
src/lib/highlight/language_svelte.ts   → src/lib/rangestyler_lang_svelte.ts
src/lib/highlight/theme_highlight.css  → src/lib/rangestyler_theme.css
src/lib/highlight/index.ts             → DELETE (no barrel files)
src/lib/highlight/CLAUDE.md            → Move content to root CLAUDE.md
```

### Shared Files (Keep As-Is)

```
src/lib/code_samples.ts                → src/lib/code_samples.ts
src/lib/benchmark.ts                   → src/lib/benchmark.ts
src/lib/run_benchmark.ts               → src/lib/run_benchmark.ts
```

## Class/Type/Function Renaming

### DOM Styler

```typescript
// domstyler.ts
export class Domstyler { ... }  // was Syntax_Styler
export const domstyler = new Domstyler();  // was syntax_styler

// Types
export type Grammar { ... }  // unchanged
export type Grammar_Token { ... }  // unchanged
export type Add_Domstyler_Grammar { ... }  // unchanged

// domstyler_lang_*.ts
export const add_domstyler_grammar_js: Add_Domstyler_Grammar = ...  // unchanged function names
```

### Range Styler

```typescript
// rangestyler.ts
export class Rangestyler { ... }  // was Highlight_Styler
export const rangestyler_global = new Rangestyler();  // was highlight_styler_global

// rangestyler_types.ts
export interface Pattern { ... }  // unchanged
export interface Rangestyler_Language { ... }  // was Highlight_Language

// rangestyler_lang_*.ts
export const ts_language: Rangestyler_Language = ...  // unchanged exports
```

## Import Updates

### Before

```typescript
import {syntax_styler} from '$lib/index.js';
import {Syntax_Styler} from '$lib/syntax_styler.js';
import Code from '$lib/Code.svelte';
import {highlight_styler_global} from '$lib/highlight/index.js';
import Highlight_Code from '$lib/highlight/Highlight_Code.svelte';
```

### After

```typescript
import {domstyler} from '$lib/domstyler.js';
import {Domstyler} from '$lib/domstyler.js';
import Domstyler_Code from '$lib/Domstyler_Code.svelte';
import {rangestyler_global} from '$lib/rangestyler.js';
import Rangestyler_Code from '$lib/Rangestyler_Code.svelte';
```

## CSS Class Updates

### DOM Styler Theme

```css
/* domstyler_theme.css */
.token.comment { ... }  /* unchanged */
.token.string { ... }   /* unchanged */
```

### Range Styler Theme

```css
/* rangestyler_theme.css */
::highlight(ts_comment) { ... }   /* unchanged */
::highlight(json_property) { ... } /* unchanged */
```

## Migration Steps

### Phase 1: Move and Rename Files

1. Move Range Styler files from src/lib/highlight/ to src/lib/:

   ```bash
   mv src/lib/highlight/highlight_styler.ts src/lib/rangestyler.ts
   mv src/lib/highlight/range_builder.ts src/lib/rangestyler_builder.ts
   mv src/lib/highlight/types.ts src/lib/rangestyler_types.ts
   mv src/lib/highlight/Highlight_Code.svelte src/lib/Rangestyler_Code.svelte
   mv src/lib/highlight/language_ts.ts src/lib/rangestyler_lang_ts.ts
   mv src/lib/highlight/language_css.ts src/lib/rangestyler_lang_css.ts
   mv src/lib/highlight/language_html.ts src/lib/rangestyler_lang_html.ts
   mv src/lib/highlight/language_json.ts src/lib/rangestyler_lang_json.ts
   mv src/lib/highlight/language_svelte.ts src/lib/rangestyler_lang_svelte.ts
   mv src/lib/highlight/theme_highlight.css src/lib/rangestyler_theme.css
   ```

2. Rename DOM Styler files in place:

   ```bash
   mv src/lib/syntax_styler.ts src/lib/domstyler.ts
   mv src/lib/syntax_styler.test.ts src/lib/domstyler_test.ts
   mv src/lib/Code.svelte src/lib/Domstyler_Code.svelte
   mv src/lib/grammar_js.ts src/lib/domstyler_lang_js.ts
   mv src/lib/grammar_ts.ts src/lib/domstyler_lang_ts.ts
   mv src/lib/grammar_css.ts src/lib/domstyler_lang_css.ts
   mv src/lib/grammar_markup.ts src/lib/domstyler_lang_html.ts
   mv src/lib/grammar_json.ts src/lib/domstyler_lang_json.ts
   mv src/lib/grammar_svelte.ts src/lib/domstyler_lang_svelte.ts
   mv src/lib/grammar_clike.ts src/lib/domstyler_lang_clike.ts
   mv src/lib/theme.css src/lib/domstyler_theme.css
   mv src/lib/theme_standalone.css src/lib/domstyler_theme_standalone.css
   ```

3. Delete barrel files and empty directory:
   ```bash
   rm src/lib/index.ts
   rm src/lib/highlight/index.ts
   rm -rf src/lib/highlight/
   ```

### Phase 2: Update File Contents

4. Update class names and exports in moved files
5. Update imports within library files
6. Update cross-references between domstyler and rangestyler files

### Phase 3: Update Consumers

7. Update all component imports in routes/
8. Update test imports
9. Update benchmark imports
10. Run tests to verify everything works

### Phase 4: Documentation

11. Update root CLAUDE.md
12. Merge src/lib/highlight/CLAUDE.md content into root CLAUDE.md
13. Update package.json exports if needed

## Component Updates

### Domstyler_Code.svelte

```svelte
<script lang="ts">
	import {domstyler as domstyler_default} from '$lib/domstyler.js';
	import {Domstyler, type Grammar} from '$lib/domstyler.js';
	// ... rest unchanged
</script>
```

### Rangestyler_Code.svelte

```svelte
<script lang="ts">
	import {rangestyler_global, type Rangestyler} from '$lib/rangestyler.js';
	// ... rest unchanged
</script>
```

## Route Updates

### /samples/+page.svelte

```svelte
import Domstyler_Code from '$lib/Domstyler_Code.svelte';
```

### /highlight/+page.svelte

```svelte
import Rangestyler_Code from '$lib/Rangestyler_Code.svelte'; import '$lib/rangestyler_theme.css';
```

### /compare/+page.svelte

```svelte
import Domstyler_Code from '$lib/Domstyler_Code.svelte'; import Rangestyler_Code from
'$lib/Rangestyler_Code.svelte'; import '$lib/rangestyler_theme.css';
```

### /benchmark/+page.svelte

```svelte
import {domstyler} from '$lib/domstyler.js'; import {rangestyler_global} from '$lib/rangestyler.js';
```

## Testing Strategy

1. Run existing tests after each phase
2. Verify all routes still render correctly
3. Run benchmarks to ensure performance unchanged
4. Test both DOM and Range implementations
5. Verify themes apply correctly

## Benefits

- **Clearer naming**: `domstyler` vs `rangestyler` immediately shows implementation
- **No barrel files**: Direct imports are more explicit
- **Flat structure**: Easier to navigate, no nested directories
- **Consistent prefixes**: All related files grouped together
- **Better discoverability**: Can see all files at once in src/lib/

## Risks & Mitigation

- **Breaking imports**: Use find/replace carefully, test thoroughly
- **Missing references**: Search entire codebase for old names
- **Theme conflicts**: Ensure CSS classes don't overlap
- **Documentation drift**: Update all docs in same PR
