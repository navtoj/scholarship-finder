<script lang="ts">
	import { cn } from '$lib/components/utils.js';
	import type { HTMLTableAttributes } from 'svelte/elements';

	type $$Props = HTMLTableAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class="relative w-full overflow-auto">
	<div
		class={cn('table w-full caption-bottom border-collapse text-sm', className)}
		{...$$restProps}
	>
		<slot />
	</div>
</div>
