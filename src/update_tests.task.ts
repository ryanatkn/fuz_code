import type {Task} from '@ryanatkn/gro';
import {writeFileSync} from 'node:fs';

import {samples} from '$lib/samples/all.js';
import {domstyler_global} from '$lib/domstyler_global.js';
import {
	find_matches_with_boundaries,
	resolve_overlaps,
	generate_html_fallback,
} from '$lib/rangestyler_builder.js';
import {rangestyler_global} from '$lib/rangestyler_global.js';

// TODO better snapshot support

export const task: Task = {
	summary: 'update test fixtures with current behavior',
	run: () => {
		for (const [lang, content] of Object.entries(samples)) {
			// Generate domstyler fixture
			const domstyled = domstyler_global.stylize(content, lang);
			const domstyler_path = `./fixtures/styled_html_outputs/${lang}_domstyler.html`;
			writeFileSync(domstyler_path, domstyled);
			console.log(`updated fixture: ${domstyler_path}`); // eslint-disable-line no-console

			// Generate rangestyler fixture using HTML fallback mode
			const language = rangestyler_global.get_language(lang);
			if (language) {
				const matches = find_matches_with_boundaries(
					content,
					language.patterns,
					lang,
					(id) => rangestyler_global.get_language(id)?.patterns,
				);
				const resolved = resolve_overlaps(matches);
				const rangestyled = generate_html_fallback(content, resolved);

				const rangestyler_path = `./fixtures/styled_html_outputs/${lang}_rangestyler.html`;
				writeFileSync(rangestyler_path, rangestyled);
				console.log(`updated fixture: ${rangestyler_path}`); // eslint-disable-line no-console
			} else {
				console.warn(`Language "${lang}" not found in rangestyler_global`); // eslint-disable-line no-console
			}
		}
	},
};
