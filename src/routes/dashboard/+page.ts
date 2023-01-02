export const load = async ({ params }) => {
	const data = await Promise.all([
		// fetchLineChartData(),
		// fetchContoursData(),
		// fetchLineChartData(),
		// fetchGlobeData()
	]);
	return data;
};
