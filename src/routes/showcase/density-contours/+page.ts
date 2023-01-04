import type { PageLoad } from './$types';
import contoursData from '$assets/datasets/faithful.tsv?raw';
import { tsvParse } from 'd3-dsv';

const fetchContoursData = () => {
	return tsvParse(contoursData, ({ waiting: x, eruptions: y }) => ({
		x: typeof x === 'string' ? +x : 0,
		y: typeof y === 'string' ? +y : 0
	}));
};

export const load: PageLoad = () => {
	return { array: fetchContoursData() };
};
