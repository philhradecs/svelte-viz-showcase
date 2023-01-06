<script lang="ts">
	import type { ComponentType, SvelteComponentTyped } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { ChartProps, InferChartData } from '$components/chart/Chart.svelte';
	import { setContext } from 'svelte';

	type T = $$Generic<ComponentType<SvelteComponentTyped<{ config: ChartProps<any> }>>>;

	type State = InferChartData<T>;

	export let key: Symbol | string = 'data-story-context-key';
	export let store: Writable<State>;
	// export let chart: T;

	setContext(key, store);
</script>

<slot name="chart" />

<div>
	<h1>Data Story</h1>
	<slot />
</div>
