import type { ComponentType } from 'react';

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  cover: string;
};

type ArticleModule = {
  default: ComponentType;
  meta: Omit<ArticleMeta, 'slug'>;
};

const modules = import.meta.glob('./posts/*/index.mdx', { eager: true }) as Record<
  string,
  ArticleModule
>;

const articles = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.match(/\.\/posts\/(.+)\/index\.mdx$/)?.[1] ?? path;
    return { ...mod.meta, slug };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getArticle = (slug: string) => articles.find(a => a.slug === slug);

export const getArticleComponent = (slug: string) =>
  `./posts/${slug}/index.mdx` in modules
    ? modules[`./posts/${slug}/index.mdx`].default
    : undefined;

export const getAllArticles = () => articles;
