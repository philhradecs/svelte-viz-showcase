import Header from '~/components/header';

export const loader = ({ request: { url } }: LoaderArgs) => {
	const { pathname } = new URL(url);
	if (/^\/showcase?\/$/.test(pathname)) {
		return redirect('line-chart');
	}
	const match = pathname.match(/showcase\/(.*)/);
	const vizName = match?.[1];
	if (vizName) {
		return vizName
			.split('-')
			.map((segment) => segment[0].toUpperCase() + segment.slice(1))
			.join(' ');
	}
};

export default function Viz() {
	const title = useLoaderData();

	return (
		<div className="h-full flex flex-col">
			<Header>
				<h1 className="text-lg text-highlight-yellow">{title}</h1>
			</Header>
			<div className="mt-6 flex-1">
				<Outlet />
			</div>
		</div>
	);
}
