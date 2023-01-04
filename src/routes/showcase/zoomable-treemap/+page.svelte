<script lang="ts">
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import TreemapChart from '$visualizations/zoomable-treemap/TreemapChart.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<ChartLayout
	controls={[
		// {
		//   label: 'Order By',
		//   type: 'select',
		//   options: [
		//     { label: 'State', value: 'state' },
		//     ...ageCategories.map((age) => ({
		//       label: `Age: ${age}`,
		//       value: age,
		//     })),
		//   ],
		//   atom: orderAtom,
		// },
	]}
>
	<div class="h-full">
		<Chart mt={60} ml={20} mb={20} chart={TreemapChart} {data} />
	</div>
</ChartLayout>
); }
