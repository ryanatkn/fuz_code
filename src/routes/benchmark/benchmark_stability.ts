// System stability monitoring functions

import type {Stability_Check} from './benchmark_types.js';

// Stability thresholds
const MIN_SAMPLES_FOR_JITTER = 5;
const RECENT_SAMPLE_COUNT = 10;
const MAX_ACCEPTABLE_LAG_MS = 5;
const MAX_MEMORY_PRESSURE = 0.9;
const MAX_JITTER_RATIO = 2;

// Cooldown times by reason (ms)
const COOLDOWN_TIMES: Record<string, number> = {
	high_lag: 200,
	memory_pressure: 500,
	high_jitter: 300,
	unknown: 300,
};

// Calculate jitter from recent timings
export const calculate_timing_jitter = (recent_timings: number[]): number => {
	if (recent_timings.length < MIN_SAMPLES_FOR_JITTER) return 0;

	const recent = recent_timings.slice(-RECENT_SAMPLE_COUNT);
	const mean = recent.reduce((a, b) => a + b, 0) / recent.length;
	const variance = recent.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / recent.length;
	const std_dev = Math.sqrt(variance);

	return std_dev / mean; // Coefficient of variation
};

// System stability check
export const check_system_stability = async (recent_timings: number[]): Promise<Stability_Check> => {
	// Check event loop lag
	const lag_start = performance.now();
	await new Promise((resolve) => setTimeout(resolve, 0));
	const lag = performance.now() - lag_start;

	// Check memory pressure if available
	let memory_pressure = 0;
	// @ts-ignore - performance.memory is Chrome-specific
	if (typeof performance !== 'undefined' && performance.memory) {
		// @ts-ignore
		memory_pressure = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
	}

	// Calculate recent timing jitter
	const jitter = calculate_timing_jitter(recent_timings);

	const is_stable = lag < MAX_ACCEPTABLE_LAG_MS && memory_pressure < MAX_MEMORY_PRESSURE && jitter < MAX_JITTER_RATIO;

	return {is_stable, lag, memory_pressure, jitter};
};

// Determine instability reason
export const get_instability_reason = (stability: Stability_Check): string => {
	if (stability.lag > MAX_ACCEPTABLE_LAG_MS) return 'high_lag';
	if (stability.jitter > MAX_JITTER_RATIO) return 'high_jitter';
	if (stability.memory_pressure && stability.memory_pressure > MAX_MEMORY_PRESSURE) return 'memory_pressure';
	return 'unknown';
};

// Extended cooldown for unstable system
export const extended_cooldown = async (reason: string): Promise<void> => {
	console.log(`System instability: ${reason}, waiting...`);
	await new Promise((resolve) => setTimeout(resolve, COOLDOWN_TIMES[reason] || COOLDOWN_TIMES.unknown));
};