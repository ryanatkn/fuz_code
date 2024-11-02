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
		component supports syntax styling originally based on
		<a href="https://github.com/PrismJS/prism">Prism</a> by
		<a href="https://lea.verou.me/">Lea Verou</a>.
	</p>
	<p>To use it, import the default theme or your own:</p>
	<Code
		lang="ts"
		content="// +layout.svelte
import '@ryanatkn/fuz_code/theme.css'; // add this"
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
		⚠️ Performing syntax styling at runtime like this is wasteful. The API's efficiency is
		work-in-progress - for now you can use <code>lang={'{'}null}</code> with pre-highligted text.
	</aside>
</section>
<section>
	<p>
		<Tome_Link name="Code" /> styles
		<a href="https://svelte.dev/">Svelte</a>
		by default, originally based on
		<a href="https://github.com/pngwn/prism-svelte"><code>prism-svelte</code></a>
		by <a href="https://github.com/pngwn">@pngwn</a>:
	</p>
	<div class="mb_lg">
		<Code content={'<Code content="<scr..." />'} />
	</div>
	<p>styled:</p>
	<div>
		<Code
			content={'<' +
				`script lang="ts">
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
		Passing <code>lang={'{'}null}</code> disables syntax styling:
	</p>
	<div class="mb_lg">
		<Code content={'<Code lang={null} content="<aside>all is gray</aside>" />'} />
	</div>
	<Code lang={null} content={`<aside>all is gray</aside>`} />
</section>
<section>
	<p>
		<Tome_Link name="Code" /> is a block by default:
	</p>
	<div>ab<Code content="c" /></div>
	<Code content={'<div>ab<Code content="c" /></div>'} />
</section>
<section>
	<p>
		<Tome_Link name="Code" /> can be inlined with <Code
			inline
			content={`<Code inline content="..." />`}
		/>
	</p>
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
