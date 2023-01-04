import { quantile, range } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { scaleBand, scaleLinear } from 'd3-scale';
import { interpolate, quantize, interpolateRound } from 'd3-interpolate';
import { format } from 'd3-format';
import type { BaseType, Selection } from 'd3-selection';

type LegendOptions = {
	title?: string;
	tickSize?: number;
	width?: number;
	height?: number;
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;
	ticks?: number;
	tickFormat?: ((domainValue: any, index: number) => string) | string;
	tickValues?: number[];
	onHover?: (value: any | undefined) => void;
	onClick?: (value: any | undefined) => void;
	selected?: any;
};

export default function drawLegend(
	root: Selection<SVGSVGElement, unknown, null, undefined>,
	color: any,
	{
		title,
		tickSize = 6,
		width = 320,
		height = 44 + tickSize,
		marginTop = 18,
		marginRight = 0,
		marginBottom = 16 + tickSize,
		marginLeft = 0,
		ticks = width / 64,
		tickFormat,
		tickValues,
		onHover,
		onClick,
		selected
	}: LegendOptions = {}
) {
	root
		.selectAll('g.legend')
		.data([color])
		.join<SVGGElement>('g')
		.classed('legend', true)
		.call(drawInnerLegend);

	function ramp(color: any, n = 256) {
		const canvas = document.createElement('canvas');
		canvas.width = n;
		canvas.height = 1;
		const context = canvas.getContext('2d');
		if (context) {
			for (let i = 0; i < n; ++i) {
				context.fillStyle = color(i / (n - 1));
				context.fillRect(i, 0, 1, 1);
			}
		}
		return canvas;
	}

	function drawInnerLegend(g: Selection<BaseType, unknown, BaseType, unknown>) {
		let tickAdjust = (g: Selection<BaseType, unknown, BaseType, undefined>): any =>
			g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);
		let x: any;

		// Continuous
		if (color.interpolate) {
			const n = Math.min(color.domain().length, color.range().length);

			x = color.copy().rangeRound(quantize(interpolate(marginLeft, width - marginRight), n));

			g.join('image')
				.attr('x', marginLeft)
				.attr('y', marginTop)
				.attr('width', width - marginLeft - marginRight)
				.attr('height', height - marginTop - marginBottom)
				.attr('preserveAspectRatio', 'none')
				.attr('xlink:href', ramp(color.copy().domain(quantize(interpolate(0, 1), n))).toDataURL());
		}

		// Sequential
		else if (color.interpolator) {
			x = Object.assign(
				color.copy().interpolator(interpolateRound(marginLeft, width - marginRight)),
				{
					range() {
						return [marginLeft, width - marginRight];
					}
				}
			);

			g.join('image')
				.attr('x', marginLeft)
				.attr('y', marginTop)
				.attr('width', width - marginLeft - marginRight)
				.attr('height', height - marginTop - marginBottom)
				.attr('preserveAspectRatio', 'none')
				.attr('xlink:href', ramp(color.interpolator()).toDataURL());

			// scaleSequentialQuantile doesn’t implement ticks or tickFormat.
			if (!x.ticks) {
				if (tickValues === undefined) {
					const n = Math.round(ticks + 1);
					tickValues = range(n).map((i) => quantile(color.domain(), i / (n - 1)) || 0); // added a numerical default to please typescript
				}
				if (typeof tickFormat !== 'function') {
					tickFormat = format(tickFormat === undefined ? ',f' : tickFormat);
				}
			}
		}

		// Threshold
		else if (color.invertExtent) {
			const thresholds = color.thresholds
				? color.thresholds() // scaleQuantize
				: color.quantiles
				? color.quantiles() // scaleQuantile
				: color.domain(); // scaleThreshold

			const thresholdFormat =
				tickFormat === undefined
					? (d: any) => d
					: typeof tickFormat === 'string'
					? format(tickFormat)
					: tickFormat;

			x = scaleLinear()
				.domain([-1, color.range().length - 1])
				.rangeRound([marginLeft, width - marginRight]);

			g.join('g')
				.selectAll('rect')
				.data(color.range())
				.join('rect')
				.attr('x', (d, i) => x(i - 1))
				.attr('y', marginTop)
				.attr('width', (d, i) => x(i) - x(i - 1))
				.attr('height', height - marginTop - marginBottom)
				.attr('fill', (d) => d as any);

			tickValues = range(thresholds.length);
			tickFormat = (i) => thresholdFormat(thresholds[i], i);
		}

		// Ordinal
		else {
			x = scaleBand()
				.domain(color.domain())
				.rangeRound([marginLeft, width - marginRight]);
			const rect = g
				.selectAll('g.colorTiles')
				.data((d) => [d])
				.join('g')
				.classed('colorTiles', true)
				.selectAll('rect')
				.data(color.domain())
				.join('rect')
				.attr('x', x)
				.attr('y', marginTop)
				.attr('width', Math.max(0, x.bandwidth() - 1))
				.attr('height', height - marginTop - marginBottom)
				.attr('fill', color)
				.attr('stroke', (d) => (selected && d === selected ? 'white' : null))
				.attr('stroke-width', 2);

			if (onHover) {
				rect.on('mouseenter', (_, d) => onHover(d)).style('cursor', 'pointer');
			}
			if (onClick) {
				rect.on('click', (_, d) => onClick(d)).style('cursor', 'pointer');
			}

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			tickAdjust = () => {};
		}

		g.selectAll('g.axisBottom')
			.data((d) => [d])
			.join('g')
			.classed('axisBottom', true)
			.attr('transform', `translate(0,${height - marginBottom})`)
			.call((el) => {
				const axis = axisBottom(x)
					.ticks(ticks, typeof tickFormat === 'string' ? tickFormat : undefined)
					.tickSize(tickSize);
				if (typeof tickFormat === 'function') {
					axis.tickFormat(tickFormat);
				}
				if (tickValues) {
					axis.tickValues(tickValues);
				}
				return axis(el as any);
			})
			.call(tickAdjust)
			.call((g) => g.select('.domain').remove())
			.call((g) =>
				title
					? g
							.selectAll('text.axisTitle')
							.data((d) => [d])
							.join('text')
							.classed('axisTitle', true)
							.attr('x', marginLeft)
							.attr('y', marginTop + marginBottom - height - 6)
							.attr('fill', 'currentColor')
							.attr('text-anchor', 'start')
							.attr('font-weight', 'bold')
							// .attr('class', 'title')
							.text(title)
					: undefined
			);
	}
}
