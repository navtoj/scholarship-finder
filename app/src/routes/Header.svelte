<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import type { Scholarship } from '$lib/types/database';
	import type { Table } from '@tanstack/svelte-table';
	import type { Readable } from 'svelte/store';
	import Expand from './header/Expand.svelte';
	import Search from './header/Search.svelte';
	import ToggleAcceptingApplications from './header/ToggleAcceptingApplications.svelte';

	let {
		table,
		acceptingApplicationsOnly = $bindable()
	}: { table: Readable<Table<Scholarship>>; acceptingApplicationsOnly: boolean } = $props();
</script>

<header
	class="bg-muted/40 sticky top-0 flex min-h-10 items-center justify-between gap-4 border-b px-3"
>
	<div class="flex h-full w-full items-center gap-x-6 text-lg leading-none">
		<h1 class="text-nowrap font-semibold">Scholarship Finder</h1>
		<div class="flex w-full gap-x-3">
			<Search handler={$table.setGlobalFilter} />
			<ToggleAcceptingApplications bind:acceptingApplicationsOnly />
		</div>
	</div>
	<div class="flex h-full items-center justify-end gap-2">
		<Expand
			areSomeExpanded={$table.getIsSomeRowsExpanded()}
			toggleAllExpanded={$table.toggleAllRowsExpanded}
		/>
		<Separator orientation="vertical" decorative />
		<Button
			class="h-6 px-1.5 py-0"
			href="https://www.ufv.ca/fineaid/awards/#pl_inner"
			target="_blank"
			variant="ghost">University of the Fraser Valley</Button
		>
		<Separator orientation="vertical" decorative />
		<Button
			class="-mr-1 h-6 gap-1.5 px-1.5 py-0"
			href="https://github.com/navtoj/scholarship-finder"
			variant="ghost"
		>
			Source
			<span class="tabler:external-link"></span>
		</Button>
	</div>
</header>
