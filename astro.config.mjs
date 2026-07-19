// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://zinichakraborty.com',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Roboto',
			cssVariable: '--font-roboto',
			fallbacks: ['sans-serif'],
			weights: [400, 700],
			styles: ['normal'],
		},
	],
});
