# fuz_code - Syntax Highlighter

A performance-focused fork of PrismJS for syntax highlighting, optimized for runtime use.

## File Structure

The codebase uses a flat structure with clear `domstyler` and `rangestyler` prefixes:

### DOM Styler (HTML Generation)

- `src/lib/domstyler.ts` - Main tokenization engine with pattern matching
- `src/lib/domstyler_lang_js.ts` - JS/ECMAScript patterns
- `src/lib/domstyler_lang_ts.ts` - TypeScript (extends JS)
- `src/lib/domstyler_lang_svelte.ts` - Svelte components
- `src/lib/domstyler_lang_html.ts` - HTML/XML (formerly markup)
- `src/lib/domstyler_lang_css.ts` - CSS stylesheets
- `src/lib/domstyler_lang_json.ts` - JSON data
- `src/lib/domstyler_lang_clike.ts` - Base for C-like languages
- `src/lib/Domstyler_Code.svelte` - Svelte component wrapper
- `src/lib/domstyler_theme.css` - Main theme (requires Moss)
- `src/lib/domstyler_theme_standalone.css` - Dependency-free theme
- `src/lib/domstyler_test.ts` - Unit tests

### Range Styler (CSS Custom Highlight API)

- `src/lib/rangestyler.ts` - Main class using native browser Ranges
- `src/lib/rangestyler_builder.ts` - Pattern → Range conversion
- `src/lib/rangestyler_types.ts` - Pattern, Rangestyler_Language types
- `src/lib/rangestyler_lang_ts.ts` - TypeScript patterns
- `src/lib/rangestyler_lang_css.ts` - CSS patterns
- `src/lib/rangestyler_lang_html.ts` - HTML patterns
- `src/lib/rangestyler_lang_json.ts` - JSON patterns
- `src/lib/rangestyler_lang_svelte.ts` - Svelte patterns
- `src/lib/Rangestyler_Code.svelte` - Svelte component
- `src/lib/rangestyler_theme.css` - ::highlight() styles

### Shared Files

- `src/lib/code_samples.ts` - Test input samples
- `src/lib/benchmark.ts` - Performance benchmarking
- `src/lib/run_benchmark.ts` - Benchmark runner

## Usage

### DOM Styler (Traditional HTML Generation)

```typescript
import {domstyler} from '$lib/domstyler.js';
import Domstyler_Code from '$lib/Domstyler_Code.svelte';

// Direct API
const html = domstyler.stylize(code, 'ts');

// Component
<Domstyler_Code content={code} lang="ts" />
```

### Range Styler (CSS Custom Highlight API)

```typescript
import {rangestyler_global} from '$lib/rangestyler.js';
import Rangestyler_Code from '$lib/Rangestyler_Code.svelte';

// Direct API
rangestyler_global.highlight(element, code, 'ts');

// Component
<Rangestyler_Code content={code} lang="ts" />
```

## Architecture

### DOM Styler

1. **Tokenization Flow**:
   - Text → Grammar patterns (regex) → Token stream (linked list) → HTML output
   - Uses recursive pattern matching with greedy/non-greedy support
   - Supports nested grammars and language embedding

2. **Grammar System**:
   - Hierarchical regex-based patterns
   - Grammar extension/inheritance (e.g., TS extends JS)
   - Dynamic grammar insertion for language embedding

### Range Styler

1. **Highlighting Flow**:
   - Text → Pattern matching → Range objects → CSS Custom Highlights
   - Direct pattern to Range conversion without intermediate tokens
   - Automatic fallback to HTML for unsupported browsers

2. **Pattern System**:
   - Simpler pattern-based definitions
   - No grammar inheritance
   - Direct platform API usage (CSS.highlights, globalThis.Highlight)

## Performance Characteristics

### DOM Styler

- Works in all browsers

### Range Styler

- Uses native browser Range objects instead of HTML generation
- Smaller memory footprint
- Falls back to HTML generation in older browsers

## Commands

```bash
npm run dev       # Development server
npm run build     # Build library
npm run test      # Run tests
npm run preview   # Preview built site
npm run benchmark # Run benchmarks
```

## Current Performance Bottlenecks

### DOM Styler

1. **Regex compilation** - Patterns recompiled on each use
2. **Linked list operations** - O(n) traversal for tokens
3. **Deep cloning** - Grammar extension copies entire trees
4. **String concatenation** - HTML built via string concat

### Range Styler

1. **Pattern matching** - Could benefit from caching
2. **Range creation** - Multiple DOM operations
3. **Overlap resolution** - O(n²) in worst case

## Demo Pages

- `/samples` - DOM Styler examples
- `/highlight` - Range Styler demo
- `/compare` - Side-by-side comparison
- `/benchmark` - Performance testing

## Planned Optimizations

See `TODO.md` and `TODO_HIGHLIGHT.md` for optimization plans:

- Pattern caching
- Array-based token storage
- Grammar pre-compilation
- Multiple implementation strategies for benchmarking

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
