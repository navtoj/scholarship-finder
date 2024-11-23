<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import 'uno.css';
	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher themeColors={{ dark: 'black', light: 'white' }} />

<div class="h-dvh">{@render children()}</div>
