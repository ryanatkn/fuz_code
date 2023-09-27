<script lang="ts">
	import CodeExample from '$routes/CodeExample.svelte';
</script>

<main class="width_md">
	<section class="prose box">
		<h2>@fuz.dev/fuz-code</h2>
		<code class="padded_md panel spaced"
			>npm i -D <a href="https://www.npmjs.com/package/@fuz.dev/fuz-code">@fuz.dev/fuz-code</a
			></code
		>
		<blockquote><a href="https://github.com/fuz-dev/fuz-code">source code</a></blockquote>
	</section>
	<CodeExample />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
	}
</style>
