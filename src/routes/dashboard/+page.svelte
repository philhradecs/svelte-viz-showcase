<script lang="ts">
	import Chart from '$components/chart/Chart.svelte';

	import ContourChart from '$visualizations/contour/ContourChart.svelte';
	import ScatterPlot from '$visualizations/scatter-plot/ScatterPlot.svelte';
	import TreemapChart from '$visualizations/treemap/TreemapChart.svelte';

	import type { PageData } from './$types';
	import { headerContent } from '$components/header/store';
	export let data: PageData;
	const { contourData, scatterplotData, treemapData } = data;
	$headerContent = { title: 'Dashboard' };
</script>

<div class="h-full flex flex-col">
	<div class="px-6 py-0.5 bg-gray-700">
		<div class="flex gap-4 items-center justify-between">
			<h3 class="text-bg-primary font-mono">Controls</h3>
			<div class="basis-[400px]">
				<input type="search" class="w-full py-1 text-base rounded px-3" placeholder="Filter Data" />
			</div>
			<div class="flex items-center gap-2 text-gray-300 text-sm">
				<div>Min</div>
				<input type="range" />
				<div>Max</div>
			</div>
		</div>
	</div>
	<div class="flex-1 grid sm:grid-cols-2 gap-2 pt-6">
		<!-- <div on:click={(e) => console.log(select(e.target).attr('data-value'))}> -->
		<Chart
			mt={20}
			mr={40}
			mb={30}
			ml={40}
			class="min-h-[200px]"
			chart={ContourChart}
			data={contourData}
		/>
		<!-- </div> -->
		<div class="row-span-2">
			<Chart
				mt={20}
				ml={40}
				mr={40}
				mb={40}
				class="min-h-[200px]"
				chart={ScatterPlot}
				data={scatterplotData}
			/>
		</div>
		<div>
			<Chart
				mt={60}
				ml={20}
				mb={20}
				class="min-h-[200px]"
				chart={TreemapChart}
				data={treemapData}
			/>
		</div>
	</div>
</div>
