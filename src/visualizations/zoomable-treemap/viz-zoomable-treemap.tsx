import { max, extent } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { atom, useAtomValue } from 'jotai';
import { memo, useCallback, useEffect, useRef } from 'react';
import type { ChartProps } from '$components/chart/SvgWrapper.svelte';
import type { HierarchyRectangularNode } from 'd3-hierarchy';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import type { Selection, BaseType } from 'd3-selection';
import { selectAll } from 'd3-selection';
import { format } from 'd3-format';
import { createId } from '@paralleldrive/cuid2';
import 'd3-transition';
import { interpolate } from 'd3-interpolate';
import type { Transition } from 'd3-transition';
import { transition } from 'd3-transition';

export const toggleAtom = atom(false);
export const colorAtom = atom('red');

type TreemapNode = {
	children?: TreemapNode[];
};
type HierarchyNodeDatum = {
	value: number;
	name: string;
	leafUid?: string;
	clipUid?: string;
};
type HierarchyNode = HierarchyRectangularNode<HierarchyNodeDatum>;

type GroupSelection = Selection<SVGGElement, HierarchyRectangularNode<any>, SVGGElement, any>;

export const Treemap = memo(function Treemap({
	root: chartRoot,
	width,
	height,
	data
}: ChartProps<TreemapNode>) {
	const toggleValue = useAtomValue(toggleAtom);
	const colorValue = useAtomValue(colorAtom);

	const treemapLevel = useRef<GroupSelection | null>(null);

	useEffect(() => {
		const x = scaleLinear().rangeRound([0, width]);
		const y = scaleLinear().rangeRound([0, height]);

		const treemapData = calculateTreemap(data, width, height);

		if (!treemapLevel.current) {
			treemapLevel.current = chartRoot
				.selectAll('g.group')
				.data([treemapData])
				.join((enter) => {
					return enter
						.append<SVGGElement>('g')
						.classed('group', true)
						.call((el) => render(el, treemapData, x, y));
				});
		}

		function render(group: GroupSelection, root: HierarchyNode, x: any, y: any) {
			const node = group
				.selectAll('g.tile')
				.data(root.children?.concat(root) || [])
				.join((enter) => {
					return enter.append('g').classed('tile', true);
				});

			node
				.filter((d) => (d === root ? !!d.parent : !!d.children))
				.attr('cursor', 'pointer')
				.on('click', (event, d) => {
					// console.log(d)
					return d === root ? zoomout(root) : zoomin(d);
				});

			node.append('title').text((d) => `${getName(d)}\n${formatValue(d.value)}`);

			node
				.append('rect')
				.attr('id', (d) => (d.data.leafUid = createId()))
				.attr('fill', (d) => {
					return d === root ? '#fff' : d.children ? '#ccc' : '#ddd';
				})
				.attr('stroke', '#fff');

			node
				.append('clipPath')
				.attr('id', (d) => (d.data.clipUid = createId()))
				.append('use')
				.attr('href', (d) => `#${d.data.leafUid}`);

			node
				.append('text')
				.attr('clip-path', (d) => `url(#${d.data.clipUid})`)
				.attr('font-weight', (d) => (d === root ? 'bold' : null))
				.attr('fill', 'black')
				.selectAll('tspan')
				.data((d) => {
					return (d === root ? getName(d) : d.data.name)
						.split(/(?=[A-Z][^A-Z])/g)
						.concat(formatValue(d.value || 0));
				})
				.join('tspan')
				.attr('x', 3)
				.attr('y', (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
				.attr('fill-opacity', (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
				.attr('font-weight', (d, i, nodes) => (i === nodes.length - 1 ? 'normal' : null))
				.text((d) => d);

			group.call(position, root, x, y);
		}

		function position(
			group: GroupSelection &
				Transition<SVGGElement, HierarchyRectangularNode<any>, SVGGElement, any>,
			root: HierarchyNode,
			x: any,
			y: any
		) {
			group
				.selectAll<SVGGElement, HierarchyRectangularNode<any>>('g')
				.attr('transform', (d) => {
					return d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`;
				})
				.select('rect')
				.attr('width', (d) => (d === root ? width : x(d.x1) - x(d.x0)))
				.attr('height', (d) => (d === root ? 30 : y(d.y1) - y(d.y0)));
		}

		// When zooming in, draw the new nodes on top, and fade them in.
		function zoomin(d: HierarchyRectangularNode<any>) {
			if (!treemapLevel.current) return;

			const group0 = treemapLevel.current.attr('pointer-events', 'none');

			const clientRect = group0.node()?.getBBox();

			const clipPath = chartRoot
				.selectAll('#clip-test')
				.data([treemapLevel.current])
				.join('clipPath')
				.attr('id', 'clip-test')
				.append('rect')
				.attr('width', clientRect.width)
				.attr('height', clientRect.height)
				.attr('x', clientRect.x)
				.attr('y', clientRect.y);

			const updatedXScale = x.copy().domain([d.x0, d.x1]);
			const updatedYScale = y.copy().domain([d.y0, d.y1]);

			treemapLevel.current = chartRoot
				.data([d])
				.insert('g', '*')
				.classed('group', true)
				.call(render, d, updatedXScale, updatedYScale);

			const group1 = treemapLevel.current;

			chartRoot
				.attr('clip-path', `url(#clip-test)`)

				.transition()
				.duration(750)
				.call((t: any) =>
					group0.transition(t).remove().call(position, d.parent, updatedXScale, updatedYScale)
				)
				.call((t: any) =>
					group1
						?.transition(t)
						.attrTween('opacity', () => interpolate(0, 1))
						.call(position, d, updatedXScale, updatedYScale)
				);
		}

		function zoomout(d: HierarchyRectangularNode<any>) {
			if (!treemapLevel.current) return;

			const group0 = treemapLevel.current.attr('pointer-events', 'none');

			const updatedXScale = x.copy().domain([d.parent?.x0 || 0, d.parent?.x1 || 0]);
			const updatedYScale = y.copy().domain([d.parent?.y0 || 0, d.parent?.y1 || 0]);

			treemapLevel.current = chartRoot
				.data([d])
				.insert('g', '*')
				.classed('group', true)
				.call(render, d.parent, updatedXScale, updatedYScale);

			const group1 = treemapLevel.current;

			chartRoot
				.transition()
				.duration(750)
				.call((t: any) =>
					group0
						.transition(t)
						.remove()
						.attrTween('opacity', () => interpolate(1, 0))
						.call(position, d)
				)
				.call((t) => group1.transition(t).call(position, d.parent));
		}
	}, [chartRoot, colorValue, data, height, toggleValue, width]);

	return null;
});

const calculateTreemap = (data: TreemapNode, width: number, height: number) => {
	const tile = (
		node: HierarchyRectangularNode<any>,
		x0: number,
		y0: number,
		x1: number,
		y1: number
	) => {
		treemapBinary(node, 0, 0, width, height);
		if (node.children) {
			for (const child of node.children) {
				child.x0 = x0 + (child.x0 / width) * (x1 - x0);
				child.x1 = x0 + (child.x1 / width) * (x1 - x0);
				child.y0 = y0 + (child.y0 / height) * (y1 - y0);
				child.y1 = y0 + (child.y1 / height) * (y1 - y0);
			}
		}
	};

	const hierarchyData = hierarchy(data)
		.sum((d: any) => d.value ?? 0)
		.sort((a, b) =>
			typeof b.value === 'number' && typeof a.value === 'number' ? b.value - a.value : 0
		);
	return treemap<any>().tile(tile)(hierarchyData);
};

const getName = (d: HierarchyNode) => d.data.name;
// d
//   .ancestors()
//   .reverse()
//   .map((d) => d.data.name)
//   .join('/')

const formatValue = format(',d');
