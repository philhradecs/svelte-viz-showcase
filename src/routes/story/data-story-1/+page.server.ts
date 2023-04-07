import type { PageServerLoad } from './$types';

import { DotPlotData, DotPlotOptions } from './DotPlotChart.svelte';
import { ScatterPlotData, ScatterPlotOptions } from './ScatterPlot.svelte';
import { generateScatterplotData } from './generate-scatterplot-data';
import { getDotPlotData } from './prepare-dot-plot-data';

type StoryStepOptions = {
	fullSize?: boolean;
	vizOptions?: Record<string, unknown>;
};
type ScatterPlotStepConfig = {
	chartType: 'scatter';
	data: ScatterPlotData;
	vizOptions: ScatterPlotOptions;
};
type DotPlotStepConfig = { chartType: 'dotPlot'; data: DotPlotData; vizOptions: DotPlotOptions };

export type StoryStepConfig = StoryStepOptions & (ScatterPlotStepConfig | DotPlotStepConfig);

export const load = (async () => {
	const { ageCategories, dotPlotData } = getDotPlotData();
	const scatterPoisson200 = generateScatterplotData('poisson', 200);
	const scatterBates300 = generateScatterplotData('bates', 300);
	const scatterPoison100 = generateScatterplotData('poisson', 100);

	const scatterPlotDefaultDomains = {
		xDomain: [0, 100] as number[],
		yDomain: [0, 100] as number[]
	};

	const stepsConfig = {
		scatter1: {
			chartType: 'scatter',
			data: scatterPoisson200,
			vizOptions: { ...scatterPlotDefaultDomains, pointRadius: 2 }
		},
		scatter2: {
			chartType: 'scatter',
			data: scatterBates300,
			vizOptions: { ...scatterPlotDefaultDomains, pointRadius: 3 }
		},
		scatter3: {
			chartType: 'scatter',
			data: scatterBates300,
			vizOptions: { xDomain: [20, 50], yDomain: [60, 90], pointRadius: 9 }
		},
		dotPlotAge1: {
			chartType: 'dotPlot',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { order: ageCategories[0] }
		},
		dotPlotAge4: {
			chartType: 'dotPlot',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { order: ageCategories[3] }
		},
		dotPlotAge6: {
			chartType: 'dotPlot',
			fullSize: true,
			data: dotPlotData,
			vizOptions: { order: ageCategories[5] }
		},
		scatter4: {
			chartType: 'scatter',
			data: scatterPoison100,
			vizOptions: { ...scatterPlotDefaultDomains, pointRadius: 8 }
		},
		scatter5: {
			chartType: 'scatter',
			data: scatterPoison100,
			vizOptions: { ...scatterPlotDefaultDomains, pointRadius: 4 }
		}
	} satisfies Record<string, StoryStepConfig>;

	return { title: 'Data Story', stepsConfig };
}) satisfies PageServerLoad;
