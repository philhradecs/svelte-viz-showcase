<script lang="ts">
	/**
	 * This component manages which item is most in view for scroll triggering
	 * example:
	 * <Scrolly
	 * 	bind:value={scrollIndex}
	 * >
	 * **items here**
	 * </Scrolly>
	 *
	 * optional params with defaults
	 * <Scrolly root={null} top={0} bottom={0} increments={100}>
	 */
	import { onMount } from 'svelte';
	export let root: IntersectionObserverInit['root'] = null;
	export let top = 0;
	export let bottom = 0;
	export let increments = 100;
	export let value: string | undefined = undefined;
	export let dataAttributeName = 'scrolly-section';
	const camelize = (kebabString: string) => kebabString.replace(/-./g, (x) => x[1].toUpperCase());

	const steps: number[] = [];
	const threshold: IntersectionObserverInit['threshold'] = [];

	let nodes: HTMLElement[] = [];
	let intersectionObservers: IntersectionObserver[] = [];
	let container: HTMLElement;

	$: top, bottom, update();

	const update = () => {
		if (!nodes.length) return;
		nodes.forEach(createObserver);
	};

	const mostInView = () => {
		let maxRatio = 0;
		let maxIndex = 0;
		for (let i = 0; i < steps.length; i++) {
			if (steps[i] > maxRatio) {
				maxRatio = steps[i];
				maxIndex = i;
			}
		}

		if (maxRatio > 0) {
			return nodes[maxIndex].dataset[camelize(dataAttributeName)];
		} else return undefined;
	};

	const createObserver = (node: Element, index: number) => {
		const handleIntersect: IntersectionObserverCallback = (e) => {
			const ratio = e[0].intersectionRatio;
			steps[index] = ratio;
			value = mostInView();
		};

		const marginTop = top ? top * -1 : 0;
		const marginBottom = bottom ? bottom * -1 : 0;
		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
		const options = { root, rootMargin, threshold };

		if (intersectionObservers[index]) {
			intersectionObservers[index].disconnect();
		}

		const io = new IntersectionObserver(handleIntersect, options);
		io.observe(node);
		intersectionObservers[index] = io;
	};

	onMount(() => {
		for (let i = 0; i < increments + 1; i++) {
			threshold.push(i / increments);
		}
		nodes = [...container.querySelectorAll<HTMLElement>(`:scope > *[data-${dataAttributeName}]`)];
		update();
	});
</script>

<div bind:this={container}>
	<slot />
</div>
