<script lang="ts">
	// import Tome from '@ryanatkn/fuz/Tome.svelte';
	// import Docs_Item from '@ryanatkn/fuz/Docs_Item.svelte';
	// import Tome_Link from '@ryanatkn/fuz/Tome_Link.svelte';
	import Tome_Link from '$routes/Tome_Link.svelte';
	import Code from '$lib/Code.svelte';

	// TODO what convention? `Docs_Tome`? Maybe just `Tome`? `/tomes`? both? what other options?

	// const LIBRARY_ITEM_NAME = 'Code';

	// TODO BLOCK show supported languages after the lang="ts" part
</script>

<!-- eslint-disable svelte/no-useless-mustaches -->

<!-- <Docs_Item name={LIBRARY_ITEM_NAME}> -->
<section>
	<h2 class="mt_0">Usage</h2>
	<p>
		The
		<Tome_Link name="Code" />
		Svelte component supports syntax styling originally based on
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
	<h3>Dependencies</h3>
	<p>
		By default fuz_code depends on my CSS framework <a href="https://moss.ryanatkn.com">Moss</a>. If
		you're not using it, import <code>theme_variables.css</code>:
	</p>
	<Code
		lang="ts"
		content="// +layout.svelte
import '@ryanatkn/fuz_code/theme.css';
import '@ryanatkn/fuz_code/theme_variables.css'; // also this if not using Moss"
	/>
</section>
<section>
	<aside>
		⚠️ Performing syntax styling at runtime like this is often wasteful. The plan is to provide a
		Vite plugin to optimize static cases. For now you can use <code>lang={'{'}null}</code> with pre-highligted
		HTML.
	</aside>
</section>
<section>
	<h3>Svelte support</h3>
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
	<h3>TypeScript support</h3>
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
	<h3>Fallback to no styling</h3>
	<p>
		Passing <code>lang={'{'}null}</code> disables syntax styling:
	</p>
	<div class="mb_lg">
		<Code content={'<Code lang={null} content="<aside>all is gray</aside>" />'} />
	</div>
	<Code lang={null} content={`<aside>all is gray</aside>`} />
</section>
<section>
	<h3>Layout</h3>
	<p>
		<Tome_Link name="Code" /> is a block by default:
	</p>
	<div>ab<Code content="c" /></div>
	<Code content={'<div>ab<Code content="c" /></div>'} />
	<p>
		It can be inlined with <Code inline content={`<Code inline content="..." />`} />
	</p>
</section>

<!-- </DocsItem> -->
