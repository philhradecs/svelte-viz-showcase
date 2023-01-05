<script lang="ts">
	import { select } from 'd3-selection';
	import Chart from '$components/chart/Chart.svelte';

	import ContourChart from '$visualizations/contour/ContourChart.svelte';
	import DotPlotChart from '$visualizations/dot-plot/DotPlotChart.svelte';
	import TreemapChart from '$visualizations/treemap/TreemapChart.svelte';

	import type { PageData } from './$types';
	import { headerContent } from '$components/header/store';
	export let data: PageData;
	const { contourData, dotPlotData, treemapData } = data;
	headerContent.set({ title: 'Dashboard' });
</script>

<div class="h-full flex flex-col">
	<div class="px-6 py-2 font-mono bg-gray-700">
		<div class="flex items-center ">
			<h3>Dashboard Controls</h3>
			<div class="m-auto basis-[400px]"><input class="w-full" /></div>
		</div>
	</div>
	<div class="flex-1 grid grid-cols-2 gap-2 pt-6">
		<!-- <div on:click={(e) => console.log(select(e.target).attr('data-value'))}> -->
		<Chart mt={20} mr={40} mb={30} ml={40} chart={ContourChart} data={contourData} />
		<!-- </div> -->
		<div class="row-span-2">
			<Chart mt={100} ml={40} mr={40} mb={20} chart={DotPlotChart} data={dotPlotData} />
		</div>
		<div>
			<Chart mt={60} ml={20} mb={20} chart={TreemapChart} data={treemapData} />
		</div>
	</div>
</div>
