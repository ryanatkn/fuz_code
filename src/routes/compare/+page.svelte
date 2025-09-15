<script lang="ts">
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import Domstyler_Code from '$lib/Domstyler_Code.svelte';
	import Rangestyler_Code from '$lib/Rangestyler_Code.svelte';
	import Boundaryscanner_Code from '$lib/Boundaryscanner_Code.svelte';
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
					<h3>domstyler</h3>
					<Domstyler_Code content={sample.content} lang={sample.lang} />
				</div>
				<div>
					<h3>rangestyler (ranges)</h3>
					<Rangestyler_Code content={sample.content} lang={sample.lang} mode="ranges" />
				</div>
				<div>
					<h3>rangestyler (html)</h3>
					<Rangestyler_Code content={sample.content} lang={sample.lang} mode="html" />
				</div>
				<div>
					<h3>boundary scanner (ranges)</h3>
					<Boundaryscanner_Code content={sample.content} lang={sample.lang} mode="ranges" />
				</div>
				<div>
					<h3>boundary scanner (html)</h3>
					<Boundaryscanner_Code content={sample.content} lang={sample.lang} mode="html" />
				</div>
			</div>
		</section>
		<hr />
	{/each}
	<Footer />
</main>
