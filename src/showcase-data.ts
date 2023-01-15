import contourCoverImage from './assets/images/cover-contour.png';
import globeCoverImage from './assets/images/cover-globe.png';
import dashboardCoverImage from './assets/images/cover-dashboard.png';
import dotPlotCoverImage from './assets/images/cover-dot-plot.png';
import treemapCoverImage from './assets/images/cover-treemap.png';
import scatterPlotCoverImage from './assets/images/cover-scatter-plot.png';

const data = [
	// {
	// 	title: 'Dashboard',
	// 	slug: 'dashboard',
	// 	imgSrc: dashboardCoverImage,
	// 	color: 'dark'
	// },
	{
		title: 'Density Contours',
		slug: 'density-contours',
		imgSrc: contourCoverImage
	},

	{
		title: 'Dot Plot',
		slug: 'dot-plot',
		imgSrc: dotPlotCoverImage
	},
	{
		title: 'Zoomable Treemap',
		slug: 'zoomable-treemap',
		imgSrc: treemapCoverImage
	},
	{
		title: 'Scatter Plot',
		slug: 'scatter-plot',
		imgSrc: scatterPlotCoverImage
	}

	// {
	// 	title: 'Interactive Globe',
	// 	slug: 'interactive-globe',
	// 	imgSrc: globeCoverImage
	// },
	// {
	// 	title: 'Line Chart',
	// 	slug: 'line-chart',
	// 	imgSrc: ''
	// }
] as const;

export default data;
