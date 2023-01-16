import { writable } from 'svelte/store';

export const order = writable('state');
export const transitionDelay = writable(35);
export const transitionDuration = writable(550);
export const highlightColor = writable<string>('');
