<script lang="ts">
	import {fmt} from './benchmark_stats.js';
	import type {Benchmark_Result, Summary_Stats} from './benchmark_types.js';

	const {
		results = [],
		summary = null,
		warnings = [],
	}: {
		results: Benchmark_Result[];
		summary: Record<string, Summary_Stats> | null;
		warnings: string[];
	} = $props();
</script>

{#if warnings.length > 0}
	<section class="panel p_md warning">
		<h3 class="mt_0">⚠️ Warnings</h3>
		<ul>
			{#each warnings as warning}
				<li>{warning}</li>
			{/each}
		</ul>
	</section>
{/if}

{#if summary}
	<section>
		<h2>Summary</h2>
		<div>
			{#each Object.entries(summary) as [impl, stats]}
				<div>
					<h3>{impl}</h3>
					<div>
						<strong>{fmt(stats.avg_mean)}ms</strong>
						<span>avg time</span>
					</div>
					<div>
						<strong>{fmt(stats.avg_ops, 0)}</strong>
						<span>ops/sec</span>
					</div>
					<div>
						<strong>{fmt(stats.avg_cv * 100, 1)}%</strong>
						<span>CV</span>
					</div>
					{#if impl !== 'syntax_html' && stats.improvement !== undefined}
						<div>
							<strong class:positive={stats.improvement > 0} class:negative={stats.improvement < 0}>
								{stats.improvement > 0 ? '+' : ''}{fmt(stats.improvement, 1)}%
							</strong>
							<span>vs baseline</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>
{/if}

{#if results.length > 0}
	<section>
		<h2>Results</h2>
		<table>
			<thead>
				<tr>
					<th>Language</th>
					<th>Implementation</th>
					<th>Mean (ms)</th>
					<th>Median (ms)</th>
					<th>Std Dev</th>
					<th>CV</th>
					<th>P95 (ms)</th>
					<th>Ops/sec</th>
					<th>Outliers</th>
					<th>Failed</th>
					<th>Stability</th>
				</tr>
			</thead>
			<tbody>
				{#each results as result}
					<tr>
						<td>{result.language}</td>
						<td>{result.implementation}</td>
						<td>{fmt(result.mean)}</td>
						<td>{fmt(result.median)}</td>
						<td>{fmt(result.std_dev)}</td>
						<td class:warning={result.cv > 0.15}>{fmt(result.cv * 100, 1)}%</td>
						<td>{fmt(result.p95)}</td>
						<td>{fmt(result.ops_per_second, 0)}</td>
						<td class:warning={result.outlier_ratio > 0.1}>
							{result.outliers}/{result.raw_sample_size}
						</td>
						<td class:warning={result.failed_iterations > 0}>
							{result.failed_iterations}
						</td>
						<td class:good={result.stability_ratio > 0.9}>
							{fmt(result.stability_ratio * 100, 0)}%
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div>
			<h3>Legend</h3>
			<ul>
				<li>
					<strong>CV</strong>: Coefficient of Variation (std_dev/mean) - lower is better, &lt;15% is
					good
				</li>
				<li><strong>P95</strong>: 95th percentile - 95% of measurements were faster than this</li>
				<li><strong>Ops/sec</strong>: Operations per second (throughput)</li>
				<li><strong>Per Item</strong>: Time per individual component in batch</li>
				<li><strong>Stability</strong>: Percentage of iterations with stable system metrics</li>
			</ul>
		</div>
	</section>
{/if}
