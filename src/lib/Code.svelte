<script lang="ts">
	// TODO do syntax highlighting at compile-time in the normal case, and don't import these at runtime
	import Prism from 'prismjs';
	import 'prismjs/components/prism-typescript.js';
	import 'prism-svelte';
	import type {Snippet} from 'svelte';

	/**
	 * Users are expected to import `@ryanatkn/fuz_code/prism.css`, like in the main `+layout.svelte`.
	 */

	interface Props {
		content: string;
		pre_attrs?: any;
		code_attrs?: any;
		lang?: string | null;
		inline?: boolean;
		children?: Snippet<[markup: string]>;
	}

	const {
		content,
		pre_attrs,
		code_attrs,
		lang = 'svelte',
		inline = false,
		children,
	}: Props = $props();

	const grammar = $derived(lang === null ? null : Prism.languages[lang]);

	// TODO do this at compile time somehow
	const highlighted = $derived(
		grammar === null ? null : content && Prism.highlight(content, grammar, lang!),
	);
	const markup = $derived(highlighted ?? content);

	// TODO add `CopyToClipboard`, maybe only when not inline?

	/* eslint-disable svelte/no-at-html-tags */
</script>

<pre class:inline {...pre_attrs}><code {...code_attrs}
		>{#if children}{@render children(
				markup,
			)}{:else if highlighted !== null}{@html highlighted}{:else}{content}{/if}</code
	></pre>

<style>
	pre {
		background-color: var(--fg_1);
		border-radius: var(--radius_xs);
		padding: var(--space_xs3) var(--space_xs);
	}
	code {
		background-color: unset;
		/* the default `code` padding displays incorrectly wrapping the highlighted code */
		padding: 0;
	}
	.inline {
		display: inline-block;
		vertical-align: bottom;
	}
</style>
