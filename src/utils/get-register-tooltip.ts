import { onDestroy } from 'svelte';
import { delegate, type DelegateInstance, followCursor } from 'tippy.js';

let tippyInstanceMap = new Map<string, DelegateInstance>();

export const getRegisterTooltip = (parent: Element) => (selector: string) => {
	if (parent) {
		tippyInstanceMap.get(selector)?.destroy();

		tippyInstanceMap = tippyInstanceMap.set(
			selector,
			delegate(parent, {
				target: selector,
				followCursor: true,
				plugins: [followCursor]
			})
		);
	}
	onDestroy(() => tippyInstanceMap.forEach((instance) => instance.destroy()));
};
