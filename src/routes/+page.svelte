<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<!-- <pre>{JSON.stringify(data.scholarships, null, 2)}</pre> -->
<Table.Root>
	<!-- <Table.Caption>A list of your recent invoices.</Table.Caption> -->
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Code</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Type</Table.Head>
			<Table.Head class="text-right">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.scholarships as scholarship}
			<Table.Row>
				<Table.Cell class="font-medium">{scholarship.code}</Table.Cell>
				<Table.Cell>{scholarship.name}</Table.Cell>
				<Table.Cell>{scholarship.type}</Table.Cell>
				<Table.Cell class="text-right">{scholarship.amount ?? ''}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
