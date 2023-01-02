<script lang="ts">
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import { order } from '$visualizations/dot-plot/store';

	import type { PageData } from './$types';
	export let data: PageData;

	const { data: dotPlotData, ageCategories } = data;
</script>

<ChartLayout
	controls={[
		{
			label: 'Order By',
			type: 'select',
			options: [
				{ label: 'State', value: 'state' },
				...ageCategories.map((age) => ({
					label: `Age: ${age}`,
					value: age
				}))
			],
			writable: order
		}
		// {
		//   label: 'Line Color',
		//   type: 'select',
		//   atom: colorAtom,
		//   options: [
		//     { label: 'Red', value: 'red' },
		//     { label: 'Blue', value: 'blue' },
		//   ],
		// },
		// { label: 'Highlight Line', type: 'checkbox', atom: toggleAtom },
	]}
>
	<div class="h-full">
		<Chart ml={50} mb={30} mt={110} chartType="dotPlot" data={dotPlotData} />
	</div>
</ChartLayout>
); }
