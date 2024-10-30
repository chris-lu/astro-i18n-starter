import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { LOCALES_SETTING, DEFAULT_LOCALE_SETTING } from './src/i18n/locales';


export default defineConfig({
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: DEFAULT_LOCALE_SETTING,
    locales: Object.keys(LOCALES_SETTING).map((k, v) => k),
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
