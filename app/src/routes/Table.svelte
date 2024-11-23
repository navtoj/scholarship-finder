<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { iife } from '$lib/helpers';
	import { Scholarship } from '$lib/types/database';
	import { flexRender, type SortDirection, type Table as TableType } from '@tanstack/svelte-table';
	import type { Readable } from 'svelte/store';

	let {
		table,
		acceptingApplicationsOnly
	}: { table: Readable<TableType<Scholarship>>; acceptingApplicationsOnly: boolean } = $props();

	// FIXME: header.column.getIsSorted() not reactive
	function getIsSorted(column: string): false | SortDirection {
		return $table.getColumn(column)?.getIsSorted() ?? false;
	}

	const today = iife(() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate() - 11;
		const sortable =
			year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
		return Number(sortable);
	});
</script>

<Table>
	<TableHeader class="bg-background shadow-border-b sticky top-0">
		{#each $table.getHeaderGroups() as group}
			<TableRow class="group/group divide-x hover:bg-inherit">
				{#each group.headers as header}
					<TableHead colspan={header.colSpan} class="group/header hover:bg-muted/50 px-0">
						{#if !header.isPlaceholder}
							{@const Component = flexRender(header.column.columnDef.header, header.getContext())}
							{#if Component !== null}
								{@const isSorted = getIsSorted(header.id)}
								<button
									type="button"
									class="inline-flex h-full w-full items-center gap-x-2 px-2 group-last/group:group-last/header:justify-end"
									class:cursor-pointer={header.column.getCanSort()}
									onclick={header.column.getToggleSortingHandler()}
								>
									<Component />
									<span
										class:lucide:arrow-up={isSorted === 'asc'}
										class:lucide:arrow-down={isSorted === 'desc'}
										class:lucide:arrow-up-down={isSorted === false}
									></span>
								</button>
							{/if}
						{/if}
					</TableHead>
				{/each}
			</TableRow>
		{/each}
	</TableHeader>
	<TableBody>
		{#each $table.getRowModel().rows as row (row.original.code)}
			{@const hideRow = acceptingApplicationsOnly && row.original.acceptApplications !== true}
			<TableRow
				class="{hideRow ? 'hidden' : ''} {row.getIsExpanded()
					? 'bg-muted/50 border-dashed'
					: ''} cursor-pointer divide-x"
				onclick={row.getToggleExpandedHandler()}
			>
				{#each row.getVisibleCells() as cell}
					{@const value = cell.getValue()}
					<TableCell
						class="{row.getIsExpanded() ? 'border-dashed' : ''} {cell.column.id === 'type'
							? 'capitalize'
							: ''} {cell.column.id === 'name'
							? 'w-full text-wrap'
							: 'text-nowrap'} last:text-right"
					>
						{#if cell.column.id === 'amount' && value}
							<p class="flex justify-between">
								<span class="text-muted-foreground/50">$</span>
								<span class="tabular-nums">{value}</span>
							</p>
						{:else}
							{value}
						{/if}
					</TableCell>
				{/each}
			</TableRow>
			{#if row.getIsExpanded()}
				<TableRow class="{hideRow ? 'hidden' : ''} border-b-2 hover:bg-inherit">
					<TableCell class="p-0" colspan={row.getAllCells().length}>
						<div class="flex flex-col gap-5 p-4">
							<Tabs value="description">
								<div class="flex gap-x-3">
									<TabsList class="dark:bg-muted/50 h-8">
										<TabsTrigger class="text-xs" value="description">Description</TabsTrigger>
										<TabsTrigger class="text-xs" value="selectionProcess"
											>Selection Process</TabsTrigger
										>
										{#if row.original.biography}
											<TabsTrigger class="text-xs" value="biography">Biography</TabsTrigger>
										{/if}
									</TabsList>
									<div class="flex w-full justify-between">
										<div class="flex gap-x-2">
											<Badge class="text-nowrap py-0 capitalize" variant="outline"
												>{row.original.type}</Badge
											>
											{#if row.original.applicationRequiresAdditionalDocumentation}
												<Badge class="text-nowrap py-0 capitalize" variant="outline">
													Additional Documentation Required
												</Badge>
											{/if}
										</div>

										{#if row.original.applicationsAccepted === null}
											{#if row.original.acceptApplications !== true}
												<Badge class="text-nowrap py-0" variant="destructive"
													>Not Accepting Applications</Badge
												>
											{/if}
										{:else}
											{@const availableDates = row.original.applicationsAccepted.filter(
												(d) => today <= d.e
											)}
											{@const dateRangeSorter = (
												a: { s: number; e: number },
												b: { s: number; e: number }
											) => (a.s === b.s ? a.e - b.e : a.s - b.s)}

											<div class="flex gap-x-2">
												{#if !availableDates.length}
													{#each row.original.applicationsAccepted.toSorted(dateRangeSorter) as { start, end }}
														{@render dateRangeBadge(start, end, true)}
													{/each}
												{:else}
													{#each availableDates.toSorted(dateRangeSorter) as { start, end }}
														{@render dateRangeBadge(start, end)}
													{/each}
												{/if}
											</div>
										{/if}
									</div>
								</div>

								<TabsContent value="description">
									{@render multilineInfo(row.original.description)}
								</TabsContent>
								<TabsContent value="selectionProcess">
									{@render multilineInfo(row.original.selectionProcess)}
								</TabsContent>
								{#if row.original.biography}
									<TabsContent value="biography">
										{@render multilineInfo(row.original.biography)}
									</TabsContent>
								{/if}
							</Tabs>
						</div>
					</TableCell>
				</TableRow>
			{/if}
		{:else}
			<TableRow>
				<TableCell class="text-center" colspan={$table.getAllFlatColumns().length}
					>No scholarships found.</TableCell
				>
			</TableRow>
		{/each}
	</TableBody>
</Table>

{#snippet multilineInfo(text: string)}
	<div class="flex flex-col gap-y-1 px-2 py-3">
		{#each text.split('\n') as line}
			<p>{line}</p>
		{/each}
	</div>
{/snippet}

{#snippet dateRangeBadge(start: string, end: string, dimmed: boolean = false)}
	<Badge
		class="gap-x-2 py-0 {dimmed ? 'dark:bg-secondary/40' : ''}"
		variant={dimmed ? 'secondary' : 'outline'}
	>
		<span class="text-nowrap py-1">{start}</span>
		<Separator orientation="vertical" />
		<span class="text-nowrap py-1">{end}</span>
	</Badge>
{/snippet}
