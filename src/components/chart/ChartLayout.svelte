<script lang="ts">
	import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
	import ChartSidebar from '$components/chart/ChartSidebar.svelte';
	import type { Control } from '$components/controls/types';
	export let controls: Control[] = [];
</script>

<div class="h-full flex gap-8 mr-4">
	<div class="flex-1"><slot /></div>
	{#if controls.length > 0}
		<div class="md:hidden flex items-stretch fixed right-0 top-[60vh]">
			<label
				for="control-modal"
				class="cursor-pointer p-1.5 pl-2 bg-cyan-900 rounded-tl-md rounded-bl-md flex items-center"
				><SettingsAdjust size={24} /></label
			>
			<input type="checkbox" id="control-modal" class="modal-toggle" />
			<label class="modal modal-bottom bg-transparent" for="control-modal">
				<label class="modal-box relative rounded-none bg-primary/95" for="">
					<ChartSidebar title="Controls" {controls} />
				</label>
			</label>
		</div>
		<div class="hidden md:block w-[300px] max-w-[300px] pt-4">
			<ChartSidebar title="Controls" {controls} />
		</div>
	{/if}
</div>
