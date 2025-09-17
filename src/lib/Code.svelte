<script lang="ts">
	import {onDestroy} from 'svelte';
	import type {Snippet} from 'svelte';

	import {syntax_styler} from '$lib/syntax_styler_global.js';
	import {tokenize_syntax, type Syntax_Styler, type Grammar} from '$lib/syntax_styler.js';
	import {
		Domstyler_Highlight_Manager,
		supports_css_highlight_api,
		type Domstyler_Range_Mode,
	} from '$lib/domstyler_range_builder.js';

	// TODO best way to handle SSR?

	const {
		content,
		lang = 'svelte',
		mode = 'auto',
		pre_attrs,
		code_attrs,
		grammar,
		inline = false,
		domstyler = syntax_styler,
		children,
	}: {
		content: string;
		lang?: string | null;
		mode?: Domstyler_Range_Mode;
		pre_attrs?: any;
		code_attrs?: any;
		grammar?: Grammar | undefined;
		inline?: boolean;
		domstyler?: Syntax_Styler;
		children?: Snippet<[markup: string]>;
	} = $props();

	let code_element: HTMLElement | undefined = $state();
	const highlight_manager = new Domstyler_Highlight_Manager();

	const use_ranges = $derived(
		mode === 'ranges' || (mode === 'auto' && supports_css_highlight_api()),
	);

	const tag = $derived(inline ? 'span' : 'pre');

	const is_language_supported = $derived(lang !== null && domstyler.langs[lang] !== undefined);

	// Generate HTML markup for non-range mode
	const html_content = $derived.by(() => {
		if (use_ranges || !content) return '';

		// If lang is null, disable syntax highlighting
		if (lang === null) {
			return content;
		}

		if (!is_language_supported) {
			console.error('unsupported language', lang);
			return content;
		}

		return domstyler.stylize(content, lang, grammar);
	});

	// Apply highlights for range mode
	$effect(() => {
		if (!code_element || !content || !use_ranges) {
			highlight_manager.clear_element_ranges();
			return;
		}

		// If lang is null or unsupported, no highlighting needed
		if (lang === null || !is_language_supported) {
			highlight_manager.clear_element_ranges();
			return;
		}

		// Clear existing highlights
		highlight_manager.clear_element_ranges();

		// Get tokens from DOM styler
		const tokens = tokenize_syntax(content, grammar || domstyler.get_lang(lang));

		// Apply highlights
		highlight_manager.highlight_from_domstyler_tokens(code_element, tokens);
	});

	onDestroy(() => {
		highlight_manager.destroy();
	});

	// TODO do syntax styling at compile-time in the normal case, and don't import these at runtime
	// TODO @many @html making me nervous
	/* eslint-disable svelte/no-at-html-tags */
</script>

<svelte:element
	this={tag}
	{...pre_attrs}
	class:code={true}
	class:inline
	class:pre={inline}
	data-lang={lang}
	><code {...code_attrs} bind:this={code_element}
		>{#if use_ranges && children}{@render children(
				content,
			)}{:else if use_ranges}{content}{:else if children}{@render children(
				html_content,
			)}{:else}{@html html_content}{/if}</code
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
