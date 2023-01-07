<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import type { CheckboxControlProps } from './types';

	export let config: CheckboxControlProps;
	const { writable, label } = config;

	let id = createId();
</script>

<div>
	<input {id} type="checkbox" bind:checked={$writable} />
	<label for={id} class="ml-2">
		{label}
	</label>
</div>
