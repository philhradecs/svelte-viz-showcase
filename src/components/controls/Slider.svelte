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
		<div>{value}</div>
	</div>
	<input
		type="range"
		{...rest}
		class="min-w-[60px] block"
		{id}
		bind:value
		on:input={handleChange}
	/>
</div>
