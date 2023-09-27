<script lang="ts">
	import '@fuz.dev/fuz/style.css';
	import '@fuz.dev/fuz/theme.css';
	import '$lib/prism.css';

	import Themed from '@fuz.dev/fuz/Themed.svelte';
</script>

<svelte:head>
	<title>@fuz.dev/fuz-code</title>
</svelte:head>

<Themed>
	<slot />
</Themed>
