<script lang="ts">
	import {onMount} from 'svelte';
	import type {Component} from 'svelte';
	import type {Benchmark_Component_Props} from './benchmark_types.js';

	interface Props {
		Benchmarked_Component: Component<Benchmark_Component_Props> | null;
		props: Benchmark_Component_Props | null;
		on_render_complete?: () => void;
	}

	let {Benchmarked_Component = null, props = null, on_render_complete = () => {}}: Props = $props();

	// Signal completion after mount
	onMount(() => {
		// TODO what's the most robust way to do this? likely flawed
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				on_render_complete();
			});
		});
	});
</script>

{#if Benchmarked_Component && props}
	<Benchmarked_Component {...props} />
{/if}
