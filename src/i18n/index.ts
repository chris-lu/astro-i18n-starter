import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING, LOCALES_PAGES } from "./locales";
import { getRelativeLocaleUrl } from "astro:i18n";


/**
 * User-defined locales list
 * @constant @readonly
 */
export const LOCALES = LOCALES_SETTING as Record<string, LocaleConfig>;
type LocaleConfig = {
  readonly label: string;
  readonly lang?: string;
  readonly dir?: "ltr" | "rtl";
  readonly translations?: { [key: string]: string };
};


/**
 * Type for the language code
 * @example
 * "en" | "ja" | ...
 */
export type Lang = keyof typeof LOCALES;


/**
 * Default locale code
 * @constant @readonly
*/
export const DEFAULT_LOCALE = DEFAULT_LOCALE_SETTING as Lang;


/**
 * Type for the multilingual object
 * @example
 * { en: "Hello", ja: "こんにちは", ... }
 */
export type Multilingual = { [key in Lang]?: string };


/**
 * Helper to get the translation function
 * @param - The current language
 * @returns - The translation function
 */
export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return translate(lang, key);
  };
}

export function translate(lang: Lang, key: string): string {
  return (LOCALES[lang] && LOCALES[lang].translations && LOCALES[lang].translations[key]) || key
};

/**
 * Helper to get the translation function
 * @param - The current language
 * @returns - The available pages, translations and slugs
 */
export function getLocalePages(lang: Lang) {
  
  return (LOCALES_PAGES[lang]);
}

/**
 * Helper to get corresponding path list for all locales
 * @param url - The current URL object
 * @returns - The list of locale paths
 */
export function getLocalePaths(url: URL): LocalePath[] {
  return Object.keys(LOCALES).map((lang) => {
    return {
      lang: lang as Lang,
      path: getRelativeLocaleUrl(lang, url.pathname.replace(/^\/[a-zA-Z-]+/, ''))
    };
  });
}
type LocalePath = {
  lang: Lang;
  path: string;
};

/**
 * Helper to get locale parms for Astro's `getStaticPaths` function
 * @returns - The list of locale params
 * @see https://docs.astro.build/en/guides/routing/#dynamic-routes
 */
export const localeParams = Object.keys(LOCALES).map((lang) => ({
  params: { lang },
}));
