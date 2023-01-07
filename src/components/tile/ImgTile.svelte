<script lang="ts">
	import placeholder from '$assets/placeholder.jpg';
	import VizTile from './VizTile.svelte';

	export let title = '';
	export let link: string;
	export let imgSrc: string;
</script>

<VizTile {title} {link}>
	<div class="aspect-square overflow-hidden">
		<img
			src={imgSrc || placeholder}
			alt="placeholder"
			class="h-full w-full object-cover transition-transform duration-500 origin-bottom group-hover:scale-110 ease-out"
		/>
	</div>
</VizTile>
