import type {UserConfig} from 'vite';
import {sveltekit} from '@sveltejs/kit/vite';

import {remove_prism_css} from './src/lib/remove_prism_css_vite_plugin';

const config: UserConfig = {
	plugins: [sveltekit(), remove_prism_css()],
	ssr: {noExternal: ['@fuz.dev/fuz']},
};

export default config;
