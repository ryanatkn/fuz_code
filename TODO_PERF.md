# Performance Optimization Progress

## Executive Summary

**Goal:** 50-70% total performance improvement through systematic optimization
**Current Progress:** Phase 1 Complete - Type System & Object Shape Normalization
**Achieved:** ~2% baseline improvement (5834 → 5949 avg ops/sec)
**Next Target:** Phase 2 - Remove Redundant Work (~10-15% additional gain)

### Performance Baseline

```
Before Phase 1: 5833.93 avg ops/sec
After Phase 1:  5948.67 avg ops/sec (+2.0%)

Notable improvements:
- html_complex: +7.6%
- large:svelte_complex: +12.4%
- large:html_complex: +16.6%
```

The initial 2% gain establishes a foundation. Larger gains expected as:
1. V8 JIT optimizes the now-monomorphic code paths
2. We stack additional optimizations
3. We remove redundant calculations and allocations

---

## ✅ Phase 1: Type System & Object Shape Normalization (COMPLETE)

**Status:** ✅ DONE
**Impact:** 2% baseline, foundation for future gains
**Commits:** Multiple (normalization, type refactor, test cleanup)

### What We Fixed

#### 1. Normalized `alias` Property
- **Before:** `string | Array<string>` creating polymorphic shapes
- **After:** Always `Array<string>`, normalized in constructor
- **Impact:** Removed 3 `Array.isArray()` checks from hot paths
- **Files:** `syntax_token.ts`, `syntax_styler.ts`, `highlight_manager.ts`

#### 2. Grammar Normalization at Registration
- **Before:** Grammars had optional properties, runtime normalization
- **After:** All grammars normalized to consistent shape at `add_lang()`
- **Changes:**
  - All pattern properties required: `lookbehind`, `greedy`, `alias`, `inside`
  - All grammar values stored as `Array<Normalized_Grammar_Token>`
  - Global flags added during normalization (not runtime)
  - `grammar.rest` merged during normalization (not tokenization)
- **Files:** `syntax_styler.ts` (normalize_pattern, normalize_grammar)

#### 3. Fixed `grammar_insert_before` Bug
- **Critical fix:** Patterns inserted after registration weren't normalized
- **Impact:** `template_string` and `regex` patterns were broken
- **Solution:** Added normalization call in `grammar_insert_before()`

#### 4. Type System Refactor
- **Added:** `Normalized_Grammar` type to distinguish normalized state
- **Added:** `Normalized_Grammar_Token` with required properties
- **Benefit:** Type system correctly reflects runtime invariants
- **Result:** No casts needed in grammar files (clean code)

#### 5. Removed Dead Code
- **Removed:** Defensive branches checking for "legacy patterns"
- **Before:** Tests checked for un-normalized patterns "that shouldn't happen"
- **After:** Code trusts normalization invariant (cleaner, faster)

### Key Learnings

1. **V8 is resilient** - The polymorphic shapes didn't hurt as much as expected
2. **Foundation matters** - Type system now supports confident refactoring
3. **Normalization works** - All 53 tests pass, fixtures unchanged
4. **Bigger gains ahead** - Removed allocations/calculations will show more impact

---

## 🎯 Phase 2: Remove Redundant Work (NEXT - HIGH PRIORITY)

**Status:** 🔜 READY TO START
**Expected Impact:** 10-15% performance improvement
**Complexity:** Low - straightforward changes
**Risk:** Low - well-isolated changes

### 2.1 Use Stored `token.length` Directly ⚡ QUICK WIN

**Problem:**
- `highlight_manager.ts:114` calls `this.#get_token_length(token)`
- Method recursively traverses content to calculate length
- But `token.length` already has this value from constructor!

**Solution:**
```typescript
// highlight_manager.ts:114
const length = token.length;  // Instead of this.#get_token_length(token)
```

**Then delete** `#get_token_length()` method (lines 161-175)

**Expected gain:** 3-5% (eliminates tree traversal in hot path)

---

### 2.2 Eliminate `encode()` Tree Cloning ⚡ BIG WIN

**Problem:**
- `syntax_styler.ts:427-438` - recursively clones entire token tree
- Only purpose: escape HTML entities (`&`, `<`, nbsp)
- Creates thousands of intermediate objects

**Current flow:**
```typescript
tokens → encode(tokens) → stringify_token(encoded_tokens)
         ^^^^^^^^^^ clones entire tree just to escape 3 characters
```

**Solution:** Move escaping into `stringify_token`:

```typescript
stringify_token(o: string | Syntax_Token | Syntax_Token_Stream, lang: string): string {
    if (typeof o === 'string') {
        // Escape here instead of pre-processing
        return o.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00a0/g, ' ');
    }
    // ... rest unchanged
}
```

**Then:**
1. Remove `encode()` function entirely
2. Change `stylize()` to: `return this.stringify_token(tokens, lang);`
3. Delete lines 427-438

**Expected gain:** 5-8% (eliminates entire tree traversal + allocation)

---

### 2.3 Remove Remaining `Array.isArray()` Checks

**Status:** Mostly done, but verify:
- `tokenize_syntax.ts` - should not check if pattern values are arrays (always are)
- Any grammar introspection code

**Expected gain:** 1-2% (micro-optimization, but removes branches)

---

## 🚀 Phase 3: String Concatenation (AFTER PHASE 2)

**Status:** 📋 PLANNED
**Expected Impact:** 8-15% performance improvement
**Complexity:** Low-Medium
**Risk:** Low - output must remain identical

### 3.1 Fix `stringify_token` String Building

**Problem:**
```typescript
// syntax_styler.ts:231-234 - O(n²) worst case
for (const e of o) {
    s += this.stringify_token(e, lang);  // Creates new string each iteration
}
```

**Solution:**
```typescript
const parts: Array<string> = [];
for (const e of o) {
    parts.push(this.stringify_token(e, lang));
}
return parts.join('');  // Single allocation
```

**Expected gain:** 8-12% for code-heavy content

---

### 3.2 Optimize Attribute Building

**Problem:**
```typescript
// syntax_styler.ts:259-260
for (const name in ctx.attributes) {
    attributes += ' ' + name + '="' + ...;  // String concatenation in loop
}
```

**Solution:**
```typescript
const attr_parts: Array<string> = [];
for (const name in ctx.attributes) {
    const value = (ctx.attributes[name] || '').replace(/"/g, '&quot;');
    attr_parts.push(` ${name}="${value}"`);
}
const attributes = attr_parts.join('');
```

**Expected gain:** 1-2% (low frequency, but good practice)

---

### 3.3 Use Template Literal for HTML Element

**Problem:**
```typescript
// syntax_styler.ts:263-274 - verbose string building
return '<' + ctx.tag + ' class="' + ctx.classes.join(' ') + '"' + attributes + '>' +
       ctx.content + '</' + ctx.tag + '>';
```

**Solution:**
```typescript
return `<${ctx.tag} class="${ctx.classes.join(' ')}"${attributes}>${ctx.content}</${ctx.tag}>`;
```

**Expected gain:** <1% (clarity win, minimal perf impact)

---

## 📊 Phase 4: Advanced Optimizations (PROFILE-GUIDED)

**Status:** 🔬 INVESTIGATE AFTER PHASE 3
**Approach:** Profile first, optimize what's actually slow

### 4.1 Replace `for...in` Loops

**Locations:**
- `tokenize_syntax.ts:51` - grammar iteration
- `syntax_styler.ts:194, 203` - grammar_insert_before
- Others in deep_clone, depth_first_search

**Change:**
```typescript
// Before
for (const token in grammar) {
    const patterns = grammar[token];
}

// After
for (const [token, patterns] of Object.entries(grammar)) {
    // Faster, cleaner
}
```

**When:** Only if profiling shows `for...in` is bottleneck
**Expected gain:** 2-5% (depends on grammar complexity)

---

### 4.2 Fix Hook Context Shape Mutation

**Problem:**
```typescript
// syntax_styler.ts:92-103
var ctx = {code, grammar, lang, tokens: undefined};  // Shape 1
this.run_hook_before_tokenize(ctx);
ctx.tokens = tokenize_syntax(...);  // Shape 2 (V8 sees different shape)
```

**Solution:**
```typescript
const before_ctx = {code, grammar, lang};
this.run_hook_before_tokenize(before_ctx);
const after_ctx = {
    ...before_ctx,
    tokens: tokenize_syntax(before_ctx.code, before_ctx.grammar),
};
```

**When:** Only if profiling shows hook context is hot
**Expected gain:** <1% (low frequency code path)

---

### 4.3 Fix Linked List Sentinel Nodes

**Problem:**
```typescript
// tokenize_syntax.ts:213-214
this.head = {value: null, prev: null, next: null};  // Different shape than
this.tail = {value: null, prev: this.head, next: null};  // regular nodes
```

**Solution:**
```typescript
this.head = {value: '' as T, prev: null, next: null};  // Same shape as data nodes
this.tail = {value: '' as T, prev: this.head, next: null};
```

**When:** Only if profiling shows linked list node creation is hot
**Expected gain:** 1-2% (node creation is frequent but small objects)

---

### 4.4 Object Pooling for Nodes

**Consideration:** Pool `Linked_List_Node` objects to reduce GC pressure

**Decision:** Profile first - modern GC handles short-lived objects well
**Risk:** Added complexity, memory overhead
**When:** Only if profiling shows excessive GC time

---

### 4.5 Consider Linked List Alternative

**Consideration:** Use dynamic array instead of linked list

**Analysis:**
- **Pros:** Better cache locality, faster iteration
- **Cons:** Removal is harder (current use case needs removal)
- **Decision:** Defer - removal operations are important for tokenization

---

## 📈 Performance Tracking

### Current Benchmarks (After Phase 1)

| Sample | Ops/sec | Mean Time (ms) |
|--------|---------|----------------|
| json_complex | 28865 | 0.036 |
| css_complex | 27777 | 0.037 |
| ts_complex | 1901 | 0.530 |
| html_complex | 8205 | 0.125 |
| svelte_complex | 2202 | 0.467 |
| md_complex | 1859 | 0.566 |
| large:json_complex | 244 | 4.26 |
| large:css_complex | 248 | 4.14 |
| large:ts_complex | 5.73 | 179.7 |
| large:html_complex | 56.1 | 18.6 |
| large:svelte_complex | 13.4 | 76.4 |
| large:md_complex | 7.64 | 132.2 |

**Average:** 5948.67 ops/sec

### Performance Goals

```
Phase 1 (Done):     5834 → 5949 ops/sec  (+2%)   ✅
Phase 2 (Next):     5949 → 6700 ops/sec  (+13%)  🎯
Phase 3 (After):    6700 → 7800 ops/sec  (+16%)  📋
Phase 4 (Future):   7800 → 9000 ops/sec  (+15%)  🔬
────────────────────────────────────────────────
Total Target:       5834 → 9000 ops/sec  (+54%)  🎯
```

### How to Benchmark

```bash
npm run benchmark              # Internal performance
npm run benchmark-compare      # vs Prism/Shiki
gro test                       # Verify correctness
```

**Track:**
- Ops/sec (primary metric)
- Mean time for large content
- Memory usage (should not increase)
- All 53 tests must pass

---

## 🎯 Implementation Plan

### Week 1: Phase 2 - Remove Redundant Work
- [ ] 2.1: Use `token.length` directly (1 hour)
  - Change line 114 in highlight_manager.ts
  - Delete `#get_token_length()` method
  - Run tests
- [ ] 2.2: Eliminate `encode()` (3-4 hours)
  - Move escaping to stringify_token
  - Remove encode() function
  - Test HTML output thoroughly
  - Run benchmarks
- [ ] 2.3: Audit for remaining Array.isArray (1 hour)
  - Search codebase
  - Remove unnecessary checks
  - Run tests

**Milestone:** +10-15% improvement, all tests pass

---

### Week 2: Phase 3 - String Concatenation
- [ ] 3.1: Fix stringify_token (2 hours)
  - Replace += loop with array.join()
  - Test HTML output
  - Benchmark
- [ ] 3.2: Fix attribute building (1 hour)
  - Use array.join()
  - Test
- [ ] 3.3: Template literal for elements (30 min)
  - Simplify HTML generation
  - Test

**Milestone:** +8-15% additional improvement

---

### Week 3: Profile & Evaluate Phase 4
- [ ] Run production profiling
- [ ] Identify actual bottlenecks
- [ ] Implement only what profiles show
- [ ] Final benchmark run
- [ ] Document results

**Milestone:** Total 50-70% improvement

---

## 🧪 Testing Strategy

**For each change:**

1. ✅ **Unit tests** - All 53 tests pass
2. ✅ **Fixture tests** - `gro test src/fixtures/check.test.ts`
3. ✅ **Visual diff** - `git diff src/fixtures/` (should be empty)
4. ✅ **Benchmarks** - Measure before/after
5. ✅ **Integration** - Test in Code.svelte component

**Critical invariants:**
- HTML output identical (for same input)
- Token structure identical
- Position tracking accurate
- No memory leaks

---

## 🎓 Lessons Learned

### From Phase 1

1. **Type systems matter** - `Normalized_Grammar` type made refactoring safe
2. **Test early, test often** - Found `grammar_insert_before` bug via tests
3. **Dead code exists** - Found defensive branches for impossible states
4. **V8 is robust** - Didn't hurt as much as feared, but still worth fixing
5. **Foundation pays off** - Clean types enable confident future changes

### General Principles

1. **Profile before optimizing** - Measure, don't guess
2. **One change at a time** - Isolate impact
3. **Trust your types** - If types say it's normalized, it is
4. **Remove, don't add** - Deletion often faster than clever code
5. **Allocations matter** - `encode()` tree cloning is expensive

---

## 📋 Quick Reference

### Files by Phase

**Phase 1 (Done):**
- `src/lib/syntax_styler.ts` - Core normalization
- `src/lib/syntax_token.ts` - Alias normalization
- `src/lib/tokenize_syntax.ts` - Runtime checks removed
- `src/lib/highlight_manager.ts` - Array.isArray removed
- `src/lib/grammar_*.ts` - Post-normalization mutations (kept as-is)

**Phase 2 (Next):**
- `src/lib/highlight_manager.ts` - Use token.length
- `src/lib/syntax_styler.ts` - Remove encode()

**Phase 3 (After):**
- `src/lib/syntax_styler.ts` - String concatenation

### Commands

```bash
# Run tests
gro test
gro test src/fixtures/check.test.ts

# Benchmark
npm run benchmark
npm run benchmark-compare

# Check fixtures
git diff src/fixtures/

# Update fixtures (if needed)
gro src/fixtures/update
```

---

## 🎯 Success Criteria

- ✅ **Phase 1:** 2% baseline improvement, clean type system
- 🎯 **Phase 2:** 10-15% additional improvement
- 📋 **Phase 3:** 8-15% additional improvement
- 🔬 **Phase 4:** 5-10% additional improvement (profile-guided)
- **Total:** 50-70% improvement vs original baseline
- **Quality:** All tests pass, HTML output identical
- **Maintainability:** Code cleaner than before

---

## 📝 Notes

- Line numbers accurate as of Phase 1 completion
- Estimated impacts based on common optimization patterns
- Actual results vary by content type and size
- Modern V8 already does many optimizations
- Biggest gains often from removing work, not clever algorithms
- Type safety enables confident refactoring

**Last Updated:** After Phase 1 completion
**Next Review:** After Phase 2 completion
