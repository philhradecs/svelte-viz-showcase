<script lang="ts">
	export let name: string;
	let className: string = '';
	export { className as class };
</script>

<section data-scrolly-section={name} class={`relative z-10 ${className}`}>
	<div class="bg-primary/90 backdrop-blur-sm -mx-5 px-5 py-6">
		<slot />
	</div>
</section>
