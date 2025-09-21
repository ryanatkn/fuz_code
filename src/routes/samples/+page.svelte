<script lang="ts">
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import Code from '$lib/Code.svelte';
	import {samples} from '$lib/samples/all.js';
	import Footer from '$routes/Footer.svelte';
</script>

<main class="box w_100 py_xl5">
	<Breadcrumb>🎨</Breadcrumb>
	{#each Object.values(samples) as sample (sample.name)}
		<section>
			<h2 class="box panel p_md mb_0">{sample.lang}</h2>
			<div class="display_flex justify_content_center flex_wrap gap_sm py_xl5">
				<div>
					<h3>HTML</h3>
					<Code content={sample.content} lang={sample.lang} mode="html" />
				</div>
				<div>
					<h3>Highlight API</h3>
					<Code content={sample.content} lang={sample.lang} mode="ranges" />
				</div>
			</div>
		</section>
		<hr />
	{/each}
	<Footer />
</main>
