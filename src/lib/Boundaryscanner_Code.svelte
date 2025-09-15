<script lang="ts">
	import {boundary_scanner_global} from '$lib/boundary_scanner_global.js';
	import {generate_html_from_tokens} from '$lib/boundary_scanner_html_generator.js';
	import {
		Highlight_Manager,
		supports_css_highlight_api,
		type Boundaryscanner_Mode,
	} from '$lib/boundary_scanner_range_builder.js';

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

	// Element reference and highlight manager
	let code_element: HTMLElement | undefined = $state();
	// Create manager eagerly to avoid checks
	const highlight_manager = new Highlight_Manager();
	// Track content changes to avoid unnecessary work
	let previous_content = '';
	let previous_lang = '';

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
	const update_highlight = () => {
		if (!code_element || !content || !use_ranges) return;

		// Check if language is supported
		if (!boundary_scanner_global.has_language(lang)) {
			// For unsupported languages, just set text content
			code_element.textContent = content;
			return;
		}

		// Clear existing highlights before updating
		highlight_manager.clear_element_ranges();

		// Ensure the element has the text content
		// Only update if content has changed to avoid DOM thrashing
		if (code_element.textContent !== content) {
			code_element.textContent = content;
		}

		// Scan and get tokens
		const tokens = boundary_scanner_global.scan(content, lang);

		// Highlight the tokens using the manager
		highlight_manager.highlight_from_tokens(code_element, tokens);
	};

	// Reactive highlighting using $effect for Range mode
	$effect(() => {
		if (use_ranges && code_element) {
			// Only update if content or language actually changed
			if (content !== previous_content || lang !== previous_lang) {
				previous_content = content;
				previous_lang = lang;
				update_highlight();
			}
		}

		// Cleanup function - always destroy the manager when component unmounts
		return () => {
			highlight_manager.destroy();
		};
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
