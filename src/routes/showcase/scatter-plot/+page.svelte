<script lang="ts" context="module">
	import { randomUniform, randomNormal, randomBates, randomPoisson } from 'd3-random';
	import { extent, max, min, range, zip } from 'd3-array';

	export const scatterPlotDistributions = ['uniform', 'normal', 'bates', 'poisson'] as const;

	export type ScatterPlotDistribution = (typeof scatterPlotDistributions)[number];

	const randomFnMap = {
		uniform: randomUniform(),
		normal: randomNormal(),
		bates: randomBates(200),
		poisson: randomPoisson(10)
	} satisfies Record<ScatterPlotDistribution, () => number>;

	export function generateScatterplotData(
		distribution: ScatterPlotDistribution,
		numPoints: number
	) {
		const randomFn = randomFnMap[distribution];
		const X = range(numPoints).map(randomFn);
		const Y = range(numPoints).map(randomFn);
		const [minX = 0, maxX = 0] = extent(X);
		const [minY = 0, maxY = 0] = extent(Y);

		const scaleToRange = scaleLinear()
			.range([0, 100])
			.domain([min([minX, minY]) || 0, max([maxX, maxY]) || 0]);
		const scaledX = X.map(scaleToRange);
		const scaledY = Y.map(scaleToRange);

		return zip(scaledX, scaledY) as [x: number, y: number][];
	}
</script>

<script lang="ts">
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import ScatterPlot from '$visualizations/scatter-plot/ScatterPlot.svelte';
	import { scaleLinear } from 'd3-scale';
	import { writable } from 'svelte/store';

	const scatterPlotDistribution = writable<ScatterPlotDistribution>('normal');
	const scatterPlotPoints = writable(300);
	const scatterPlotPointRadius = writable(5);
	const scatterPlotShowGrid = writable(false);

	const distributionOptions = scatterPlotDistributions.map((dist) => ({
		label: dist.charAt(0).toUpperCase() + dist.slice(1),
		value: dist
	}));

	$: data = generateScatterplotData($scatterPlotDistribution, $scatterPlotPoints);
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
		<Chart
			ml={40}
			mr={40}
			mb={40}
			mt={20}
			chart={ScatterPlot}
			{data}
			extraConfig={{ pointRadius: $scatterPlotPointRadius, showGrid: $scatterPlotShowGrid }}
		/>
	</div>
</ChartLayout>
