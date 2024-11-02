<script lang="ts">
	// TODO do syntax styling at compile-time in the normal case, and don't import these at runtime
	import type {Snippet} from 'svelte';

	import {syntax_styler as syntax_styler_default} from '$lib/index.js';
	import {Syntax_Styler} from '$lib/syntax_styler.js'; // TODO lazy load these grammars (cache promise in module context)

	/**
	 * Users are expected to import `@ryanatkn/fuz_code/theme.css`, like in the main `+layout.svelte`.
	 */

	interface Props {
		content: string;
		pre_attrs?: any;
		code_attrs?: any;
		language?: string | null;
		inline?: boolean;
		syntax_styler?: Syntax_Styler;
		children?: Snippet<[markup: string]>;
	}

	const {
		content,
		pre_attrs,
		code_attrs,
		language = 'svelte',
		inline = false,
		syntax_styler = syntax_styler_default,
		children,
	}: Props = $props();

	const grammar = $derived(language === null ? null : syntax_styler.languages[language]);

	// TODO do this at compile time somehow
	const styled = $derived(
		grammar === null ? null : content && syntax_styler.stylize(content, language!, grammar),
	);
	const markup = $derived(styled ?? content);

	// TODO add `CopyToClipboard`, maybe only when not inline?

	/* eslint-disable svelte/no-at-html-tags */

	const tag = $derived(inline ? 'span' : 'pre');
</script>

<svelte:element this={tag} {...pre_attrs} class="code" class:inline class:pre={inline}
	><code {...code_attrs}
		>{#if children}{@render children(
				markup,
			)}{:else if styled !== null}{@html styled}{:else}{content}{/if}</code
	></svelte:element
>

<style>
	.code {
		background-color: var(--fg_1);
		border-radius: var(--radius_xs);
		padding: var(--space_xs3) var(--space_xs);
	}
	code {
		background-color: unset;
		/* the default `code` padding displays incorrectly wrapping the styled code */
		padding: 0;
	}
	.inline {
		display: inline-block;
		vertical-align: bottom;
	}
</style>
