import type { DotPlotData, DotPlotOptions } from './DotPlotChart.svelte';
import type { ScatterPlotData, ScatterPlotOptions, ScatterPlotPoint } from './ScatterPlot.svelte';

import { getDotPlotData } from './prepare-dot-plot-data';
import { preparePulitzerData } from './prepare-scatter-data';
import { ServerLoad } from '@sveltejs/kit';

export const prerender = true;

type ChartStepOptions = {
	id: string;
	title: string;
	chartTitle?: string;
	fullSize?: boolean;
};
export type PulitzerScatterPoint = ScatterPlotPoint & {
	meta: { circulationYear: string; pulitzerPeriod: string };
};

type ScatterPlotStepConfig = {
	chartType: 'scatter';
	data: ScatterPlotData<PulitzerScatterPoint>;
	interactivePointRadius?: boolean;
	vizOptions: ScatterPlotOptions;
};
type DotPlotStepConfig = { chartType: 'dotPlot'; data: DotPlotData; vizOptions: DotPlotOptions };

export type ChartStepConfig = ChartStepOptions & (ScatterPlotStepConfig | DotPlotStepConfig);

export const load = (async () => {
	const { ageCategories, dotPlotData } = getDotPlotData();

	const { pulitzerScatter2004, pulitzerScatter2013, maxCirculation, maxWinners } =
		preparePulitzerData();

	const scatterPlotDefaultOptions: ScatterPlotOptions = {
		xDomain: [0, maxCirculation],
		yDomain: [0, maxWinners]
	};
	const dotPlotDefaultOptions: DotPlotOptions = {
		transitionDelay: 50
	};

	const stepsConfig = [
		{
			id: 'scatter1' as const,
			chartType: 'scatter',
			title: 'Scatter Plot 1',
			chartTitle:
				'Pulitzer Price Winners and Finalists <strong>1990 - 2003</strong><br>Daily Circulation <strong>2004</strong>',
			data: pulitzerScatter2004,
			vizOptions: { ...scatterPlotDefaultOptions, pointRadius: 5, showGrid: true }
		},
		{
			id: 'scatter2' as const,
			chartType: 'scatter',
			title: 'Scatter Plot 2',
			chartTitle:
				'Pulitzer Price Winners and Finalists <strong>2004 - 2013</strong><br>Daily Circulation <strong>2014</strong>',
			data: pulitzerScatter2013,
			vizOptions: { ...scatterPlotDefaultOptions, pointRadius: 5, showGrid: true }
		},
		{
			id: 'scatterZoom2' as const,
			chartType: 'scatter',
			title: 'Scatter Plot Zoom 2',
			chartTitle:
				'Detail: Pulitzer Price Winners and Finalists <strong>2004 - 2013</strong><br>Daily Circulation <strong>2014</strong>',
			data: pulitzerScatter2013,
			vizOptions: {
				...scatterPlotDefaultOptions,
				xDomain: [0, maxCirculation / 3],
				yDomain: [0, maxWinners / 3],
				pointRadius: 5
			}
		},
		{
			id: 'scatterZoom1' as const,
			chartType: 'scatter',
			title: 'Scatter Plot Zoom 1',
			chartTitle:
				'Detail: Pulitzer Price Winners and Finalists <strong>1990 - 2003</strong><br>Daily Circulation <strong>2004</strong>',
			data: pulitzerScatter2004,
			vizOptions: {
				...scatterPlotDefaultOptions,
				xDomain: [0, maxCirculation / 3],
				yDomain: [0, maxWinners / 3],
				pointRadius: 5
			}
		},
		// {
		// 	id: 'scatter3' as const,
		// 	title: 'Scatter Plot 3',
		// 	chartType: 'scatter',
		// 	data: scatterBates300,
		// 	vizOptions: {...scatterPlotDefaultOptions, pointRadius: 3 }
		// },
		{
			chartType: 'dotPlot',
			id: 'dotPlotAge1' as const,
			title: 'Dot Plot Age 1',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { ...dotPlotDefaultOptions, order: ageCategories[0] }
		},
		{
			chartType: 'dotPlot',
			id: 'dotPlotAge4' as const,
			title: 'Dot Plot Age 4',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { ...dotPlotDefaultOptions, order: ageCategories[3] }
		},
		{
			chartType: 'dotPlot',
			id: 'dotPlotAge6' as const,
			title: 'Dot Plot Age 6',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { ...dotPlotDefaultOptions, order: ageCategories[5] }
		},
		{
			chartType: 'scatter',
			id: 'scatter3' as const,
			title: 'Scatter Plot 2',
			chartTitle:
				'Pulitzer Price Winners and Finalists <strong>2004 - 2013</strong><br>Daily Circulation <strong>2014</strong>',
			data: pulitzerScatter2013,
			vizOptions: { ...scatterPlotDefaultOptions, pointRadius: 5, showGrid: true },
			interactivePointRadius: true,
		}
	] satisfies ChartStepConfig[];

	return { title: 'Data Story', stepsConfig };
}) satisfies ServerLoad;
