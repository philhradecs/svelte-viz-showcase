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
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import 'd3-transition';

	import type { ChartProps } from '$components/chart/ChartRoot.svelte';
	import { schemeSpectral } from 'd3-scale-chromatic';

	import { axisBottom, axisLeft } from 'd3-axis';
	import { format } from 'd3-format';

	export let config: ChartProps<ScatterPlotData> & ScatterPlotOptions;

	const colorScale = scaleOrdinal()
		.range(schemeSpectral[11])
		.domain(config.data.map((d) => d.newspaper));

	$: ({ root, registerTooltip, height, width, data, showGrid = false, pointRadius = 5 } = config);

	$: xScale = scaleLinear()
		.domain(config.xDomain || [0, 100])
		.range([0, config.width]);

	$: yScale = scaleLinear()
		.domain(config.yDomain || [0, 100])
		.range([config.height, 0]);
	$: {
		root
			.selectAll('g.axisLeft')
			.data([data])
			.join('g')
			.classed('axisLeft', true)
			.call((el) =>
				el
					.transition()
					.call(axisLeft(yScale).tickSizeOuter(0) as any)
					.call((g) =>
						g
							.selectAll('.axisLeft .tick line')
							.attr('x2', width)
							.attr('stroke-opacity', showGrid ? 0.05 : 0)
					)
			)
			.call((g) => g.select('.domain').remove());

		root
			.selectAll('g.axisBottom')
			.data([data])
			.join('g')
			.classed('axisBottom', true)
			.attr('transform', `translate(0,${height})`)
			.call((el) =>
				el
					.transition()
					.call(axisBottom(xScale).tickSizeOuter(0) as any)
					.call((g) =>
						g
							.selectAll('.axisBottom .tick line')
							.attr('y2', -height)
							.attr('stroke-opacity', showGrid ? 0.05 : 0)
					)
			)
			.call((g) => g.select('.domain').remove());
	}

	$: {
		root
			.selectAll('circle')
			.data(data)
			.join(
				'circle',
				(d) => d,
				(exit) => exit.transition().style('opacity', 0).remove()
			)
			.transition()
			.duration(400)
			.attr('r', pointRadius)
			.attr('cx', (d) => xScale(d.x))
			.attr('cy', (d) => yScale(d.y))
			.attr('fill', (d, i) => colorScale(d.newspaper) as any)
			.attr('fill-opacity', 0.6)
			.attr('stroke', (d, i) => colorScale(d.newspaper) as any)
			.attr(
				'data-tippy-content',
				(d) =>
					`<strong>${d.newspaper}</strong><br>
					Daily Circulation: <strong>${format(',')(d.x)}</strong><br>
					Pulitzer Winners and Finalists: <strong>${d.y}</strong>`
			)
			.end()
			.then(
				() => registerTooltip('circle', { allowHTML: true }),
				() => {}
			);
	}
</script>
