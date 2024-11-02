import type {Task} from '@ryanatkn/gro';
import {format_file} from '@ryanatkn/gro/format_file.js';
import {writeFileSync} from 'node:fs';

import {samples} from '$lib/code_sample_inputs.js';
import {syntax_styler} from '$lib/index.js';

// TODO better way to do this? can't use gen because we want it to be opt-in, unless a new feature is added

export const task: Task = {
	summary: 'update tests with current behavior',
	run: async () => {
		const path = 'src/lib/code_sample_outputs.ts';

		const contents = `// code_sample_outputs.ts

${samples.map(({content, lang}) => `export const styled_${lang}_code = ${JSON.stringify(syntax_styler.stylize(content, lang))};`).join('\n\n')} 
`;

		writeFileSync(path, await format_file(contents, {filepath: path}));
	},
};
