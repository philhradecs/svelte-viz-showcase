<script lang="ts">
	import ChartTSne from 'carbon-icons-svelte/lib/ChartTSne.svelte';
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';
</script>

<div class="p-4 h-12 flex justify-around items-center py-3 border-b border-b-gray-800">
	<a href="/">
		<ChartTSne size={24} />
	</a>
	<div class="flex justify-center flex-1 gap-5">
		<slot />
	</div>
	<a class="hover:text-highlight-rose">
		<LogoGithub size={24} />
	</a>
</div>
