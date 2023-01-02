<script lang="ts" context="module">
	import type { Selection } from 'd3-selection';
	export type Margin = {
		mt: number;
		mr: number;
		mb: number;
		ml: number;
	};
	export type ChartBaseProps = {
		svg: Selection<SVGSVGElement, unknown, any, undefined>;
		root: Selection<SVGGElement, unknown, any, undefined>;
		width: number;
		height: number;
	} & Margin;

	export type ChartProps<T = unknown> = ChartBaseProps & { data: T };
</script>

<script lang="ts">
	import { select } from 'd3-selection';
	import type { ComponentType } from 'svelte';

	import ContourChart from '$visualizations/contour/ContourChart.svelte';
	import LineChart from '$visualizations/line-chart/LineChart.svelte';
	import DotPlotChart from '$visualizations/dot-plot/DotPlotChart.svelte';

	export let mt: number = 20;
	export let mr: number = 50;
	export let mb: number = 30;
	export let ml: number = 50;
	export let data: any;

	export let chartType: 'contour' | 'line' | 'dotPlot' = 'line';

	let charts = {
		line: LineChart,
		contour: ContourChart,
		dotPlot: DotPlotChart
	} satisfies Record<typeof chartType, ComponentType>;

	let component = charts[chartType];

	let svg: SVGSVGElement | undefined = undefined;
	let chart: SVGGElement | undefined = undefined;
	let clientWidth = 0;
	let clientHeight = 0;

	let debounced = { clientWidth, clientHeight };

	let timeoutHandle = '';
	$: {
		clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(() => {
			debounced = { clientWidth, clientHeight };
		}, 200);
	}

	$: svgSelection = svg ? select<SVGSVGElement, any>(svg) : undefined;
	$: chartSelection = chart ? select<SVGGElement, any>(chart) : undefined;
	$: config =
		svgSelection && chartSelection
			? {
					mt,
					mr,
					mb,
					ml,
					svg: svgSelection,
					root: chartSelection,
					width: debounced.clientWidth - (ml + mr),
					height: debounced.clientHeight - (mt + mb),
					data
			  }
			: undefined;
</script>

<div bind:clientWidth bind:clientHeight class="relative h-full max-w-full overflow-hidden">
	{#if debounced.clientWidth > 0 && debounced.clientHeight > 0}
		<svg
			bind:this={svg}
			width={debounced.clientWidth}
			height={clientHeight}
			viewBox={`0 0 ${debounced.clientWidth} ${debounced.clientHeight}`}
			stroke-linejoin="round"
			fill="none"
			class="absolute inset-0"
		>
			<g bind:this={chart} transform={`translate(${ml}, ${mt})`}>
				{#if config}
					<svelte:component this={component} {config} />
				{/if}
			</g>
		</svg>
	{/if}
</div>
