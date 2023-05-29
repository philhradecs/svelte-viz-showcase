<script lang="ts">
	import { select } from 'd3-selection';
	import { axisBottom, axisLeft, type Axis } from 'd3-axis';
	import type { EasingFunction } from 'svelte/transition';
	import { easeCubic } from 'd3-ease';

	export let label = '';
	export let width: number;
	export let height: number;
	export let position: 'bottom' | 'left';
	export let scale: any;

	export let showGrid = false;

	export let transition: Partial<{ duration: number; delay: number; ease: EasingFunction }> = {};
	$: ({ duration = 150, delay = 0, ease = easeCubic } = transition);

	let transform = '';
	let g: SVGGElement;

	$: {
		let axis: Axis<any>;
		let grid: (el: any) => void;
		let drawLabel: (el: any) => void;

		switch (position) {
			case 'bottom':
				axis = axisBottom(scale);
				transform = `translate(0, ${height})`;
				grid = (el) => el.attr('y2', -height);
				drawLabel = (el) =>
					el
						.selectAll('.label.bottom', true)
						.data([label])
						.join('text')
						.classed('label bottom', true)
						.attr('x', width)
						.attr('y', 44)
						.attr('fill', 'currentColor')
						.attr('text-anchor', 'end')
						.text(`${label} →`);
				break;
			case 'left':
				axis = axisLeft(scale);
				grid = (el) => el.attr('x2', width);
				drawLabel = (el) =>
					el
						.selectAll('.label.left')
						.data([label])
						.join('text')
						.classed('label left', true)
						.attr('x', -27)
						.attr('y', -10)
						.attr('fill', 'currentColor')
						.attr('text-anchor', 'start')
						.text(`↑ ${label}`);
		}

		select(g)
			.call((el) =>
				el
					.call(drawLabel)
					.transition()
					.ease(ease)
					.duration(duration)
					.delay(delay)
					.call(axis.tickSizeOuter(0).tickPadding(10))
					.selectAll('.tick line')
					.call(grid)
					.attr('stroke', 'currentColor')
					.attr('stroke-opacity', showGrid ? 0.1 : 0)
			)
			.call((g) => g.select('.domain').remove());
	}
</script>

<g class="axis" bind:this={g} {transform} />
