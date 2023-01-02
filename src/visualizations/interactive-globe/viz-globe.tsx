import { max, extent } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { atom, useAtomValue } from 'jotai';
import { memo, useEffect } from 'react';
import type { ChartProps } from '$components/chart/SvgWrapper.svelte';

export const toggleAtom = atom(false);
export const colorAtom = atom('red');

type GlobeChartData = any;

export const GlobeChart = memo(function GlobeChart({
	root,
	width,
	height,
	data
}: ChartProps<GlobeChartData>) {
	// const toggleValue = useAtomValue(toggleAtom)
	// const colorValue = useAtomValue(colorAtom)

	// useEffect(() => {
	//   const xAccessor = (d: typeof data[number]) => d.x
	//   const yAccessor = (d: typeof data[number]) => d.y

	//   const yScale = scaleLinear()
	//     .domain([0, max(data, yAccessor)] as any)
	//     .range([height, 0])
	//     .nice()

	//   const xScale = scaleLinear()
	//     .domain(extent(data, xAccessor) as any)
	//     .range([0, width])

	//   const lineGenerator = line<typeof data[number]>()
	//     .x((d) => xScale(xAccessor(d)))
	//     .y((d) => yScale(yAccessor(d)))

	//   root
	//     .selectAll('g.axisLeft')
	//     .data([data])
	//     .join('g')
	//     .classed('axisLeft', true)
	//     .call(axisLeft(yScale) as any)
	//   root
	//     .selectAll('g.axisBottom')
	//     .data([data])
	//     .join('g')
	//     .classed('axisBottom', true)
	//     .attr('transform', `translate(0,${height})`)
	//     .call(axisBottom(xScale) as any)

	//   root
	//     .selectAll('g.line')
	//     .data([data])
	//     .join('g')
	//     .classed('line', true)
	//     .selectAll('path')
	//     .data([data])
	//     .join('path')
	//     .attr('fill', 'none')
	//     .attr('stroke', toggleValue ? colorValue : '#30475e')
	//     .attr('stroke-width', 2)
	//     .attr('d', lineGenerator)
	// }, [colorValue, data, height, root, toggleValue, width])

	return <text stroke="white">Globe Chart</text>;
});
