<script lang="ts">
	export let steps: { id: string; title: string }[] = [];
	export let collapsed = false;
	export let activeId: string | undefined = undefined;
</script>

<div class="fixed left-4 top-[20%] z-30 hidden xl:block">
	{#each steps as step (step.id)}
		{@const isActive = activeId && activeId === step.id}
		<a class="flex items-center h-7 my-2 group" href={`#${step.id}`}>
			<div
				class="w-2 h-2 border border-white rounded-full transition-all"
				class:hidden={collapsed}
				class:bg-cyan-900={isActive}
				class:scale-[2]={isActive}
			/>
			<div
				class="text-sm rounded-sm text-white py-1 px-2"
				class:hidden={!collapsed}
				class:group-hover:block={!collapsed}
				class:font-bold={collapsed && isActive}
				class:bg-cyan-900={collapsed && isActive}
			>
				{step.title}
			</div>
		</a>
	{/each}
</div>
