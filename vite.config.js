import { sveltekit } from '@sveltejs/kit/vite';
import { ssp } from "sveltekit-search-params/plugin";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), ssp()],
};

export default config;
