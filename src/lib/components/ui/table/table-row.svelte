<script lang="ts">
	import { cn } from '$lib/components/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cn(
		'table-row border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</div>
