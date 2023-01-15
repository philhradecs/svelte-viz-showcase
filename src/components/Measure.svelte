<script lang="ts">
	import debounce from 'lodash.debounce';

	export let debounceMs = 200;

	let clientWidth = 0;
	let clientHeight = 0;

	let debounced = { clientWidth, clientHeight };

	const debouncedUpdateDimensions = debounce((clientWidth: number, clientHeight: number) => {
		debounced = { clientWidth, clientHeight };
	}, debounceMs);

	$: debouncedUpdateDimensions(clientWidth, clientHeight);
</script>

<div bind:clientWidth bind:clientHeight class="h-full">
	<slot width={debounced.clientWidth} height={debounced.clientHeight} />
</div>
