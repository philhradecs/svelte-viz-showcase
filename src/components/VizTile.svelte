<script lang="ts">
	import placeholder from '../assets/placeholder.jpg';

	export let title: string;
	export let imgSrc: string;
	export let link: string;
	export let square: boolean = true;
	export let color: 'light' | 'dark' = 'light';
</script>

<a href={link} class="block h-full">
	<div class={`group border border-transparent transition-all hover:border-cyan-400/80 `}>
		<div class={`${square ? 'aspect-square' : 'aspect-[2.078/1]'} overflow-hidden`}>
			<img
				src={imgSrc || placeholder}
				alt="placeholder"
				class="h-full w-full object-cover transition-transform duration-500 origin-bottom group-hover:scale-110 ease-out"
			/>
		</div>

		<div
			class={`${
				color === 'dark' ? 'text-white group-hover:text-black' : 'bg-gray-100 text-black'
			}  transition-colors group-hover:bg-cyan-400/80 hover:border-cyan-400/80 px-2.5 font-bold tracking-wide md:text-lg`}
		>
			{title}
		</div>
	</div>
</a>
