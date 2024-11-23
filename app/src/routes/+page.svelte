<script lang="ts">
	import { Scholarship } from '$lib/types/database';
	import { rankItem } from '@tanstack/match-sorter-utils';
	import {
		createColumnHelper,
		createSvelteTable,
		getCoreRowModel,
		getExpandedRowModel,
		getFilteredRowModel,
		getSortedRowModel,
		type ColumnDef,
		type FilterFn,
		type InitialTableState
	} from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const columnHelper = createColumnHelper<Scholarship>();
	const columns: ColumnDef<Scholarship, any>[] = [
		columnHelper.accessor('applicationMethod', {
			id: 'type',
			header: 'Type'
		}),
		columnHelper.accessor('name', {
			header: 'Name'
		}),
		columnHelper.accessor(
			(row) =>
				row.amount == null
					? ''
					: new Intl.NumberFormat('en-US', {
							style: 'decimal',
							currency: 'CAD',
							currencyDisplay: 'narrowSymbol',
							trailingZeroDisplay: 'stripIfInteger',
							minimumFractionDigits: 0,
							maximumFractionDigits: 0
						}).format(row.amount),
			{
				id: 'amount',
				header: 'Amount',
				sortingFn: (first, second, column): number => {
					const a = first.original.amount;
					const b = second.original.amount;
					if (a === null && b === null) return 0;

					// FIXME: sort direction not available
					const isDesc = $table.getColumn(column)?.getIsSorted() === 'desc';
					if (a === null) return isDesc ? -1 : 1;
					if (b === null) return isDesc ? 1 : -1;
					return a - b;
				},
				sortDescFirst: true
			}
		),
		columnHelper.accessor('applyTo', {
			id: 'method',
			header: 'Application Method'
		})
	];

	const globalFilterFn: FilterFn<Scholarship> = (row, columnId, value, addMeta) => {
		const itemRank = rankItem(row.getValue(columnId), value);
		addMeta({ itemRank });
		return itemRank.passed;
	};

	const initialState: InitialTableState = {
		sorting: [{ id: 'amount', desc: true }],
		columnOrder: ['type', 'name', 'amount', 'method']
	};

	const table = createSvelteTable({
		data: data.scholarships,
		columns,
		globalFilterFn,
		initialState,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: (row) => true
	});
</script>

<div class="grid h-full place-content-center md:hidden">
	<div class="flex flex-row items-center gap-2 text-2xl">
		<span class="lucide:monitor-smartphone"></span>
		<p>Screen too small.</p>
	</div>
</div>

<div class="hidden h-full select-none flex-col md:flex">
	<pre>{JSON.stringify($table, null, 2)}</pre>
</div>
