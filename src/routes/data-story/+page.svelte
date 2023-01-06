<script lang="ts" context="module">
	import type { ContourChartData } from '$visualizations/contour/ContourChart.svelte';

	export const key = Symbol();
	const data = [
		{ x: 3, y: 4 },
		{ x: 10, y: 7 },
		{ x: 29, y: 15 },
		{ x: 5, y: 7 },
		{ x: 17, y: 40 },
		{ x: 40, y: 10 },
		{ x: 42, y: 39 },
		{ x: 9, y: 34 },
		{ x: 2, y: 31 },
		{ x: 26, y: 13 },
		{ x: 28, y: 22 },
		{ x: 16, y: 28 },
		{ x: 9, y: 46 },
		{ x: 21, y: 27 }
	];
	export const vizData = writable<ContourChartData>(data);
</script>

<script lang="ts">
	import DataStoryWrapper from '$components/data-story/DataStoryWrapper.svelte';
	import StorySection from '$components/data-story/DataStorySection.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import ContourChart from '$visualizations/contour/ContourChart.svelte';
	import { writable } from 'svelte/store';

	const slice = (num: number) => (state: ContourChartData) => data.slice(0, data.length - num * 2);
</script>

<div class="mt-8 mb-8 container mx-auto px-5 ">
	<DataStoryWrapper store={vizData}>
		<div slot="chart" class="fixed top-40 bottom-40 left-56 right-56 rounded-lg bg-slate-800 -z-10">
			<Chart mt={20} mr={20} mb={30} ml={40} chart={ContourChart} data={$vizData} />
		</div>
		<StorySection state={slice(1)}>
			<div class="h-[600px]">
				D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring
				D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring
				D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring
				D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring
			</div>
		</StorySection>
		<StorySection state={slice(2)}>
			<div class="h-[600px]">
				data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full
				data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full
				data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full
				data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full
			</div>
		</StorySection>
		<StorySection state={slice(3)}>
			<div class="h-[600px]">
				capabilities of modern browsers without tying yourself to a proprietary framework, combining
				capabilities of modern browsers without tying yourself to a proprietary framework, combining
				capabilities of modern browsers without tying yourself to a proprietary framework, combining
				capabilities of modern browsers without tying yourself to a proprietary framework, combining
			</div>
		</StorySection>
		<StorySection state={slice(4)}>
			<div class="h-[600px]">
				powerful showcaseization components and a data-driven approach to DOM manipulation. powerful
				showcaseization components and a data-driven approach to DOM manipulation. powerful
				showcaseization components and a data-driven approach to DOM manipulation. powerful
				showcaseization components and a data-driven approach to DOM manipulation.
			</div>
		</StorySection>
	</DataStoryWrapper>
</div>
