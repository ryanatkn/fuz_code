<script lang="ts">
	// import Tome from '@ryanatkn/fuz/Tome.svelte';
	// import LibraryItem from '@ryanatkn/fuz/LibraryItem.svelte';
	// import Tome_Link from '@ryanatkn/fuz/Tome_Link.svelte';
	import Tome_Link from '$routes/Tome_Link.svelte';
	import Code from '$lib/Code.svelte';

	// TODO what convention? `LibraryTome`? Maybe just `Tome`? `/tomes`? both? what other options?

	// const LIBRARY_ITEM_NAME = 'Code';
</script>

<!-- <LibraryItem name={LIBRARY_ITEM_NAME}> -->
<section>
	<p>
		The
		<Tome_Link name="Code" />
		component supports syntax highlighting with
		<a href="https://prismjs.com/">Prism</a> (<a href="https://github.com/PrismJS/prism">repo</a>).
	</p>
	<p>It depends on two packages that you must install yourself:</p>
	<Code content="npm i -D prismjs prism-svelte" lang={null} />
	<p>Then import the styles:</p>
	<Code
		lang="ts"
		content="// +layout.svelte
import '@ryanatkn/moss/style.css';
import '@ryanatkn/moss/theme.css'; // or your own
// add this:
import '@ryanatkn/fuz_code/prism.css'; // add this"
	/>
	<p>then use <Tome_Link name="Code" />:</p>
	<Code
		content={'<' +
			`script>\n\t// Something.svelte\n\timport Code from '@ryanatkn/fuz_code/Code.svelte';\n</script>\n\n<Code content="<header>hello world</header>" />`}
	/>
	<p>outputs:</p>
	<Code content="<header>hello world</header>" />
</section>
<section>
	<aside>
		⚠️ Performing syntax highlighting at runtime like this is wasteful. The API's efficiency is
		work-in-progress - you can use <code>lang={'{'}null}</code> with pre-highligted text but the
		component will still import <code>prismjs</code> and <code>prism-svelte</code>.
	</aside>
</section>
<section>
	<p>
		<Tome_Link name="Code" /> highlights
		<a href="https://svelte.dev/">Svelte</a>
		by default:
	</p>
	<div class="mb_lg">
		<Code content={'<Code content="<scr..." />'} />
	</div>
	<p>highlighted:</p>
	<div>
		<Code
			content={'<' +
				`script>
	import Card from '@fuz.dev/fuz-library/Card.svelte';
	console.log('hello Card', Card);
</script>

<Card>
	<div class="greeting">hi {friend}</div>
</Card>`}
		/>
	</div>
</section>
<section>
	<p>
		<Tome_Link name="Code" /> supports TypeScript with <code>lang="ts"</code>:
	</p>
	<div class="mb_lg">
		<Code content={`<Code lang="ts" content="export type A<T> = ('b' | 3) & T;" />`} />
	</div>
	<div>
		<Code lang="ts" content={`export type A<T> = ('b' | 3) & T;`} />
	</div>
</section>
<section>
	<p>
		Passing <code>lang={'{'}null}</code> disables syntax highlighting:
	</p>
	<Code lang={null} content={`<aside>all is gray</aside>`} />
	<div class="mb_lg">
		<Code content={'<Code lang={null} content="..." />'} />
	</div>
</section>
<section>
	<p>
		<Tome_Link name="Code" /> is a block by default:
	</p>
	<!-- TODO @multiple this `div` should be `<p>` but it errors with "`<pre>` contain `<p>`", but it's the other way around? -->
	<div>ab<Code content="c" /></div>
	<Code content={'<div>ab<Code content="c" /></div>'} />
</section>
<section>
	<!-- TODO @multiple this `div` should be `<p>` but it errors with "`<pre>` contain `<p>`", but it's the other way around? -->
	<div>
		<Tome_Link name="Code" /> can be inlined with <Code
			inline
			content={`<Code inline content="..." />`}
		/>
	</div>
</section>
<section>
	<p>
		The <code
			><a
				href="https://github.com/ryanatkn/fuz_code/blob/main/src/lib/remove_prism_css_vite_plugin.ts"
				>remove_prism_css</a
			></code
		>
		Vite plugin is an optimization that excludes the builtin Prism theme, letting you use a minimal theme
		that doesn't need selectors for overrides like
		<code
			><a href="https://github.com/ryanatkn/fuz_code/blob/main/src/lib/prism.css"
				>@ryanatkn/fuz_code/prism.css</a
			></code
		>, while also avoiding waste:
	</p>
	<div>
		<Code
			lang="ts"
			content={`import type {UserConfig} from 'vite';
import {sveltekit} from '@sveltejs/kit/vite';
import {remove_prism_css} from '@ryanatkn/fuz_code/remove_prism_css_vite_plugin.js';

const config: UserConfig = {
	plugins: [sveltekit(), remove_prism_css()],
};

export default config;`}
		/>
	</div>
</section>

<!-- </LibraryItem> -->

<style>
	section {
		/* TODO not sure about this -- maybe make it a util class? or a component? */
		padding: var(--space_xl2);
		display: flex;
		flex-direction: column;
	}
</style>
