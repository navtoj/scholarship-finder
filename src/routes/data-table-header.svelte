<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { Writable } from 'svelte/store';

	export let filterValue: Writable<string>;
	let searchInputValue = '';
</script>

<div class="flex gap-2 border-b p-2">
	<form
		class="flex grow gap-2"
		on:submit|preventDefault={(event) => {
			// get the form data
			const formData = new FormData(event.currentTarget, event.submitter);
			// get the query parameter
			const query = formData.get('query');
			// make sure query is a string
			if (typeof query !== 'string') return;
			// search for query
			filterValue.set(query);
		}}
	>
		<Input
			class=""
			placeholder="Search scholarships..."
			type="text"
			name="query"
			bind:value={searchInputValue}
		/>
		<Button type="submit" variant="secondary" disabled={$filterValue === searchInputValue} class=""
			>Search</Button
		>
	</form>
</div>
