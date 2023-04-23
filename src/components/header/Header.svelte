<script lang="ts">
	import AppLogo from 'carbon-icons-svelte/lib/DataConnected.svelte';
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';

	export let title = '';
	export let links: { label: string; link: string }[] = [];
</script>

<header
	class="sticky top-0 z-20 bg-primary backdrop-blur-sm p-4 py-3 h-12 flex justify-around items-center border-b border-b-gray-800"
>
	<a href="/">
		<AppLogo size={24} />
	</a>
	<div class="flex justify-center flex-1 gap-5">
		{#if title}
			<div class="text-xl tracking-wider text-gray-200">{title}</div>
		{:else}
			<nav class="text-cyan-600 text tracking-wider">
				{#each links as { label, link }}
					<a href={link}>{label}</a>
				{/each}
			</nav>
		{/if}
	</div>
	<a href="https://github.com" target="_blank" rel="noreferrer" class="hover:text-highlight-rose">
		<LogoGithub size={24} />
	</a>
</header>
