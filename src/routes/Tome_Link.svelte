<script lang="ts">
	export let name: string;
	export let extension = '.svelte'; // TODO shouldn't be a thing

	// TODO confusing overlap with @ryanatkn/fuz/Tome_Link.svelte
</script>

<code
	><a href="https://github.com/ryanatkn/fuz_code/blob/main/src/lib/{name}{extension}">{name}</a
	></code
>
