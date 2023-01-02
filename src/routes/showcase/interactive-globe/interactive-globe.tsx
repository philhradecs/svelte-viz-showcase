import * as topojson from 'topojson-client';
import ChartLayout from '~/components/chart/chart-layout';
import ChartSvgWrapper from '$components/chart/SvgWrapper.svelte';
import { GlobeChart } from '~/visualizations/viz-globe';
import countriesData from '../../../assets/datasets/countries-50m.json';

export const fetchGlobeData = async () => {
	const { countries, land } = countriesData.objects;
	return {
		land: topojson.feature(countriesData as any, land as any),
		interiors: topojson.mesh(countriesData as any, countries as any, (a, b) => a !== b)
	};
};

export const loader = async () => {
	const data = await fetchGlobeData();
	return json(data);
};

export default function InteractiveGlobe() {
	const data = useLoaderData<typeof loader>();
	return (
		<ChartLayout
			controls={
				[
					// { label: 'Highlight Line', type: 'checkbox', atom: toggleAtom },
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
				]
			}
		>
			<ChartSvgWrapper ml={50} mb={30}>
				{(props) => <GlobeChart {...props} data={data} />}
			</ChartSvgWrapper>
		</ChartLayout>
	);
}
