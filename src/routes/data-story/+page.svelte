<script lang="ts" context="module">
	import type { ContourChartData } from '$visualizations/contour/ContourChart.svelte';

	export const key = Symbol();
	const data = [
		{ x: 10, y: 7 },
		{ x: 5, y: 7 },
		{ x: 9, y: 12 },
		{ x: 2, y: 4 }
	];
	export const vizData = writable<ContourChartData>([]);
</script>

<script lang="ts">
	import DataStoryWrapper from '$components/data-story/DataStoryWrapper.svelte';
	import StorySection from '$components/data-story/DataStorySection.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import ContourChart from '$visualizations/contour/ContourChart.svelte';
	import { writable } from 'svelte/store';

	const slice = (num: number) => (state: ContourChartData) => data.slice(0, num);
</script>

<div class="mt-8 mb-8">
	<DataStoryWrapper store={vizData} class="mb-[600px]">
		<div slot="chart">
			<div class="w-[100vw] h-[30vh] lg:w-[50vw]">
				<Chart
					mt={20}
					mr={40}
					mb={30}
					ml={40}
					chart={ContourChart}
					data={$vizData}
					extraConfig={{ xDomain: [0, 20], yDomain: [0, 20] }}
				/>
			</div>
		</div>
		<h1>Data Story Test Heading</h1>
		<StorySection state={slice(1)} step={1} class="h-[600px]">
			<div>
				11111 D3.js is a JavaScript library for manipulating documents based on data. D3 helps you
				bring D3.js is a JavaScript library for manipulating documents based on data. D3 helps you
				bring D3.js is a JavaScript library for manipulating documents based on data. D3 helps you
				bring D3.js is a JavaScript library for manipulating documents based on data. D3 helps you
				bring
			</div>
		</StorySection>
		<StorySection state={slice(2)} step={2} class="h-[600px]">
			<div>
				22222 data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the
				full data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the
				full data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the
				full data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the
				full
			</div>
		</StorySection>
		<StorySection state={slice(3)} step={3} class="h-[600px]">
			<div>
				333333 capabilities of modern browsers without tying yourself to a proprietary framework,
				combining capabilities of modern browsers without tying yourself to a proprietary framework,
				combining capabilities of modern browsers without tying yourself to a proprietary framework,
				combining capabilities of modern browsers without tying yourself to a proprietary framework,
				combining
			</div>
		</StorySection>
		<StorySection state={slice(4)} step={4} class="h-[600px]">
			<div>
				44444 powerful showcaseization components and a data-driven approach to DOM manipulation.
				powerful showcaseization components and a data-driven approach to DOM manipulation. powerful
				showcaseization components and a data-driven approach to DOM manipulation. powerful
				showcaseization components and a data-driven approach to DOM manipulation.
			</div>
		</StorySection>
	</DataStoryWrapper>
</div>
