<script lang="ts">
	import AppLogo from 'carbon-icons-svelte/lib/Network_4.svelte';
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';

	import { headerContent } from '$components/header/store';
</script>

<div class="p-4 h-12 flex justify-around items-center py-3 border-b border-b-gray-800">
	<a href="/">
		<AppLogo size={24} />
	</a>
	<div class="flex justify-center flex-1 gap-5">
		{#if 'title' in $headerContent}
			<div class="text-xl tracking-wider text-gray-200">{$headerContent.title}</div>
		{:else}
			<div class="text-cyan-600 text tracking-wider">
				{#each $headerContent.links as { label, link }}
					<a href={link}>{label}</a>
				{/each}
			</div>
		{/if}
	</div>
	<a class="hover:text-highlight-rose">
		<LogoGithub size={24} />
	</a>
</div>
