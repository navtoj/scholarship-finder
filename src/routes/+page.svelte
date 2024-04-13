<script lang="ts">
	import type { PageData } from './$types';
	import Table from './data-table.svelte';
	export let data: PageData;
</script>

<!-- <pre>{JSON.stringify(data.scholarships, null, 2)}</pre> -->
<Table scholarships={data.scholarships} />
