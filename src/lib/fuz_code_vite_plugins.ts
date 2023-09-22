import type {PluginOption} from 'vite';

export const fuz_code_vite_plugins: PluginOption[] = [
	{
		name: 'remove_prism_css',
		enforce: 'pre',
		load: (id: string): string | undefined => {
			if (id.endsWith('node_modules/prismjs/themes/prism.min.css')) {
				return '';
			}
			return undefined;
		},
	},
];
