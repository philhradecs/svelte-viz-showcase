<script lang="ts">
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import {
		highlightColor,
		order,
		transitionDelay,
		transitionDuration
	} from '$visualizations/dot-plot/store';
	import DotPlotChart from '$visualizations/dot-plot/DotPlotChart.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	const { data: dotPlotData, orderOptions } = data;
</script>

<ChartLayout
	controls={[
		{
			label: 'Order By',
			type: 'select',
			options: orderOptions,
			writable: order
		},
		{
			label: 'Transition Delay',
			type: 'slider',
			writable: transitionDelay,
			min: 0,
			max: 100,
			step: 5,
			throttle: 1000
		},
		{
			label: 'Transition Duration',
			type: 'slider',
			writable: transitionDuration,
			min: 0,
			max: 1500,
			step: 100,
			throttle: 1000
		},
		{
			label: 'Highlight Color',
			type: 'select',
			writable: highlightColor,
			options: [
				{
					label: 'None',
					value: ''
				},
				{
					label: 'White',
					value: 'white'
				},
				{
					label: 'Violet',
					value: 'violet'
				},
				{
					label: 'Yellow',
					value: 'yellow'
				}
			]
		}
		// { label: 'Highlight Line', type: 'checkbox', atom: toggleAtom },
	]}
>
	<div class="h-full pt-4">
		<Chart ml={50} mb={30} mt={105} chart={DotPlotChart} data={dotPlotData} />
	</div>
</ChartLayout>
