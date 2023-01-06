<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import PageLoading from '$components/PageLoading.svelte';
	import Header from '$components/header/Header.svelte';

	import { page } from '$app/stores';
	import { headerContent } from '$components/header/store';

	$: routeId = $page.route.id;

	$: vizName = routeId?.match(/showcase\/(.*)/)?.[1];
	$: chartTitle = vizName
		? vizName
				.split('-')
				.map((segment) => segment[0].toUpperCase() + segment.slice(1))
				.join(' ')
		: undefined;

	$: {
		routeId;
		headerContent.set(
			chartTitle ? { title: chartTitle } : { links: [{ label: 'About', link: 'about' }] }
		);
	}
</script>

<div class="flex flex-col min-h-full">
	<div class="sticky top-0 left-0 z-10 bg-primary">
		<Header />
	</div>

	{#if $navigating}
		<PageLoading />
	{:else}
		<div class="flex-1 flex">
			<div class="flex-1"><slot /></div>
		</div>
	{/if}
</div>
