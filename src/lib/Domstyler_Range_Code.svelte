<script lang="ts">
	import {onDestroy} from 'svelte';

	import {domstyler_global} from '$lib/domstyler_global.js';
	import {tokenize_syntax, type Domstyler, type Grammar} from '$lib/domstyler.js';
	import {
		Domstyler_Highlight_Manager,
		supports_css_highlight_api,
		type Domstyler_Range_Mode,
	} from '$lib/domstyler_range_builder.js';
	import {escape_html} from '$lib/helpers.js';

	const {
		content,
		lang = 'ts',
		pre_attrs,
		code_attrs,
		mode = 'auto',
		grammar,
		domstyler = domstyler_global,
	}: {
		content: string;
		lang?: string;
		pre_attrs?: any;
		code_attrs?: any;
		mode?: Domstyler_Range_Mode;
		grammar?: Grammar | undefined;
		domstyler?: Domstyler;
	} = $props();

	let code_element: HTMLElement | undefined = $state();
	const highlight_manager = new Domstyler_Highlight_Manager();

	const use_ranges = $derived(
		mode === 'ranges' || (mode === 'auto' && supports_css_highlight_api()),
	);

	const is_language_supported = $derived(domstyler.langs[lang] !== undefined);

	const html_content = $derived.by(() => {
		if (!content) return '';

		if (!is_language_supported) {
			console.error('unsupported language', lang);
			return escape_html(content);
		}

		return domstyler.stylize(content, lang, grammar);
	});

	const update_highlight = () => {
		if (!code_element || !content || !use_ranges) return;

		if (!is_language_supported) {
			console.error('unsupported language', lang);
			code_element.textContent = content;
			return;
		}

		highlight_manager.clear_element_ranges();

		// Only update if content has changed to avoid DOM thrashing
		if (code_element.textContent !== content) {
			code_element.textContent = content;
		}

		// Get tokens from DOM styler (they already have position info now)
		const tokens = tokenize_syntax(content, grammar || domstyler.get_lang(lang));

		// Apply highlights
		highlight_manager.highlight_from_domstyler_tokens(code_element, tokens);
	};

	$effect(() => {
		update_highlight();
	});

	onDestroy(() => {
		highlight_manager.destroy();
	});
</script>

<pre {...pre_attrs} class:code={true} data-lang={lang}><code
		{...code_attrs}
		bind:this={code_element}
		>{#if !use_ranges}{@html html_content}{/if}</code
	></pre>

<style>
	@import './theme_highlight.css';

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
</style>
