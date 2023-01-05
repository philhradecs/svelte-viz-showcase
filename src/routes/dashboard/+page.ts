import type { PageLoad } from './$types';
import { _fetchContoursData } from '../../routes/showcase/density-contours/+page';
import { _fetchDotPlotData } from '../../routes/showcase/dot-plot/+page';
import { _fetchTreemapData } from '../../routes/showcase/zoomable-treemap/+page';

export const load: PageLoad = () => {
	const data = {
		contourData: _fetchContoursData(),
		dotPlotData: _fetchDotPlotData(),
		treemapData: _fetchTreemapData()
	};
	return data;
};
