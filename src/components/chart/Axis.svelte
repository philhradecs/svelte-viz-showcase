<script lang="ts">
	import { select } from 'd3-selection';
	import { axisBottom, axisLeft, type Axis } from 'd3-axis';
	import type { EasingFunction } from 'svelte/transition';
	import { easeCubic } from 'd3-ease';

	export let width: number;
	export let height: number;
	export let margin = 0;
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

		switch (position) {
			case 'bottom':
				axis = axisBottom(scale).tickSizeOuter(0);
				transform = `translate(0, ${height - margin})`;
				grid = (el) => el.attr('y2', -height);
				break;
			case 'left':
				axis = axisLeft(scale).tickSizeOuter(0);
				transform = `translate(${margin}, 0)`;
				grid = (el) => el.attr('x2', width);
		}

		select(g)
			.call((el) =>
				el.transition().ease(ease).duration(duration).delay(delay).call(axis)
					.selectAll('.tick line')
					.call(grid)
					.attr('stroke', 'currentColor')
					.attr('stroke-opacity', showGrid ? 0.15 : 0)
			)
			.call((g) => g.select('.domain').remove());
	}
</script>

<g class="axis" bind:this={g} {transform} />
