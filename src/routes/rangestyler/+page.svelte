<script lang="ts">
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import Rangestyler_Code from '$lib/Rangestyler_Code.svelte';
	import Footer from '$routes/Footer.svelte';
	import {samples} from '$lib/code_samples.js';
</script>

<main class="box w_100">
	<Breadcrumb>🎨</Breadcrumb>
	<section class="width_md mt_xl7">
		<h1>Rangestyler</h1>
		<p>
			The <code>Rangestyler</code> uses the CSS custom highlight API (<a
				href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_custom_highlight_API">MDN</a
			>). Instead of generating DOM elements like spans to style text, it uses
			<a href="https://developer.mozilla.org/en-US/docs/Web/API/Range">Range</a>
			and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Highlight">Highlight</a>.
		</p>
	</section>
	<section class="display_flex flex_wrap justify_content_space_around gap_sm">
		{#each samples as sample (sample.name)}
			<div>
				<h2 class="display_flex align_items_center gap_sm">
					<span>{sample.name}</span> <small><code>'{sample.lang}'</code></small>
				</h2>
				<pre><Rangestyler_Code content={sample.content} lang={sample.lang} /></pre>
			</div>
		{/each}
	</section>
	<Footer />
</main>

<style>
	main {
		/* TODO hacky */
		margin-bottom: var(--space_xl5);
		padding: var(--space_xl3) 0;
	}
</style>
