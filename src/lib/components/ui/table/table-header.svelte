<script lang="ts">
	import { cn } from '$lib/components/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLTableSectionElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cn('table-header-group [&_.table-row]:border-b', className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</div>
