<script lang="ts">
	import type {Snippet} from 'svelte';
	import {DEV} from 'esm-env';

	import {syntax_styler_global} from '$lib/syntax_styler_global.js';
	import type {Syntax_Styler, Syntax_Grammar} from '$lib/syntax_styler.js';

	const {
		content,
		lang = 'svelte',
		pre_attrs,
		code_attrs,
		grammar,
		inline = false,
		syntax_styler = syntax_styler_global,
		children,
	}: {
		/** The source code to syntax highlight. */
		content: string;
		/**
		 * Language identifier (e.g., 'ts', 'css', 'html', 'json', 'svelte', 'md').
		 *
		 * **Purpose:**
		 * - When `grammar` is not provided, used to look up the grammar via `syntax_styler.get_lang(lang)`
		 * - Used for metadata: sets the `data-lang` attribute and determines `language_supported`
		 *
		 * **Special values:**
		 * - `null` - Explicitly disables syntax highlighting (content rendered as plain text)
		 * - `undefined` - Falls back to default ('svelte')
		 *
		 * **Relationship with `grammar`:**
		 * - If both `lang` and `grammar` are provided, `grammar` takes precedence for tokenization
		 * - However, `lang` is still used for the `data-lang` attribute and language detection
		 *
		 * @default 'svelte'
		 */
		lang?: string | null;
		/** Additional attributes to apply to the outer `<pre>` or `<span>` element. */
		pre_attrs?: any;
		/** Additional attributes to apply to the inner `<code>` element. */
		code_attrs?: any;
		/**
		 * Optional custom grammar object for syntax tokenization.
		 *
		 * **When to use:**
		 * - To provide a custom language definition not registered in `syntax_styler.langs`
		 * - To use a modified/extended version of an existing grammar
		 * - For one-off grammar variations without registering globally
		 *
		 * **Behavior:**
		 * - When provided, this grammar is used for tokenization instead of looking up via `lang`
		 * - Enables highlighting even if `lang` is not in the registry (useful for custom languages)
		 * - The `lang` parameter is still used for metadata (data-lang attribute)
		 * - When undefined, the grammar is automatically looked up via `syntax_styler.get_lang(lang)`
		 *
		 * @default undefined (uses grammar from `syntax_styler.langs[lang]`)
		 */
		grammar?: Syntax_Grammar | undefined;
		/**
		 * Whether to render inline code (uses `<span>`) or block code (uses `<pre>`).
		 *
		 * @default false
		 */
		inline?: boolean;
		/**
		 * Custom Syntax_Styler instance to use for highlighting.
		 * Allows using a different styler with custom grammars or configuration.
		 *
		 * @default syntax_styler_global
		 */
		syntax_styler?: Syntax_Styler;
		/**
		 * Optional snippet to customize how the highlighted markup is rendered.
		 * Receives the generated HTML string as a parameter.
		 */
		children?: Snippet<[markup: string]>;
	} = $props();

	const tag = $derived(inline ? 'span' : 'pre');

	const language_supported = $derived(lang !== null && !!syntax_styler.langs[lang]);

	const highlighting_disabled = $derived(lang === null || (!language_supported && !grammar));

	// DEV-only validation warnings
	if (DEV) {
		$effect(() => {
			if (lang && !language_supported && !grammar) {
				const langs = Object.keys(syntax_styler.langs).join(', ');
				// eslint-disable-next-line no-console
				console.error(
					`[Code] Language "${lang}" is not supported and no custom grammar provided. ` +
						`Highlighting disabled. Supported: ${langs}`,
				);
			}
		});
	}

	// Generate HTML markup for syntax highlighting
	const html_content = $derived.by(() => {
		if (!content || highlighting_disabled) {
			return '';
		}

		return syntax_styler.stylize(content, lang!, grammar); // ! is safe bc of the `highlighting_disabled` calculation
	});

	// TODO do syntax styling at compile-time in the normal case, and don't import these at runtime
	// TODO @html making me nervous
	/* eslint-disable svelte/no-at-html-tags */
</script>

<svelte:element
	this={tag}
	{...pre_attrs}
	class:code={true}
	class:inline
	class:pre={inline}
	data-lang={lang}
	><code {...code_attrs}
		>{#if highlighting_disabled}{content}{:else if children}{@render children(
				html_content,
			)}{:else}{@html html_content}{/if}</code
	></svelte:element
>

<style>
	.code {
		/* TODO change when Moss is upgraded to `--bg_1` */
		background-color: var(--fg_1);
		border-radius: var(--border_radius_xs);
		padding: var(--space_xs3) var(--space_xs);
	}
	code {
		background-color: unset;
		/* the default `code` padding incorrectly wraps the styled code */
		padding: 0;
	}
	.inline {
		display: inline-block;
		vertical-align: bottom;
	}
</style>
