<script lang="ts">
	import { getContext } from 'svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { DataStoryContext } from './DataStoryWrapper.svelte';
	import { dataStoryStepQueue } from './store';

	const { data, visibility } = getContext<DataStoryContext>('data-story-context-key');

	export let hideChart = false;
	export let step: number;

	let className: string = '';
	export { className as class };

	type State = typeof $data;
	export let state: (state: State) => State = (d) => d;

	let element: HTMLElement;
	let intersecting: boolean;
	$: wasShown = false;

	$: if (intersecting && !$dataStoryStepQueue.includes(step)) {
		dataStoryStepQueue.update((queue) =>
			step < $dataStoryStepQueue[0] ? [step, ...queue] : [...queue, step]
		);
	} else if (!intersecting && $dataStoryStepQueue.includes(step)) {
		dataStoryStepQueue.update((queue) => queue.filter((d) => d !== step));
		wasShown = false;
	}

	$: if ($dataStoryStepQueue[0] === step) {
		if (!wasShown) {
			data.update(state);
			visibility.set(hideChart ? 'hidden' : 'visible');
			wasShown = true;
		}
	} else {
		wasShown = false;
	}
</script>

<div class={`relative z-10 ${className}`}>
	<IntersectionObserver {element} bind:intersecting rootMargin="-56px">
		<section bind:this={element} class="bg-primary/90 backdrop-blur-sm -mx-5 px-5 py-6">
			<slot />
		</section>
	</IntersectionObserver>
</div>
