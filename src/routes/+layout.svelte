<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Header from './Header.svelte';
</script>

<ModeWatcher />

<div class="grid h-dvh place-content-center lg:hidden">
	<p>Small screens not supported.</p>
</div>
<div class="hidden h-dvh flex-col lg:flex">
	<Header />
	<slot />
</div>
