<script lang="ts">
	import type {Snippet} from 'svelte';

	import {syntax_styler as syntax_styler_default} from '$lib/index.js'; // TODO lazy load these grammars (cache promise in module context)
	import {Syntax_Styler, type Grammar} from '$lib/syntax_styler.js';

	// TODO do syntax styling at compile-time in the normal case, and don't import these at runtime

	interface Props {
		content: string;
		pre_attrs?: any;
		code_attrs?: any;
		lang?: string | null;
		grammar?: Grammar | undefined;
		inline?: boolean;
		syntax_styler?: Syntax_Styler;
		children?: Snippet<[markup: string]>;
	}

	const {
		content,
		pre_attrs,
		code_attrs,
		lang = 'svelte',
		grammar,
		inline = false,
		syntax_styler = syntax_styler_default,
		children,
	}: Props = $props();

	// TODO do this at compile time somehow
	const styled = $derived(
		lang === null || !content ? null : syntax_styler.stylize(content, lang, grammar),
	);
	const markup = $derived(styled ?? content);

	const tag = $derived(inline ? 'span' : 'pre');

	// TODO @many @html making me nervous
	/* eslint-disable svelte/no-at-html-tags */
</script>

<svelte:element this={tag} {...pre_attrs} class:code={true} class:inline class:pre={inline}
	><code {...code_attrs}
		>{#if children}{@render children(markup)}{:else}{@html markup}{/if}</code
	></svelte:element
>

<style>
	.code {
		background-color: var(--fg_1);
		border-radius: var(--border_radius_xs);
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
