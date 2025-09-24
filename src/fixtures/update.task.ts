import type {Task} from '@ryanatkn/gro';
import {writeFileSync, mkdirSync, rmSync, existsSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {format_file} from '@ryanatkn/gro/format_file.js';
import {
	discover_samples,
	process_sample,
	generate_debug_text,
	get_fixture_path,
} from './helpers.js';

export const task: Task = {
	summary: 'update all test fixtures from sample files',
	run: async ({invoke_task}) => {
		await invoke_task('gen');

		// Discover all sample files
		const samples = discover_samples();

		// Get unique languages to clean directories
		const languages = new Set(samples.map((s) => s.lang));

		const generated_fixtures_dir = resolve('src/fixtures/generated');

		// Remove existing language directories
		for (const lang of languages) {
			const dir = join(generated_fixtures_dir, lang);
			if (existsSync(dir)) {
				rmSync(dir, {recursive: true, force: true});
				console.log(`Removed existing directory: ${dir}`); // eslint-disable-line no-console
			}
		}

		// Process each sample
		for (const sample of samples) {
			console.log(`Processing ${sample.lang}_${sample.variant}...`); // eslint-disable-line no-console

			// Process sample using helper
			const output = process_sample(sample);

			// Ensure directory exists
			const dir = join(generated_fixtures_dir, sample.lang);
			mkdirSync(dir, {recursive: true});

			// Write JSON file
			const json_path = get_fixture_path(sample.lang, sample.variant, 'json');
			const json_content = JSON.stringify(output);
			const formatted_json = await format_file(json_content, {filepath: json_path}); // eslint-disable-line no-await-in-loop
			writeFileSync(json_path, formatted_json);
			console.log(`  → ${json_path}`); // eslint-disable-line no-console

			// Generate and write debug text file
			const debug_text = generate_debug_text(output);
			const txt_path = get_fixture_path(sample.lang, sample.variant, 'txt');
			writeFileSync(txt_path, debug_text);
			console.log(`  → ${txt_path}`); // eslint-disable-line no-console
		}

		console.log(`\n✓ Updated ${samples.length} samples`); // eslint-disable-line no-console
	},
};
