<script lang="ts">
	import type { Control } from '$components/controls/types';
	import ChartHandles from './Handles.svelte';

	export let title = '';
	export let controls: Control[] = [];
</script>

<div>
	<fieldset class="border border-gray-800 pl-4 pb-4">
		<legend class="mb-3"><h2 class="mx-2 font-mono text-cyan-500">{title}</h2></legend>
		<ChartHandles {controls} />
	</fieldset>
</div>
