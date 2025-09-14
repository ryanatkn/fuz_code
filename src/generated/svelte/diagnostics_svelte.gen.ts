import type {Gen} from '@ryanatkn/gro';
import type {Raw_Gen_File} from '@ryanatkn/gro/gen.js';
import {process_language_sample, generate_language_report} from '../rangestyler_helpers.js';

export const gen: Gen = async () => {
	const lang = 'svelte';
	const diagnostics = await process_language_sample(lang);

	const files: Array<Raw_Gen_File> = [
		{
			filename: 'boundaries.json',
			content: JSON.stringify(diagnostics.boundaries),
		},
		{
			filename: 'matches.json',
			content: JSON.stringify(diagnostics.matches),
		},
		{
			filename: 'report.md',
			content: generate_language_report(lang, diagnostics),
		},
	];

	return files;
};
