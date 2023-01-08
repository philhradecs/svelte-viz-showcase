<script lang="ts" context="module">
	import type { Selection } from 'd3-selection';
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
	} & Margin;

	export type ChartProps<T = unknown> = ChartBaseProps & { data: T };

	export type InferChartProps<T> = T extends ComponentType<SvelteComponentTyped<infer Props>>
		? Props['config']
		: never;
</script>

<script lang="ts">
	import { select } from 'd3-selection';
	import type { ComponentType, SvelteComponentTyped } from 'svelte';

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
	let clientWidth = 0;
	let clientHeight = 0;

	let debounced = { clientWidth, clientHeight };

	let timeoutHandle: any = '';
	$: {
		clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(() => {
			debounced = { clientWidth, clientHeight };
		}, 200);
	}

	let config: ChartProps;
	$: {
		const svgSelection = svgEl ? select<SVGSVGElement, any>(svgEl) : undefined;
		const chartSelection = chartEl ? select<SVGGElement, any>(chartEl) : undefined;
		const width = debounced.clientWidth - (ml + mr);
		const height = debounced.clientHeight - (mt + mb);
		if (svgSelection && chartSelection && width > 0 && height > 0)
			config = {
				mt,
				mr,
				mb,
				ml,
				svg: svgSelection,
				root: chartSelection,
				width,
				height,
				data,
				...extraConfig
			};
	}
</script>

<div
	bind:clientWidth
	bind:clientHeight
	class={`relative h-full max-w-full overflow-hidden ${className}`}
>
	{#if debounced.clientWidth > 0 && debounced.clientHeight > 0}
		<svg
			bind:this={svgEl}
			width={debounced.clientWidth}
			height={debounced.clientHeight}
			stroke-linejoin="round"
			fill="none"
			class="absolute inset-0"
		>
			<g bind:this={chartEl} transform={`translate(${ml}, ${mt})`}>
				{#if config}
					<svelte:component this={chart} {config} />
				{/if}
			</g>
		</svg>
	{/if}
</div>
