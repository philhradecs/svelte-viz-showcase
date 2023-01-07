import { writable } from 'svelte/store';

export const scatterPlotDistributions = ['uniform', 'normal', 'bates', 'poisson'] as const;
export type ScatterPlotDistribution = typeof scatterPlotDistributions[number];
export const scatterPlotDistribution = writable<ScatterPlotDistribution>('normal');
export const scatterPlotPoints = writable(300);
export const scatterPlotPointRadius = writable(5);
export const scatterPlotShowGrid = writable(false);
