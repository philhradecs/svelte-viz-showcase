<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import throttle from 'lodash.throttle';
	import type { SliderControlProps } from './types';
	type $$Props = SliderControlProps;
	let id = createId();
	const { label, writable, throttle: throttleMs, type, ...props } = $$props as SliderControlProps;
	const handleChange = throttle(
		(event: Event) => writable.set(+(event.target as HTMLInputElement).value),
		throttleMs
	);
	let value = $writable;
</script>

<div>
	<div class="flex gap-2 mb-0.5">
		<label for={id}>{label}:</label>
		<div>{value}</div>
	</div>
	<input
		type="range"
		{...props}
		class="min-w-[60px] block"
		{id}
		bind:value
		on:input={handleChange}
	/>
</div>
