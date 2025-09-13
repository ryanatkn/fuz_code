<script lang="ts">
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import Domstyler_Code from '$lib/Domstyler_Code.svelte';
	import Footer from '$routes/Footer.svelte';
	import {samples} from '$lib/code_samples.js';
</script>

<main class="box w_100">
	<Breadcrumb>🎨</Breadcrumb>
	<section class="width_md mt_xl7">
		<h1>Domstyler</h1>
		<p>
			The <code>Domstyler</code> is a fork of <a href="https://github.com/PrismJS/prism">Prism</a>
			by <a href="https://lea.verou.me/">Lea Verou</a>.
		</p>
	</section>
	<section class="display_flex flex_wrap justify_content_space_around gap_sm">
		{#each samples as { content, lang } (lang)}
			<div>
				<h2>{lang}</h2>
				<pre><Domstyler_Code {content} {lang} /></pre>
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
