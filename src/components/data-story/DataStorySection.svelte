<script lang="ts">
	import { getContext } from 'svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { Writable } from 'svelte/store';

	const stateWritable = getContext<Writable<any>>('data-story-context-key');

	export let state: (state: typeof $stateWritable) => typeof $stateWritable;

	let element: HTMLElement;
</script>

<div>
	<IntersectionObserver {element} on:intersect={() => stateWritable.update(state)}>
		<section bind:this={element}><slot /></section>
	</IntersectionObserver>
</div>
