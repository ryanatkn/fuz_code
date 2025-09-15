# Boundary Scanner - Implementation Status

## Current Architecture

- **Boundary Detection**: Language scanners find boundaries (comments, strings, code regions)
- **Tokenization**: Code tokenizers identify syntax elements within code boundaries
- **Rendering**: Supports both HTML generation and CSS Custom Highlight API (ranges)

## ✅ Completed Features

- All language scanners (HTML, CSS, TypeScript, JSON)
- All code tokenizers with full syntax highlighting
- Flat token stream architecture
- HTML generation and CSS Custom Highlight API support
- Complete test coverage with fixtures
- Standalone implementation (no rangestyler dependencies)

## 🐛 Known Issues

### CSS

- **Attribute selector strings**: `.attr[title='value']` - String boundary fragments the selector, causing incomplete highlighting
- **Selector colors**: Inconsistent between implementations (green vs purple)

### TypeScript

- **Template literals**: Nested expressions `${...}` need proper boundary handling
- **Private methods**: `#method()` syntax not fully recognized

### HTML

- **Boolean attributes**: `disabled` without value needs recognition
- **Script/style attributes**: Opening tags need proper attribute tokenization

## 📝 TODO

1. Unify selector colors across all implementations
2. Implement Svelte language scanner
3. Performance optimization and caching
4. Consider removing rangestyler once boundary scanner is stable

## Problems

In src/lib/boundary_scanner_orchestrator.ts:

```ts
const exit_pattern = found.switch_to_language === 'ts' ? '</script>' : '</style>';
```
