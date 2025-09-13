<script lang="ts">
	const {
		name,
		extension = '.svelte',
	}: {
		name: string;
		extension?: string; // TODO shouldn't be a thing
	} = $props();
	// TODO confusing overlap with @ryanatkn/fuz/Tome_Link.svelte
</script>

<code
	><a href="https://github.com/ryanatkn/fuz_code/blob/main/src/lib/{name}{extension}">{name}</a
	></code
>
