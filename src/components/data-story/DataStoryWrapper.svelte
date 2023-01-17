<script lang="ts" context="module">
	import { createQueue } from './queue';
	export type DataStoryContext = { index: () => number; queue: ReturnType<typeof createQueue> };
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	const queue = createQueue();

	let startIndex = -1;

	setContext<DataStoryContext>('SetIndex', {
		index: () => {
			startIndex += 1;
			return startIndex;
		},
		queue
	});

	let className: string = '';
	export { className as class };
</script>

<article class={`${className}`}>
	<div class="fixed inset-0 top-12 rounded-lg transition-opacity">
		<div class="h-full flex items-center justify-center">
			<slot name="chart" />
		</div>
	</div>
	<div class="container mx-auto max-w-4xl px-5 leading-relaxed md:text-lg"><slot /></div>
</article>
