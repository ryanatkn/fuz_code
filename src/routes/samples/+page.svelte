<script lang="ts">
	import '$lib/theme_highlight.css';

	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import Code from '$lib/Code.svelte';
	import Code_Highlight from '$lib/Code_Highlight.svelte';
	import {samples} from '$lib/samples/all.js';
	import Footer from '$routes/Footer.svelte';
</script>

<main class="box width_100 py_xl5">
	<Breadcrumb>🎨</Breadcrumb>

	<section class="box mb_xl5">
		<h2 class="text_align_center">HTML rendering (default)</h2>
		<aside
			class="panel p_md mb_xl3 width_upto_md
		"
		>
			<p>
				These samples use the normal <code>Code</code> component, which renders using HTML. See
				below for the experimental <code>Code_Highlight</code> that uses the Highlight API.
			</p>
		</aside>
		{#each Object.values(samples) as sample (sample.name)}
			<div class="mb_xl3">
				<h3 class="box panel p_md mb_xs">{sample.lang}</h3>
				<Code content={sample.content} lang={sample.lang} />
			</div>
		{/each}
	</section>

	<hr class="my_xl5" />

	<section class="box">
		<h2 class="text_align_center">CSS Custom Highlight API (experimental)</h2>
		<aside
			class="panel p_md mb_xl3 width_upto_md
		"
		>
			<p>
				⚠️ <strong>Experimental:</strong> the comparison below uses
				<code>Code_Highlight.svelte</code> instead of <code>Code.svelte</code>
				with both HTML mode and
				<a href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API"
					>CSS Custom Highlight API</a
				>.
			</p>
			<p>
				A limitation: layout-affecting styles like font weight do not work, even for monospaced
				fonts:
				<a href="https://github.com/w3c/csswg-drafts/issues/8355"
					>github.com/w3c/csswg-drafts/issues/8355</a
				>
			</p>
			<p>
				The Highlight API has limited browser support as of October 2025 and is not recommended for
				production use yet. Note <code>theme_highlight.css</code> is required instead of
				<code>theme.css</code>.
			</p>
		</aside>
		{#each Object.values(samples) as sample (sample.name)}
			<section>
				<h2 class="box panel p_md mb_0">{sample.lang}</h2>
				<div class="display_flex justify_content_center flex_wrap_wrap gap_sm py_xl5">
					<div>
						<h3>{sample.lang} html strings</h3>
						<Code_Highlight content={sample.content} lang={sample.lang} mode="html" />
					</div>
					<div>
						<h3>{sample.lang} highlighted ranges</h3>
						<Code_Highlight content={sample.content} lang={sample.lang} mode="ranges" />
					</div>
				</div>
			</section>
			<hr />
		{/each}
	</section>

	<Footer />
</main>
