<script lang="ts">
	// import Tome from '@fuz.dev/fuz_library/Tome.svelte';
	// import LibraryItem from '@fuz.dev/fuz_library/LibraryItem.svelte';
	// import LibraryVocab from '@fuz.dev/fuz_library/LibraryVocab.svelte';
	import LibraryVocab from '$routes/LibraryVocab.svelte';

	import Code from '$lib/Code.svelte';

	// TODO is this the right convention? `LibraryTome`? Maybe just `Tome`? `/tomes`? both?

	// const LIBRARY_ITEM_NAME = 'Code';
</script>

<!-- <LibraryItem name={LIBRARY_ITEM_NAME}> -->
<div class="prose">
	<section>
		<p>
			The
			<LibraryVocab name="Code" />
			component supports syntax highlighting with
			<a href="https://prismjs.com/">Prism</a>. It depends on two packages that you must install
			yourself:
		</p>
		<Code content="npm i -D prismjs prism-svelte" lang={null} />
		<p>Then import the styles:</p>
		<Code
			lang="js"
			content="// +layout.svelte
import '@fuz.dev/fuz/style.css';
import '@fuz.dev/fuz/theme.css';
// add this:
import '@fuz.dev/fuz_code/prism.css'; // <-- add this"
		/>
		<p>then use <LibraryVocab name="Code" />:</p>
		<Code
			content={'<!-- Something.svelte -->\n<' +
				`script>\n\timport Code from '@fuz.dev/fuz_code/Code.svelte';\n</script>\n\n<Code content="<header>hello world</header>" />`}
		/>
		<p>outputs:</p>
		<Code content="<header>hello world</header>" />
	</section>
	<section>
		<p>
			<LibraryVocab name="Code" /> highlights
			<a href="https://svelte.dev/">Svelte</a>
			by default:
		</p>
		<div class="spaced">
			<Code content={'<Code content="<scr..."'} />
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
			<LibraryVocab name="Code" /> supports TypeScript with <code>lang="ts"</code>:
		</p>
		<div class="spaced">
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
		<div class="spaced">
			<Code content={'<Code lang={null} content="..." />'} />
		</div>
		<aside>
			please note: performing syntax highlighting at runtime like this does is wasteful, and the API
			is a work-in-progress for efficiency - you can use <code>lang={'{'}null}</code> with
			pre-highligted text, but <LibraryVocab name="Code" /> still imports <code>prismjs</code> and
			<code>prism-svelte</code>
		</aside>
	</section>
	<section>
		<p>
			<LibraryVocab name="Code" /> is a block by default:
		</p>
		<p>ab<Code content="c" /></p>
		<Code content={'<p>ab<Code content="c" /></p>'} />
	</section>
	<section>
		<p>
			<LibraryVocab name="Code" /> can be inlined with <Code
				inline
				content={`<Code inline content="..." />`}
			/>
		</p>
	</section>
	<section>
		<p>
			The <code>remove_prism_css</code> import optimizes your bundle by excluding the builtin Prism
			theme so you can use <code>@fuz.dev/fuz_code/prism.css</code> or some other version:
		</p>
		<div>
			<Code
				lang="ts"
				content={`import type {UserConfig} from 'vite';
import {sveltekit} from '@sveltejs/kit/vite';
import {remove_prism_css} from '@fuz.dev/fuz_code/remove_prism_css_vite_plugin.js';

const config: UserConfig = {
	plugins: [sveltekit(), remove_prism_css()],
	ssr: {noExternal: ['@fuz.dev/fuz']},
};

export default config;`}
			/>
		</div>
	</section>
</div>

<!-- </LibraryItem> -->

<style>
	section {
		/* TODO not sure about this -- maybe make it a util class? or a component? */
		padding: var(--spacing_xl2);
		display: flex;
		flex-direction: column;
	}
</style>
