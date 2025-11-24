<script lang="ts">
	import '@ryanatkn/moss/style.css';
	import '@ryanatkn/moss/theme.css';
	import '$lib/theme.css';
	import '$routes/moss.css';
	import '$routes/style.css';

	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import {Pkg, pkg_context} from '@ryanatkn/fuz/pkg.svelte.js';
	import type {Snippet} from 'svelte';

	import {package_json, src_json} from '$routes/package.js';

	const {
		children,
	}: {
		children: Snippet;
	} = $props();

	pkg_context.set(new Pkg(package_json, src_json));
</script>

<svelte:head>
	<title>@ryanatkn/fuz_code</title>
</svelte:head>

<Themed>
	{@render children()}
</Themed>
