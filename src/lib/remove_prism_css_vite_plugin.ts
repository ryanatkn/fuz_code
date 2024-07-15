import type {PluginOption} from 'vite';

/**
 * Ignores the default prismjs theme.
 */
export const remove_prism_css = (matcher = /node_modules\/prismjs\/.+\.css$/): PluginOption => ({
	name: 'remove_prism_css',
	enforce: 'pre',
	load: (id: string): string | undefined => (matcher.test(id) ? '' : undefined),
});
