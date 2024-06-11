<script lang="ts">
	import Package_Summary from '@ryanatkn/fuz/Package_Summary.svelte';
	import Library_Footer from '@ryanatkn/fuz/Library_Footer.svelte';
	import {parse_package_meta} from '@ryanatkn/gro/package_meta.js';
	import {base} from '$app/paths';

	import Code_Tome from '$routes/Code_Tome.svelte';
	import {package_json, src_json} from '$routes/package.js';

	const pkg = parse_package_meta(package_json.homepage, package_json, src_json);
</script>

<main class="box w_100">
	<div class="box width_md">
		<section>
			<Package_Summary {pkg} />
		</section>
		<section>
			<Code_Tome />
		</section>
		<section class="box">
			<a href="{base}/about" class="chip">about</a>
		</section>
		<section>
			<Library_Footer {pkg} root_url="https://www.fuz.dev/" />
		</section>
	</div>
</main>

<style>
	main {
		/* TODO hacky */
		margin-bottom: var(--space_xl5);
		padding: var(--space_xl3) 0;
	}
	section {
		margin-bottom: var(--space_xl5);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
