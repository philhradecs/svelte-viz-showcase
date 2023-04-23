import { onDestroy } from 'svelte';
import { delegate, type DelegateInstance, followCursor, type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export type RegisterTooltipFn = (selector: string, options?: Partial<Props>) => void;
export const getRegisterTooltip = (parent: Element): RegisterTooltipFn => {
	const tippyInstanceMap = new Map<string, DelegateInstance>();
	onDestroy(() => tippyInstanceMap.forEach((instance) => instance.destroy()));

	return (selector, options) => {
		if (parent) {
			tippyInstanceMap.get(selector)?.destroy();
			tippyInstanceMap.set(
				selector,
				delegate(parent, {
					target: selector,
					followCursor: true,
					delay: [100, 0],
					plugins: [followCursor],
					...options
				})
			);
		}
	};
};
