<script lang="ts">
	import {tick} from 'svelte';
	import type {Component} from 'svelte';
	import type {Benchmark_Component_Props} from './benchmark_types.js';
	import Benchmark_Instance from './Benchmark_Instance.svelte';
	import {ensure_paint} from './benchmark_dom.js';

	// Constants
	const RENDER_TIMEOUT_MS = 10000; // 10 second timeout for render completion

	// State for the current benchmark iteration
	let current_component: Component<Benchmark_Component_Props> | null = $state(null);
	let current_props: Benchmark_Component_Props | null = $state(null);
	let render_resolver: (() => void) | null = null;
	let iteration_key = $state(0); // Force component recreation with #key

	// Handle render completion from instance
	const handle_render_complete = () => {
		if (render_resolver) {
			render_resolver();
			render_resolver = null;
		}
	};

	// Track active timeout to ensure cleanup
	let active_timeout_id: ReturnType<typeof setTimeout> | undefined;

	// Run a single benchmark iteration
	export const run_iteration = async (
		component: Component<Benchmark_Component_Props>,
		props: Benchmark_Component_Props,
	): Promise<number> => {
		// Cleanup any previous iteration first
		current_component = null;
		current_props = null;
		render_resolver = null; // Clear any leftover resolver

		// Clear any lingering timeout from previous iteration
		if (active_timeout_id) {
			clearTimeout(active_timeout_id);
			active_timeout_id = undefined;
		}

		await tick();

		// Brief delay to ensure content is painted before cleanup
		await ensure_paint();

		// Increment key to force component recreation
		iteration_key++;

		// Create promise for render completion with timeout
		const render_promise = new Promise<void>((resolve, reject) => {
			render_resolver = resolve;

			// Add timeout to prevent hanging
			active_timeout_id = setTimeout(() => {
				if (render_resolver) {
					console.error('[Harness] Render timeout after', RENDER_TIMEOUT_MS, 'ms');
					render_resolver = null;
					active_timeout_id = undefined;
					reject(new Error(`Render timeout after ${RENDER_TIMEOUT_MS}ms`));
				}
			}, RENDER_TIMEOUT_MS);
		});

		// Start timing AFTER promise setup, right before state change
		const start = performance.now();

		try {
			// Set new component and props (triggers render)
			current_component = component;
			current_props = props;

			// Wait for render to complete
			await render_promise;

			// Clear timeout on successful render
			if (active_timeout_id) {
				clearTimeout(active_timeout_id);
				active_timeout_id = undefined;
			}

			// Stop timing
			const end = performance.now();
			const elapsed = end - start;

			// Ensure paint completes before cleanup
			await ensure_paint();

			// Now cleanup for the next iteration
			current_component = null;
			current_props = null;
			render_resolver = null;

			return elapsed;
		} catch (error) {
			console.error('[Harness] Render failed:', error);
			// Clear timeout on error
			if (active_timeout_id) {
				clearTimeout(active_timeout_id);
				active_timeout_id = undefined;
			}
			// Cleanup on error
			current_component = null;
			current_props = null;
			render_resolver = null;
			throw error;
		}
	};

	// Cleanup between test suites
	export const cleanup = async () => {
		current_component = null;
		current_props = null;
		render_resolver = null;

		// Clear any active timeout
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

