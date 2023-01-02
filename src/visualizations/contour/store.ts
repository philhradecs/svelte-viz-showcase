import { writable } from 'svelte/store';

export const bandwidth = writable(25);
export const threshold = writable(30);
