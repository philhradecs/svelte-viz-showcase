
import type {PageLoad} from './$types'
import { generateScatterplotData } from '../../showcase/scatter-plot/+page.svelte';
import { _fetchContoursData } from '../../showcase/density-contours/+page';
import { _fetchDotPlotData } from '../../showcase/dot-plot/+page';


export const load = (() => {

	const contoursData = _fetchContoursData()
	const dotPlotData = _fetchDotPlotData()
	const ageCategories = [...new Set(dotPlotData.map(({ age }) => age))];
	const orderOptions = [
		{ label: 'State', value: 'state' },
		...ageCategories.map((age) => ({
			label: `Age: ${age}`,
			value: age
		}))
	];

	const scatterPlotDefaultDomains = {
		xDomain: [0, 100] as number[],
		yDomain: [0, 100] as number[]
	};

	const contourChartDefaultThreshold = {
		threshold: 20
	};

	type StoryStepConfig = {name: string, chartType: 'scatter' | 'contour' | 'dotPlot', [x: string]: unknown}

	const dotPlotSteps = ageCategories.map<StoryStepConfig>((age,idx) => ({
		name: `dotPlot${idx+1}`,
		chartType: 'dotPlot',
		fullSize: true,
		data: dotPlotData,
		vizOptions: {order: age, orderOptions }
	}))

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
		...dotPlotSteps,
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
	] satisfies StoryStepConfig[];

	return { title: 'Data Story', stepsConfig };
}) satisfies PageLoad
