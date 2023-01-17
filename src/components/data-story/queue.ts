import { writable } from 'svelte/store';

export const createQueue = (initialValue = []) => {
	const queue = writable<number[]>(initialValue);
	const { subscribe, update } = queue;
	return {
		subscribe,
		add: (index: number) =>
			update((queue) => (index < queue[0] ? [index, ...queue] : [...queue, index])),
		remove: (index: number) => update((queue) => queue.filter((d) => d !== index))
	};
};
