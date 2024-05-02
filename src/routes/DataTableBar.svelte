<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { Writable } from 'svelte/store';

	export let filterValue: Writable<string>;
</script>

<div class="fixed bottom-0 flex w-full gap-2 bg-background shadow-sm dark:shadow-accent -shadow-y-[1px] p-1.5">
	<form
		class="flex grow gap-2"
		on:submit|preventDefault={(event) => {
			// get the form data
			const formData = new FormData(event.currentTarget, event.submitter);
			// get the query parameter
			const query = formData.get('query');
			// make sure query is a string
			if (typeof query !== 'string') return;
			// check if same input value
			if (query === $filterValue) return true;
			// search for query
			filterValue.set(query);
		}}
	>
		<Input class="" placeholder="Search scholarships..." type="text" name="query" />
		<Button type="submit" variant="default" class="">Search</Button>
	</form>
</div>
