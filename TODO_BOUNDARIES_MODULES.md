# Boundary Scanner Module Structure - Implementation Status

## Current File Structure (WORKING - 2024-12-14)

```
src/lib/
├── boundary_scanner_types.ts          # Core type definitions ✅
├── boundary_scanner_base.ts           # Base scanner class with utilities ✅
├── boundary_scanner_registry.ts       # Boundary type registry ✅
├── boundary_scanner_orchestrator.ts   # Main orchestrator with tokenization ✅
│
├── boundary_scanner_html.ts           # HTML language scanner ✅
├── boundary_scanner_ts.ts             # TypeScript language scanner ✅
├── boundary_scanner_css.ts            # CSS language scanner ✅
├── boundary_scanner_json.ts           # JSON language scanner ✅
│
├── boundary_scanner_global.ts         # Global singleton instance ✅
├── boundary_scanner_html_generator.ts # Simplified - tokens only ✅
├── boundary_scanner_range_builder.ts  # Simplified - tokens only ✅
│
├── boundary_tokenizer_types.ts        # Shared tokenizer types ✅
├── boundary_tokenizer_json.ts         # JSON code tokenizer ✅
│
├── boundary_scanner.test.ts           # Unit tests ✅
└── Boundaryscanner_Code.svelte        # Svelte component ✅
```

**REMOVED:**

- `boundary_scanner_adapter.ts` - ✅ Deleted, no longer needed!
- All rangestyler dependencies - ✅ Complete independence achieved!

## ✅ ALL TOKENIZERS COMPLETED

```
src/lib/
├── boundary_tokenizer_ts.ts           # TypeScript code tokenizer ✅
├── boundary_tokenizer_css.ts          # CSS code tokenizer ✅
└── boundary_tokenizer_html.ts         # HTML code tokenizer ✅
```

**Note**: All tokenizers are now implemented. The rangestyler can be completely removed.

## Module Refactoring Plan (COMPLETED 2024-12-16)

### Phase 1: Type System Cleanup ✅ COMPLETED

#### `boundary_scanner_types.ts`

Current Implementation:

```typescript
// Public API
export interface Token {
	language: string;
	type: string; // Always prefixed: 'json_boolean'
	start: number;
	end: number;
}

// Boundary with simplified embeds structure (IN PROGRESS)
interface Found_Boundary {
	boundary_type: string;
	start: number;
	end?: number;

	// For script/style tags with known boundaries
	embedded_content?: {
		language: string;
		start: number;
		end: number;
	};

	// For context-sensitive exits (BEING REVISED)
	embeds?: {
		language: string;
		exit_pattern: string; // Single pattern
		exit_context: string | null; // null = any context
	};
}
```

### Phase 2: Orchestrator Enhancement

#### `boundary_scanner_orchestrator.ts` (NEEDS UPDATE)

Current:

- Returns array of boundaries
- No tokenization of code regions

Proposed changes:

```typescript
class Scanner_Orchestrator {
	private tokenizers: Map<string, Code_Tokenizer>;

	// Return flat token stream
	scan(text: string, language: string): Array<Token> {
		const boundaries = this.find_boundaries(text, language);
		return this.tokenize_boundaries(boundaries, text);
	}

	private tokenize_boundaries(boundaries, text): Array<Token> {
		const tokens = [];
		for (const boundary of boundaries) {
			if (boundary.type === 'code') {
				// Use tokenizer for this language
				const tokenizer = this.tokenizers.get(boundary.language);
				tokens.push(...tokenizer.tokenize(text, boundary));
			} else {
				// Convert boundary to token with prefix
				tokens.push({
					language: boundary.language,
					type: `${boundary.language}_${boundary.type}`,
					start: boundary.start,
					end: boundary.end,
				});
			}
		}
		return tokens;
	}
}
```

### Phase 3: New Tokenizer Modules

#### `boundary_tokenizer_json.ts` (NEW)

```typescript
export class Json_Code_Tokenizer {
	private patterns = [
		{regex: /\btrue\b/g, type: 'json_boolean'},
		{regex: /\bfalse\b/g, type: 'json_boolean'},
		{regex: /\bnull\b/g, type: 'json_null'},
		{regex: /-?\d+(\.\d+)?([eE][+-]?\d+)?/g, type: 'json_number'},
		{regex: /[{}\[\],]/g, type: 'json_punctuation'},
		{regex: /:/g, type: 'json_operator'},
	];

	tokenize(text: string, boundary: Boundary): Array<Token> {
		const tokens = [];
		const code = text.substring(boundary.start, boundary.end);

		for (const pattern of this.patterns) {
			let match;
			while ((match = pattern.regex.exec(code))) {
				tokens.push({
					language: 'json',
					type: pattern.type,
					start: boundary.start + match.index,
					end: boundary.start + match.index + match[0].length,
				});
			}
		}

		return tokens;
	}
}
```

Similar structure for:

- `boundary_tokenizer_ts.ts` - TypeScript keywords, functions, etc.
- `boundary_tokenizer_css.ts` - Selectors, properties, values
- `boundary_tokenizer_html.ts` - Tags, attributes

### Phase 4: Renderer Simplification

#### `boundary_scanner_adapter.ts` (NEEDS REFACTOR)

Current issues:

- Imports `Rangestyler_Language_Boundary` from rangestyler
- Converts boundaries to rangestyler format
- Feature flag for rangestyler integration

Proposed:

- REMOVE all rangestyler imports
- Make fully standalone
- Return Token array directly

#### `boundary_scanner_html_generator.ts` (NEEDS SIMPLIFICATION)

Current issues:

- Has `highlight_code_boundary()` with duplicate regex logic
- Complex token class mapping

Proposed:

```typescript
export function generate_html_from_tokens(text: string, tokens: Array<Token>): string {
	let html = '';
	let pos = 0;

	for (const token of tokens) {
		// Add text before token
		if (token.start > pos) {
			html += escape_html(text.substring(pos, token.start));
		}

		// Map token type to CSS class (remove language prefix)
		const cssClass = token.type.replace(/^[a-z]+_/, '');
		const tokenText = text.substring(token.start, token.end);
		html += `<span class="token ${cssClass}">${escape_html(tokenText)}</span>`;

		pos = token.end;
	}

	// Add remaining text
	if (pos < text.length) {
		html += escape_html(text.substring(pos));
	}

	return html;
}
```

#### `boundary_scanner_range_builder.ts` (NEEDS SIMPLIFICATION)

Current issues:

- Has hacky `process_json_code_boundary()` function
- Complex boundary type mapping

Proposed:

```typescript
export function build_ranges_from_tokens(
	element: Element,
	text: string,
	tokens: Array<Token>,
): Map<string, Array<Range>> {
	// Ensure text node exists
	element.textContent = text;
	const textNode = element.firstChild;

	const rangesByType = new Map<string, Array<Range>>();

	for (const token of tokens) {
		const range = document.createRange();
		range.setStart(textNode, token.start);
		range.setEnd(textNode, token.end);

		if (!rangesByType.has(token.type)) {
			rangesByType.set(token.type, []);
		}
		rangesByType.get(token.type).push(range);
	}

	return rangesByType;
}
```

## Implementation Status Summary

### ✅ COMPLETED

- Basic boundary detection for all languages
- Component with HTML/Range modes (fixed text node issue)
- Test integration with full parity
- JSON code tokenizer fully working
- Flat token stream output
- Removed all rangestyler dependencies
- Simplified renderers (tokens only)
- All language tokenizers (JSON, TS, CSS, HTML)
- HTML tag boundaries implementation

### ✅ COMPLETED (2024-12-16) - MAJOR SIMPLIFICATION

- **Removed ALL exit pattern complexity**:
  - ✅ Deleted `exit_pattern`, `exit_context`, `exit_boundary_type` fields
  - ✅ Removed `scan_embedded_with_exit()` and `check_exit_in_region()` methods
  - ✅ Eliminated special exit boundary types (`html_script_close`, `html_style_close`)
- **Implemented simple language switching**:
  - ✅ HTML scanner uses `switch_to_language` field for script/style tags
  - ✅ Orchestrator recursively scans embedded languages
  - ✅ Exit patterns checked only in top-level content (between boundaries)
  - ✅ Boundaries with `inner_start/inner_end` are properly skipped
- **Key insight realized**: Boundaries ARE tokens, exit patterns are unnecessary
  - ✅ Strings/comments have known termination patterns
  - ✅ We can fast-forward past them entirely
  - ✅ Only check for `</script>` in code regions where it's valid

### ✅ COMPLETED (2024-12-14)

- TypeScript code tokenizer ✅
- CSS code tokenizer ✅
- HTML code tokenizer ✅
- All languages fully tokenized ✅
- CSS string boundary detection (string_single, string_double) ✅
- CSS token mappings (atrule, important, color) ✅
- All tests passing with regenerated fixtures ✅

### 🔄 REMAINING CORNER CASES

#### CSS

- ✅ Strings in property values properly detected
- ✅ @media rules properly tokenized as atrule
- ⚠️ Strings within attribute selectors need refinement (`.attr[title='value']`)

#### TypeScript

- ⚠️ Template literals with nested expressions need proper boundary tracking
- ⚠️ Type annotations sometimes missing highlighting
- ⚠️ Private method syntax (#method) needs attention

#### HTML

- ✅ Script/style tags now handled with simple language switching
- ✅ CDATA sections now tokenized
- ✅ Doctype declarations now tokenized
- ✅ HTML tags have proper boundaries
- ⚠️ Boolean attributes need refinement
- ⚠️ Script/style opening tags need proper attribute tokenization (currently single token)

### 🔄 FUTURE

- Svelte scanner
- Complete removal of rangestyler after all tokenizers done
- Performance optimization and caching

## Migration Status (2024-12-16)

### ✅ Completed Steps

1. **Created all tokenizers** - JSON, TS, CSS, HTML
2. **Updated orchestrator** - Returns tokens, handles embedded content
3. **Removed rangestyler imports** - Completely standalone
4. **Simplified renderers** - Just map tokens to output
5. **Updated tests** - Fixtures regenerated and passing

### ✅ Recently Completed (2024-12-16)

6. **Exit pattern handling** - Simplified structure implemented
7. **HTML script/style** - Context-aware exits working correctly
8. **Exit boundary types** - Dedicated tokenizers for `html_script_close` and `html_style_close`
9. **Architecture cleanup** - Removed dead code, fixed hardcoded references
10. **Type safety** - Using `null` for top-level content instead of string 'code'

### 📝 TODO

11. **Performance testing** - Validate hybrid approach
12. **Svelte scanner** - Implement when other languages stable
13. **Remove rangestyler** - After all corner cases fixed

### Known Issues & Corner Cases 🐛

#### CSS

- ✅ Fixed: Strings in property values (`content: '</style>'`)
- ✅ Fixed: @media rules tokenization
- ⚠️ Issue: Strings in attribute selectors partially working
  - `.attr[title='value']` - the string gets its own boundary but selector pattern is too greedy

#### TypeScript

- ⚠️ Issue: Template literal boundaries incomplete
  - Template expressions `${...}` create boundaries but nesting is complex
  - Type annotations inside templates not highlighted
- ⚠️ Issue: Private method syntax `#method()`
  - The `#` is not recognized as part of the method name

#### HTML ✅

- ✅ Fixed: Script/style tags with proper exit patterns
  - `</script>` in JS strings/comments doesn't end the tag
  - `</style>` in CSS strings doesn't end the tag
- ✅ Fixed: DOCTYPE now tokenized as html_doctype
- ✅ Fixed: CDATA sections now tokenized as html_cdata
- ✅ Fixed: HTML tags now have proper boundaries
- ⚠️ Issue: Boolean attributes need refinement
  - `disabled` without value should be recognized

### TODO 📝

- Fix remaining corner cases in CSS/TS tokenizers
- Svelte scanner implementation
- Performance benchmarking of hybrid approach
- Remove rangestyler completely after all corner cases fixed

## Key Architectural Changes

### Completed Changes ✅

1. **Clean separation** - Scanners find boundaries, tokenizers handle code
2. **Single tokenization** - Orchestrator does it once
3. **Standalone** - No external dependencies
4. **Complete tokens** - All syntax elements identified
5. **Flat output** - Simple token array for consumers

### Completed Architecture Refinements ✅

#### Exit Pattern Structure (COMPLETED)

**Old (parallel arrays - confusing):**

```typescript
exit_patterns: ['</script>'],
exit_allowed_in: ['ts_code']
```

**New (single context field - IMPLEMENTED):**

```typescript
exit_pattern: '</script>',
exit_context: 'ts_code',  // or null for any context
exit_boundary_type: 'html_script_close'  // explicit type for exit boundary
```

#### HTML Tag Boundaries

- Each tag is its own boundary (html_tag)
- Separate tokenizers for tag content vs HTML content
- Script/style tags use exit patterns for proper nesting

## Benefits of New Architecture

1. **Performance** - Hybrid approach optimal for JavaScript
2. **Maintainability** - Clear separation of concerns
3. **Simplicity** - Renderers just map tokens
4. **Consistency** - Single tokenization logic
5. **Flexibility** - Easy to add new languages/tokens

## Test Impact

- Fixtures will need updating after refactor
- Token types will be language-prefixed
- Output format remains compatible
- All existing tests should pass after migration
