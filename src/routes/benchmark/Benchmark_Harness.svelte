<script lang="ts">
	import {tick} from 'svelte';
	import type {Component} from 'svelte';
	import type {Benchmark_Component_Props} from './benchmark_types.js';
	import Benchmark_Instance from './Benchmark_Instance.svelte';
	import {ensure_paint} from './benchmark_dom.js';

	const RENDER_TIMEOUT_MS = 10000;

	let current_component: Component<Benchmark_Component_Props> | null = $state(null);
	let current_props: Benchmark_Component_Props | null = $state(null);
	let render_resolver: (() => void) | null = null;
	let iteration_key = $state(0);
	const handle_render_complete = () => {
		if (render_resolver) {
			render_resolver();
			render_resolver = null;
		}
	};

	let active_timeout_id: ReturnType<typeof setTimeout> | undefined;
	export const run_iteration = async (
		component: Component<Benchmark_Component_Props>,
		props: Benchmark_Component_Props,
	): Promise<number> => {
		iteration_key++;

		const render_promise = new Promise<void>((resolve, reject) => {
			render_resolver = resolve;

			active_timeout_id = setTimeout(() => {
				if (render_resolver) {
					console.error('[Harness] Render timeout after', RENDER_TIMEOUT_MS, 'ms');
					render_resolver = null;
					active_timeout_id = undefined;
					reject(new Error(`Render timeout after ${RENDER_TIMEOUT_MS}ms`));
				}
			}, RENDER_TIMEOUT_MS);
		});

		const start = performance.now();

		try {
			current_component = component;
			current_props = props;

			await render_promise;

			if (active_timeout_id) {
				clearTimeout(active_timeout_id);
				active_timeout_id = undefined;
			}

			const end = performance.now();
			const elapsed = end - start;

			await ensure_paint();

			return elapsed;
		} catch (error) {
			console.error('[Harness] Render failed:', error);
			throw error;
		} finally {
			await cleanup();
		}
	};
	export const cleanup = async () => {
		current_component = null;
		current_props = null;
		render_resolver = null;

		if (active_timeout_id) {
			clearTimeout(active_timeout_id);
			active_timeout_id = undefined;
		}

		await tick();
	};
</script>

{#if current_component && current_props}
	{#key iteration_key}
		<Benchmark_Instance
			Benchmarked_Component={current_component}
			props={current_props}
			on_render_complete={handle_render_complete}
		/>
	{/key}
{/if}
