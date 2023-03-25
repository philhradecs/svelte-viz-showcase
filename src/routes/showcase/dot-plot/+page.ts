import type { PageLoad } from './$types';
import { csvParse } from 'd3-dsv';
import dotPlotData from '$assets/datasets/us-distribution-state-age.csv?raw';

export const _fetchDotPlotData = () => {
	return csvParse(dotPlotData, ({ population, state, age }) => ({
		population: typeof population === 'string' ? Number(population) : 0,
		state: state ?? '',
		age: age ?? ''
	}));
};

export const load: PageLoad = () => {
	const chartData = _fetchDotPlotData();
	const ageCategories = [...new Set(chartData.map(({ age }) => age))];
	const orderOptions = [
		{ label: 'State', value: 'state' },
		...ageCategories.map((age) => ({
			label: `Age: ${age}`,
			value: age
		}))
	];
	return { orderOptions, chartData, title: 'Dot Plot' };
};
