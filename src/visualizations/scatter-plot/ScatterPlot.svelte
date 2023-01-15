<script lang="ts" context="module">
	import type { ScatterPlotDistribution } from './store';
	type ScatterPlotData = [x: number, y: number][];
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
	import { scaleLinear } from 'd3-scale';
	import { extent, max, min, range, zip } from 'd3-array';
	import 'd3-transition';
	import { randomUniform, randomNormal, randomBates, randomPoisson } from 'd3-random';
	import {
		scatterPlotDistribution,
		scatterPlotPoints,
		scatterPlotPointRadius,
		scatterPlotShowGrid
	} from './store';
	// import SVGAxis from './SVGAxis.svelte';

	import type { ChartProps } from '$components/chart/Chart.svelte';
	import { schemeSpectral } from 'd3-scale-chromatic';

	import { axisBottom, axisLeft } from 'd3-axis';

	export let config: ChartProps;
	$: ({ root, registerTooltip, height, width } = config);

	$: data = generateData($scatterPlotDistribution, $scatterPlotPoints);

	function generateData(distribution: typeof $scatterPlotDistribution, numPoints: number) {
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

	$: xScale = scaleLinear().domain([0, 100]).range([0, config.width]);

	$: yScale = scaleLinear().domain([0, 100]).range([config.height, 0]);

	$: {
		root
			.selectAll('g.axisLeft')
			.data([data])
			.join('g')
			.classed('axisLeft', true)
			.call(axisLeft(yScale).tickSizeOuter(0) as any)
			.call((g) => g.select('.domain').remove())
			.call((g) =>
				g
					.selectAll('.axisLeft .tick line')
					.attr('x2', width)
					.attr('stroke-opacity', $scatterPlotShowGrid ? 0.05 : 0)
			);

		root
			.selectAll('g.axisBottom')
			.data([data])
			.join('g')
			.classed('axisBottom', true)
			.attr('transform', `translate(0,${height})`)
			.call(axisBottom(xScale).tickSizeOuter(0) as any)
			.call((g) => g.select('.domain').remove())
			.call((g) =>
				g
					.selectAll('.axisBottom .tick line')
					.attr('y2', -height)
					.attr('stroke-opacity', $scatterPlotShowGrid ? 0.05 : 0)
			)
			.call((g) =>
				g.selectAll('.axisBottom .tick').attr('data-tippy-content', (d) => JSON.stringify(d))
			);

		registerTooltip('.axisBottom .tick');
	}

	$: {
		root
			.selectAll('circle')
			.data(data)
			.join('circle')
			.transition()
			.duration(400)
			.attr('r', $scatterPlotPointRadius)
			.attr('cx', (d) => xScale(d[0]))
			.attr('cy', (d) => yScale(d[1]))
			.attr('fill', (d, i) => schemeSpectral[11][i % 11])
			.attr('fill-opacity', 0.6)
			.attr('stroke', (d, i) => schemeSpectral[11][i % 11])
			.attr('data-tippy-content', (d) => d[0]);

		registerTooltip('circle');
	}
</script>
