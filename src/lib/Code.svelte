<script lang="ts">
	// TODO ideally we do syntax highlighting at compile-time in the normal case, and don't even import this runtime
	import Prism from 'prismjs';
	import 'prismjs/components/prism-typescript.js';
	import 'prism-svelte';

	/**
	 * Users are expected to import `@fuz.dev/fuz/prism.css`, like in the main `+layout.svelte`.
	 */

	// TODO move this
	type PrismLang =
		| 'plain'
		| 'plaintext'
		| 'text'
		| 'txt'
		| 'DFS'
		| 'markup'
		| 'html'
		| 'mathml'
		| 'svg'
		| 'xml'
		| 'ssml'
		| 'atom'
		| 'rss'
		| 'css'
		| 'clike'
		| 'js'
		| 'ts'
		| 'svelte';

	export let content: string;

	export let pre_attrs: any = undefined;
	export let code_attrs: any = undefined;

	export let lang: PrismLang | null = 'svelte';

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
		border-radius: var(--border_radius_xs);
		padding: var(--spacing_xs3) var(--spacing_xs);
	}
	code {
		background-color: unset;
		/* the default `code` padding displays incorrectly wrapping the highlighted code */
		padding: 0;
	}
</style>
