import contourCoverImage from './assets/images/cover-contour.png';
import globeCoverImage from './assets/images/cover-globe.png';
import dashboardCoverImage from './assets/images/cover-dashboard.png';
import dotPlotCoverImage from './assets/images/cover-dot-plot.png';

const data = [
	{
		title: 'Dashboard',
		link: 'dashboard',
		imgSrc: dashboardCoverImage,
		color: 'dark'
	},
	{
		title: 'Density Contours',
		link: 'showcase/density-contours',
		imgSrc: contourCoverImage
	},

	{
		title: 'Dot Plot',
		link: 'showcase/dot-plot',
		imgSrc: dotPlotCoverImage
	},
	{
		title: 'Zoomable Treemap',
		link: 'showcase/zoomable-treemap',
		imgSrc: ''
	},

	{
		title: 'Interactive Globe',
		link: 'showcase/interactive-globe',
		imgSrc: globeCoverImage
	},
	{
		title: 'Line Chart',
		link: 'showcase/line-chart',
		imgSrc: ''
	}
];

export default data;
