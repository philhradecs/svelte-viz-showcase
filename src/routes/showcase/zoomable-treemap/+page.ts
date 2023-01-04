import type { PageLoad } from './$types';
import treemapData from '$assets/datasets/flare-2.json?raw';

const fetchTreemapData = () => {
	return JSON.parse(treemapData);
};

export const load: PageLoad = () => {
	const data = fetchTreemapData();
	return data;
};
