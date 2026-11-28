// filepath: /src/utils/newsStorage.ts
import { ArticleItem } from '../types/freight';
import articlesSeed from '../../public/api/articles_seed.json';

const STORAGE_KEY_ARTICLES = 'gaeks_articles_v15_full';

export const DEFAULT_ARTICLES: ArticleItem[] = articlesSeed as ArticleItem[];

export function getStoredArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    return parsed;
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export function saveStoredArticles(articles: ArticleItem[]): void {
  localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
}
