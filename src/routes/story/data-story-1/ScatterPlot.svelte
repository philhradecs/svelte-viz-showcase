<script lang="ts" context="module">
	export type ScatterPlotPoint = {
		x: number;
		y: number;
		z: string;
		[key: string]: any;
	};
	export type ScatterPlotData<T extends ScatterPlotPoint = ScatterPlotPoint> = T[];
	export type ScatterPlotOptions = {
		xDomain?: number[];
		yDomain?: number[];
		showGrid?: boolean;
		pointRadius?: number;
		getTooltipContent?: (d: any) => string;
	};
</script>

<script lang="ts">
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import 'd3-transition';

	import type { ChartProps } from '$components/chart/ChartRoot.svelte';
	import { schemeSpectral } from 'd3-scale-chromatic';

	import Axis from '$components/chart/Axis.svelte';

	type Point = $$Generic<ScatterPlotPoint>;
	export let config: ChartProps<ScatterPlotData<Point>> & ScatterPlotOptions;

	const colorScale = scaleOrdinal<string>()
		.range(schemeSpectral[11])
		.domain(config.data.map((d) => d.z));

	$: xScale = scaleLinear()
		.domain(config.xDomain || [0, 100])
		.range([0, config.width]);

	$: yScale = scaleLinear()
		.domain(config.yDomain || [0, 100])
		.range([config.height, 0]);
</script>

<Axis
	scale={xScale}
	height={config.height}
	width={config.width}
	position="bottom"
	transition={{ duration: 700 }}
	showGrid={config.showGrid}
/>
<Axis
	scale={yScale}
	height={config.height}
	width={config.width}
	position="left"
	transition={{ duration: 700 }}
	showGrid={config.showGrid}
/>

{#each config.data as point (point.z)}
	<circle
		r={config.pointRadius}
		cx={0}
		cy={0}
		transform="translate({xScale(point.x)}, {yScale(point.y)})"
		class="transition-[transform] duration-700 ease-[cubicOut]"
		fill={colorScale(point.z)}
		fill-opacity="0.6"
		stroke={colorScale(point.z)}
		data-tippy-content={config.getTooltipContent ? config.getTooltipContent(point) : undefined}
	/>
{/each}
