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
 * Tests generated fixture files to ensure:
 * - HTML rendering matches generated fixtures
 * - Token ranges are properly nested (no invalid overlaps)
 * - All expected tokens are present
 */

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

			test('syntax styler output matches fixture', () => {
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
					runtime_output.html,
					fixture.html,
					`HTML output mismatch for ${sample.lang}_${sample.variant}`,
				);

				// TODO: Additional assertions
				// assert(calculate_coverage(sample.content, runtime_output.html) > 0.95);
				// assert(validate_no_overlaps(extract_tokens(runtime_output.html)));
			});

			test('token positions are valid', () => {
				/**
				 * Validates that token positions are correctly calculated
				 * from the DOM styler token tree
				 *
				 * Should verify:
				 * - No overlapping tokens
				 * - All positions within bounds
				 * - Tokens match expected patterns
				 */
				const runtime_output = process_sample(sample);

				// Verify tokens are properly nested (overlapping is ok if fully contained)
				const tokensByStart = [...runtime_output.tokens].sort((a, b) =>
					a.start !== b.start ? a.start - b.start : b.end - a.end,
				);

				for (let i = 0; i < tokensByStart.length; i++) {
					const token = tokensByStart[i];

					// Check bounds
					assert.ok(
						token.start >= 0 && token.end <= sample.content.length,
						`Token ${token.type} extends beyond content at position ${token.end} (content length: ${sample.content.length})`,
					);

					// Check that any overlapping tokens are properly nested
					for (let j = i + 1; j < tokensByStart.length; j++) {
						const other = tokensByStart[j];
						if (other.start >= token.end) break; // No more overlaps possible

						// If tokens overlap, one must fully contain the other
						if (other.start < token.end) {
							const properlyNested =
								(token.start <= other.start && token.end >= other.end) || // token contains other
								(other.start <= token.start && other.end >= token.end); // other contains token

							assert.ok(
								properlyNested,
								`Invalid overlap: token ${token.type} [${token.start}-${token.end}] partially overlaps with ${other.type} [${other.start}-${other.end}]`,
							);
						}
					}
				}
			});

			test('token data matches fixture', () => {
				/**
				 * Ensures token positions are consistent between runs
				 *
				 * Should verify:
				 * - Token positions match expected values
				 * - Token types are correctly identified
				 * - Tokenization is deterministic
				 */
				if (!existsSync(fixture_path)) {
					console.warn(`Skipping test - fixture missing: ${fixture_path}`); // eslint-disable-line no-console
					return;
				}

				const fixture: Generated_Output = JSON.parse(readFileSync(fixture_path, 'utf-8'));
				const runtime_output = process_sample(sample);

				assert.deepEqual(
					runtime_output.tokens,
					fixture.tokens,
					`Token data mismatch for ${sample.lang}_${sample.variant}`,
				);
			});
		});
	}
});

describe('all expected languages are tested', () => {
	test('sample files exist for all supported languages', () => {
		const found_languages: Set<string> = new Set();

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
 *   test('all tokens have proper ranges', () => {
 *     // Compare token positions are valid
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
