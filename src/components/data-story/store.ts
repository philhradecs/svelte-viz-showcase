import { writable } from 'svelte/store';

export const dataStoryStepQueue = writable<number[]>([]);
