<script lang="ts">
	import data from '../showcase-data';
	import ImgTile from '$components/tile/ImgTile.svelte';
	import Dashboard from 'carbon-icons-svelte/lib/Dashboard.svelte';
	import DataRefinery from 'carbon-icons-svelte/lib/DataRefinery.svelte';
	import IconLink from '$components/IconLink.svelte';
</script>

<div class="mt-8 mb-8 container mx-auto px-5 ">
	<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
		<div class="mb-8 row-span-2 col-span-full lg:col-span-2 xl:col-span-3 max-w-3xl mr-4 font-mono">
			<h1 class="mb-2.5 lg:text-4xl">
				Welcome to <span class="text-cyan-500">Viz</span>
			</h1>
			<p class="lg:text-lg text-justify lg:text-start">
				D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring
				data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full
				capabilities of modern browsers without tying yourself to a proprietary framework, combining
				powerful showcaseization components and a data-driven approach to DOM manipulation.
			</p>
		</div>

		<div class="self-end mb-2 lg:mb-0">
			<IconLink title="Dashboard" link="dashboard" icon={Dashboard} />
		</div>
		<div class="self-start mb-2 lg:mb-0">
			<IconLink title="Data Story" link="data-story" icon={DataRefinery} />
		</div>

		<hr class="col-span-full lg:hidden border-gray-800 mb-4" />

		{#each data as { title, slug, imgSrc }, i (title)}
			<ImgTile {title} link={`showcase/${slug}`} {imgSrc} />
		{/each}
	</div>
</div>
