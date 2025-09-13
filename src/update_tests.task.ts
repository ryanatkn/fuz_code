import type {Task} from '@ryanatkn/gro';
import {writeFileSync} from 'node:fs';

import {samples} from './lib/samples/all.js';
import {domstyler_global} from './lib/domstyler_global.js';

// TODO better snapshot support

export const task: Task = {
	summary: 'update test fixtures with current behavior',
	run: () => {
		for (const [lang, content] of Object.entries(samples)) {
			const styled = domstyler_global.stylize(content, lang);
			const fixture_path = `./src/fixtures/styled_html_outputs/${lang}.html`;
			writeFileSync(fixture_path, styled);
			console.log(`updated fixture: ${fixture_path}`); // eslint-disable-line no-console
		}
	},
};
