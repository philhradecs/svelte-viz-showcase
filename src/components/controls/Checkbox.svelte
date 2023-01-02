<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import type { CheckboxControlProps } from './types';
	type $$Props = CheckboxControlProps;
	let id = createId();
	const { writable, label } = $$props as $$Props;
</script>

<div>
	<input {id} type="checkbox" bind:checked={$writable} />
	<label for={id} class="ml-2">
		{label}
	</label>
</div>
d
