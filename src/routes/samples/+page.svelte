<script lang="ts">
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import Code from '$lib/Code.svelte';
	import Code_Highlight from '$lib/Code_Highlight.svelte';
	import {samples} from '$lib/samples/all.js';
	import Footer from '$routes/Footer.svelte';
</script>

<main class="box width_100 py_xl5">
	<Breadcrumb>🎨</Breadcrumb>
	<h1 class="text_align_center">Syntax Highlighting Samples</h1>

	<section class="box mb_xl5">
		<h2 class="text_align_center">Standard (HTML Mode)</h2>
		{#each Object.values(samples) as sample (sample.name)}
			<div class="mb_xl3">
				<h3 class="box panel p_md mb_xs">{sample.lang}</h3>
				<Code content={sample.content} lang={sample.lang} />
			</div>
		{/each}
	</section>

	<hr class="my_xl5" />

	<section class="box">
		<h2 class="text_align_center">Experimental: CSS Custom Highlight API</h2>
		<aside class="box panel p_md mb_xl3 width_md">
			⚠️ <strong>Experimental:</strong> The comparison below shows both HTML mode and CSS Custom
			Highlight API mode. The Highlight API has limited browser support and is not recommended for
			production use. The standard <code>Code.svelte</code> component (shown above) uses HTML generation
			and is recommended for all use cases.
		</aside>
		{#each Object.values(samples) as sample (sample.name)}
			<div class="mb_xl3">
				<h3 class="box panel p_md mb_0">{sample.lang}</h3>
				<div class="display_flex justify_content_center flex_wrap_wrap gap_sm py_xl5">
					<div>
						<h4>{sample.lang} HTML mode</h4>
						<Code_Highlight content={sample.content} lang={sample.lang} mode="html" />
					</div>
					<div>
						<h4>{sample.lang} ranges mode</h4>
						<Code_Highlight content={sample.content} lang={sample.lang} mode="ranges" />
					</div>
				</div>
			</div>
			<hr />
		{/each}
	</section>

	<Footer />
</main>
