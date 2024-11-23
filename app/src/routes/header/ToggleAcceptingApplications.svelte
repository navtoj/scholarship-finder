<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';

	let { acceptingApplicationsOnly = $bindable() }: { acceptingApplicationsOnly: boolean } =
		$props();
</script>

<Label class="pointer-events-none text-nowrap" for="accepting-applications-only">
	<div
		class="pointer-events-auto flex cursor-pointer items-center space-x-2 rounded-2xl border p-1 pl-3"
	>
		<p>Accepting Applications</p>
		<Switch bind:checked={acceptingApplicationsOnly} id="accepting-applications-only" />
	</div>
</Label>
