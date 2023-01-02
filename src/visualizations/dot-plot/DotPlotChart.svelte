<script lang="ts">
	import {
		max,
		extent,
		map,
		range,
		InternSet,
		group,
		min,
		groupSort,
		groups,
		InternMap
	} from 'd3-array';
	import 'd3-transition';
	import { axisTop } from 'd3-axis';
	import { scaleLinear, scaleOrdinal, scalePoint } from 'd3-scale';
	import { schemeSpectral } from 'd3-scale-chromatic';
	import { easeCubicIn } from 'd3-ease';
	import drawLegend from '../utility/legend';

	import { order } from '$visualizations/dot-plot/store';

	type DotPlotData = { population: number; state: string; age: string }[];

	import type { ChartProps } from '$components/chart/Chart.svelte';
	type $$Props = ChartProps<DotPlotData>;

	export let { data: unsortedData, width, height, root, svg, ml } = $$props as $$Props;

	const unsortedZDomain = new InternSet(map(unsortedData, (d) => d.age));
	const colors = schemeSpectral[unsortedZDomain.size];
	const colorScale = scaleOrdinal(unsortedZDomain, colors);

	$: {
		const data = groupSort(
			unsortedData,
			(D) =>
				$order === 'state' ? D[0].state : -(D.find((d) => d.age === $order)?.population || 0),
			(d) => d
		);

		const X = map(data, (d) => d.population);
		const Y = map(data, (d) => d.state);
		const Z = map(data, (d) => d.age);

		const xDomain = extent(X) as any;
		const yDomain = new InternSet(Y);
		const zDomain = new InternSet(Z);

		const I = range(X.length).filter((i) => yDomain.has(Y[i]) && zDomain.has(Z[i]));
		const indexGroups = groups(I, (i) => Y[i]);

		drawLegend(svg, colorScale, {
			title: 'Age and so on',
			marginLeft: ml,
			width: width,
			onClick: order.set,
			height: 55
		});

		const xScale = scaleLinear(xDomain, [0, width]);
		const yScale = scalePoint(yDomain, [0, height]).round(true).padding(0);
		const xAxis = axisTop(xScale).ticks(width / 80, '%');

		root
			.selectAll('g.axis')
			.data([data])
			.join('g')
			.classed('axis', true)
			.call(xAxis as any)
			.call((g) => g.select('.domain').remove())
			.call((g) => g.selectAll('.tick line').attr('y2', height).attr('stroke-opacity', 0.1))
			.call((g) =>
				g
					.selectAll('text.xAxisTitle')
					.data((d) => [d])
					.join('text')
					.classed('xAxisTitle', true)
					.attr('x', width)
					.attr('y', -22)
					.attr('fill', 'currentColor')
					.attr('text-anchor', 'end')
					.text('Population →')
			);

		const g = root
			.selectAll('g.groups')
			.data([data])
			.join('g')
			.classed('groups', true)
			.selectAll('g.group')
			.data(indexGroups, ([y]: any) => y)
			.join('g')
			.classed('group', true);

		g.transition()
			.duration(400)
			.attr('transform', ([y]) => `translate(0,${yScale(y)})`);

		g.selectAll('line')
			.data((d) => [d])
			.join('line')
			.classed('stroke-cyan-700', true)
			.attr('stroke-width', 1)
			.attr('stroke-linecap', 'round')
			.attr('stroke-opacity', 0.9)
			// .attr('x1', ([, I]) => xScale(X[I.find((i) => Z[i] === order) || 0]))
			// .attr('x2', ([, I]) => xScale(X[I.find((i) => Z[i] === order) || 0]))
			// .transition()
			// .ease(easeCubicIn)
			.attr('x1', ([, I]) => xScale(min(I, (i) => X[i]) as any))
			.attr('x2', ([, I]) => xScale(max(I, (i) => X[i]) as any));

		g.selectAll('circle')
			.data(([, I]) => I)
			.join('circle')
			.attr('cx', (i) => xScale(X[i]))
			.attr('fill', (i) => colorScale(Z[i]))
			.attr('r', (i) => ($order === Z[i] ? 4 : 3));

		g.selectAll('text')
			.data((d) => [d])
			.join('text')
			.attr('text-anchor', 'end')
			.attr('font-size', 10)
			.classed('stroke-gray-200', true)
			.attr('dy', '0.35em')
			.attr('x', ([, I]) => xScale(min(I, (i) => X[i]) as any) - 6)
			.text(([y]) => y);
	}
</script>
