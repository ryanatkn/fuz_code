# CSS Custom Highlight API Implementation

## Status: Phase 1 Complete ✅

Alternative syntax highlighter using CSS Custom Highlight API for improved performance.

**Current Performance**: ~2x faster in supported browsers
**Browser Support**: Chrome 105+, Safari 15.4+, Firefox 110+, Edge 105+
**Fallback**: Automatic HTML generation for unsupported browsers

## Architecture

```
src/lib/highlight/
├── highlight_styler.ts       # Main class with language registry
├── range_builder.ts          # Pattern matching → Range conversion
├── types.ts                  # Core types (Pattern, Highlight_Language)
├── language_ts.ts            # TypeScript patterns
├── language_json.ts          # JSON patterns
├── language_css.ts           # CSS patterns
├── language_html.ts          # HTML patterns
├── language_svelte.ts        # Svelte patterns
├── Highlight_Code.svelte     # Component wrapper
├── theme_highlight.css       # ::highlight() pseudo-element styles
└── index.ts                  # Public API with highlight_styler_global
```

## Core Types

```typescript
interface Pattern {
  name: string;        // Token type (e.g., 'comment', 'keyword')
  match: RegExp;       // Regex pattern
  priority?: number;   // For overlap resolution (higher wins)
  greedy?: boolean;    // Continue matching
}

interface Highlight_Language {
  id: string;          // Language identifier
  patterns: Pattern[]; // Ordered pattern list
}
```

## Usage

```typescript
// Direct API
import {highlight_styler_global} from '$lib/highlight';
highlight_styler_global.highlight(element, code, 'ts');

// Component
<Highlight_Code content={code} lang="ts" />
```

## Phase 1 Implementation ✅

**Completed**:
- [x] Core highlight_styler.ts with pattern matching
- [x] range_builder.ts for Range creation
- [x] Direct CSS.highlights API usage (no wrapper)
- [x] All language definitions (ts, json, css, html, svelte)
- [x] Highlight_Code.svelte component
- [x] Browser support detection with fallback
- [x] Snake_case naming convention
- [x] Theme CSS with ::highlight() styles
- [x] Demo page at /highlight
- [x] Benchmark page at /benchmark

**Performance**: ~6,300 ops/sec (2x current 3,150 ops/sec) in native mode

## CSS Theme

```css
::highlight(ts_comment) { color: var(--text_color_5); }
::highlight(ts_keyword) { color: var(--color_f_5); }
::highlight(ts_string) { color: var(--color_b_5); }
/* ... per language, per token type */
```

## Design Decisions

1. **Snake_case naming** - Consistent with codebase
2. **No aliases** - Only exact language IDs ('ts', not 'typescript')
3. **Direct platform APIs** - No abstraction layers
4. **Pattern-based** - Simple regex patterns, no grammar inheritance
5. **Global instance** - Pre-registered languages in highlight_styler_global

---

## Future Work (Phases 2-4)

### Phase 2: Auto-Optimization
- Pattern analysis for optimization opportunities
- Keyword Set conversion for faster matching
- Character class lookup tables
- Compiled pattern caching

### Phase 3: Targeted Optimization
- Specialized scanners for hot paths (strings, comments, numbers)
- Custom scanner functions for complex patterns
- Performance profiling integration

### Phase 4: Advanced Features
- Incremental updates for editing
- Worker pool for large files
- JIT optimization for frequently used patterns
- Runtime pattern optimization

**Target**: 15,000+ ops/sec (5x current)

## Risks & Mitigation

- **Browser bugs**: Extensive testing, maintain fallback
- **Performance regression**: Continuous benchmarking
- **API complexity**: Keep simple API, hide complexity internally