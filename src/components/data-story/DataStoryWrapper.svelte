<script lang="ts" context="module">
	export type ChartVisibility = 'visible' | 'hidden';
	export type DataStoryContext = {
		data: Writable<any>;
		visibility: Writable<ChartVisibility>;
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let key: Symbol | string = 'data-story-context-key';
	export let store: Writable<any>;

	let className: string = '';
	export { className as class };

	let chartVisibilityStore = writable<ChartVisibility>('hidden');

	setContext<DataStoryContext>(key, { data: store, visibility: chartVisibilityStore });

	$: isHidden = $chartVisibilityStore === 'hidden';
</script>

<article class={className}>
	<div class:opacity-0={isHidden} class="fixed inset-0 top-12 rounded-lg transition-opacity">
		<div class="h-full flex items-center justify-center">
			<slot name="chart" />
		</div>
	</div>

	<div class="container mx-auto max-w-4xl px-5 leading-relaxed text-lg"><slot /></div>
</article>
