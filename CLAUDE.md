# fuz_code - Syntax Highlighter

A performance-focused fork of PrismJS for syntax highlighting, optimized for runtime use with optional CSS Custom Highlight API support.

## Quick Start

```typescript
import Code from '$lib/Code.svelte';
import {syntax_styler_global} from '$lib/syntax_styler_global.js';

// Auto-detects and uses CSS Highlight API when available
<Code content={code} lang="ts" />

// Force specific rendering mode
<Code content={code} lang="ts" mode="html" />    // Traditional HTML
<Code content={code} lang="ts" mode="ranges" />  // CSS Highlights

// Direct usage
const html = syntax_styler_global.stylize(code, 'ts');
```

## Commands

```bash
gro test                            # Run all tests
gro test src/fixtures/check.test.ts # Verify fixture generation
npm run update-generated-fixtures   # Regenerate fixtures
npm run benchmark                   # Run performance benchmarks
npm run benchmark-compare           # Compare performance with Prism and Shiki
```

## Architecture

### Core System

**Syntax Styler** - A PrismJS fork with two rendering modes:

1. **HTML Mode** - Traditional token-based HTML generation with CSS classes
2. **Range Mode** - CSS Custom Highlight API for native browser highlighting (Chrome 105+, Firefox 111+)

The system uses regex-based tokenization inherited from PrismJS, maintaining compatibility with existing language definitions while adding position tracking for range highlighting.

### Key Components

#### Tokenization Engine

- `src/lib/syntax_styler.ts` - Core tokenization engine with linked list processing
- `src/lib/syntax_styler_global.ts` - Pre-configured global instance
- `tokenize_syntax()` from `src/lib/syntax_styler.ts` - Main tokenization function

#### Language Definitions

- `src/lib/grammar_ts.ts` - TypeScript/JavaScript
- `src/lib/grammar_css.ts` - CSS stylesheets
- `src/lib/grammar_markup.ts` - HTML/XML markup
- `src/lib/grammar_json.ts` - JSON data
- `src/lib/grammar_svelte.ts` - Svelte components
- `src/lib/grammar_clike.ts` - Base for C-like languages

#### Range Highlighting

- `src/lib/highlight_manager.ts` - Direct tree traversal for range creation
- `src/lib/Highlight_Manager` - Manages CSS Custom Highlights per element

#### Components

- `src/lib/Code.svelte` - Hybrid component supporting both HTML and range modes with auto-detection

#### Themes

- `src/lib/theme.css` - Traditional CSS classes for HTML mode (requires Moss or theme_variables.css)
- `src/lib/theme_variables.css` - CSS variable definitions for non-Moss users

## How It Works

### Token Tree Structure

Syntax styler creates a hierarchical token tree where tokens can contain nested tokens:

```typescript
interface Syntax_Token {
	type: string; // Token type (e.g., 'keyword', 'string')
	content: string | Syntax_Token_Stream; // Text or nested tokens
	alias: string | Array<string>; // CSS class aliases
	length: number; // Token text length
}
```

### Range Creation

For CSS Custom Highlights, ranges are created directly from the token tree during a single traversal:

```typescript
// Generate tokens from syntax styler
const tokens = tokenize_syntax(code, grammar);
// Highlight manager creates ranges directly from the token tree
highlight_manager.highlight_from_syntax_tokens(element, tokens);
```

### CSS Custom Highlights

When supported, the browser's native highlighting is used:

```javascript
// Create ranges for each token
const range = document.createRange();
range.setStart(textNode, token.start);
range.setEnd(textNode, token.end);

// Add to CSS Highlight
const highlight = CSS.highlights.get(token.type) || new Highlight();
highlight.add(range);
CSS.highlights.set(token.type, highlight);
```

## Supported Languages

- `ts` - TypeScript
- `js` - JavaScript
- `css` - CSS
- `html` - HTML/XML
- `json` - JSON
- `svelte` - Svelte components

## API Reference

### Syntax_Styler

```typescript
class Syntax_Styler {
	// Generate HTML with syntax highlighting
	stylize(text: string, lang: string): string;

	// Get language grammar
	get_lang(id: string): Grammar;

	// Add new language
	add_lang(id: string, grammar: Grammar, aliases?: string[]): void;
}
```

### Pre-configured instance

```typescript
import {syntax_styler_global} from '$lib/syntax_styler_global.js';

const html = syntax_styler_global.stylize(code, 'ts');
```

### Highlight_Manager

Manages CSS Custom Highlights for an element:

```typescript
const manager = new Highlight_Manager();

// Apply highlights from tokens
manager.highlight_from_syntax_tokens(element, tokens);

// Clear highlights
manager.clear_element_ranges();

// Clean up
manager.destroy();
```

## Testing

### Sample Files

Test samples in `src/lib/samples/sample_*.{lang}` are the source of truth.

### Fixtures

Generated fixtures in `src/fixtures/{lang}/`:

- `{lang}_{variant}.json` - Token data and HTML output
- `{lang}_{variant}.txt` - Human-readable debug output

### Workflow

1. Edit samples in `src/lib/samples/`
2. Run `npm run update-generated-fixtures` to regenerate
3. Run `gro test src/fixtures/check.test.ts` to verify
4. Review changes with `git diff src/fixtures/`

## Performance

### Benchmarking

```bash
npm run benchmark           # Internal performance benchmark
npm run benchmark-compare   # Compare with Prism and Shiki
```

**Internal benchmark** tests fuz_code performance across all sample files with small and large (100x) content.

**Comparison benchmark** (`./benchmark/compare/`) tests fuz_code against:

- Prism - Similar regex-based approach
- Shiki JS - JavaScript regex engine
- Shiki Oniguruma - Full TextMate grammar engine

Results show relative performance (% of fastest) for each language and content size.

### Optimization Notes

- **HTML Mode**: Proven PrismJS approach, good for SSR
- **Range Mode**: Native browser highlighting, better for large documents
- **Auto Mode**: Best of both worlds, progressive enhancement

## Color Variables

Theme uses CSS variables from Moss:

- `--color_a` - Keywords, tags
- `--color_b` - Strings, selectors
- `--color_c` - Types (TypeScript)
- `--color_d` - Functions, classes
- `--color_e` - Numbers, regex
- `--color_f` - Operators, keywords
- `--color_g` - Attributes
- `--color_h` - Properties
- `--color_i` - Booleans, comments

## Development Guidelines

1. **Maintain PrismJS compatibility** - Language definitions should work with upstream
2. **Test with fixtures** - All changes must pass fixture tests
3. **No automated commits** - Manual review required
4. **Support both modes** - Features should work in HTML and range modes
5. **Follow patterns** - Use existing language definitions as templates

## Demo Pages

- `/samples` - Code samples in all supported languages
- `/benchmark` - Performance testing

## Troubleshooting

### Positions Don't Match

The position calculation happens during range creation. If positions are wrong:

1. Check `highlight_manager.ts` range creation logic
2. Verify token tree structure with debug output
3. Look for nested tokens that might be miscounted

### CSS Highlights Not Working

1. Check browser support (Chrome 105+, Firefox 111+)
2. Verify `supports_css_highlight_api()` returns true
3. Check console for range creation errors
4. Ensure text node exists and positions are valid

### Adding a New Language

1. Create `src/lib/grammar_{lang}.ts`
2. Define grammar patterns (see existing languages)
3. Register in `syntax_styler_global.ts`
4. Add samples in `src/lib/samples/sample_{variant}.{lang}`
5. Generate fixtures and test
