<script lang="ts">
	export let id: string | number;
	let className: string = '';
	export { className as class };
	let hasContent = $$slots.default;
</script>

<section
	id={String(id)}
	data-scrolly-section={id}
	class={`relative z-10 target:scroll-mt-32 ${className} pointer-events-auto`}
>
	{#if hasContent}
		<div class="bg-gray-900/70 backdrop-blur-md -mx-5 px-5 py-6">
			<slot />
		</div>
	{/if}
</section>
