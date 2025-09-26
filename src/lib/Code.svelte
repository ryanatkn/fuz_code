<script lang="ts" module>
	const supports_ranges = supports_css_highlight_api();
</script>

<script lang="ts">
	import {onDestroy, type Snippet} from 'svelte';

	import {syntax_styler_global} from '$lib/syntax_styler_global.js';
	import type {Syntax_Styler, Syntax_Grammar} from '$lib/syntax_styler.js';
	import {tokenize_syntax} from '$lib/tokenize_syntax.js';
	import {
		Highlight_Manager,
		supports_css_highlight_api,
		type Highlight_Mode,
	} from '$lib/highlight_manager.js';

	const {
		content,
		lang = 'svelte',
		mode = 'auto',
		pre_attrs,
		code_attrs,
		grammar,
		inline = false,
		syntax_styler = syntax_styler_global,
		children,
	}: {
		content: string;
		lang?: string | null;
		mode?: Highlight_Mode;
		pre_attrs?: any;
		code_attrs?: any;
		grammar?: Syntax_Grammar | undefined;
		inline?: boolean;
		syntax_styler?: Syntax_Styler;
		children?: Snippet<[markup: string]>;
	} = $props();

	let code_element: HTMLElement | undefined = $state();

	const highlight_manager = supports_ranges ? new Highlight_Manager() : null;

	const use_ranges = $derived(supports_ranges && (mode === 'ranges' || mode === 'auto'));

	const tag = $derived(inline ? 'span' : 'pre');

	const is_language_supported = $derived(lang !== null && syntax_styler.langs[lang] !== undefined);

	// Generate HTML markup for non-range mode
	const html_content = $derived.by(() => {
		if (use_ranges || !content) return '';

		// If lang is null, disable syntax highlighting
		if (lang === null) {
			return content;
		}

		if (!is_language_supported) {
			console.error('unsupported language', lang); // eslint-disable-line no-console
			return content;
		}

		return syntax_styler.stylize(content, lang, grammar);
	});

	// Apply highlights for range mode
	if (highlight_manager) {
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

			// Get tokens from syntax styler
			const tokens = tokenize_syntax(content, grammar || syntax_styler.get_lang(lang));

			// Apply highlights
			highlight_manager.highlight_from_syntax_tokens(code_element, tokens);
		});
	}

	onDestroy(() => {
		highlight_manager?.destroy();
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
		/* TODO change when Moss is upgraded to `--bg_1` */
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
