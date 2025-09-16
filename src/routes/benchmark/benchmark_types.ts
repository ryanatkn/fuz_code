// Type definitions for benchmarking system

export interface Benchmark_Component_Props {
	content: string;
	lang: string;
	mode?: 'html' | 'ranges' | 'auto';
}

export interface Benchmark_Config {
	iterations: number;
	warmup_count: number;
	cooldown_ms: number;
	content_multiplier: number;
}

import type {Component} from 'svelte';

export interface Benchmarked_Implementation {
	name: string;
	component: Component<Benchmark_Component_Props>;
	mode: 'html' | 'ranges' | 'auto' | null;
}

export interface Stability_Check {
	is_stable: boolean;
	lag: number;
	memory_pressure?: number;
	jitter: number;
}

export interface Measurement_Data {
	times: number[];
	stability_checks: Stability_Check[];
	timestamps: number[];
}

export interface Benchmark_Stats {
	mean: number;
	median: number;
	std_dev: number;
	min: number;
	max: number;
	p95: number;
	p99: number;
	cv: number;
	confidence_interval: [number, number];
	outliers: number;
	outlier_ratio: number;
	sample_size: number;
	raw_sample_size: number;
	stability_ratio: number;
	unstable_iterations: number;
	ops_per_second: number;
	failed_iterations: number;
}

export interface Benchmark_Result extends Benchmark_Stats {
	implementation: string;
	language: string;
}

export interface Summary_Stats {
	avg_mean: number;
	avg_ops: number;
	avg_cv: number;
	languages: number;
	relative_speed?: number;
	improvement?: number;
}

// Benchmark harness controller interface
export interface Benchmark_Harness_Controller {
	run_iteration: (component: Component<Benchmark_Component_Props>, props: Benchmark_Component_Props) => Promise<number>;
	cleanup: () => Promise<void>;
}

// Progress tracking callbacks
export interface Progress_Callbacks {
	on_progress?: (current: number, total: number) => void;
	on_test_start?: (test: string) => void;
	on_test_complete?: () => void;
	should_stop?: () => boolean;
}

// Benchmark runner state
export interface Benchmark_State {
	results: Benchmark_Result[];
	warnings: string[];
	summary: Record<string, Summary_Stats> | null;
}