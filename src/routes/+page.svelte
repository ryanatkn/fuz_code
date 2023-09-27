<script lang="ts">
	import Tome from '$routes/LibraryTome.svelte';
	import PackageSummary from '$routes/PackageSummary.svelte';
</script>

<main class="width_md">
	<header class="box">
		<div class="prose">
			<h2>@fuz.dev/fuz_code</h2>
		</div>
		<PackageSummary />
	</header>
	<section>
		<Tome />
	</section>
	<footer class="box">
		<PackageSummary />
	</footer>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
	section,
	header,
	footer {
		margin-bottom: var(--spacing_xl5);
	}
</style>
