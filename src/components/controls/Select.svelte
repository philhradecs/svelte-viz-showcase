<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import type { SelectControlProps } from './types';

	export let config: SelectControlProps;
	const { writable, label, options } = config;
	let id = createId();
</script>

<div>
	<div class="mb-0.5">
		<label for={id}>{label}</label>
	</div>
	<select class="min-w-[60px]" {id} bind:value={$writable}>
		{#each options as { value, label } (value)}
			<option {value}>
				{label}
			</option>
		{/each}
	</select>
</div>
