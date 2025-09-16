<script lang="ts">
	import {onMount} from 'svelte';
	import type {Component} from 'svelte';
	import type {Benchmark_Component_Props} from './benchmark_types.js';
	import {ensure_paint} from './benchmark_dom.js';

	interface Props {
		Benchmarked_Component: Component<Benchmark_Component_Props> | null;
		props: Benchmark_Component_Props | null;
		on_render_complete?: () => void;
	}

	let {Benchmarked_Component = null, props = null, on_render_complete = () => {}}: Props = $props();

	// Signal completion after mount+paint
	onMount(async () => {
		await ensure_paint();
		on_render_complete();
	});
</script>

{#if Benchmarked_Component && props}
	<Benchmarked_Component {...props} />
{/if}
