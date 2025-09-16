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

	let container_el: HTMLDivElement;

	// Signal completion after mount+paint
	onMount(async () => {
		// TODO any tweaks to this, including order?
		// Force layout recalculation for all modes to ensure consistent timing,
		// and use them to ensure they can't be optimized.
		const rect = container_el.getBoundingClientRect();
		const height = container_el.offsetHeight;
		if (rect.width <= 0 || height <= 0) {
			console.error('Unexpected negative dimensions');
		}

		await ensure_paint();

		on_render_complete();
	});
</script>

<div bind:this={container_el}>
	{#if Benchmarked_Component && props}
		<Benchmarked_Component {...props} />
	{/if}
</div>
