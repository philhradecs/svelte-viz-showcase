<script lang="ts" context="module">
	import { select, type Selection } from 'd3-selection';
	import type { RegisterTooltipFn } from '../../utils/get-register-tooltip';
	export type Margin = {
		mt: number;
		mr: number;
		mb: number;
		ml: number;
	};
	export type ChartBaseProps = {
		svg: Selection<SVGSVGElement, any, any, any>;
		root: Selection<SVGGElement, any, any, any>;
		width: number;
		height: number;
		registerTooltip: RegisterTooltipFn;
	} & Margin;

	export type ChartProps<T = unknown> = ChartBaseProps & { data: T };

	export type InferChartProps<T> = T extends ComponentType<SvelteComponentTyped<infer Props>>
		? Props['config']
		: never;
</script>

<script lang="ts">
	import type { ComponentType, SvelteComponentTyped } from 'svelte';
	import Measure from '../Measure.svelte';
	import { getRegisterTooltip } from '../../utils/get-register-tooltip';
	import 'tippy.js/dist/tippy.css';

	export let mt: number = 0;
	export let mr: number = 0;
	export let mb: number = 0;
	export let ml: number = 0;

	type T = $$Generic<ComponentType<SvelteComponentTyped<{ config: ChartProps<any> }>>>;
	export let chart: T;

	type ChartData = InferChartProps<T>['data'];
	type ExtraProps = Omit<InferChartProps<T>, keyof ChartProps<any>>;

	export let data: ChartData = undefined;
	export let extraConfig: ExtraProps | undefined = undefined;
	let className = '';
	export { className as class };

	let svgEl: SVGSVGElement | undefined = undefined;
	let chartEl: SVGGElement | undefined = undefined;

	$: registerTooltip = svgEl ? getRegisterTooltip(svgEl) : () => {};
</script>

<div class={`relative h-full max-w-full overflow-hidden ${className}`}>
	<Measure let:height let:width>
		{@const innerWidth = width - (ml + mr)}
		{@const innerHeight = height - (mt + mb)}
		{#if innerWidth > 0 && innerHeight > 0}
			<svg
				bind:this={svgEl}
				{width}
				{height}
				stroke-linejoin="round"
				fill="none"
				class="absolute inset-0"
			>
				<g bind:this={chartEl} transform={`translate(${ml}, ${mt})`}>
					<svelte:component
						this={chart}
						config={{
							width: innerWidth,
							height: innerHeight,
							mt,
							mr,
							mb,
							ml,
							data,
							svg: select(svgEl),
							root: select(chartEl),
							registerTooltip,
							...extraConfig
						}}
					/>
				</g>
			</svg>
		{/if}
	</Measure>
</div>
