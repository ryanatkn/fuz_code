# Architecture Simplification Plan

## Problem Statement

The boundary scanner system has become too complex:
- 400+ lines of stateful CSS scanner code with context stacks
- Duplicate parsing logic (skip vs scan methods)
- Manual character-by-character parsing recreating what regex patterns handle naturally
- Two-phase architecture (boundaries then tokenization) adds complexity without sufficient benefit
- Edge cases proliferating (comments in selectors, strings in selectors, etc.)

We're essentially building a parser manually, which is what PrismJS/DOM styler was designed to avoid.

## Solution: Extend DOM Styler with Range Highlighting

### Core Idea
- Use the battle-tested DOM styler (PrismJS fork) for tokenization
- Add CSS Custom Highlight API support on top of DOM styler tokens
- Delete the complex boundary scanner system
- Keep it simple: one proven tokenization engine, with optional performance optimization

## Files to KEEP

### Range/Highlight API Support
- `src/lib/boundary_scanner_range_builder.ts` - CSS Custom Highlight API integration
- Any other range/highlight API utilities that work with token positions

### Reference Implementation
- `src/lib/Boundaryscanner_Code.svelte` - Use as reference for new component design

## Files to DELETE

### Boundary Scanner Core (~1000 lines)
- `src/lib/boundary_scanner_base.ts`
- `src/lib/boundary_scanner_orchestrator.ts`
- `src/lib/boundary_scanner_registry.ts`
- `src/lib/boundary_scanner_types.ts`
- `src/lib/boundary_scanner_global.ts`

### Language Scanners (~800 lines)
- `src/lib/boundary_scanner_css.ts` (400+ lines of complexity!)
- `src/lib/boundary_scanner_html.ts`
- `src/lib/boundary_scanner_json.ts`
- `src/lib/boundary_scanner_ts.ts`

### Tokenizers (~400 lines)
- `src/lib/boundary_tokenizer_types.ts`
- `src/lib/boundary_tokenizer_css.ts`
- `src/lib/boundary_tokenizer_html.ts`
- `src/lib/boundary_tokenizer_json.ts`
- `src/lib/boundary_tokenizer_ts.ts`

### Other
- `src/lib/boundary_scanner_html_generator.ts`
- `src/lib/boundary_scanner.test.ts`
- Remove boundary scanner routes/demos

## New Implementation

### 1. Create `Domstyler_Range_Code.svelte`
New component that:
- Uses DOM styler for tokenization (proven, battle-tested)
- Converts DOM styler tokens to ranges for CSS Custom Highlight API
- Falls back to HTML generation when API not supported
- Similar structure to `Boundaryscanner_Code.svelte` but simpler

### 2. Create `domstyler_range_builder.ts`
- Takes DOM styler tokens
- Builds CSS Custom Highlight ranges
- Reuse logic from `boundary_scanner_range_builder.ts`

### 3. Update DOM Styler Token Format
- Ensure DOM styler provides position information (start/end)
- May need minor modifications to track positions during tokenization

## Implementation Steps

1. **Create new component** `Domstyler_Range_Code.svelte`
   - Start with copy of `Boundaryscanner_Code.svelte`
   - Replace boundary scanner with DOM styler

2. **Add position tracking** to DOM styler if needed
   - Tokens need start/end positions for range building
   - Should be straightforward addition

3. **Port range builder**
   - Adapt `boundary_scanner_range_builder.ts` to work with DOM styler tokens
   - Create `domstyler_range_builder.ts`

4. **Test new implementation**
   - Verify syntax highlighting works
   - Verify CSS Custom Highlight API works where supported
   - Compare performance (should be similar or better)

5. **Delete boundary scanner code**
   - Remove all files listed above
   - Update imports and demos
   - Update documentation

6. **Update tests and fixtures**
   - Fixtures can be simplified (no more two-phase output)
   - Tests focus on DOM styler output

## Benefits

### Immediate
- **-2000+ lines of code** to maintain
- Simpler mental model (one tokenization phase)
- Proven patterns handle edge cases

### Long-term
- Easier to add new languages (just PrismJS-style patterns)
- Less bugs (using battle-tested code)
- Better community understanding (PrismJS patterns are well-known)

### Performance
- CSS Custom Highlight API still provides performance boost where supported
- DOM styler may be slightly slower but:
  - Not the bottleneck for typical use
  - Difference is milliseconds
  - Code simplicity worth the trade-off

## Risks and Mitigations

### Risk: Performance regression
**Mitigation**: Profile actual usage - syntax highlighting is rarely the bottleneck

### Risk: Feature parity
**Mitigation**: DOM styler already handles all our use cases (it's what we forked from)

### Risk: Migration effort
**Mitigation**: Can be done incrementally - new component first, then delete old code

## Success Metrics

- Code reduction: 2000+ lines removed
- Complexity: No more manual parsing state machines
- Maintainability: Standard PrismJS patterns
- Performance: CSS Custom Highlight API still works
- Tests: All existing tests pass with simpler implementation

## Timeline

1. **Phase 1** (1-2 days): Create new component with DOM styler + ranges
2. **Phase 2** (1 day): Test and verify feature parity
3. **Phase 3** (1 day): Delete boundary scanner code
4. **Phase 4** (1 day): Update docs and demos

## Conclusion

We tried to build something better than PrismJS but ended up recreating a parser manually. The complexity isn't justified. Let's use the proven solution (DOM styler) and add our performance optimization (CSS Custom Highlight API) on top. Simpler is better.