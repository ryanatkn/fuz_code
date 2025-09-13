# CSS Custom Highlight API Implementation

## CSS Theme

```css
::highlight(ts_comment) {
	color: var(--text_color_5);
}
::highlight(ts_keyword) {
	color: var(--color_f_5);
}
::highlight(ts_string) {
	color: var(--color_b_5);
}
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
