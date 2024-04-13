<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { Scholarships } from '$lib/types';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import DataTableActions from './data-table-actions.svelte';

	export let scholarships: Scholarships;

	const table = createTable(readable(scholarships));

	const columns = table.createColumns([
		// table.column({
		// 	accessor: 'code',
		// 	header: 'Code'
		// }),
		table.column({
			accessor: 'type',
			header: 'Type'
		}),
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'amount',
			header: 'Amount',
			cell: ({ value }) => {
				if (value === null) return '';
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'CAD',
					currencyDisplay: 'narrowSymbol',
					// @ts-expect-error trailingZeroDisplay is not yet in the TypeScript definition
					trailingZeroDisplay: 'stripIfInteger'
				}).format(value);
				return formatted;
			}
		}),
		table.column({
			accessor: ({ code }) => code,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<Table.Root {...$tableAttrs}>
	<Table.Header class="sticky top-0 bg-background shadow-sm dark:shadow-accent">
		{#each $headerRows as headerRow}
			<Subscribe rowAttrs={headerRow.attrs()}>
				<Table.Row>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
							<Table.Head {...attrs} class="last:w-8 nth-last-2:text-right">
								<Render of={cell.render()} />
							</Table.Head>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Header>
	<Table.Body {...$tableBodyAttrs}>
		{#each $pageRows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<Table.Row {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							<Table.Cell {...attrs} class="last:py-0 last:pl-0 nth-last-2:text-right">
								<Render of={cell.render()} />
							</Table.Cell>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Body>
</Table.Root>

<!-- <footer class="flex justify-center border-t px-4 py-1">search | filter | sort</footer> -->
