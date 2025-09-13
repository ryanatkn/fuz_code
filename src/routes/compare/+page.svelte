<script lang="ts">
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import Domstyler_Code from '$lib/Domstyler_Code.svelte';
	import Rangestyler_Code from '$lib/Rangestyler_Code.svelte';
	import {samples} from '$lib/code_samples.js';
	import Footer from '$routes/Footer.svelte';
</script>

<main class="box w_100 py_xl5">
	<Breadcrumb>🎨</Breadcrumb>
	{#each samples as sample (sample.name)}
		<div class="display_flex gap_sm py_xl5">
			<div>
				<h3>domstyler</h3>
				<Domstyler_Code content={sample.content} lang={sample.lang} />
			</div>
			<div>
				<h3>rangestyler</h3>
				<Rangestyler_Code content={sample.content} lang={sample.lang} />
			</div>
		</div>
		<hr />
	{/each}
	<Footer />
</main>
