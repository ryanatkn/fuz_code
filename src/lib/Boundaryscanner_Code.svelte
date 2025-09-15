<script lang="ts">
	import {boundary_scanner_global} from '$lib/boundary_scanner_global.js';
	import {generate_html_from_tokens} from '$lib/boundary_scanner_html_generator.js';
	import {
		highlight_with_tokens,
		clear_highlights,
		supports_css_highlight_api,
	} from '$lib/boundary_scanner_range_builder.js';

	type Boundaryscanner_Mode = 'auto' | 'ranges' | 'html';

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

	// Element reference
	let code_element: HTMLElement | undefined = $state();
	let active_highlights: Array<string> = [];

	// Compute display mode
	const use_ranges = $derived(
		mode === 'ranges' || (mode === 'auto' && supports_css_highlight_api()),
	);

	// Compute HTML content for HTML mode
	const html_content = $derived.by(() => {
		if (!content) return '';

		// Check if language is supported
		if (!boundary_scanner_global.has_language(lang)) {
			// For unsupported languages, just escape HTML
			return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}

		// Scan and get tokens
		const tokens = boundary_scanner_global.scan(content, lang);
		return generate_html_from_tokens(content, tokens);
	});

	// Update highlights for Range mode
	function update_highlight() {
		if (!code_element || !content || !use_ranges) return;

		// Check if language is supported
		if (!boundary_scanner_global.has_language(lang)) {
			// For unsupported languages, just set text content
			code_element.textContent = content;
			return;
		}

		// Clear any existing highlights
		if (active_highlights.length > 0) {
			clear_highlights(active_highlights);
			active_highlights = [];
		}

		// Ensure the element has the text content first
		// This is critical for Range API to work
		code_element.textContent = content;

		// Scan and get tokens
		const tokens = boundary_scanner_global.scan(content, lang);

		// Use Range API with tokens
		active_highlights = highlight_with_tokens(code_element, content, tokens);
	}

	// Reactive highlighting using $effect for Range mode
	$effect(() => {
		if (use_ranges && code_element && content) {
			update_highlight();
		}

		// Cleanup function
		return () => {
			if (active_highlights.length > 0) {
				clear_highlights(active_highlights);
				active_highlights = [];
			}
		};
	});
</script>

<pre {...pre_attrs} class:code={true} data-lang={lang}><code
		{...code_attrs}
		bind:this={code_element}
		>{#if use_ranges}{@html ''}{:else}{@html html_content}{/if}</code
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
