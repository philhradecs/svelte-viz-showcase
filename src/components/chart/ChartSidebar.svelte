<script lang="ts">
	import type { Control } from '$components/controls/types';
	import ChartHandles from './Handles.svelte';

	export let title = '';
	export let controls: Control[] = [];
</script>

<div>
	<h2 class="mb-3 font-mono">{title}</h2>
	<ChartHandles {controls} />
</div>
