import type { PageLoad } from './$types';
import { _fetchDashboardData } from '../dashboard/+page';

export const load: PageLoad = () => {
	const data = _fetchDashboardData();
	return data;
};
