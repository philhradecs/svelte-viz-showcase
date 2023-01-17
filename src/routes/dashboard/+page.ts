import type { PageLoad } from './$types';
import { _fetchContoursData } from '../../routes/showcase/density-contours/+page';
import { generateScatterplotData } from '../showcase/scatter-plot/+page.svelte';
import { _fetchTreemapData } from '../../routes/showcase/zoomable-treemap/+page';

export const _fetchDashboardData = () => ({
	contourData: _fetchContoursData(),
	scatterplotData: generateScatterplotData('poisson', 200),
	treemapData: _fetchTreemapData()
});

export const load: PageLoad = () => {
	const data = _fetchDashboardData();
	return data;
};
