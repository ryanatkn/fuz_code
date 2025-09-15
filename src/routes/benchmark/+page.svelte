<script lang="ts">
	import {Bench} from 'tinybench';

	import {domstyler_global} from '$lib/domstyler_global.js';
	import {boundary_scanner_global} from '$lib/boundary_scanner_global.js';
	import {generate_html_from_tokens} from '$lib/boundary_scanner_html_generator.js';
	import {samples as all_samples} from '$lib/samples/all.js';

	// Benchmark state
	let running = $state(false);
	let results: Array<{
		name: string;
		domstyler_ops: number;
		boundary_scanner_ops: number;
		improvement: number;
		samples: number;
	}> = $state.raw([]);
	let status = $state('');

	// Run benchmarks
	async function run_benchmarks() {
		if (running) return;

		running = true;
		results = [];
		status = 'Running benchmarks...';

		// Filter to TS/JS samples for comparison
		const samples = Object.values(all_samples);
		const ts_samples = samples.filter((s) => s.lang === 'ts' || s.lang === 'js');

		for (const sample of ts_samples) {
			status = `Benchmarking: ${sample.name}`;

			const bench = new Bench({
				time: 2000, // 2 seconds per test
				warmupTime: 500,
				warmupIterations: 10,
			});

			// Test domstyler implementation
			bench.add(`domstyler:${sample.name}`, () => {
				const container = document.createElement('div');
				container.innerHTML = domstyler_global.stylize(sample.content, sample.lang);
			});

			// Test boundary scanner implementation
			bench.add(`boundary:${sample.name}`, () => {
				if (boundary_scanner_global.has_language(sample.lang)) {
					const tokens = boundary_scanner_global.scan(sample.content, sample.lang);
					const html = generate_html_from_tokens(sample.content, tokens);
					html; // TODO what's the right design?
				} else {
					// Fallback to domstyler for unsupported languages
					const container = document.createElement('div');
					container.innerHTML = domstyler_global.stylize(sample.content, sample.lang);
				}
			});

			// eslint-disable-next-line no-await-in-loop
			await bench.run();

			// Collect results
			const domstyler_task = bench.tasks.find((t) => t.name.startsWith('domstyler:'));
			const boundary_task = bench.tasks.find((t) => t.name.startsWith('boundary:'));

			if (domstyler_task?.result && boundary_task?.result) {
				const domstyler_ops = domstyler_task.result.throughput.mean;
				const boundary_scanner_ops = boundary_task.result.throughput.mean;
				const improvement = (boundary_scanner_ops / domstyler_ops - 1) * 100;

				results.push({
					name: sample.name,
					domstyler_ops: Math.round(domstyler_ops),
					boundary_scanner_ops: Math.round(boundary_scanner_ops),
					improvement,
					samples: domstyler_task.result.latency.samples.length,
				});

				// Trigger reactivity
				results = results;
			}
		}

		// Calculate summary
		const avg_domstyler = results.reduce((sum, r) => sum + r.domstyler_ops, 0) / results.length;
		const avg_boundary =
			results.reduce((sum, r) => sum + r.boundary_scanner_ops, 0) / results.length;
		const avg_improvement = ((avg_boundary / avg_domstyler - 1) * 100).toFixed(1);

		status = `✅ Complete! Average improvement: ${avg_improvement}%`;
		running = false;
	}
</script>

<div class="box width_md">
	<h1>Syntax Highlighting - Performance Benchmark</h1>

	<div class="panel mb_xl">
		<button type="button" onclick={run_benchmarks} disabled={running}>
			{running ? 'Running...' : 'Run Benchmarks'}
		</button>
		{#if status}
			<p class="mt_md">{status}</p>
		{/if}
	</div>

	{#if results.length > 0}
		<section>
			<h2>Results</h2>
			<table class="w_100">
				<thead>
					<tr>
						<th>Sample</th>
						<th>Domstyler (ops/sec)</th>
						<th>Boundary Scanner (ops/sec)</th>
						<th>Change</th>
					</tr>
				</thead>
				<tbody>
					{#each results as result (result)}
						<tr>
							<td>{result.name}</td>
							<td>{result.domstyler_ops.toLocaleString()}</td>
							<td>{result.boundary_scanner_ops.toLocaleString()}</td>
							<td class:color_b_5={result.improvement > 0} class:color_a_5={result.improvement < 0}>
								{result.improvement > 0 ? '+' : ''}{result.improvement.toFixed(1)}%
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div class="panel mt_xl">
				<h3>Summary</h3>
				<p>
					Average Domstyler: <strong>
						{Math.round(
							results.reduce((sum, r) => sum + r.domstyler_ops, 0) / results.length,
						).toLocaleString()}
						ops/sec
					</strong>
				</p>
				<p>
					Average Boundary Scanner: <strong>
						{Math.round(
							results.reduce((sum, r) => sum + r.boundary_scanner_ops, 0) / results.length,
						).toLocaleString()}
						ops/sec
					</strong>
				</p>
			</div>
		</section>
	{/if}
</div>

<style>
	table {
		border-collapse: collapse;
	}

	th,
	td {
		padding: var(--space_sm);
		text-align: left;
		border-bottom: 1px solid var(--border_color);
	}

	th {
		background: var(--fg_1);
		font-weight: bold;
	}
</style>
