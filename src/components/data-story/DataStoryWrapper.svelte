<script lang="ts">
	import { setContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let key: Symbol | string = 'data-story-context-key';
	export let store: Writable<any>;

	let className: string = '';
	export { className as class };

	setContext(key, store);
</script>

<article class={className}>
	<div class="fixed inset-0 top-12 rounded-lg -z-10">
		<div class="h-full flex items-center justify-center">
			<slot name="chart" />
		</div>
	</div>

	<div class="container mx-auto max-w-4xl px-5"><slot /></div>
</article>
