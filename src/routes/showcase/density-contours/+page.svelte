<script lang="ts">
	import Chart from '$components/chart/Chart.svelte';
	import { bandwidth, threshold } from '$visualizations/contour/store';
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import type { PageData } from './$types';

	import ContourChart from '$visualizations/contour/ContourChart.svelte';

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
			min: 1,
			max: 50,
			writable: threshold,
			throttle: 75
		}
	]}
>
	<div class="h-full">
		<Chart ml={55} mb={45} mt={25} mr={20} chart={ContourChart} data={data.array} />
	</div>
</ChartLayout>
