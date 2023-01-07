<script lang="ts">
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import {
		scatterPlotDistribution,
		scatterPlotDistributions,
		scatterPlotPointRadius,
		scatterPlotPoints,
		scatterPlotShowGrid
	} from '$visualizations/scatter-plot/store';
	import ScatterPlot from '$visualizations/scatter-plot/ScatterPlot.svelte';

	const distributionOptions = scatterPlotDistributions.map((dist) => ({
		label: dist.charAt(0).toUpperCase() + dist.slice(1),
		value: dist
	}));
</script>

<ChartLayout
	controls={[
		{
			label: 'Distribution',
			type: 'radio',
			options: distributionOptions,
			writable: scatterPlotDistribution
		},
		{
			label: 'Number of Points',
			type: 'slider',
			min: 0,
			max: 1000,
			step: 10,
			writable: scatterPlotPoints,
			throttle: 100
		},
		{
			label: 'Point Radius',
			type: 'slider',
			min: 0,
			max: 30,
			writable: scatterPlotPointRadius,
			throttle: 100
		},
		{
			label: 'Show Grid',
			type: 'checkbox',
			writable: scatterPlotShowGrid
		}
	]}
>
	<div class="h-full pt-4">
		<Chart ml={40} mr={40} mb={40} mt={20} chart={ScatterPlot} />
	</div>
</ChartLayout>
