<script lang="ts">
	// TODO do syntax highlighting at compile-time in the normal case, and don't import these at runtime
	import Prism from 'prismjs';
	import 'prismjs/components/prism-typescript.js';
	import 'prism-svelte';

	/**
	 * Users are expected to import `@ryanatkn/fuz_code/prism.css`, like in the main `+layout.svelte`.
	 */

	export let content: string;

	export let pre_attrs: any = undefined;
	export let code_attrs: any = undefined;

	export let lang: string | null = 'svelte';

	export let inline = false;

	$: grammar = lang === null ? null : Prism.languages[lang];

	// TODO do this at compile time somehow
	$: highlighted = grammar === null ? null : content && Prism.highlight(content, grammar, lang!);
	$: markup = highlighted ?? content;

	// TODO add `CopyToClipboard`, maybe only when not inline?

	/* eslint-disable svelte/no-at-html-tags */
</script>

<pre class:inline {...pre_attrs}><code {...code_attrs}
		><slot {markup}
			>{#if highlighted !== null}{@html highlighted}{:else}{content}{/if}</slot
		></code
	></pre>

<style>
	pre {
		background-color: var(--fg_1);
		border-radius: var(--radius_xs);
		padding: var(--space_3xs) var(--space_xs);
	}
	code {
		background-color: unset;
		/* the default `code` padding displays incorrectly wrapping the highlighted code */
		padding: 0;
	}
</style>
