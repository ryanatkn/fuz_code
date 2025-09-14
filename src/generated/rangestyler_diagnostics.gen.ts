import type {Gen} from '@ryanatkn/gro';
import type {Raw_Gen_File} from '@ryanatkn/gro/gen.js';
import {
	process_language_sample,
	generate_comparison_report,
} from './rangestyler_diagnostic_helpers.js';

export const gen: Gen = async () => {
	// Process all languages
	const languages = ['css', 'html', 'json', 'ts', 'svelte'];
	const all_diagnostics: Record<string, any> = {};

	for (const lang of languages) {
		all_diagnostics[lang] = await process_language_sample(lang);
	}

	// Generate comparison report
	const comparison = generate_comparison_report(all_diagnostics);

	// Return array of files
	const files: Array<Raw_Gen_File> = [
		{
			filename: 'comparison.md',
			content: comparison,
		},
		{
			filename: 'all_diagnostics.json',
			content: JSON.stringify(all_diagnostics),
		},
	];

	return files;
};
