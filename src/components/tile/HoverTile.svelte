<script lang="ts">
	export let title: string;
	export let link: string;
</script>

<a href={link} class="block h-full">
	<div class={`group border border-transparent transition-all hover:border-cyan-300/80 `}>
		<slot />

		<div
			class={`bg-gray-200 tracking-wide text-black transition-all group-hover:bg-cyan-300/80 group-hover:border-cyan-300/80 px-2.5 font-bold md:text-lg`}
		>
			{title}
		</div>
	</div>
</a>
