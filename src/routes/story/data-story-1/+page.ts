
import type {PageLoad} from './$types'
import { generateScatterplotData } from '../../showcase/scatter-plot/+page.svelte';
import { _fetchContoursData } from '../../showcase/density-contours/+page';


export const load = (() => {

	const contoursData = _fetchContoursData()

	const scatterPlotDefaultDomains = {
		xDomain: [0, 100] as number[],
		yDomain: [0, 100] as number[]
	};

	const contourChartDefaultThreshold = {
		threshold: 20
	};

	const stepsConfig = [
		{
			name: 'scatter1',
			chartType: 'scatter',
			data: generateScatterplotData('poisson', 200),
			vizOptions: { ...scatterPlotDefaultDomains, pointRadius: 2 }
		},
		{
			name: 'scatter2',
			chartType: 'scatter',
			data: generateScatterplotData('bates', 200),
			vizOptions: { ...scatterPlotDefaultDomains, pointRadius: 5 }
		},
		{
			name: 'contour1',
			chartType: 'contour',
			fullSize: true,
			data: contoursData,
			vizOptions: { ...contourChartDefaultThreshold }
		},
		{
			name: 'contour2',
			chartType: 'contour',
			fullSize: true,
			vizOptions: { threshold: 10 },
			data: contoursData
		},
		{
			name: 'scatter3',
			chartType: 'scatter',
			data: generateScatterplotData('poisson', 200),
			vizOptions: { ...scatterPlotDefaultDomains, pointRadius: 8 }
		},
		{
			name: 'scatter4',
			chartType: 'scatter',
			data: generateScatterplotData('poisson', 100),
			vizOptions: { ...scatterPlotDefaultDomains, pointRadius: 15 }
		}
	] satisfies {name: string, chartType: 'scatter' | 'contour', [x: string]: unknown}[];

	return { title: 'Data Story', stepsConfig };
}) satisfies PageLoad
