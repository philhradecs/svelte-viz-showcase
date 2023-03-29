import type { PageLoad } from './$types';
import contoursData from '$assets/datasets/faithful.tsv?raw';
import { tsvParse } from 'd3-dsv';

export const _fetchContoursData = () => {
	return tsvParse(contoursData, ({ waiting: x, eruptions: y }) => ({
		x: typeof x === 'string' ? +x : 0,
		y: typeof y === 'string' ? +y : 0
	}));
};

export const load = (() => {
	return { chartData: _fetchContoursData() as {x:number, y:number}[], title: "Density Contours" };
}) satisfies PageLoad
