<script lang="ts">
	import type {Snippet} from 'svelte';

	import {Domstyler, type Grammar} from '$lib/domstyler.js';
	import {domstyler_global} from '$lib/domstyler_global.js';

	// TODO do syntax styling at compile-time in the normal case, and don't import these at runtime

	interface Props {
		content: string;
		pre_attrs?: any;
		code_attrs?: any;
		lang?: string | null;
		grammar?: Grammar | undefined;
		inline?: boolean;
		domstyler?: Domstyler;
		children?: Snippet<[markup: string]>;
	}

	const {
		content,
		pre_attrs,
		code_attrs,
		lang = 'svelte',
		grammar,
		inline = false,
		domstyler = domstyler_global,
		children,
	}: Props = $props();

	// TODO do this at compile time somehow
	const styled = $derived(
		lang === null || !content ? null : domstyler.stylize(content, lang, grammar),
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
