import type { PageLoad } from './$types';
import contoursData from '$assets/datasets/faithful.tsv?raw';
import { tsvParse } from 'd3-dsv';

const fetchContoursData = async () => {
	return tsvParse(contoursData, ({ waiting: x, eruptions: y }) => ({
		x: typeof x === 'string' ? +x : 0,
		y: typeof y === 'string' ? +y : 0
	}));
};

export const load = (async ({ params }) => {
	const data = await fetchContoursData();
	return { data };
}) satisfies PageLoad;
