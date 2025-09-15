import {test, assert, describe} from 'vitest';
import {readFileSync, existsSync} from 'node:fs';
import {
	discover_samples,
	process_sample,
	get_fixture_path,
	type Generated_Output,
} from './helpers.js';
import {sample_langs} from '$lib/code_sample.js';

/**
 * Test Architecture Overview
 * =========================
 *
 * This test suite verifies that our syntax highlighters produce consistent,
 * correct output by comparing runtime behavior against generated fixtures.
 *
 * Current State:
 * - Tests exact HTML match between runtime and fixtures
 * - Tests domstyler (legacy) and boundary scanner outputs
 *
 * Future Goals:
 * - Migrate from domstyler to boundary scanner as primary implementation
 * - Test semantic equivalence rather than exact HTML match
 * - Ensure complete coverage with no unhighlighted code
 */

// TODO: Helper functions for semantic comparison
// function extract_token_positions(html: string): Array<{start: number, end: number, type: string}>
// function compare_semantic_equivalence(html1: string, html2: string): boolean
// function calculate_coverage(content: string, html: string): number
// function validate_no_overlaps(tokens: Array<Token>): boolean

describe('generated fixtures match runtime', () => {
	// Discover all sample files using helper
	const samples = discover_samples();

	// Generate test for each sample
	for (const sample of samples) {
		describe(`${sample.lang}_${sample.variant}`, () => {
			const fixture_path = get_fixture_path(sample.lang, sample.variant, 'json');

			test('fixture file exists', () => {
				// Basic sanity check - fixtures must be generated before tests can run
				assert.ok(
					existsSync(fixture_path),
					`Fixture file missing: ${fixture_path}. Run 'npm run task src/fixtures/update' to generate.`,
				);
			});

			test('domstyler output matches fixture', () => {
				/**
				 * Current: Tests exact HTML string match
				 *
				 * Ideal: Should test:
				 * - All code is highlighted (no plain text except whitespace)
				 * - Token boundaries are correct
				 * - Token types are semantically correct
				 * - No overlapping spans
				 * - Performance metrics (time, memory)
				 */
				if (!existsSync(fixture_path)) {
					console.warn(`Skipping test - fixture missing: ${fixture_path}`); // eslint-disable-line no-console
					return;
				}

				const fixture: Generated_Output = JSON.parse(readFileSync(fixture_path, 'utf-8'));
				const runtime_output = process_sample(sample);

				assert.strictEqual(
					runtime_output.domstyler_html,
					fixture.domstyler_html,
					`Domstyler output mismatch for ${sample.lang}_${sample.variant}`,
				);

				// TODO: Additional assertions
				// assert(calculate_coverage(sample.content, runtime_output.domstyler_html) > 0.95);
				// assert(validate_no_overlaps(extract_tokens(runtime_output.domstyler_html)));
			});

			test('boundaries match fixture', () => {
				/**
				 * Critical for nested language support (e.g., JS in HTML, CSS in Svelte)
				 *
				 * Should verify:
				 * - Correct detection of language boundaries
				 * - No overlapping boundaries
				 * - Complete coverage (no gaps)
				 * - Proper handling of edge cases (empty tags, comments)
				 */
				if (!existsSync(fixture_path)) {
					console.warn(`Skipping test - fixture missing: ${fixture_path}`); // eslint-disable-line no-console
					return;
				}

				const fixture: Generated_Output = JSON.parse(readFileSync(fixture_path, 'utf-8'));
				const runtime_output = process_sample(sample);

				assert.deepEqual(
					runtime_output.boundaries,
					fixture.boundaries,
					`Boundaries mismatch for ${sample.lang}_${sample.variant}`,
				);

				// TODO: Validate boundary integrity
				// assert(validate_boundary_coverage(sample.content, runtime_output.boundaries));
				// assert(validate_no_boundary_overlaps(runtime_output.boundaries));
			});

			test('boundary scanner output matches fixture', () => {
				/**
				 * Boundary scanner is a new implementation
				 * Tests HTML generation from boundary detection
				 *
				 * Should verify:
				 * - Correct HTML generation from boundaries
				 * - Proper exit condition handling (e.g., </script> in strings)
				 * - Template literal expression tracking
				 * - Performance improvement over regex approach
				 */
				if (!existsSync(fixture_path)) {
					console.warn(`Skipping test - fixture missing: ${fixture_path}`); // eslint-disable-line no-console
					return;
				}

				const fixture: Generated_Output = JSON.parse(readFileSync(fixture_path, 'utf-8'));
				const runtime_output = process_sample(sample);

				// Skip if boundary scanner doesn't support this language yet
				if (!runtime_output.boundary_scanner_html || !fixture.boundary_scanner_html) {
					return;
				}

				assert.strictEqual(
					runtime_output.boundary_scanner_html,
					fixture.boundary_scanner_html,
					`Boundary scanner output mismatch for ${sample.lang}_${sample.variant}`,
				);
			});
		});
	}
});

describe('all expected languages are tested', () => {
	test('sample files exist for all supported languages', () => {
		const found_languages = new Set<string>();

		const samples = discover_samples();
		for (const sample of samples) {
			found_languages.add(sample.lang);
		}

		for (const lang of sample_langs) {
			assert.ok(found_languages.has(lang), `Missing sample files for language: ${lang}`);
		}
	});
});

/**
 * Future Test Improvements
 * =======================
 *
 * describe('semantic equivalence', () => {
 *   test('domstyler and boundary scanner highlight same tokens', () => {
 *     // Compare token positions regardless of HTML differences
 *   });
 *
 *   test('no code is left unhighlighted', () => {
 *     // Verify 95%+ coverage (allowing for whitespace)
 *   });
 * });
 *
 * describe('performance benchmarks', () => {
 *   test('highlighting completes within time budget', () => {
 *     // Track time per KB of code
 *   });
 *
 *   test('memory usage is reasonable', () => {
 *     // Track memory per KB of code
 *   });
 * });
 *
 * describe('edge cases', () => {
 *   test('handles malformed code gracefully', () => {
 *     // Should not crash, should highlight what it can
 *   });
 *
 *   test('handles extremely long lines', () => {
 *     // Performance should degrade gracefully
 *   });
 *
 *   test('handles nested language boundaries', () => {
 *     // JS in HTML in Svelte, etc.
 *   });
 * });
 *
 * describe('visual regression', () => {
 *   test('highlighted code screenshots match', () => {
 *     // Render to canvas, compare pixels
 *   });
 * });
 */
