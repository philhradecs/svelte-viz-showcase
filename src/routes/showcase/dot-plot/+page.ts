import { csvParse } from 'd3-dsv';

import dotPlotData from '$assets/datasets/us-distribution-state-age.csv?raw';

const fetchDotPlotData = async () => {
	return csvParse(dotPlotData, ({ population, state, age }) => ({
		population: typeof population === 'string' ? Number(population) : 0,
		state: state ?? '',
		age: age ?? ''
	}));
};

export const load = async () => {
	const data = await fetchDotPlotData();
	const ageCategories = [...new Set(data.map(({ age }) => age))];
	return { ageCategories, data };
};
