<script lang="ts">
	import type { CarbonIconProps } from 'carbon-icons-svelte';
	import type { ComponentType, SvelteComponentTyped } from 'svelte';

	export let title = '';
	export let link: string;
	export let icon: ComponentType<SvelteComponentTyped<CarbonIconProps>>;
</script>

<a href={link}>
	<div class="flex items-center gap-4 group hover:bg-cyan-300/80 px-2 py-1 rounded-sm flex-wrap">
		<div class="shrink-0">
			<svelte:component this={icon} size={32} class="text-cyan-300/80 group-hover:text-black" />
		</div>
		<div class="tracking-wider text-xl font-bold group-hover:text-black">
			{title}
		</div>
	</div>
</a>
