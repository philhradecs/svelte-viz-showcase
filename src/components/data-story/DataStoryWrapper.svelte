<script lang="ts">
	import Scrolly from '$components/scrolly/Scrolly.svelte';
	import { fade } from 'svelte/transition';

	let className: string = '';
	export { className as class };
	export let stepConfigs: Step[] = [];
	type Step = $$Generic<{ name: string; [x: string]: any }>;

	let activeStep: string | undefined;
	export let activeConfig: Step | undefined = undefined;

	let screenHeight: number;

	$: {
		if (activeStep) {
			activeConfig = stepConfigs.find((d) => d.name === activeStep);
		}
	}
</script>

<svelte:window bind:innerHeight={screenHeight} />
<article class={`${className}`}>
	{#if activeConfig}
		<div
			transition:fade={{ duration: 80 }}
			class="fixed inset-0 top-12 rounded-lg transition-opacity"
		>
			<div class="h-full flex items-center justify-center">
				<slot name="chart" />
			</div>
		</div>
	{/if}
	<div class="container mx-auto max-w-4xl px-5 leading-relaxed md:text-lg">
		<Scrolly bind:value={activeStep} bottom={screenHeight / 2}>
			<slot />
		</Scrolly>
	</div>
</article>
