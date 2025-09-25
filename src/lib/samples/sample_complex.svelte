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

	const thing_keys = $derived(Object.entries(thing));

	const a = 1;

	const b = 'b';

	let c: boolean = $state(true);

	const f = (p: any) => p;

	const attachment = (_p1: string, _p2: number) => (el: HTMLElement) => {
		element_ref !== el;
	};

	let value = $state(thing['']);
	let element_ref: HTMLElement;
</script>

<h1 bind:this={element_ref}>hello {HELLO}!</h1>

{#each thing_keys as [k, { t, u }] (f(k))}
	{@const v = Math.round(t[k + u])}
	{v}
{/each}

{#if f(c)}
	<Thing string_prop="a" number_prop={1} />
{:else if f(a > 0)}
	bigger
{:else}
	<Thing string_prop="b" onthing={() => (c = !c)}>
		{@render children()}
	</Thing>
{/if}

{@html '<strong>raw html</strong>'}

<input bind:value type="text" class:active={c} />

<span {@attach attachment('param', 42)}>...</span>

{@render my_snippet('p')}

{#snippet my_snippet(p: string)}
	<button {onclick}>{p}</button>
{/snippet}

<p class="some_class hypen-class" id="unique_id">
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

	@media (max-width: 600px) {
		:global(body) {
			background-color: light-dark(lightblue, darkblue);
		}
	}

	.special::before {
		content: '< & >';
	}
</style>
