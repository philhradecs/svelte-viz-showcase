<script lang="ts">
	import Chart from '$components/chart/Chart.svelte';
	import { bandwidth, threshold } from '$visualizations/contour/store';
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<ChartLayout
	controls={[
		{
			label: 'Bandwidth',
			type: 'slider',
			min: 0,
			max: 100,
			writable: bandwidth,
			throttle: 75
		},
		{
			label: 'Thresholds',
			type: 'slider',
			min: 0,
			max: 50,
			writable: threshold,
			throttle: 75
		}
	]}
>
	<div class="h-full">
		<Chart ml={50} mb={40} chartType="contour" {...data} />
	</div>
</ChartLayout>
