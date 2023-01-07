<script lang="ts">
	import CheckboxControl from '$components/controls/Checkbox.svelte';
	import SelectControl from '$components/controls/Select.svelte';
	import SliderControl from '$components/controls/Slider.svelte';
	import RadioControl from '$components/controls/RadioGroup.svelte';
	import type { ComponentType } from 'svelte';
	import type { Control, ControlType } from '$components/controls/types';

	const controlTypeMap: Record<ControlType, ComponentType> = {
		checkbox: CheckboxControl,
		select: SelectControl,
		slider: SliderControl,
		radio: RadioControl
	};

	export let controls: Control[] = [];
</script>

<div class="flex flex-col gap-4">
	{#each controls as config (config.label)}
		<svelte:component this={controlTypeMap[config.type]} {config} />
	{/each}
</div>
