<script lang="ts">
	import {page} from '$app/stores';
	import 'prismjs/themes/prism.min.css';
	import {setContext} from 'svelte';

	import LibraryMenu from '$routes/library/LibraryMenu.svelte';
	import {library_items_by_name, library_items} from '$routes/library/items';
	import FuzFooter from '$routes/FuzFooter.svelte';
	import Breadcrumbs from '$lib/Breadcrumbs.svelte';
	import LibraryPanel from '$routes/library/LibraryPanel.svelte';

	$: selected_item = library_items.find((c) => c.pathname === $page.url.pathname);
	$: items_related_to_selected = selected_item?.related?.map((r) => library_items_by_name.get(r)!);

	// TODO hacky to avoid a circular dependency problem
	setContext('library_items_by_name', library_items_by_name);
</script>

<div class="layout width_md">
	<div class="menu-wrapper">
		<div class="menu width_sm">
			<LibraryMenu items={library_items} />
			{#if items_related_to_selected}
				<LibraryMenu items={items_related_to_selected} let:category>
					<h6>related {category}</h6>
				</LibraryMenu>
			{/if}
		</div>
	</div>
	<LibraryPanel>
		<div class="prose box text_align_center">
			<blockquote class="width_sm">
				styles and UI components for <a href="https://svelte.dev/">Svelte</a> and
				<a href="https://kit.svelte.dev/">SvelteKit</a>
			</blockquote>
			<blockquote class="box">
				<code>npm i -D <a href="https://www.npmjs.com/package/@fuz.dev/fuz">@fuz.dev/fuz</a></code>
			</blockquote>
			<a class="padded_md panel" href="https://github.com/fuz-dev/fuz">github.com/fuz-dev/fuz</a>
		</div>
	</LibraryPanel>
	<slot />
	<section class="box">
		<FuzFooter />
	</section>
	<section class="box">
		<Breadcrumbs>🧶</Breadcrumbs>
	</section>
</div>

<style>
	.layout {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: var(--spacing_xl5);
	}
	.menu-wrapper {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		transform: translate3d(calc(-100% - var(--spacing_sm)), 0, 0);
	}
	.menu {
		position: sticky;
		top: 0;
	}
	@media (max-width: 1200px) {
		.menu-wrapper {
			position: relative;
			transform: none;
			margin-bottom: var(--spacing_xl3);
		}
	}
	section {
		padding: var(--spacing_xl2);
	}
	h6 {
		margin-bottom: var(--spacing_md);
		margin-top: var(--spacing_xl3);
	}
	h6:first-child {
		margin-top: 0;
	}
</style>
