<script lang="ts">
	import { getContext } from 'svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { Writable } from 'svelte/store';
	import { dataStoryStepQueue } from './store';

	const stateWritable = getContext<Writable<any>>('data-story-context-key');

	export let step: number;
	let className: string = '';
	export { className as class };

	type State = typeof $stateWritable;
	export let state: (state: State) => State;

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

	$: {
		if (!wasShown && $dataStoryStepQueue[0] === step) {
			stateWritable.update(state);
			wasShown = true;
		}
	}
</script>

<div class={`relative z-10 ${className}`}>
	<IntersectionObserver {element} bind:intersecting threshold={0.5}>
		<section bind:this={element} class="bg-primary/60 -mx-5 px-5 py-6">
			<slot />
		</section>
	</IntersectionObserver>
</div>
