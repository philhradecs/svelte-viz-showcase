<script lang="ts">
	import Chart from '$components/chart/Chart.svelte';
	import ChartLayout from '$components/chart/ChartLayout.svelte';

	import ContourChart from '$visualizations/contour/ContourChart.svelte';
	import { writable } from 'svelte/store';

	const bandwidth = writable(25);
	const threshold = writable(30);
	export let data;
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
		<Chart
			ml={55}
			mb={45}
			mt={25}
			mr={20}
			chart={ContourChart}
			data={data.chartData}
			extraConfig={{ bandwidth: $bandwidth, threshold: $threshold }}
		/>
	</div>
</ChartLayout>
