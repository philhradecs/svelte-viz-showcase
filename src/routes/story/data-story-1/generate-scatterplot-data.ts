import { randomUniform, randomNormal, randomBates, randomPoisson } from 'd3-random';
	import { extent, max, min, range, zip } from 'd3-array';
import { scaleLinear } from 'd3-scale';

	export const scatterPlotDistributions = ['uniform', 'normal', 'bates', 'poisson'] as const;

	export type ScatterPlotDistribution = (typeof scatterPlotDistributions)[number];

	const randomFnMap = {
		uniform: randomUniform(),
		normal: randomNormal(),
		bates: randomBates(200),
		poisson: randomPoisson(10)
	} satisfies Record<ScatterPlotDistribution, () => number>;

	export function generateScatterplotData(
		distribution: ScatterPlotDistribution,
		numPoints: number
	) {
		const randomFn = randomFnMap[distribution];
		const X = range(numPoints).map(randomFn);
		const Y = range(numPoints).map(randomFn);
		const [minX = 0, maxX = 0] = extent(X);
		const [minY = 0, maxY = 0] = extent(Y);

		const scaleToRange = scaleLinear()
			.range([0, 100])
			.domain([min([minX, minY]) || 0, max([maxX, maxY]) || 0]);

		const data = Array.from({length: numPoints}, (_, i) => ({
			x: scaleToRange(X[i]),
			y: scaleToRange(Y[i])
		}));

		return data
	}