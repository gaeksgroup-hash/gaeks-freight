import { ArticleItem } from '../types/freight';

export const slugifyArticle = (value: string): string => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 96);

export function articleSlug(article: ArticleItem): string {
  if (article.slug && !article.slug.startsWith('analisis-komprehensif-logistik-maritim-')) return article.slug;
  return `${slugifyArticle(article.title) || 'berita'}-${article.id.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;
}

export const articlePath = (article: ArticleItem): string => `/berita/${articleSlug(article)}/`;
