import ChartSvgWrapper from '$components/chart/SvgWrapper.svelte';

import ChartLayout from '~/components/chart/chart-layout';
import { colorAtom, LineChart, toggleAtom } from '~/visualizations/viz-line-chart';

export const fetchLineChartData = async () => [
	{ x: 10, y: 200 },
	{ x: 20, y: 400 },
	{ x: 30, y: 300 },
	{ x: 40, y: 500 }
];

export const loader = async () => {
	const data = await fetchLineChartData();
	return json(data);
};

export default function LineChartRoute() {
	const data = useLoaderData<typeof loader>();
	return (
		<ChartLayout
			controls={[
				{ label: 'Highlight Line', type: 'checkbox', atom: toggleAtom },
				{
					label: 'Line Color',
					type: 'select',
					atom: colorAtom,
					options: [
						{ label: 'Red', value: 'red' },
						{ label: 'Blue', value: 'blue' }
					]
				},
				{ label: 'Highlight Line', type: 'checkbox', atom: toggleAtom }
			]}
		>
			<div className="grid grid-cols-2 grid-rows-3 h-[600px]">
				{Array.from({ length: 4 }).map((_, idx) => (
					<ChartSvgWrapper key={idx} ml={50} mb={30}>
						{(props) => <LineChart {...props} data={data} />}
					</ChartSvgWrapper>
				))}
			</div>
		</ChartLayout>
	);
}
