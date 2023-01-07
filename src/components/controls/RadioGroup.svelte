<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import type { RadioGroupControlProps } from './types';

	export let config: RadioGroupControlProps;
	const { writable, label, options } = config;
	let id = createId();
</script>

<div>
	<div class="mb-0.5">
		<label for={id}>{label}</label>
	</div>
	{#each options as { value, label } (value)}
		<div>
			<input type="radio" id={`${id}-${value}`} name={id} bind:group={$writable} {value} />
			<label class="ml-1.5" for={`${id}-${value}`}>
				{label}
			</label>
		</div>
	{/each}
</div>
