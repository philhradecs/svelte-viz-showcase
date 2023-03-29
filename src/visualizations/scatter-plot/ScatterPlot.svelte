<script lang="ts" context="module">
	export type ScatterPlotData = [x: number, y: number][];
</script>

<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import 'd3-transition';

	import type { ChartProps } from '$components/chart/ChartRoot.svelte';
	import { schemeSpectral } from 'd3-scale-chromatic';

	import { axisBottom, axisLeft } from 'd3-axis';
	import { format } from 'd3-format';
	import { onMount } from 'svelte';

	export let config: ChartProps<ScatterPlotData> & {
		xDomain?: number[];
		yDomain?: number[];
		showGrid?: boolean;
		pointRadius?: number;
	};

	$: ({ root, registerTooltip, height, width, data, showGrid, pointRadius = 5 } = config);

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
			.call((el) => el.transition().call(axisLeft(yScale).tickSizeOuter(0) as any))
			.call((g) => g.select('.domain').remove())
			.call((g) =>
				g
					.selectAll('.axisLeft .tick line')
					.attr('x2', width)
					.attr('stroke-opacity', showGrid ? 0.05 : 0)
			);

		root
			.selectAll('g.axisBottom')
			.data([data])
			.join('g')
			.classed('axisBottom', true)
			.attr('transform', `translate(0,${height})`)
			.call((el) => el.transition().call(axisBottom(xScale).tickSizeOuter(0) as any))
			.call((g) => g.select('.domain').remove())
			.call((g) =>
				g
					.selectAll('.axisBottom .tick line')
					.attr('y2', -height)
					.attr('stroke-opacity', showGrid ? 0.05 : 0)
			);
	}

	const formatNumber = format('.2f');
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
			.attr('r', pointRadius)
			.attr('cx', (d) => xScale(d[0]))
			.attr('cy', (d) => yScale(d[1]))
			.attr('fill', (d, i) => schemeSpectral[11][i % 11])
			.attr('fill-opacity', 0.6)
			.attr('stroke', (d, i) => schemeSpectral[11][i % 11])
			.attr(
				'data-tippy-content',
				(d) =>
					`x: <strong>${formatNumber(d[0])}</strong><br>y: <strong>${formatNumber(d[1])}</strong>`
			)
			.end()
			.then(
				() => registerTooltip('circle', { allowHTML: true }),
				() => {}
			);
	}
</script>
