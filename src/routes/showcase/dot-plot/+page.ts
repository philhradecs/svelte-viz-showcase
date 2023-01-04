import type { PageLoad } from './$types';
import { csvParse } from 'd3-dsv';
import dotPlotData from '$assets/datasets/us-distribution-state-age.csv?raw';

const fetchDotPlotData = () => {
	return csvParse(dotPlotData, ({ population, state, age }) => ({
		population: typeof population === 'string' ? Number(population) : 0,
		state: state ?? '',
		age: age ?? ''
	}));
};

export const load: PageLoad = () => {
	const data = fetchDotPlotData();
	const ageCategories = [...new Set(data.map(({ age }) => age))];
	const orderOptions = [
		{ label: 'State', value: 'state' },
		...ageCategories.map((age) => ({
			label: `Age: ${age}`,
			value: age
		}))
	];
	return { orderOptions, data };
};
