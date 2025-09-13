#!/usr/bin/env node
import {run_and_print_benchmark} from './benchmark.js';

const filter = process.argv[2];

run_and_print_benchmark(filter)
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error('Benchmark failed:', error);
		process.exit(1);
	});
