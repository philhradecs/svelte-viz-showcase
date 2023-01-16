<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import type { ChartProps } from '$components/chart/Chart.svelte';
	import type { HierarchyRectangularNode } from 'd3-hierarchy';
	import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
	import type { BaseType, Selection } from 'd3-selection';
	import { format } from 'd3-format';
	import { createId } from '@paralleldrive/cuid2';
	import 'd3-transition';
	import { interpolate } from 'd3-interpolate';
	import type { Transition } from 'd3-transition';

	type TreemapNode = {
		children?: TreemapNode[];
	};
	type HierarchyNodeDatum = {
		name: string;
		leafUid?: string;
		clipUid?: string;
	};
	type HierarchyNode = HierarchyRectangularNode<HierarchyNodeDatum>;

	type GroupSelection = Selection<
		SVGGElement | BaseType,
		HierarchyRectangularNode<any>,
		SVGGElement,
		any
	>;

	export let config: ChartProps<TreemapNode>;

	$: ({ root: chartRoot, registerTooltip } = config);

	$: treemapData = calculateTreemap(config.data, config.width, config.height);
	const formatNumber = format(',d');

	$: x = scaleLinear().rangeRound([0, config.width]);
	$: y = scaleLinear().rangeRound([0, config.height]);

	let treemapLevel: GroupSelection;
	$: treemapLevel = chartRoot
		.selectAll('g.group')
		.data([treemapData])
		.join<BaseType>('g')
		.classed('group', true)
		.call((el) => render(el, treemapData, x, y));

	function render(group: GroupSelection, root: HierarchyNode, x: any, y: any) {
		const node = group
			.selectAll('g.tile')
			.data(root.children?.concat(root) || [])
			.join((enter) => {
				return enter.append('g').attr('class', (d) => (d === root ? 'tile header' : 'tile'));
			})
			.attr(
				'data-tippy-content',
				(d) =>
					`${getName(d)}\n${formatNumber(d.value || 0)}<br>${
						d.children ? `${d.children.length} children` : 'Leaf Node'
					}`
			);

		registerTooltip('g.tile', { allowHTML: true });

		node
			.filter((d) => (d === root ? !!d.parent : !!d.children))
			.attr('cursor', 'pointer')
			.on('click', (event, d) => (d === root ? zoomout(root) : zoomin(d)));

		node
			.append('rect')
			.attr('id', (d) => (d.data.leafUid = createId()))
			.attr('class', (d) => {
				return d === root ? 'fill-gray-900' : d.children ? 'fill-teal-900' : 'fill-stone-800';
			})
			.classed('stroke-bg-primary', true)
			.attr('stroke-width', 1);

		node
			.append('clipPath')
			.attr('id', (d) => (d.data.clipUid = createId()))
			.append('use')
			.attr('href', (d) => `#${d.data.leafUid}`);

		node
			.append('text')
			.attr('clip-path', (d) => `url(#${d.data.clipUid})`)
			.attr('font-weight', (d) => (d === root ? 'bold' : null))
			.classed('fill-white', true)
			.selectAll('tspan')
			.data((d) => {
				const title = d === root ? getName(d) : d.data.name;
				return [title, formatNumber(d.value || 0)];
			})
			.join('tspan')
			.attr('x', 8)
			.attr('y', (d, i, nodes) => `${Number(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
			.attr('fill-opacity', (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
			.attr('font-weight', (d, i, nodes) => (i === nodes.length - 1 ? 'normal' : null))
			.text((d) => d);

		group.call(position, root, x, y);
	}

	// When zooming in, draw the new nodes on top, and fade them in.

	function position(
		group:
			| GroupSelection
			| Transition<SVGGElement | BaseType, HierarchyRectangularNode<any>, SVGGElement, any>,
		root: HierarchyNode,
		x: any,
		y: any
	) {
		(
			group as GroupSelection &
				Transition<SVGGElement | BaseType, HierarchyRectangularNode<any>, SVGGElement, any>
		)
			.selectAll<SVGGElement, HierarchyNode>('g.tile')
			.attr('transform', (d) => {
				return d === root ? `translate(0,-50)` : `translate(${x(d.x0)},${y(d.y0)})`;
			})
			.select('rect')
			.attr('width', (d) => (d === root ? config.width : x(d.x1) - x(d.x0)))
			.attr('height', (d) => (d === root ? 50 : y(d.y1) - y(d.y0)));
	}

	function zoomin(d: HierarchyRectangularNode<any>) {
		if (!treemapLevel) return;
		const group0 = treemapLevel.attr('pointer-events', 'none');
		const clientRect = (group0.node() as SVGGElement).getBBox();

		const updatedXScale = x.copy().domain([d.x0, d.x1]);
		const updatedYScale = y.copy().domain([d.y0, d.y1]);

		// chartRoot.attr('clip-path', `url(#clip-test)`)
		chartRoot
			.selectAll('#clip-test')
			.data([treemapLevel])
			.join((enter) =>
				enter
					.append('clipPath')
					.attr('id', 'clip-test')
					.append('rect')
					.attr('width', clientRect.width)
					.attr('height', clientRect.height)
					.attr('x', clientRect.x)
					.attr('y', clientRect.y)
			);

		treemapLevel = chartRoot
			.data([d])
			.insert<BaseType>('g', '*')
			.classed('group', true)
			.call(render, d, updatedXScale, updatedYScale);

		const group1 = treemapLevel;

		chartRoot
			.attr('clip-path', `url(#clip-test)`)
			.transition()
			.duration(750)
			.call((t: any) =>
				group0
					.transition(t)
					.remove()
					.call(position, d.parent, updatedXScale, updatedYScale)
					.attrTween('opacity', () => interpolate(1, 0) as any)
			)
			.call((t: any) =>
				group1
					?.transition(t)
					.attrTween('opacity', () => interpolate(0, 1) as any)
					.call(position, d, updatedXScale, updatedYScale)
			);
	}

	function zoomout(d: HierarchyNode) {
		if (!treemapLevel || !d.parent) {
			return;
		}

		const parent = d.parent;

		const group0 = treemapLevel.attr('pointer-events', 'none');
		group0.select('.tile.header').remove();

		const updatedXScale = x.copy().domain([parent.x0, parent.x1]);
		const updatedYScale = y.copy().domain([parent.y0, parent.y1]);

		treemapLevel = chartRoot
			.data([d])
			.insert<BaseType>('g', '*')
			.classed('group', true)
			.call((el) => render(el, parent, updatedXScale, updatedYScale));

		const group1 = treemapLevel;

		chartRoot
			.transition()
			.duration(750)
			.call((t: any) => {
				group0
					.transition(t)
					.remove()
					.attrTween('opacity', () => interpolate(1, 0) as any)
					.call(position, parent, updatedXScale, updatedYScale);
			})
			.call((t: any) => group1.transition(t).call(position, parent, updatedXScale, updatedYScale));
	}

	function calculateTreemap(data: TreemapNode, width: number, height: number) {
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
	}

	function getName(d: HierarchyNode) {
		return d
			.ancestors()
			.reverse()
			.map((d) => d.data.name)
			.join(' / ');
	}
</script>
