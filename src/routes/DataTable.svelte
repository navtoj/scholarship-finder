<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import type { Scholarships } from '$lib/types';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addColumnFilters, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import DataTableBar from './DataTableBar.svelte';

	export let scholarships: Scholarships;

	const table = createTable(readable(scholarships), {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		// colFilter: addColumnFilters()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'type',
			header: 'Type'
			// plugins: {
			// 	sort: {
			// 		disable: true
			// 	}
			// }
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
			},
			plugins: {
				sort: {
					compareFn: (a, b) => {
						// a === b
						if (a === null && b === null) return 0;
						// a < b
						if (a === null) return -1;
						// a > b
						if (b === null) return 1;
						// check if a and b are numbers
						if (typeof a === 'number' && typeof b === 'number') {
							// sort by numeric value
							return a - b;
						}
						// sort as strings
						const first = `${a}`;
						const second = `${b}`;
						return first.localeCompare(second);
					}
				}
			}
		}),
		table.column({
			accessor: 'applyTo',
			header: 'Application Method'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { filterValue } = pluginStates.filter;
	$: console.log('filterValue', $filterValue);

	// const { filterValues } = pluginStates.colFilter;
	// $: console.log('filterValues', $filterValues);
</script>

<Table.Root {...$tableAttrs} class="mb-12">
	<Table.Header class="sticky top-0 bg-background shadow-sm dark:shadow-accent">
		{#each $headerRows as headerRow}
			<Subscribe rowAttrs={headerRow.attrs()}>
				<Table.Row class="divide-x hover:bg-inherit">
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<Table.Head
								{...attrs}
								class="group/th last:text-right not-first-last:w-full first-last:text-nowrap nth-last-2:text-nowrap {props
									.sort.disabled
									? ''
									: 'p-0'}"
							>
								<!-- w-8 nth-last-2: -->
								{#if props.sort.disabled}
									<Render of={cell.render()} />
								{:else}
									<Button
										class="w-full justify-normal gap-2 rounded-none px-2 py-0 group-last/th:justify-end"
										variant="ghost"
										on:click={props.sort.toggle}
									>
										<Render of={cell.render()} />
										{#if props.sort.order === 'asc'}
											<ArrowUp class={'h-4 w-4'} />
										{:else if props.sort.order === 'desc'}
											<ArrowDown class={'h-4 w-4'} />
										{:else}
											<ArrowUpDown class={'h-4 w-4'} />
										{/if}
									</Button>
								{/if}
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
				<Table.Row class="divide-x" {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							<Table.Cell
								{...attrs}
								class="last:text-right not-first-last:w-full first-last:text-nowrap nth-last-2:text-nowrap"
							>
								<!-- p-0 nth-last-2: -->
								<Render of={cell.render()} />
							</Table.Cell>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Body>
</Table.Root>

<DataTableBar {filterValue} />
<!-- <footer class="flex justify-center border-t px-4 py-1">search | filter | sort</footer> -->
