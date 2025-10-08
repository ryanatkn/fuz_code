# Performance Optimization TODO

## Executive Summary

This document outlines performance optimizations for the syntax_styler tokenization engine. Analysis has identified **20 distinct optimization opportunities** with an estimated **50-80% total performance improvement**.

The primary bottlenecks are:
1. **Polymorphic object shapes** breaking V8 inline caches (~30-50% impact)
2. **String concatenation** in HTML generation (~10-20% impact)
3. **Redundant calculations and type checks** (~10-15% impact)
4. **Suboptimal iteration patterns** (~5-10% impact)

---

## Phase 1: Monomorphic Properties 🔴 CRITICAL

**Expected Impact: 30-50% performance improvement**

These issues break V8's inline caches and prevent optimization. Fixing these should be the highest priority.

### 1.1 Normalize Syntax_Token.alias to Array

**Problem:**
- Type: `string | Array<string>` (syntax_token.ts:19)
- Creates polymorphic inline cache misses
- Requires runtime `Array.isArray()` checks in 3 hot paths

**Locations:**
- Definition: `src/lib/syntax_token.ts:19`
- Constructor: `src/lib/syntax_token.ts:31`
- Usage checks:
  - `src/lib/syntax_styler.ts:247-253` (stringify_token)
  - `src/lib/highlight_manager.ts:129` (highlight_from_syntax_tokens)
  - `src/lib/tokenize_syntax.ts:76` (pattern read)

**Solution:**
```typescript
// In syntax_token.ts
alias: Array<string>; // Always an array

constructor(
    type: string,
    content: string | Syntax_Token_Stream,
    alias: string | Array<string> | undefined,
    matched_str: string = '',
) {
    this.type = type;
    this.content = content;
    this.alias = alias ? (Array.isArray(alias) ? alias : [alias]) : [];
    this.length = matched_str.length;
}
```

**Changes needed:**
- Update type definition: `alias: Array<string>`
- Normalize in constructor (single entry point)
- Remove all `Array.isArray(alias)` checks
- Update `stringify_token` to use `for (const a of o.alias)`
- Update `highlight_manager` to remove Array.isArray check

**Testing:**
- All existing tests should pass
- Verify fixture outputs unchanged
- Run benchmarks to confirm improvement

---

### 1.2 Normalize Pattern Objects to Consistent Shape

**Problem:**
- Pattern objects have optional properties: `lookbehind?`, `greedy?`, `alias?`, `inside?`
- Creates ~4^4 = 256 possible shapes across grammar definitions
- V8 creates different hidden classes for each combination

**Locations:**
- Interface: `src/lib/syntax_styler.ts:352-376` (Syntax_Grammar_Token)
- Usage: ~35 lookbehind, ~29 greedy, ~62 inside across 8 grammar files
- Read: `src/lib/tokenize_syntax.ts:73-76`

**Solution:**
Add normalization function called during grammar registration:

```typescript
// In syntax_styler.ts, add private method:
private normalize_pattern(pattern: RegExp | Syntax_Grammar_Token): Syntax_Grammar_Token {
    if (pattern instanceof RegExp) {
        return {
            pattern,
            lookbehind: false,
            greedy: false,
            alias: [],
            inside: null,
        };
    }

    // Ensure all properties exist with defaults
    return {
        pattern: pattern.pattern,
        lookbehind: pattern.lookbehind ?? false,
        greedy: pattern.greedy ?? false,
        alias: pattern.alias ? (Array.isArray(pattern.alias) ? pattern.alias : [pattern.alias]) : [],
        inside: pattern.inside ?? null,
    };
}

// Apply in add_lang, recursively through grammar
private normalize_grammar(grammar: Syntax_Grammar): void {
    for (const key in grammar) {
        if (key === 'rest') continue;

        const value = grammar[key];
        if (!value) continue;

        const patterns = Array.isArray(value) ? value : [value];
        grammar[key] = patterns.map(p => this.normalize_pattern(p));
    }

    if (grammar.rest) {
        this.normalize_grammar(grammar.rest);
    }
}
```

**Changes needed:**
- Add `normalize_pattern()` and `normalize_grammar()` methods
- Call `normalize_grammar()` in `add_lang()` before storing
- Update `Syntax_Grammar_Token` interface to make all properties required
- Remove default handling in tokenize_syntax.ts:73-76 (just read properties directly)
- Ensure global flag handling (see 1.3)

**Testing:**
- Grammar construction tests
- All language fixtures should remain identical
- Benchmark improvement

---

### 1.3 Pre-process Grammar.rest and Ensure Global Flags

**Problem:**
- `grammar.rest` merged at tokenization time (tokenize_syntax.ts:29-35)
- Mutates grammar shape during hot path
- RegExp global flag added at runtime (tokenize_syntax.ts:78-82)

**Locations:**
- Rest merging: `src/lib/tokenize_syntax.ts:29-35`
- Global flag: `src/lib/tokenize_syntax.ts:78-82`

**Solution:**
Move both to grammar registration (in normalize_pattern):

```typescript
private normalize_pattern(pattern: RegExp | Syntax_Grammar_Token): Syntax_Grammar_Token {
    const p = pattern instanceof RegExp ? { pattern } : pattern;

    // Ensure global flag
    let regex = p.pattern;
    if ((p.greedy ?? false) && !regex.global) {
        const flags = regex.flags;
        regex = new RegExp(regex.source, flags.includes('g') ? flags : flags + 'g');
    }

    return {
        pattern: regex,
        lookbehind: p.lookbehind ?? false,
        greedy: p.greedy ?? false,
        alias: p.alias ? (Array.isArray(p.alias) ? p.alias : [p.alias]) : [],
        inside: p.inside ?? null,
    };
}

private normalize_grammar(grammar: Syntax_Grammar): void {
    // Merge rest into grammar first
    if (grammar.rest) {
        for (const token in grammar.rest) {
            grammar[token] = grammar.rest[token];
        }
        delete grammar.rest;
    }

    // Then normalize all patterns
    for (const key in grammar) {
        const value = grammar[key];
        if (!value) continue;

        const patterns = Array.isArray(value) ? value : [value];
        grammar[key] = patterns.map(p => this.normalize_pattern(p));
    }
}
```

**Changes needed:**
- Add rest merging to `normalize_grammar()`
- Add global flag handling to `normalize_pattern()`
- Remove lines 29-35 from tokenize_syntax.ts
- Remove lines 78-82 from tokenize_syntax.ts
- Update grammar type to not have `rest?` property (or mark as internal)

**Testing:**
- Verify all grammars normalize correctly
- Test greedy patterns work correctly
- Fixtures unchanged

---

### 1.4 Normalize Pattern Values to Arrays

**Problem:**
- Grammar values can be `RegExp | Syntax_Grammar_Token | Array<...>`
- Wrapped in array every tokenization (tokenize_syntax.ts:65)

**Location:**
- `src/lib/tokenize_syntax.ts:65`

**Solution:**
Normalize in `normalize_grammar()`:

```typescript
private normalize_grammar(grammar: Syntax_Grammar): void {
    // ... rest handling ...

    for (const key in grammar) {
        if (key === 'rest') continue;
        const value = grammar[key];
        if (!value) {
            grammar[key] = [];
            continue;
        }

        // Always store as array of normalized patterns
        const patterns = Array.isArray(value) ? value : [value];
        grammar[key] = patterns.map(p => this.normalize_pattern(p));
    }
}
```

**Changes needed:**
- Store all grammar values as arrays
- Update `Syntax_Grammar` type: `Record<string, Array<Syntax_Grammar_Token>>`
- Remove line 65 from tokenize_syntax.ts (now always array)

**Testing:**
- Grammar with single pattern
- Grammar with array of patterns
- Fixtures unchanged

---

### 1.5 Fix Encoded Token Shape Inconsistency

**Problem:**
- `encode()` creates Syntax_Token without matched_str parameter
- Results in tokens with `length: 0` (different shape)
- Only used for HTML generation, not ranges

**Location:**
- `src/lib/syntax_styler.ts:427-438`

**Solution:**
Pass matched_str or calculate length consistently:

```typescript
const encode = (tokens: any): any => {
    if (tokens instanceof Syntax_Token) {
        // Preserve length by calculating from content or passing through
        const encoded_content = encode(tokens.content);
        const length = typeof encoded_content === 'string'
            ? encoded_content.length
            : tokens.length;
        const result = new Syntax_Token(tokens.type, encoded_content, tokens.alias);
        result.length = length;
        return result;
    } else if (Array.isArray(tokens)) {
        return tokens.map(encode);
    } else {
        return tokens
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/\u00a0/g, ' ');
    }
};
```

**Alternative:** Make encode only handle content, not full token reconstruction.

**Changes needed:**
- Update encode function to maintain consistent token shape
- Consider if encode is needed at all (could escape during stringify)

**Testing:**
- HTML output unchanged
- Token shapes consistent

---

### 1.6 Fix Linked_List_Node Polymorphism

**Problem:**
- Nodes have `value: T | null` for sentinel nodes
- Creates different hidden classes

**Location:**
- `src/lib/tokenize_syntax.ts:207-223`

**Solution Option 1:** Consistent initialization
```typescript
class Linked_List<T = string | Syntax_Token> {
    head: Linked_List_Node<T>;
    tail: Linked_List_Node<T>;
    length: number = 0;

    constructor() {
        // Use empty string as sentinel value instead of null
        this.head = {value: '' as T, prev: null, next: null};
        this.tail = {value: '' as T, prev: null, next: null};
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
}
```

**Solution Option 2:** Separate sentinel type (more complex)

**Changes needed:**
- Choose solution approach
- Update node creation to be consistent
- Update null checks if using sentinel values

**Testing:**
- Tokenization still works correctly
- No impact on output

---

### 1.7 Fix Hook Context Shape Mutation

**Problem:**
- Context object changes shape from `tokens: undefined` to `tokens: Syntax_Token_Stream`
- V8 sees two different shapes

**Location:**
- `src/lib/syntax_styler.ts:92-103`

**Solution Option 1:** Initialize with empty array
```typescript
var ctx: Hook_Before_Tokenize_Callback_Context = {
    code: text,
    grammar,
    lang,
    tokens: [] as any, // Will be populated
};
this.run_hook_before_tokenize(ctx);
ctx.tokens = tokenize_syntax(ctx.code, ctx.grammar);
```

**Solution Option 2:** Use proper type transition
```typescript
const before_ctx: Hook_Before_Tokenize_Callback_Context = { code: text, grammar, lang, tokens: undefined };
this.run_hook_before_tokenize(before_ctx);
const after_ctx: Hook_After_Tokenize_Callback_Context = {
    ...before_ctx,
    tokens: tokenize_syntax(before_ctx.code, before_ctx.grammar),
};
```

**Changes needed:**
- Update context creation
- Ensure type safety
- Consider if before_tokenize hook needs to be able to modify tokens

**Testing:**
- Hook system still works
- No shape changes

---

## Phase 2: String Operations ⚡ HIGH IMPACT

**Expected Impact: 10-20% performance improvement**

### 2.1 Replace String Concatenation in stringify_token

**Problem:**
- Uses `s += this.stringify_token(e, lang)` in loop
- Creates many intermediate string objects
- O(n²) complexity in worst case

**Location:**
- `src/lib/syntax_styler.ts:231-234`

**Solution:**
```typescript
stringify_token(o: string | Syntax_Token | Syntax_Token_Stream, lang: string): string {
    if (typeof o === 'string') {
        return o;
    }
    if (Array.isArray(o)) {
        const parts: Array<string> = [];
        for (const e of o) {
            parts.push(this.stringify_token(e, lang));
        }
        return parts.join('');
    }
    // ... rest of function
}
```

**Changes needed:**
- Replace `s += ...` with array collection
- Use `parts.join('')` at the end

**Testing:**
- HTML output identical
- Benchmark string-heavy content

---

### 2.2 Optimize HTML Attribute Building

**Problem:**
- `attributes += ' ' + name + '="' + ...` in loop
- String concatenation overhead

**Location:**
- `src/lib/syntax_styler.ts:259-260`

**Solution:**
```typescript
const attr_parts: Array<string> = [];
for (const name in ctx.attributes) {
    const value = (ctx.attributes[name] || '').replace(/"/g, '&quot;');
    attr_parts.push(` ${name}="${value}"`);
}
const attributes = attr_parts.join('');
```

**Changes needed:**
- Use array and join
- Minor - low frequency, but good practice

**Testing:**
- HTML output unchanged

---

### 2.3 Optimize HTML Element Building

**Problem:**
- String concatenation for final HTML (lines 263-274)

**Location:**
- `src/lib/syntax_styler.ts:263-274`

**Solution:**
```typescript
return `<${ctx.tag} class="${ctx.classes.join(' ')}"${attributes}>${ctx.content}</${ctx.tag}>`;
```

**Changes needed:**
- Use template literal
- Minimal gain but cleaner

**Testing:**
- HTML output unchanged

---

## Phase 3: Redundant Work 📊 MEDIUM IMPACT

**Expected Impact: 5-10% performance improvement**

### 3.1 Use Stored token.length

**Problem:**
- `#get_token_length()` recalculates length by traversing content
- token.length already stores this value (calculated in constructor)

**Location:**
- `src/lib/highlight_manager.ts:159-173` (unused private method)
- Called from: `src/lib/highlight_manager.ts:112`

**Solution:**
```typescript
// In #create_all_ranges method:
const length = token.length; // Instead of this.#get_token_length(token)
const end_pos = pos + length;
```

**Changes needed:**
- Replace `this.#get_token_length(token)` with `token.length`
- Remove `#get_token_length()` method entirely

**Testing:**
- Range highlighting works correctly
- Positions match exactly (they should, since matched_str.length === token.length)

---

### 3.2 Remove Array.isArray Checks After Normalization

**Problem:**
- After normalizing alias to always be array, these checks are redundant
- Adds branching overhead

**Locations:**
- `src/lib/syntax_styler.ts:249` (alias check)
- `src/lib/highlight_manager.ts:129` (alias check)
- Others will be removed by grammar normalization

**Solution:**
Remove checks and treat as always array:

```typescript
// In syntax_styler.ts stringify_token:
const aliases = o.alias; // Already normalized to array
for (const alias of aliases) {
    ctx.classes.push(alias);
}

// In highlight_manager.ts:
for (const alias of token.alias) { // Already normalized to array
    // ...
}
```

**Changes needed:**
- Remove conditional checks
- Direct iteration

**Testing:**
- Aliases work correctly
- Multiple aliases
- Single alias (now in array)
- No alias (empty array)

---

### 3.3 Replace for...in with Object.keys/entries

**Problem:**
- `for...in` is slower than `Object.keys()` or `for...of Object.entries()`
- Enumerates prototype chain (not an issue here, but slower)

**Locations:**
- `src/lib/tokenize_syntax.ts:31` - grammar.rest (will be removed)
- `src/lib/tokenize_syntax.ts:58` - grammar iteration
- `src/lib/syntax_styler.ts:191, 193` - grammar_insert_before
- `src/lib/syntax_styler.ts:259` - attributes
- `src/lib/syntax_styler.ts:383, 476` - deep operations

**Solution:**
```typescript
// tokenize_syntax.ts:58
for (const token of Object.keys(grammar)) {
    const patterns = grammar[token]; // Now always array after normalization
    // ...
}

// Or with entries:
for (const [token, patterns] of Object.entries(grammar)) {
    // ...
}
```

**Changes needed:**
- Replace 7 for...in loops
- Use Object.keys() or Object.entries()
- May need to handle non-own properties if any (unlikely)

**Testing:**
- Grammar processing works
- No missed patterns
- Benchmarks show improvement

---

## Phase 4: Advanced Optimizations 🎯 LOW-MEDIUM IMPACT

**Expected Impact: 5-15% performance improvement (profile-dependent)**

### 4.1 Optimize or Replace encode()

**Problem:**
- Recursively clones entire token tree just to escape HTML entities
- Creates many intermediate objects

**Location:**
- `src/lib/syntax_styler.ts:427-438`
- Called from: `src/lib/syntax_styler.ts:104`

**Solution Option 1:** Escape during stringify
```typescript
// In stringify_token, when handling string:
if (typeof o === 'string') {
    return o.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/\u00a0/g, ' ');
}
```

**Solution Option 2:** In-place marking (more complex)

**Changes needed:**
- Integrate escaping into stringify_token
- Remove encode() call and function
- Careful testing of HTML output

**Testing:**
- HTML entity escaping works
- Nested content escaped
- Special characters handled

---

### 4.2 Consider Object Pooling for Nodes

**Problem:**
- Linked list creates many node objects
- GC overhead

**Location:**
- `src/lib/tokenize_syntax.ts:236` (add_after)

**Solution:**
Implement object pool:

```typescript
class Node_Pool<T> {
    private pool: Array<Linked_List_Node<T>> = [];

    acquire(value: T, prev: Linked_List_Node<T>, next: Linked_List_Node<T>): Linked_List_Node<T> {
        const node = this.pool.pop();
        if (node) {
            node.value = value;
            node.prev = prev;
            node.next = next;
            return node;
        }
        return {value, prev, next};
    }

    release(node: Linked_List_Node<T>): void {
        node.value = null;
        node.prev = null;
        node.next = null;
        this.pool.push(node);
    }
}
```

**Changes needed:**
- Add Node_Pool class
- Use in Linked_List
- Release nodes when done

**When to do this:**
- **Profile first** - only if node allocation shows up in profiles
- May not be worth the complexity
- Modern GC is very good at short-lived objects

**Testing:**
- Memory usage
- Performance benchmarks
- No leaks

---

### 4.3 Consider Linked List Alternative

**Problem:**
- Linked list has pointer-chasing overhead
- Poor cache locality

**Location:**
- `src/lib/tokenize_syntax.ts:207-255`

**Solution:**
Could use dynamic array with sparse removal marking:

```typescript
class Token_Array {
    items: Array<string | Syntax_Token | null>;
    // Mark removed items as null, compact at end
}
```

**When to do this:**
- Only if profiling shows linked list traversal is bottleneck
- Significant refactoring required
- Benefit unclear - removal operations are important

**Decision:** Defer until after other optimizations

---

### 4.4 Optimize Range Creation for Aliases

**Problem:**
- Creates duplicate Range objects for each alias
- Necessary due to API (can't add same range to multiple highlights)

**Location:**
- `src/lib/highlight_manager.ts:128-140`

**Solution:**
Can't avoid without API changes, but could optimize:
- Batch Range creation
- Use typed arrays for positions, create ranges lazily
- Probably not worth complexity

**Decision:** Accept as necessary cost of CSS Highlights API

---

## Implementation Order

1. **Week 1: Core Monomorphic Properties**
   - 1.1 Normalize alias ✅ High impact, low risk
   - 1.2-1.4 Grammar normalization ✅ High impact, moderate complexity
   - Testing: Full fixture validation

2. **Week 2: String Operations**
   - 2.1-2.3 String concatenation fixes ✅ High impact, low risk
   - Testing: HTML output validation, benchmarks

3. **Week 3: Cleanup and Optimization**
   - 1.5-1.7 Remaining shape issues ✅ Medium impact
   - 3.1-3.3 Remove redundant work ✅ Medium impact
   - Testing: Full test suite, benchmarks

4. **Week 4: Validation and Advanced**
   - Performance benchmarking
   - Profile-guided optimization
   - 4.1 encode() optimization if warranted
   - 4.2-4.4 Advanced optimizations if needed

---

## Benchmarking Plan

After each phase, run:

```bash
npm run benchmark              # Internal performance
npm run benchmark-compare      # vs Prism/Shiki
```

Track metrics:
- **Ops/sec** - primary metric
- **Mean time** - for large content
- **Memory usage** - ensure no increase
- **GC pressure** - watch for allocation spikes

Target improvements:
- Phase 1: +30-50% ops/sec
- Phase 2: +10-20% additional
- Phase 3: +5-10% additional
- Total: +50-80% vs baseline

---

## Testing Strategy

For each change:

1. **Unit tests** - All existing tests pass
2. **Fixture tests** - `gro test src/fixtures/check.test.ts`
3. **Visual inspection** - `git diff src/fixtures/` for unexpected changes
4. **Benchmarks** - Measure improvement
5. **Integration** - Test in real usage (Code.svelte component)

Critical invariants:
- HTML output identical (for same input)
- Token structure identical
- All language features work
- No memory leaks

---

## Risk Assessment

**Low Risk:**
- String concatenation fixes (2.1-2.3)
- Using stored token.length (3.1)
- for...in replacement (3.3)

**Medium Risk:**
- Grammar normalization (1.2-1.4) - extensive changes but well-contained
- Alias normalization (1.1) - impacts multiple files but straightforward

**Higher Risk:**
- Linked list shape changes (1.6) - core data structure
- encode() removal (4.1) - HTML generation path
- Object pooling (4.2) - adds complexity

**Mitigation:**
- Comprehensive testing at each step
- Feature flags for risky changes
- Rollback plan (git branches)
- Profile before and after

---

## Success Criteria

✅ **Performance:** 50-80% improvement in benchmark ops/sec
✅ **Correctness:** All 200+ fixture tests pass
✅ **Compatibility:** HTML output identical for all test cases
✅ **Stability:** No memory leaks, no crashes
✅ **Maintainability:** Code remains readable and well-documented

---

## Notes

- All line numbers accurate as of current HEAD
- Estimated impacts are based on common V8 optimization patterns
- Actual results will vary by content type and size
- Profile-guided optimization recommended after Phase 3
- Some optimizations may interact (e.g., grammar normalization enables other optimizations)

---

## Quick Reference: File Impact Summary

- `src/lib/syntax_token.ts` - Phase 1.1 (alias normalization)
- `src/lib/tokenize_syntax.ts` - Phases 1.2-1.4, 1.6, 3.3
- `src/lib/syntax_styler.ts` - Phases 1.2-1.5, 1.7, 2.1-2.3, 3.2-3.3, 4.1
- `src/lib/highlight_manager.ts` - Phases 1.1, 3.1, 3.2
- All grammar files - Phase 1.2 (automated normalization)

Total estimated changes: ~15-20 files, ~200-300 lines modified
