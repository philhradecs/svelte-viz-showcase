<script lang="ts">
	import { fade } from 'svelte/transition';

	export let fullSize = false;
</script>

<div transition:fade class="fixed inset-0 top-12 rounded-lg">
	<div class="h-full flex items-center justify-center">
		<div
			class={`transition-all ${
				fullSize ? 'w-[100vw] h-full' : 'lg:w-[80vw] xl:w-[60vw] h-[50vh]'
			}  mt-[5vh] w-[100vw] `}
		>
			<slot />
		</div>
	</div>
</div>
