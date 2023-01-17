<script lang="ts">
	import ChartLayout from '$components/chart/ChartLayout.svelte';
	import Chart from '$components/chart/Chart.svelte';
	import DotPlotChart from '$visualizations/dot-plot/DotPlotChart.svelte';

	import type { PageData } from './$types';
	import { writable } from 'svelte/store';

	export const order = writable('state');
	export const transitionDelay = writable(35);
	export const transitionDuration = writable(550);
	export const highlightColor = writable<string>('');

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
		<Chart
			ml={50}
			mb={30}
			mt={105}
			chart={DotPlotChart}
			data={dotPlotData}
			extraConfig={{
				highlightColor: $highlightColor,
				transitionDelay: $transitionDelay,
				transitionDuration: $transitionDuration,
				order
			}}
		/>
	</div>
</ChartLayout>
