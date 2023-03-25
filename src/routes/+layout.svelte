<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import PageLoading from '$components/PageLoading.svelte';
	import Header from '$components/header/Header.svelte';

	import { page } from '$app/stores';

	const defaultHeaderLinks = [{ label: 'About', link: 'about' }];
</script>

<div class="flex flex-col min-h-screen">
	<nav class="sticky top-0 left-0 z-20 bg-primary/95 backdrop-blur-sm">
		<Header title={$page.data.title} links={$page.data.links || defaultHeaderLinks} />
	</nav>

	{#if $navigating}
		<div class="grow flex justify-center items-center">
			<PageLoading />
		</div>
	{:else}
		<main class="grow flex">
			<div class="flex-1"><slot /></div>
		</main>
	{/if}
</div>
