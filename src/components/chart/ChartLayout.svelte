<script lang="ts">
	import ChartSidebar from '$components/chart/ChartSidebar.svelte';
	import type { Control } from '$components/controls/types';
	export let controls: Control[] = [];
</script>

<div class="h-full flex gap-8">
	<div class="flex-1"><slot /></div>
	<div class="w-[300px] max-w-[300px] pt-4">
		<ChartSidebar title="Controls" {controls} />
	</div>
</div>
