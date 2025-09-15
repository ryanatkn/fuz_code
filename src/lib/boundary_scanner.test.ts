import {test, expect, describe} from 'vitest';
import {Scanner_Orchestrator} from './boundary_scanner_orchestrator.js';
import {Html_Scanner, html_boundary_types} from './boundary_scanner_html.js';
import {Ts_Scanner, ts_boundary_types} from './boundary_scanner_ts.js';

describe('Boundary Scanner', () => {
	describe('HTML Scanner', () => {
		test('detects script tags', () => {
			const orchestrator = new Scanner_Orchestrator();
			orchestrator.register_language(new Html_Scanner());
			orchestrator.register_language(new Ts_Scanner());

			// Register boundary types
			for (const bt of html_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}
			for (const bt of ts_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}

			const html = `<html>
<script>console.log('hello');</script>
</html>`;

			const boundaries = orchestrator.get_boundaries(html, 'html');

			// Should have boundaries for HTML content and embedded script
			expect(boundaries.length).toBeGreaterThan(0);

			// Find the script opening tag boundary
			const script_boundary = boundaries.find(
				(b) => b.type === 'html_tag' && html.slice(b.start, b.end) === '<script>',
			);
			expect(script_boundary).toBeDefined();

			// Find the actual TypeScript code boundaries
			const ts_boundaries = boundaries.filter((b) => b.language === 'ts');
			expect(ts_boundaries.length).toBeGreaterThan(0);

			// Check that we have the console.log in a code boundary
			const code_with_console = ts_boundaries.find((b) => {
				const content = html.slice(b.start, b.end);
				return content.includes('console.log');
			});
			expect(code_with_console).toBeDefined();
		});

		test('handles script tag with </script> in string', () => {
			const orchestrator = new Scanner_Orchestrator();
			orchestrator.register_language(new Html_Scanner());
			orchestrator.register_language(new Ts_Scanner());

			// Register boundary types
			for (const bt of html_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}
			for (const bt of ts_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}

			const html = `<script>
const html = "</script>";
console.log(html);
</script>`;

			const boundaries = orchestrator.get_boundaries(html, 'html');

			// Find the script opening tag boundary
			const script_boundary = boundaries.find(
				(b) => b.type === 'html_tag' && html.slice(b.start, b.end) === '<script>',
			);
			expect(script_boundary).toBeDefined();

			// The script boundary should be just the opening tag
			if (script_boundary) {
				const script_content = html.slice(script_boundary.start, script_boundary.end);
				expect(script_content).toBe('<script>');

				// There should be a closing tag boundary
				const closing_tag = boundaries.find(
					(b) =>
						b.type === 'html_tag' &&
						b.start > script_boundary.end &&
						html.slice(b.start, b.end) === '</script>',
				);
				expect(closing_tag).toBeDefined();
				if (closing_tag) {
					const closing_content = html.slice(closing_tag.start, closing_tag.end);
					expect(closing_content).toBe('</script>');
				}

				// The TypeScript boundaries should exist
				const ts_boundaries = boundaries.filter((b) => b.language === 'ts');
				expect(ts_boundaries.length).toBeGreaterThan(0);

				// Check that the string boundary contains </script>
				const string_boundary = ts_boundaries.find((b) => b.type && b.type.includes('string'));
				expect(string_boundary).toBeDefined();
				if (string_boundary) {
					const string_content = html.slice(string_boundary.start, string_boundary.end);
					expect(string_content).toContain('</script>');
				}
			}
		});

		test('handles HTML comments', () => {
			const orchestrator = new Scanner_Orchestrator();
			orchestrator.register_language(new Html_Scanner());

			for (const bt of html_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}

			const html = `<!-- This is a comment -->
<div>Content</div>
<!-- Another comment -->`;

			const boundaries = orchestrator.get_boundaries(html, 'html');

			const comment_boundaries = boundaries.filter((b) => b.type === 'html_comment');
			expect(comment_boundaries).toHaveLength(2);
		});

		test('ignores script tags inside comments', () => {
			const orchestrator = new Scanner_Orchestrator();
			orchestrator.register_language(new Html_Scanner());

			for (const bt of html_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}

			const html = `<!-- <script>console.log('ignored');</script> -->
<div>Content</div>`;

			const boundaries = orchestrator.get_boundaries(html, 'html');

			// Should not detect script inside comment
			const script_boundaries = boundaries.filter((b) => b.type === 'html_script');
			expect(script_boundaries).toHaveLength(0);
		});
	});

	describe('TypeScript Scanner', () => {
		test('detects different comment types', () => {
			const scanner = new Ts_Scanner();

			const code = `// Single line comment
const x = 5;
/* Multi-line
   comment */
const y = 10;`;

			// Test single-line comment
			const single_comment = scanner.find_next_boundary(code, 0, code.length);
			expect(single_comment).toBeDefined();
			expect(single_comment?.boundary_type).toBe('ts_comment_single');

			// Test multi-line comment
			const multi_start = code.indexOf('/*');
			const multi_comment = scanner.find_next_boundary(code, multi_start, code.length);
			expect(multi_comment).toBeDefined();
			expect(multi_comment?.boundary_type).toBe('ts_comment_multi');
		});

		test('detects string literals', () => {
			const scanner = new Ts_Scanner();

			const code = `const str1 = "double quotes";
const str2 = 'single quotes';`;

			// Test double quotes
			const double_quote_pos = code.indexOf('"');
			const double_string = scanner.find_next_boundary(code, double_quote_pos, code.length);
			expect(double_string).toBeDefined();
			expect(double_string?.boundary_type).toBe('ts_string_double');

			// Test single quotes
			const single_quote_pos = code.indexOf("'");
			const single_string = scanner.find_next_boundary(code, single_quote_pos, code.length);
			expect(single_string).toBeDefined();
			expect(single_string?.boundary_type).toBe('ts_string_single');
		});

		test('detects template literals', () => {
			const scanner = new Ts_Scanner();

			const code = '`Template literal with no expressions`';
			const template = scanner.find_next_boundary(code, 0, code.length);
			expect(template).toBeDefined();
			expect(template?.boundary_type).toBe('ts_template');
		});

		test('handles template literals with expressions', () => {
			const scanner = new Ts_Scanner();

			const code = '`Hello ${name}!`';

			// First part of template
			const template_start = scanner.find_next_boundary(code, 0, code.length);
			expect(template_start).toBeDefined();
			expect(template_start?.boundary_type).toBe('ts_template');

			// The template should end at ${
			if (template_start?.end) {
				const template_text = code.slice(template_start.start, template_start.end);
				expect(template_text).toBe('`Hello ');
			}
		});

		test('detects regex literals in correct context', () => {
			const scanner = new Ts_Scanner();

			// After = operator
			const code1 = 'const regex = /test/gi;';
			const equals_pos = code1.indexOf('/');
			const regex1 = scanner.find_next_boundary(code1, equals_pos, code1.length);
			expect(regex1).toBeDefined();
			expect(regex1?.boundary_type).toBe('ts_regex');

			// After ( operator
			const code2 = 'match(/pattern/);';
			const paren_pos = code2.indexOf('/');
			const regex2 = scanner.find_next_boundary(code2, paren_pos, code2.length);
			expect(regex2).toBeDefined();
			expect(regex2?.boundary_type).toBe('ts_regex');
		});

		test('handles escaped characters in strings', () => {
			const scanner = new Ts_Scanner();

			const code = '"String with \\" escaped quote"';
			const string = scanner.find_next_boundary(code, 0, code.length);
			expect(string).toBeDefined();
			expect(string?.boundary_type).toBe('ts_string_double');

			// Should include the entire string with escaped quote
			if (string?.end) {
				const string_text = code.slice(string.start, string.end);
				expect(string_text).toBe('"String with \\" escaped quote"');
			}
		});
	});

	describe('Orchestrator Integration', () => {
		test('handles nested template expressions with </script>', () => {
			const orchestrator = new Scanner_Orchestrator();
			orchestrator.register_language(new Html_Scanner());
			orchestrator.register_language(new Ts_Scanner());

			for (const bt of html_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}
			for (const bt of ts_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}

			const html = `<script>
const tmpl = \`text </script> more\`;
const expr = \`\${\'</script>\'}\`;
</script>`;

			const boundaries = orchestrator.get_boundaries(html, 'html');

			// Should properly handle </script> inside template literals
			const ts_boundaries = boundaries.filter((b) => b.language === 'ts');

			// Find template boundaries
			const template_boundaries = ts_boundaries.filter((b) => b.type === 'ts_template');
			expect(template_boundaries.length).toBeGreaterThan(0);

			// The script should only end at the real </script> in code
			const last_boundary = boundaries[boundaries.length - 1];
			expect(last_boundary.end).toBe(html.length);
		});

		test('handles comments with </script> inside', () => {
			const orchestrator = new Scanner_Orchestrator();
			orchestrator.register_language(new Html_Scanner());
			orchestrator.register_language(new Ts_Scanner());

			for (const bt of html_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}
			for (const bt of ts_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}

			const html = `<script>
// This comment has </script> in it
/* This multi-line comment
   also has </script> */
console.log('Still in script');
</script>`;

			const boundaries = orchestrator.get_boundaries(html, 'html');

			// Should have script opening tag
			const script_boundary = boundaries.find(
				(b) => b.type === 'html_tag' && html.slice(b.start, b.end).includes('<script'),
			);
			expect(script_boundary).toBeDefined();

			// Should have TypeScript comment boundaries
			const comment_boundaries = boundaries.filter(
				(b) => b.type === 'ts_comment_single' || b.type === 'ts_comment_multi',
			);
			expect(comment_boundaries.length).toBe(2);

			// Should have top-level content after comments
			const code_after_comments = boundaries.find(
				(b) =>
					b.type === null &&
					b.language === 'ts' &&
					html.slice(b.start, b.end).includes('console.log'),
			);
			expect(code_after_comments).toBeDefined();
		});
	});

	describe('Adapter', () => {
		test('converts boundary types to semantic types', () => {
			// Note: This test will only work when USE_BOUNDARY_SCANNER is true
			// For now, we can test the conversion logic indirectly

			const orchestrator = new Scanner_Orchestrator();
			orchestrator.register_language(new Ts_Scanner());

			for (const bt of ts_boundary_types) {
				orchestrator.register_boundary_type(bt);
			}

			const code = '// Comment\nconst x = "string";';
			const boundaries = orchestrator.get_boundaries(code, 'ts');

			// Check that we get proper boundary types
			expect(boundaries.some((b) => b.type === 'ts_comment_single')).toBe(true);
			expect(boundaries.some((b) => b.type === 'ts_string_double')).toBe(true);
			expect(boundaries.some((b) => b.type === null && b.language === 'ts')).toBe(true);
		});
	});
});
