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
			<div class="flex justify-center mt-[30vh]"><PageLoading /></div>
		{:else}
			<slot />
		{/if}
	</main>
</div>

<style lang="postcss">
	
</style>
