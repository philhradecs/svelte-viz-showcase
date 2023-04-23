<script lang="ts" context="module">
	export type ScatterPlotData = { x: number; y: number; newspaper: string; year: number }[];
	export type ScatterPlotOptions = {
		xDomain?: number[];
		yDomain?: number[];
		showGrid?: boolean;
		pointRadius?: number;
	};
</script>

<script lang="ts">
	import { tweened } from 'svelte/motion';
	import * as easings from 'svelte/easing';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import 'd3-transition';

	import type { ChartProps } from '$components/chart/ChartRoot.svelte';
	import { schemeSpectral } from 'd3-scale-chromatic';

	import { axisBottom, axisLeft } from 'd3-axis';
	import { format } from 'd3-format';

	export let config: ChartProps<ScatterPlotData> & ScatterPlotOptions;

	const colorScale = scaleOrdinal<string>()
		.range(schemeSpectral[11])
		.domain(config.data.map((d) => d.newspaper));

	$: xScale = scaleLinear()
		.domain(config.xDomain || [0, 100])
		.range([0, config.width]);

	$: yScale = scaleLinear()
		.domain(config.yDomain || [0, 100])
		.range([config.height, 0]);

	$: scaledData = config.data.map((d) => ({
		...d,
		x: xScale(d.x),
		y: yScale(d.y),
		r: config.pointRadius || 5
	}));

	const tweenedData = tweened(scaledData, {
		delay: 0,
		duration: 750,
		easing: easings.cubicOut
	});

	$: {
		tweenedData.set(scaledData).then(() => config.registerTooltip('circle', { allowHTML: true }));
	}
	$: {
		config.root
			.selectAll('g.axisLeft')
			.data([config.data])
			.join('g')
			.classed('axisLeft', true)
			.call((el) =>
				el
					.transition()
					.ease(easings.cubicOut)
					.duration(750)
					.call(axisLeft(yScale).tickSizeOuter(0) as any)
					.call((g) =>
						g
							.selectAll('.axisLeft .tick line')
							.attr('x2', config.width)
							.attr('stroke-opacity', config.showGrid ? 0.05 : 0)
					)
			)
			.call((g) => g.select('.domain').remove());

		config.root
			.selectAll('g.axisBottom')
			.data([scaledData])
			.join('g')
			.classed('axisBottom', true)
			.attr('transform', `translate(0,${config.height})`)
			.call((el) =>
				el
					.transition()
					.ease(easings.cubicOut)
					.duration(750)
					.call(axisBottom(xScale).tickSizeOuter(0) as any)
					.call((g) =>
						g
							.selectAll('.axisBottom .tick line')
							.attr('y2', -config.height)
							.attr('stroke-opacity', config.showGrid ? 0.05 : 0)
					)
			)
			.call((g) => g.select('.domain').remove());
	}
</script>

{#each $tweenedData as point (point.newspaper)}
	<circle
		r={config.pointRadius}
		cx={point.x}
		cy={point.y}
		fill={colorScale(point.newspaper)}
		fill-opacity="0.6"
		stroke={colorScale(point.newspaper)}
		data-tippy-content={`<strong>${point.newspaper}</strong><br>Daily Circulation: <strong>${format(
			','
		)(point.x)}</strong><br>Pulitzer Winners and Finalists: <strong>${point.y}</strong>`}
	/>
{/each}
