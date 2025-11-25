import type {SvelteHTMLElements} from 'svelte/elements';

import type {ImplementationName} from './benchmark_fixtures.js';

export type BenchmarkComponentProps = SvelteHTMLElements['code'] & {
	content: string;
	lang: string;
	mode?: 'html' | 'ranges' | 'auto';
};

export interface BenchmarkConfig {
	iterations: number;
	warmup_count: number;
	cooldown_ms: number;
	content_multiplier: number;
}

import type {Component} from 'svelte';

export interface BenchmarkedImplementation {
	name: string;
	component: Component<BenchmarkComponentProps>;
	mode: 'html' | 'ranges' | 'auto' | null;
}

export interface StabilityCheck {
	is_stable: boolean;
	lag: number;
	memory_pressure?: number;
	jitter: number;
}

export interface MeasurementData {
	times: Array<number>;
	stability_checks: Array<StabilityCheck>;
	timestamps: Array<number>;
}

export interface BenchmarkStats {
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

export interface BenchmarkResult extends BenchmarkStats {
	implementation: string;
	language: string;
}

export interface SummaryStats {
	avg_mean: number;
	avg_ops: number;
	avg_cv: number;
	languages: number;
	relative_speed?: number;
	improvement?: number;
}

// Benchmark harness controller interface
export interface BenchmarkHarnessController {
	run_iteration: (
		component: Component<BenchmarkComponentProps>,
		props: BenchmarkComponentProps,
	) => Promise<number>;
	cleanup: () => Promise<void>;
}

// Progress tracking callbacks
export interface ProgressCallbacks {
	on_progress?: (current: number, total: number) => void;
	on_test_start?: (test: string) => void;
	on_test_complete?: () => void;
	should_stop?: () => boolean;
}

// Benchmark runner state
export interface BenchmarkState {
	results: Array<BenchmarkResult>;
	warnings: Array<string>;
	summary: Record<ImplementationName, SummaryStats> | null;
}
