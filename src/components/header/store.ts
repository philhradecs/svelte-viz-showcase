import { writable } from 'svelte/store';

export const headerContent = writable<
	{ title: string } | { links: { label: string; link: string }[] }
>({
	title: ''
});
