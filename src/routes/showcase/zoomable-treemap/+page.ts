import type { PageLoad } from './$types';
import treemapData from '$assets/datasets/flare-2.json?raw';

export const _fetchTreemapData = () => {
	return JSON.parse(treemapData);
};

export const load: PageLoad = () => {
	const chartData = _fetchTreemapData();
	return {chartData, title: "Zoomable Treemap"};
};
