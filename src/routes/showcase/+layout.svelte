<script lang="ts">
	import Header from '$components/Header.svelte';

	export let title = '';
</script>

<div class="h-full flex flex-col">
	<Header>
		<h1 class="text-lg text-highlight-yellow">{title}</h1>
	</Header>
	<div class="mt-6 flex-1">
		<slot />
	</div>
</div>
