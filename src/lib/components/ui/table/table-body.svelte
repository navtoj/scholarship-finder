<script lang="ts">
	import { cn } from '$lib/components/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLTableSectionElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn('table-row-group [&_.table-row:last-child]:border-0', className)} {...$$restProps}>
	<slot />
</div>
