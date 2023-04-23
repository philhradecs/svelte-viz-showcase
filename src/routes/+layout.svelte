<script lang="ts">
	import '../app.css';
	import { navigating } from '$app/stores';
	import PageLoading from '$components/PageLoading.svelte';
	import Header from '$components/header/Header.svelte';

	import { page } from '$app/stores';

	const defaultHeaderLinks = [{ label: 'About', link: 'about' }];
</script>

<div>
	<Header title={$page.data.title} links={$page.data.links || defaultHeaderLinks} />

	<main>
		{#if $navigating}
			<PageLoading />
		{:else}
			<slot />
		{/if}
	</main>
</div>

<style lang="postcss">
	:global(html) {
		height: 100%;
		/* scroll-behavior: smooth; */
		background-color: theme('colors.gray.900');
		color: theme('colors.gray.200');
	}

	:global(h1) {
		font-size: theme('fontSize.3xl');
		font-weight: bold;
	}
	:global(h2) {
		font-size: theme('fontSize.2xl');
		font-weight: bold;
	}
	:global(h3) {
		font-size: theme('fontSize.xl');
	}
</style>
