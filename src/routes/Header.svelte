<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
</script>

<header
	class="sticky top-0 flex max-h-16 items-center justify-between gap-4 border-b bg-background px-2 md:px-4"
>
	<div class="flex h-full items-center gap-4">
		<h1 class="text-lg font-semibold leading-none text-[#8DC63F]">
			<a href="https://www.ufv.ca/">University of the Fraser Valley</a>
		</h1>
		<Separator orientation="vertical" />
		<h1 class="text-lg font-semibold leading-none">Scholarship Finder</h1>
	</div>
	<div class="flex h-full items-center">
		<Button href="about" variant="link">About</Button>
		<Button href="https://github.com/navtoj" variant="link">Credits</Button>
	</div>
</header>
