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

<div class="flex flex-col h-full">
	<Header />

	{#if $navigating}
		<PageLoading />
	{:else}
		<div class="flex-1">
			<slot />
		</div>
	{/if}
</div>
