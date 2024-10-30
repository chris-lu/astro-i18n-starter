import EN_TRANSLATIONS from "./en/translations.json";
import FR_TRANSLATIONS from "./fr/translations.json";

import EN_PAGES from "./en/pages.json";
import FR_PAGES from "./fr/pages.json";


interface LocaleSetting {
    [key: Lowercase<string>]: {
        label: string;
        lang?: string;
        dir?: 'rtl' | 'ltr';
        translations?: Translations;
    };
}

function flattenTranslations(translations: Translations, prefix: string = '', result: { [key: string]: string } = {}): { [key: string]: string } {
    for (const key in translations) {
        const value = translations[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            // If value is a string, assign it to the result
            result[newKey] = value;
        } else if (typeof value === 'object' && value !== null) {
            // If value is an object, recurse into it
            flattenTranslations(value as Translations, newKey, result);
        }
    }

    return result;
}

export type Translations = {
    [key: string]: string | Translations;
};

export interface TranslationEntry {
    title: string;
    slug?: string;
    href?: string;
}

// Use an array of TranslationEntry for the type
export type Navigation = {
    [key: string]: TranslationEntry[];
}

export const DEFAULT_LOCALE_SETTING: string = "en";

export const LOCALES_SETTING: LocaleSetting = {
    "en": {
        "label": "English",
        "translations": flattenTranslations(EN_TRANSLATIONS)
    },
    "fr": {
        "label": "Français",
        "translations": flattenTranslations(FR_TRANSLATIONS)
    },
    /*
    "zh-cn": {
        "label": "简体中文",
        "lang": "zh-CN"
    },
    "ar": {
        "label": "العربية",
        "dir": "rtl"
    },*/
};

export const LOCALES_PAGES: Navigation = {
    "en": EN_PAGES,
    "fr": FR_PAGES
};
