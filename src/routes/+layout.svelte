<script lang="ts">
	import '@ryanatkn/moss/style.css';
	import '@ryanatkn/moss/theme.css';
	import '$lib/prism.css';

	import Themed from '@ryanatkn/fuz/Themed.svelte';
</script>

<svelte:head>
	<title>@ryanatkn/fuz_code</title>
</svelte:head>

<Themed>
	<slot />
</Themed>
