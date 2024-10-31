import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { LOCALES_SETTING, DEFAULT_LOCALE_SETTING } from './src/i18n/locales';
import { loadEnv } from "vite";
const { WEBSITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  site: WEBSITE_URL,
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: DEFAULT_LOCALE_SETTING,
    locales: Object.keys(LOCALES_SETTING).map((k, ) => k),
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'red',
    },
  },
});
