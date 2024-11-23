<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	console.log(data);
</script>

<div class="grid h-full place-content-center">
	<span class="logos:svelte-kit"></span>
</div>
