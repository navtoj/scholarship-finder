<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import ExternalLink from 'lucide-svelte/icons/external-link';
</script>

<header
	class="sticky top-0 min-h-9 flex items-center justify-between gap-4 border-b bg-background bg-muted/40 px-4"
>
	<div class="flex h-full items-center text-lg leading-none gap-4">
		<h1 class="font-semibold">Scholarship Finder</h1>
		<!-- <Separator orientation="vertical" /> -->
		<Button class="h-6 px-1.5 py-0" href="https://www.ufv.ca" variant="ghost"
			>University of the Fraser Valley</Button
		>
	</div>
	<div class="flex h-full items-center">
		<Button class="h-6 gap-1.5 px-1.5 py-0" href="https://github.com/navtoj" variant="ghost">
			Credits
			<ExternalLink size="1rem" />
		</Button>
	</div>
</header>
