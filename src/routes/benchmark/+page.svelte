<script lang="ts">
	import {Bench} from 'tinybench';

	import {domstyler_global} from '$lib/domstyler_global.js';
	import {rangestyler_global} from '$lib/rangestyler_global.js';
	import {samples} from '$lib/code_samples.js';

	// Benchmark state
	let running = $state(false);
	let results: Array<{
		name: string;
		current_ops: number;
		highlight_ops: number;
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
		const ts_samples = samples.filter((s) => s.lang === 'ts' || s.lang === 'js');

		for (const sample of ts_samples) {
			status = `Benchmarking: ${sample.name}`;

			const bench = new Bench({
				time: 2000, // 2 seconds per test
				warmupTime: 500,
				warmupIterations: 10,
			});

			// Test current implementation
			bench.add(`current:${sample.name}`, () => {
				const container = document.createElement('div');
				container.innerHTML = domstyler_global.stylize(sample.content, sample.lang);
			});

			// Test new highlight implementation
			const test_element = document.createElement('div');
			bench.add(`highlight:${sample.name}`, () => {
				rangestyler_global.highlight(test_element, sample.content, sample.lang);
			});

			// eslint-disable-next-line no-await-in-loop
			await bench.run();

			// Collect results
			const current_task = bench.tasks.find((t) => t.name.startsWith('current:'));
			const highlight_task = bench.tasks.find((t) => t.name.startsWith('highlight:'));

			if (current_task?.result && highlight_task?.result) {
				const current_ops = current_task.result.throughput.mean;
				const highlight_ops = highlight_task.result.throughput.mean;
				const improvement = (highlight_ops / current_ops - 1) * 100;

				results.push({
					name: sample.name,
					current_ops: Math.round(current_ops),
					highlight_ops: Math.round(highlight_ops),
					improvement,
					samples: current_task.result.latency.samples.length,
				});

				// Trigger reactivity
				results = results;
			}
		}

		// Calculate summary
		const avg_current = results.reduce((sum, r) => sum + r.current_ops, 0) / results.length;
		const avg_highlight = results.reduce((sum, r) => sum + r.highlight_ops, 0) / results.length;
		const avg_improvement = ((avg_highlight / avg_current - 1) * 100).toFixed(1);

		status = `✅ Complete! Average improvement: ${avg_improvement}%`;
		running = false;
	}
</script>

<div class="box width_md">
	<h1>CSS Custom Highlight API - Performance Benchmark</h1>

	<div class="panel mb_xl">
		<p>
			API Support:
			<strong class:color_b_5={rangestyler_global.supports_native}>
				{rangestyler_global.supports_native ? 'CSS Highlights' : 'HTML Fallback'}
			</strong>
		</p>
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
						<th>Current (ops/sec)</th>
						<th>Highlight (ops/sec)</th>
						<th>Change</th>
					</tr>
				</thead>
				<tbody>
					{#each results as result (result)}
						<tr>
							<td>{result.name}</td>
							<td>{result.current_ops.toLocaleString()}</td>
							<td>{result.highlight_ops.toLocaleString()}</td>
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
					Average Current: <strong>
						{Math.round(
							results.reduce((sum, r) => sum + r.current_ops, 0) / results.length,
						).toLocaleString()}
						ops/sec
					</strong>
				</p>
				<p>
					Average Highlight: <strong>
						{Math.round(
							results.reduce((sum, r) => sum + r.highlight_ops, 0) / results.length,
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
