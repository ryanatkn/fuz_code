<script lang="ts">
	import {rangestyler_global} from '$lib/rangestyler_global.js';
	import type {Rangestyler} from '$lib/rangestyler.js';
	import type {Rangestyler_Mode} from '$lib/rangestyler_types.js';

	const {
		content,
		lang = 'ts',
		pre_attrs,
		code_attrs,
		rangestyler = rangestyler_global,
		mode = 'auto',
	}: {
		content: string;
		lang?: string;
		pre_attrs?: any;
		code_attrs?: any;
		rangestyler?: Rangestyler;
		mode?: Rangestyler_Mode;
	} = $props();

	// Element reference
	let code_element: HTMLElement | undefined = $state();

	// Update highlights
	function update_highlight() {
		if (!code_element || !content) return;
		rangestyler.highlight(code_element, content, lang, mode);
	}

	// Reactive highlighting using $effect
	$effect(() => {
		if (code_element && content) {
			update_highlight();
		}

		// Cleanup function
		return () => {
			if (code_element) {
				rangestyler.clear_highlights(code_element);
			}
		};
	});
</script>

<pre {...pre_attrs} class:code={true} data-lang={lang}><code
		{...code_attrs}
		bind:this={code_element}></code></pre>

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
