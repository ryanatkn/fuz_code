<script lang="ts">
	import DocsContent from '@ryanatkn/fuz/DocsContent.svelte';
	import {tomes_context} from '@ryanatkn/fuz/tome.js';
	import {library_context} from '@ryanatkn/fuz/library.svelte.js';

	const tomes_by_name = tomes_context.get();

	const tomes = Array.from(tomes_by_name.values());

	const library = library_context.get();
</script>

<div class="pt_xl3">
	<DocsContent {tomes} {library}></DocsContent>
</div>
