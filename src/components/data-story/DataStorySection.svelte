<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { DataStoryContext } from './DataStoryWrapper.svelte';

	const dispatch = createEventDispatcher();

	const { index, queue, hideVisualisation } = getContext<DataStoryContext>('DataStoryContext');
	const sectionIndex = index();

	let className: string = '';
	export { className as class };
	export let hideVis = false;

	let element: HTMLElement;
	let intersecting: boolean;
	let wasActive = false;

	$: if (intersecting && !$queue.includes(sectionIndex)) {
		queue.add(sectionIndex);
	} else if (!intersecting && $queue.includes(sectionIndex)) {
		queue.remove(sectionIndex);
	}

	$: isSectionActive = $queue[0] === sectionIndex;

	$: isQueueEmpty = $queue.length === 0;
	$: if (!isQueueEmpty && isSectionActive && !wasActive) {
		console.log('in', sectionIndex);
		dispatch('in');
		hideVisualisation(hideVis);
		wasActive = true;
	}
	$: if (!isQueueEmpty && !isSectionActive) {
		if (wasActive) {
			console.log('out', sectionIndex);
			dispatch('out');
		}
		wasActive = false;
	}
</script>

<div class={`relative z-10 ${className}`}>
	<IntersectionObserver {element} bind:intersecting rootMargin="-56px">
		<section bind:this={element} class="bg-primary/90 backdrop-blur-sm -mx-5 px-5 py-6">
			<slot />
		</section>
	</IntersectionObserver>
</div>
