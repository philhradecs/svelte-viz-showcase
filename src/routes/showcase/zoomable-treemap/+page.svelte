<script lang="ts">
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import TreemapChart from '$visualizations/treemap/TreemapChart.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<!-- <ChartLayout> -->
<div class="h-full">
	<Chart mt={60} mr={10} mb={10} ml={10} chart={TreemapChart} {data} />
</div>
<!-- </ChartLayout> -->
