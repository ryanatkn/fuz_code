<script lang="ts">
	import Package_Summary from '@ryanatkn/fuz/Package_Summary.svelte';
	import Docs_Footer from '@ryanatkn/fuz/Docs_Footer.svelte';
	import Card from '@ryanatkn/fuz/Card.svelte';
	import {pkg_context} from '@ryanatkn/fuz/pkg.svelte.js';
	import {resolve} from '$app/paths';

	import Code_Tome from '$routes/Code_Tome.svelte';

	// import '$lib/benchmark.js';

	const pkg = pkg_context.get();
</script>

<main class="box width_100">
	<div class="width_upto_md">
		<section class="box">
			<Package_Summary {pkg} />
		</section>
		<section class="box">
			<Card href={resolve('/docs')}>docs{#snippet icon()}{pkg.package_json.glyph}{/snippet}</Card>
		</section>
		<section class="box gap_xl3 font_size_xl2">
			<div class="panel box p_lg gap_sm">
				<!-- TODO large variants of the chip? using `--font_size`? -->
				<a href={resolve('/samples')} class="chip px_xl py_sm">samples</a>
				<a href={resolve('/benchmark')} class="chip px_xl py_sm">benchmark</a>
				<a href={resolve('/about')} class="chip px_xl py_sm">about</a>
			</div>
		</section>
		<section class="panel">
			<div class="bg shadow_sm border_radius_xs p_xl2">
				<Code_Tome />
			</div>
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
