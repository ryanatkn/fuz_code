<script lang="ts">
	import Package_Summary from '@ryanatkn/fuz/Package_Summary.svelte';
	import Docs_Footer from '@ryanatkn/fuz/Docs_Footer.svelte';
	import {parse_package_meta} from '@ryanatkn/gro/package_meta.js';
	import {base} from '$app/paths';

	import Code_Tome from '$routes/Code_Tome.svelte';
	import {package_json, src_json} from '$routes/package.js';

	// import '$lib/benchmark.js';

	const pkg = parse_package_meta(package_json, src_json);
</script>

<main class="box w_100">
	<div class="box width_md">
		<section>
			<Package_Summary {pkg} />
		</section>
		<section>
			<aside class="width_sm">
				⚠️ Docs are a work in progress. This page has usage examples with the optional Svelte
				component, and the <a href="https://github.com/ryanatkn/fuz_code">readme</a> has TypeScript usage
				docs.
			</aside>
		</section>
		<section class="panel">
			<div class="bg shadow_sm radius_xs">
				<Code_Tome />
			</div>
		</section>
		<section class="box gap_xl3 size_xl2">
			<a href="{base}/samples" class="chip">samples</a>
			<a href="{base}/about" class="chip">about</a>
		</section>
		<section>
			<Docs_Footer {pkg} root_url="https://www.fuz.dev/" />
		</section>
	</div>
</main>

<style>
	main {
		/* TODO hacky */
		margin-bottom: var(--space_xl5);
		padding: var(--space_xl3) 0;
	}
	/* section {
		margin-bottom: var(--space_xl5);
		display: flex;
		flex-direction: column;
		align-items: center;
	} */
</style>
