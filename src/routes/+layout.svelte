<script lang="ts">
	import '@ryanatkn/moss/style.css';
	import '@ryanatkn/moss/theme.css';
	import '$lib/theme.css';
	import '$routes/moss.css';

	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import type {Snippet} from 'svelte';

	interface Props {
		children: Snippet;
	}

	const {children}: Props = $props();
</script>

<svelte:head>
	<title>@ryanatkn/fuz_code</title>
</svelte:head>

<Themed>
	{@render children()}
</Themed>
