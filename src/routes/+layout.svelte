<script>
	import MonitorSmartphone from 'lucide-svelte/icons/monitor-smartphone';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Header from './header.svelte';
</script>

<ModeWatcher />

<div class="flex h-dvh items-center justify-center gap-3 text-xl lg:hidden">
	<MonitorSmartphone size={28} />
	<p>Screen too small.</p>
</div>
<div class="hidden h-dvh flex-col lg:flex">
	<Header />
	<slot />
</div>
