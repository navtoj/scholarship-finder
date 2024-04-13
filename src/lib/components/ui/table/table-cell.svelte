<script lang="ts">
	import { cn } from '$lib/components/utils.js';
	import type { HTMLTdAttributes } from 'svelte/elements';

	type $$Props = HTMLTdAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cn(
		'table-cell p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</div>
