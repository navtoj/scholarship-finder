<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
</script>

<header
	class="sticky top-0 flex items-center justify-between gap-4 border-b bg-background bg-muted/40 pl-4"
>
	<div class="flex h-full items-center text-lg leading-none">
		<h1 class="mr-4 font-semibold">Scholarship Finder</h1>
		<Separator orientation="vertical" />
		<Button class="" href="https://www.ufv.ca" variant="link"
			>University of the Fraser Valley</Button
		>
	</div>
	<div class="flex h-full items-center">
		<Button class="" href="https://github.com/navtoj" variant="link">Credits</Button>
	</div>
</header>
