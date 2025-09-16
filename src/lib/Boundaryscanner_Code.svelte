<script lang="ts">
	import {onDestroy} from 'svelte';

	import {boundary_scanner_global} from '$lib/boundary_scanner_global.js';
	import {generate_html_from_tokens} from '$lib/boundary_scanner_html_generator.js';
	import {
		Highlight_Manager,
		supports_css_highlight_api,
		type Boundaryscanner_Mode,
	} from '$lib/boundary_scanner_range_builder.js';
	import {escape_html} from '$lib/helpers.js';

	const {
		content,
		lang = 'ts',
		pre_attrs,
		code_attrs,
		mode = 'auto',
	}: {
		content: string;
		lang?: string;
		pre_attrs?: any;
		code_attrs?: any;
		mode?: Boundaryscanner_Mode;
	} = $props();

	let code_element: HTMLElement | undefined = $state();
	const highlight_manager = new Highlight_Manager();

	const use_ranges = $derived(
		mode === 'ranges' || (mode === 'auto' && supports_css_highlight_api()),
	);

	const is_language_supported = $derived(boundary_scanner_global.has_language(lang));

	const html_content = $derived.by(() => {
		if (!content) return '';

		if (!is_language_supported) {
			console.error('unsupported language', lang);
			return escape_html(content);
		}

		const tokens = boundary_scanner_global.scan(content, lang);
		return generate_html_from_tokens(content, tokens);
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

		const tokens = boundary_scanner_global.scan(content, lang);
		highlight_manager.highlight_from_tokens(code_element, tokens);
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
