<script lang="ts">
	import Package_Detail from '@ryanatkn/fuz/Package_Detail.svelte';
	import {pkg_context} from '@ryanatkn/fuz/pkg.svelte.js';
	import Docs_Footer from '@ryanatkn/fuz/Docs_Footer.svelte';
	import Ecosystem_Links_Panel from '@ryanatkn/fuz/Ecosystem_Links_Panel.svelte';
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	const pkg = pkg_context.get();
</script>

<main class="width_upto_md">
	<section class="box">
		<header>
			<h1 class="mt_xl5">{pkg.repo_name}</h1>
		</header>
		<Breadcrumb>{pkg.package_json.glyph}</Breadcrumb>
	</section>
	<section class="box width_100 mb_lg">
		<div class="panel p_md width_upto_md">
			<Package_Detail {pkg} />
		</div>
	</section>
	<Ecosystem_Links_Panel />
	<section class="box">
		<Docs_Footer {pkg}>
			<div class="mb_lg">
				<Breadcrumb>{pkg.package_json.glyph}</Breadcrumb>
			</div>
		</Docs_Footer>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
	h1 {
		display: flex;
		align-items: baseline;
		text-align: center;
	}
	section {
		margin-bottom: var(--space_xl5);
	}
</style>
