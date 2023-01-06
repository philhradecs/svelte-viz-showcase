import type { PageLoad } from './$types';
import { _fetchContoursData } from '../../routes/showcase/density-contours/+page';
import { _fetchDotPlotData } from '../../routes/showcase/dot-plot/+page';
import { _fetchTreemapData } from '../../routes/showcase/zoomable-treemap/+page';

export const _fetchDashboardData = () => ({
	contourData: _fetchContoursData(),
	dotPlotData: _fetchDotPlotData(),
	treemapData: _fetchTreemapData()
});

export const load: PageLoad = () => {
	const data = _fetchDashboardData();
	return data;
};
