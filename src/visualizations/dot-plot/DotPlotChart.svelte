<script lang="ts">
	import { max, extent, map, range, InternSet, group, min, groupSort } from 'd3-array';
	import 'd3-transition';
	import { axisTop } from 'd3-axis';
	import { scaleLinear, scaleOrdinal, scalePoint } from 'd3-scale';
	import { schemeSpectral } from 'd3-scale-chromatic';
	import drawLegend from '../utility/legend';

	type DotPlotData = { population: number; state: string; age: string }[];

	import type { ChartProps } from '$components/chart/Chart.svelte';
	import { select } from 'd3-selection';
	import { page } from '$app/stores';
	import { format } from 'd3-format';
	import { writable, type Writable } from 'svelte/store';

	const orderOptions = $page.data.orderOptions as { label: string; value: string }[];
	export let config: ChartProps<DotPlotData> & {
		order?: Writable<string>;
		transitionDelay?: number;
		transitionDuration?: number;
		highlightColor?: string;
	};

	$: ({
		data: unsortedData,
		root,
		svg,
		ml,
		registerTooltip,
		order = writable('state'),
		transitionDelay = 35,
		transitionDuration = 550,
		highlightColor = ''
	} = config);

	$: unsortedZDomain = new InternSet(map(unsortedData, (d) => d.age));
	$: colors = schemeSpectral[unsortedZDomain.size];
	$: colorScale = scaleOrdinal(unsortedZDomain, colors);

	let trigger = false;
	$: {
		if (trigger && orderOptions) {
			highlightColor;
			transitionDelay;
			transitionDuration;
			order.update((currentValue) => {
				const currentOptionIdx = orderOptions.findIndex((d) => d.value === currentValue);
				const nextOptionIdx = (currentOptionIdx + 1) % (orderOptions.length - 1);
				return orderOptions[nextOptionIdx].value;
			});
		}
		trigger = true;
	}

	$: data = groupSort(
		unsortedData,
		(D) => ($order === 'state' ? D[0].state : -(D.find((d) => d.age === $order)?.population || 0)),
		(d) => d
	);

	$: X = map(data, (d) => d.population);
	$: Y = map(data, (d) => d.state);
	$: Z = map(data, (d) => d.age);
	$: xDomain = extent(X) as any;
	$: yDomain = new InternSet(Y);
	$: zDomain = new InternSet(Z);
	$: I = range(X.length).filter((i) => yDomain.has(Y[i]) && zDomain.has(Z[i]));
	$: indexGroups = group(I, (i) => Y[i]);

	// let yScalePrev: ScalePoint<string> | null = null;

	$: {
		const { width, height } = config;
		drawLegend(svg, colorScale, {
			title: 'Age (years)',
			marginLeft: ml,
			width: width + ml,
			onClick: order.set,
			selected: $order,
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

		g
			// .sort(([stateA], [stateB]) =>
			// 	yScalePrev ? ascending(yScalePrev(stateA), yScalePrev(stateB)) : 0
			// )
			.transition()
			.attr('opacity', 0.2)
			.each(([y], i, nodes) => {
				select(nodes[i])
					.call(async (el) => {
						el.transition()
							.duration(transitionDuration * 0.1)
							.delay(i * transitionDelay)
							.attr('opacity', 1)
							.call((t) =>
								t
									.selectAll('line')
									.transition()
									.duration(transitionDuration * 0.1)
									.style('stroke', highlightColor)
							)
							.transition()
							.delay(transitionDuration * 0.8)
							.duration(transitionDuration * 0.3)
							.attr('opacity', 0.6)
							.call((t) =>
								t
									.selectAll('line')
									.transition()
									.duration(transitionDuration * 0.1)
									.style('stroke', null)
							);
					})
					.transition('transform')
					.duration(transitionDuration)
					.delay(i * transitionDelay + transitionDuration * 0.2)
					.attr('transform', `translate(0,${yScale(y)})`);
			})
			.transition()
			.delay(indexGroups.size * transitionDelay + transitionDuration / 3)
			.attr('opacity', 1);

		g.selectAll('line')
			.data((d) => [d])
			.join('line')
			.classed('stroke-cyan-600', true)
			.attr('stroke-width', 1)
			.attr('stroke-linecap', 'round')
			.attr('stroke-opacity', 0.9)
			.attr('x1', ([, I]) => xScale(min(I, (i) => X[i]) as any))
			.attr('x2', ([, I]) => xScale(max(I, (i) => X[i]) as any));

		g.selectAll('circle')
			.data(([, I]) => I)
			.join('circle')
			.attr('cx', (i) => xScale(X[i]))
			.attr('fill', (i) => colorScale(Z[i]))
			.attr('r', (i) => ($order === Z[i] ? 4 : 3))
			.attr(
				'data-tippy-content',
				(i) =>
					`State: <strong>${Y[i]}</strong><br>Age Group: <strong>${
						Z[i]
					}</strong><br>Portion: <strong>${format('.2%')(X[i])}</strong>`
			);

		registerTooltip('circle', { allowHTML: true });

		g.selectAll('text')
			.data((d) => [d])
			.join('text')
			.attr('text-anchor', 'end')
			.attr('font-size', 10)
			.classed('stroke-gray-200', true)
			.attr('dy', '0.35em')
			.attr('x', ([, I]) => xScale(min(I, (i) => X[i]) as any) - 6)
			.text(([y]) => y);

		// yScalePrev = yScale.copy();
	}
</script>
