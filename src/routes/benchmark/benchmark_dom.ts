import {tick} from 'svelte';

// Ensure browser paint has completed
export const ensure_paint = (): Promise<void> => {
	return new Promise((resolve) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				resolve();
			});
		});
	});
};

// DOM settlement utilities
export const await_settlement = async (): Promise<void> => {
	// Wait for Svelte to finish updates
	await tick();

	// Double RAF for paint completion
	await ensure_paint();

	// Microtask flush
	await Promise.resolve();
};

// Inter-test cooldown with randomization
export const inter_test_cooldown = async (cooldown_ms: number): Promise<void> => {
	// Randomized cooldown to avoid rhythmic patterns
	const actual_cooldown = cooldown_ms + Math.random() * cooldown_ms;
	await new Promise((resolve) => setTimeout(resolve, actual_cooldown));

	await ensure_paint();
	await ensure_paint();
};
