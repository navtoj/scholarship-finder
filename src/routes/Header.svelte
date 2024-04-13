<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
</script>

<header
	class="sticky top-0 flex max-h-16 items-center justify-between gap-4 border-b bg-background bg-muted/40 px-2 md:px-4"
>
	<div class="flex h-full items-center gap-4 text-lg font-semibold leading-none">
		<h1 class=" text-[#8DC63F]">
			<a href="https://www.ufv.ca/">University of the Fraser Valley</a>
		</h1>
		<Separator orientation="vertical" />
		<h1>Scholarship Finder</h1>
	</div>
	<div class="flex h-full items-center">
		<Button class="" href="https://github.com/navtoj" variant="link">About</Button>
	</div>
</header>
