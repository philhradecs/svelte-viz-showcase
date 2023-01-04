<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import PageLoading from '$components/PageLoading.svelte';
	import Header from '$components/Header.svelte';

	import { page } from '$app/stores';

	$: routeId = $page.route.id;

	$: vizName = routeId?.match(/showcase\/(.*)/)?.[1];
	$: chartTitle = vizName
		? vizName
				.split('-')
				.map((segment) => segment[0].toUpperCase() + segment.slice(1))
				.join(' ')
		: undefined;

	$: headerTitle = !$navigating && chartTitle ? chartTitle : '';
</script>

<div class="flex flex-col h-full">
	<Header>
		{#if headerTitle}
			<div class="font-mono text-lg">{headerTitle}</div>
		{:else}
			<a href="viz">About</a>
		{/if}
	</Header>

	{#if $navigating}
		<PageLoading />
	{:else}
		<div class="flex-1">
			<slot />
		</div>
	{/if}
</div>
