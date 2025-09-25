<script lang="ts" module>
	export const HELLO = 'world';
</script>

<script lang="ts">
	// @ts-expect-error
	import Thing from '$lib/Thing.svelte';
	import type {Snippet} from 'svelte';

	const {
		thing,
		bound = $bindable(true),
		children,
		onclick,
	}: {
		thing: Record<string, any>;
		bound?: boolean;
		children: Snippet;
		onclick?: () => void;
	} = $props();

	const thing_keys = $derived(Object.keys(thing));

	const a = 1;

	const b = 'b';

	let c: boolean = $state(true);

	const attachment = (_p1: string, _p2: number) => (_: HTMLElement) => {
		element_ref;
	};

	let value = $state(thing['']);
	let element_ref: HTMLElement;
</script>

<h1>hello {HELLO}!</h1>

{#each thing_keys as key (key)}
	{@const v = thing[key]}
	{v}
{/each}

{#if c}
	<Thing string_prop="a" number_prop={1} />
{:else if a > 0}
	bigger
{:else}
	<Thing string_prop="b" number_prop={2} onthing={() => (c = !c)}>
		{@render children()}
	</Thing>
{/if}

{@html '<strong>raw html</strong>'}

<input bind:value type="text" />

<div bind:this={element_ref} class:active={c} {@attach attachment('param', 42)}>
	interactive element
</div>

{@render my_snippet()}

{#snippet my_snippet()}
	<button {onclick}>click handler</button>
{/snippet}

<div class="test special" id="unique_id">
	<p>hello world!</p>
</div>

<p class="some_class hypen-class">
	some <span class="a b c">text</span>
</p>

<button type="button" disabled> click me </button>

<!-- comment <div>a<br /> b</div> -->
{a}
{b}
{bound}

<br />

<hr />

<img src="image.jpg" alt="access" />

<ul>
	<li>list item 1</li>
	<li>list item 2</li>
</ul>

<!-- embedded tags for boundary testing -->
<div>
	<script>
		const inline_js = 'no lang attr';
	</script>
	<style>
		.inline {
			color: blue;
		}
	</style>
</div>

<style>
	.some_class {
		color: red;
	}

	.hypen-class {
		font-size: 16px;
	}

	p {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	/* comment */

	/*
	multi
	line

	<comment>

	*/

	#unique_id {
		background-color: blue;
	}

	div > p {
		margin: 10px;
	}

	@media (max-width: 600px) {
		:global(body) {
			background-color: light-dark(lightblue, darkblue);
		}
	}

	.special::before {
		content: '< & >';
	}
</style>
