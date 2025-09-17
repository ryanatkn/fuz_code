<script lang="ts">
	import Domstyler_Range_Code from '$lib/Domstyler_Range_Code.svelte';

	const sample_css = `.container {
  display: flex;
  color: red;
  background-color: #fff;
}`;

	const sample_ts = `const greet = (name: string): void => {
  console.log(\`Hello, \${name}!\`);
};

greet('world');`;

	const sample_html = `<!DOCTYPE html>
<html>
  <head>
    <title>Test Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`;

	const sample_json = `{
  "name": "test",
  "version": "1.0.0",
  "main": "index.js"
}`;
</script>

<main>
	<h1>DOM Styler with Range Highlighting Test</h1>

	<section>
		<h2>TypeScript</h2>
		<Domstyler_Range_Code content={sample_ts} lang="ts" />
	</section>

	<section>
		<h2>CSS</h2>
		<Domstyler_Range_Code content={sample_css} lang="css" />
	</section>

	<section>
		<h2>HTML</h2>
		<Domstyler_Range_Code content={sample_html} lang="html" />
	</section>

	<section>
		<h2>JSON</h2>
		<Domstyler_Range_Code content={sample_json} lang="json" />
	</section>

	<section>
		<h2>Mode Test</h2>
		<h3>HTML Mode (forced)</h3>
		<Domstyler_Range_Code content={sample_ts} lang="ts" mode="html" />

		<h3>Ranges Mode (forced)</h3>
		<Domstyler_Range_Code content={sample_ts} lang="ts" mode="ranges" />
	</section>
</main>

<style>
	main {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	section {
		margin-bottom: 2rem;
	}

	h1 {
		margin-bottom: 2rem;
	}

	h2 {
		margin-bottom: 1rem;
		color: var(--color_a_5);
	}

	h3 {
		margin: 1rem 0;
		color: var(--color_b_5);
	}
</style>