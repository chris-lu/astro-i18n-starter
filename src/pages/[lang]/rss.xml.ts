import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { localeParams, useTranslations, DEFAULT_LOCALE, getLocalePages } from "@/i18n";
import type { APIContext } from 'astro';


export const getStaticPaths = () => localeParams;

export async function GET(context: APIContext) {


    const locale = context.params.lang || DEFAULT_LOCALE;
    const t = useTranslations(locale);

    const localeTitle = t("site.title");
    const localeDescription = t("site.description");

    const posts = await getCollection('blog', ({ slug }) => {
        console.log(slug);
        return slug.split("/")[0] == locale;
    });

    posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    return rss({
        title: localeTitle,
        description: localeDescription,
        site: context.site || import.meta.env.WEBSITE_URL,
        // Blog posts
        items: posts.map((post) => {
            let [lang, ...slug] = post.slug.split("/");
            return ({
                // Fix wrong slog prefix
                title: post.data.title,
                pubDate: post.data.date,
                description: post.data.description,
                link: `/${locale}/blog/${slug}/`,
            });
        })
        // Local pages
        .concat(getLocalePages(locale).reduce((filtered: Array<any>, page) => {
            if (page.slug) {
                filtered.push({
                    title: page.title,
                    pubDate: new Date(),
                    description: "",
                    link: `/${locale}/${page.slug}/`,
                });
            }
            return filtered;
        }, []))
    });
}
