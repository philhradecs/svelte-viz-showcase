<script lang="ts">
	import Header from '$components/Header.svelte';
	import VizTile from '$components/VizTile.svelte';

	import data from '../showcase-data';
</script>

<div>
	<Header>
		<a href="viz">About</a>
	</Header>

	<div class="mt-6 pb-12 container mx-auto px-5 ">
		<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			<div class="col-span-full lg:col-span-2 xl:col-span-3 max-w-3xl mr-4 font-mono">
				<h1 class="mb-2 lg:text-4xl">
					Welcome to <span class="text-highlight-green">Viz</span>
				</h1>
				<p class="lg:text-lg text-justify lg:text-start">
					D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring
					data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full
					capabilities of modern browsers without tying yourself to a proprietary framework,
					combining powerful showcaseization components and a data-driven approach to DOM
					manipulation.
				</p>
			</div>

			{#each data as { title, link, imgSrc }, i (title)}
				<VizTile {title} {link} {imgSrc} color={i === 0 ? 'dark' : 'light'} />
			{/each}
		</div>
	</div>
</div>
