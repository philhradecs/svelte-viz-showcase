<script lang="ts">
	import { select } from 'd3-selection';
	import ChartSvgWrapper from '$components/chart/Chart.svelte';
	import Header from '$components/Header.svelte';

	import ContourChart from '$visualizations/VizContour.svelte';
	import LineChart from '$visualizations/VizLineChart.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div>
	<Header>
		<h1 className="text-lg font-sans tracking-wide">Dashboard</h1>
	</Header>
	<div className="mt-6 grid grid-cols-2 grid-rows-3 h-[800px]">
		<div on:click={(e) => console.log(select(e.target).attr('data-value'))}>
			<ChartSvgWrapper>
				<svelte:component this={LineChart} />
			</ChartSvgWrapper>
		</div>
		<div>
			<ChartSvgWrapper>
				<svelte:component this={ContourChart} />
			</ChartSvgWrapper>
		</div>
		<div>
			<ChartSvgWrapper>
				<svelte:component this={LineChart} />
			</ChartSvgWrapper>
		</div>
	</div>
</div>
