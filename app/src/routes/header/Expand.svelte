<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let {
		areSomeExpanded,
		toggleAllExpanded
	}: { areSomeExpanded: boolean; toggleAllExpanded: (input: boolean) => void } = $props();
</script>

<Button
	class="h-7"
	variant="secondary"
	size="sm"
	onclick={() => toggleAllExpanded(!areSomeExpanded)}
>
	{#if areSomeExpanded}
		Collapse All
	{:else}
		Expand All
	{/if}
</Button>
