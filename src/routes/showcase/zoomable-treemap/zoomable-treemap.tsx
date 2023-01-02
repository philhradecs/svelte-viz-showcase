import ChartSvgWrapper from '$components/chart/SvgWrapper.svelte';

import ChartLayout from '~/components/chart/chart-layout';

import treemapData from '../../../assets/datasets/flare-2.json';
import { Treemap } from '~/visualizations/viz-zoomable-treemap';

export const fetchTreemapData = async () => {
	return treemapData;
};

export const loader = async () => {
	const data = await fetchTreemapData();
	return json(data);
};

export default function TreemapRoute() {
	const data = useLoaderData<typeof loader>();
	return (
		<ChartLayout
			controls={
				[
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
				]
			}
		>
			<ChartSvgWrapper ml={50} mb={30} mt={60}>
				{(props) => <Treemap {...props} data={data} />}
			</ChartSvgWrapper>
		</ChartLayout>
	);
}
