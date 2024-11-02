<script lang="ts">
	import Breadcrumb from '@ryanatkn/fuz/Breadcrumb.svelte';

	import Code from '$lib/Code.svelte';
	import {samples} from '$lib/code_sample_inputs.js';
</script>

<main class="box w_100">
	<Breadcrumb>🎨</Breadcrumb>
	<div class="flex flex_wrap justify_content_space_around">
		{#each samples as { content, lang }}
			<div>
				<h2>{lang}</h2>
				<pre><Code {content} language={lang} /></pre>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		/* TODO hacky */
		margin-bottom: var(--space_xl5);
		padding: var(--space_xl3) 0;
	}
</style>
