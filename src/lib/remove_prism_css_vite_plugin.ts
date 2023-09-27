import type {PluginOption} from 'vite';

// TODO avoid flashing the original Prism theme during dev

/**
 * Ignores the default prismjs theme.
 */
export const remove_prism_css = (): PluginOption => ({
	name: 'remove_prism_css',
	enforce: 'pre',
	load: (id: string): string | undefined => {
		if (id.endsWith('node_modules/prismjs/themes/prism.min.css')) {
			return '';
		}
		return undefined;
	},
});
