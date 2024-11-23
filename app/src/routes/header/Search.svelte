<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	let { handler }: { handler: (input: string) => void } = $props();
</script>

<form
	class="flex w-full max-w-xs items-center gap-x-2"
	oninput={(event) => {
		event.preventDefault();
		// get the form data
		const formData = new FormData(event.currentTarget);
		// get the query parameter
		const input = formData.get('search');
		// make sure input is a string
		if (typeof input !== 'string') return false;
		// remove leading and trailing whitespace
		const query = input.trim();
		// handle search query
		handler(query);
	}}
>
	<Input class="h-7 min-w-max" type="search" placeholder="Search scholarships..." name="search" />
</form>
