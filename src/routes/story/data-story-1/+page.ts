import type { PageLoad } from './$types';
import type { ScatterPlotData, ScatterPlotOptions } from './ScatterPlot.svelte';
import type { DotPlotData, DotPlotOptions } from './DotPlotChart.svelte';

import { getDotPlotData } from './prepare-dot-plot-data';
import { preparePulitzerData } from './prepare-scatter-data';
import { max } from 'd3-array';

export const prerender = true;

type StoryStepOptions = {
	id: string;
	title: string;
	chartTitle?: string;
	fullSize?: boolean;
};
type ScatterPlotStepConfig = {
	chartType: 'scatter';
	data: ScatterPlotData;
	interactivePointRadius?: boolean;
	vizOptions: ScatterPlotOptions;
};
type DotPlotStepConfig = { chartType: 'dotPlot'; data: DotPlotData; vizOptions: DotPlotOptions };

export type StoryStepConfig = StoryStepOptions & (ScatterPlotStepConfig | DotPlotStepConfig);

export const load = (async () => {
	const { ageCategories, dotPlotData } = getDotPlotData();
	// const scatterPoisson200 = generateScatterplotData('poisson', 200);
	// const scatterBates300 = generateScatterplotData('bates', 300);
	// const scatterPoison100 = generateScatterplotData('poisson', 100);

	const pulizterData = preparePulitzerData();

	const pulitzerScatter2004 = pulizterData.map((d) => ({
		x: d.daily_circulation_2004,
		y: d.pulitzer_prize_winners_and_finalists_1990_2003,
		newspaper: d.newspaper,
		year: 2004
	}));
	const pulitzerScatter2013 = pulizterData.map((d) => ({
		x: d.daily_circulation_2013,
		y: d.pulitzer_prize_winners_and_finalists_2004_2014,
		newspaper: d.newspaper,
		year: 2013
	}));
	const maxCirculation = max([...pulitzerScatter2004, ...pulitzerScatter2013], (d) => d.x) || 0;
	const maxWinners = max([...pulitzerScatter2004, ...pulitzerScatter2013], (d) => d.y) || 0;

	const scatterPlotDefaultOptions: ScatterPlotOptions = {
		xDomain: [0, maxCirculation],
		yDomain: [0, maxWinners]
	};
	const dotPlotDefaultOptions: DotPlotOptions = {
		transitionDelay: 50
	};

	const stepsConfig = [
		{
			id: 'scatter1',
			title: 'Scatter Plot 1',
			chartTitle:
				'Pulitzer Price Winners and Finalists <strong>1990 - 2003</strong><br>Daily Circulation <strong>2004</strong>',
			chartType: 'scatter',
			data: pulitzerScatter2004,
			vizOptions: { ...scatterPlotDefaultOptions, pointRadius: 4, showGrid: true }
		},
		{
			id: 'scatter2',
			title: 'Scatter Plot 2',
			chartTitle:
			'Pulitzer Price Winners and Finalists <strong>2004 - 2013</strong><br>Daily Circulation <strong>2014</strong>',
			chartType: 'scatter',
			data: pulitzerScatter2013,
			vizOptions: { ...scatterPlotDefaultOptions, pointRadius: 4, showGrid: true }
		},
		{
			id: 'scatterZoom2',
			title: 'Scatter Plot Zoom 2',
			chartType: 'scatter',
			data: pulitzerScatter2013,
			vizOptions: {
				...scatterPlotDefaultOptions,
				xDomain: [0, maxCirculation / 3],
				yDomain: [0, maxWinners / 3],
				pointRadius: 5
			}
		},
		{
			id: 'scatterZoom1',
			title: 'Scatter Plot Zoom 1',
			chartType: 'scatter',
			data: pulitzerScatter2004,
			vizOptions: {
				...scatterPlotDefaultOptions,
				xDomain: [0, maxCirculation / 3],
				yDomain: [0, maxWinners / 3],
				pointRadius: 5
			}
		},
		// {
		// 	id: 'scatter3',
		// 	title: 'Scatter Plot 3',
		// 	chartType: 'scatter',
		// 	data: scatterBates300,
		// 	vizOptions: {...scatterPlotDefaultOptions, pointRadius: 3 }
		// },
		{
			id: 'dotPlotAge1',
			title: 'Dot Plot Age 1',
			chartType: 'dotPlot',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { ...dotPlotDefaultOptions, order: ageCategories[0] }
		},
		{
			id: 'dotPlotAge4',
			title: 'Dot Plot Age 4',
			chartType: 'dotPlot',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { ...dotPlotDefaultOptions, order: ageCategories[3] }
		},
		{
			id: 'dotPlotAge6',
			title: 'Dot Plot Age 6',
			chartType: 'dotPlot',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { ...dotPlotDefaultOptions, order: ageCategories[5] }
		},
		{
			id: 'scatterZoom3',
			title: 'Scatter Plot Zoom 3',
			chartType: 'scatter',
			data: pulitzerScatter2013,
			vizOptions: {
				...scatterPlotDefaultOptions,
				xDomain: [0, maxCirculation / 3],
				yDomain: [0, maxWinners / 3],
				pointRadius: 5
			}
		},
		// {
		// 	id: 'scatter4',
		// 	title: 'Scatter Plot 4',
		// 	chartType: 'scatter',
		// 	interactivePointRadius: true,
		// 	data: scatterPoison100,
		// 	vizOptions: { ...scatterPlotDefaultOptions, pointRadius: 8 }
		// },
		// {
		// 	id: 'scatter5',
		// 	title: 'Scatter Plot 5',
		// 	chartType: 'scatter',
		// 	data: scatterPoison100,
		// 	vizOptions: { ...scatterPlotDefaultOptions, pointRadius: 4 }
		// }
	] satisfies StoryStepConfig[];

	return { title: 'Data Story', stepsConfig, pulizterData };
}) satisfies PageLoad;
