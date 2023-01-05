<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import throttle from 'lodash.throttle';
	import type { SliderControlProps } from './types';

	export let config: SliderControlProps;
	const { label, writable, throttle: throttleMs, type, ...rest } = config;

	const handleChange = throttle(
		(event: Event) => writable.set(+(event.target as HTMLInputElement).value),
		throttleMs
	);

	let id = createId();
	let value = $writable;
</script>

<div>
	<div class="flex gap-2 mb-0.5">
		<label for={id}>{label}:</label>
		<div class="text-lg text-cyan-500">{value}</div>
	</div>
	<input
		type="range"
		{...rest}
		class="w-full max-w-[160px] block"
		{id}
		bind:value
		on:input={handleChange}
	/>
</div>
