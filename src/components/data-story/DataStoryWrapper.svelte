<script lang="ts">
	import Scrolly from '$components/scrolly/Scrolly.svelte';

	let className: string = '';
	export { className as class };

	type StepName = $$Generic<string>;
	export let activeStep: StepName | undefined;

	let screenHeight: number;
</script>

<svelte:window bind:innerHeight={screenHeight} />
<article class={`${className}`}>
	<slot name="chart" />
	<div class="container mx-auto max-w-4xl px-5 leading-relaxed md:text-lg">
		<Scrolly bind:value={activeStep} bottom={screenHeight / 2}>
			<slot />
		</Scrolly>
	</div>
</article>
