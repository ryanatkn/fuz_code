# fuz_code - Syntax Highlighter

A performance-focused fork of PrismJS for syntax highlighting, optimized for runtime use.

## Commands

```bash
gro test      # Run tests
gro test -- file_pattern -t "specific filter"
npm run benchmark # Run benchmarks

# Test fixtures workflow
gro test src/fixtures/check.test.ts # verify
gro src/fixtures/update             # regenerate ONLY if on-disk files are incorrect
```

## File Structure

The codebase uses a flat structure with clear `domstyler` and `rangestyler` prefixes:

**IMPORTANT**: Domstyler is considered legacy - we should NOT fix it, only use it as a reference for expected behavior, which in some cases is worse than rangestyler. All improvements go into rangestyler.

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

### Test Infrastructure

- `src/lib/samples/sample_*.{lang}` - Test sample files (source of truth)
- `src/lib/samples/all.gen.ts` - Auto-generated sample aggregator
- `src/fixtures/update.task.ts` - Regenerates test fixtures
- `src/fixtures/check.test.ts` - Verifies runtime matches fixtures
- `src/fixtures/helpers.ts` - Shared test utilities
- `src/fixtures/{lang}/` - Generated fixtures (JSON + markdown reports)
- `src/lib/rangestyler.test.ts` - Boundary detection tests

### Shared Files

- `src/lib/code_sample.ts` - Code Sample interface and language constants
- `src/lib/samples/all.ts` - Generated sample data
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

### Colors

`--color_a` - blue
`--color_b` - green
`--color_c` - red
`--color_d` - purple
`--color_e` - yellow
`--color_f` - brown
`--color_g` - pink
`--color_h` - orange
`--color_i` - cyan

## Performance Characteristics

### DOM Styler

- Works in all browsers

### Range Styler

- Uses native browser Range objects instead of HTML generation
- Smaller memory footprint
- Falls back to HTML generation in older browsers

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

## Test Workflow

The test system uses a fixture-based approach:

1. **Sample files** (`src/lib/samples/sample_*.{lang}`) are the source of truth
2. **Generate fixtures**: `gro src/fixtures/update`
   - Discovers samples via filesystem search
   - Generates JSON data + markdown reports
   - Removes old fixtures before regenerating (clean slate)
3. **Verify tests**: `gro test src/fixtures/check.test.ts`
   - Compares runtime output with fixtures
   - Tests both domstyler and rangestyler
4. **Review changes**: `git diff src/fixtures/`
   - Commit expected changes after verification

### Test Fixtures

Generated fixtures are stored in `src/fixtures/{lang}/`:

- `{lang}_{variant}.json` - Machine-readable test data
- `{lang}_{variant}.md` - Human-readable report

**JSON fixture structure:**

```json
{
  "sample": {
    "lang": "css",
    "variant": "complex",
    "content": "...",
    "filepath": "src/lib/samples/sample_complex.css"
  },
  "boundaries": [...],  // Language boundaries for embedded content
  "matches": {          // Pattern match statistics
    "total": 61,
    "by_type": {"selector": 6, "property": 7, ...},
    "samples": [...]   // Sample matches for debugging
  },
  "domstyler_html": "...",    // Expected HTML from domstyler
  "rangestyler_html": "..."   // Expected HTML from rangestyler
}
```

**Using fixtures for debugging:**

The generated fixtures are invaluable for debugging pattern matching issues:

1. **Check boundaries**: Look at the `boundaries` array to see how text is segmented (e.g., comments vs content)
2. **Review matches**: The `matches.samples` array shows which patterns matched where
3. **Compare HTML**: Compare `domstyler_html` vs `rangestyler_html` to spot differences
4. **Human-readable reports**: The `.md` files provide a visual overview

```typescript
// Example: Debug why a pattern isn't matching
import {readFileSync} from 'node:fs';
const fixture = JSON.parse(readFileSync('src/fixtures/css/css_complex.json', 'utf-8'));

// Check if your expected text was matched
const matches = fixture.matches.samples;
const id_selector_match = matches.find((m) => m.text === '#unique_id');
console.log('ID selector match:', id_selector_match);

// See all selector matches
const selectors = matches.filter((m) => m.pattern_name === 'selector');
console.log('All selectors:', selectors);
```

## Planned Optimizations

See `TODO.md`, `TODO_HIGHLIGHT.md`, and `TODO_TESTS.md` for plans:

- Pattern caching
- Array-based token storage
- Grammar pre-compilation
- Multiple implementation strategies for benchmarking
- Additional sample variants (basic, edge cases)

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
