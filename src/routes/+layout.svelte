<script lang="ts">
	import '@ryanatkn/moss/style.css';
	import '@ryanatkn/moss/theme.css';
	import '$lib/domstyler_theme.css';
	import '$lib/boundary_scanner_theme.css';
	import '$routes/moss.css';

	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import type {Snippet} from 'svelte';

	const {
		children,
	}: {
		children: Snippet;
	} = $props();
</script>

<svelte:head>
	<title>@ryanatkn/fuz_code</title>
</svelte:head>

<Themed>
	{@render children()}
</Themed>
