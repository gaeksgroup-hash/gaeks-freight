import { ArticleItem, Language, ServiceDetail } from '../types/freight';
import { DETAILED_SERVICES } from '../data/defaultServices';
import { DEFAULT_ARTICLES } from './newsStorage';

const serviceSeeds = new Map(DETAILED_SERVICES.map((item) => [item.id, item]));
const articleSeeds = new Map(DEFAULT_ARTICLES.map((item) => [item.id, item]));

const norm = (value?: string) => (value || '').trim();

function pickLocalizedField<T extends object>(
  item: T,
  seed: T | undefined,
  field: keyof T & string,
  language: Language
): string {
  const base = String(item[field] || '');
  if (language === 'id') return base;
  const suffixKey = `${field}_${language}` as keyof T;
  const translated = String(item[suffixKey] || '');
  if (!translated.trim()) return base;
  if (seed && norm(base) !== norm(String(seed[field] || ''))) {
    return base;
  }
  return translated;
}

/**
 * Resolve display fields for a service in the requested language while preserving
 * operator edits made to Indonesian base fields instead of reverting to stale seed translations.
 */
export function localizeService(service: ServiceDetail, language: Language) {
  const seed = serviceSeeds.get(service.id);
  return {
    title: pickLocalizedField(service, seed, 'title', language),
    category: pickLocalizedField(service, seed, 'category', language),
    tagline: pickLocalizedField(service, seed, 'tagline', language),
    description: pickLocalizedField(service, seed, 'description', language),
  };
}

/**
 * Resolve display fields for a news article in the requested language while preserving
 * operator edits made to base article fields.
 */
export function localizeArticle(article: ArticleItem, language: Language) {
  const seed = articleSeeds.get(article.id);
  return {
    ...article,
    title: pickLocalizedField(article, seed, 'title', language),
    category: pickLocalizedField(article, seed, 'category', language),
    excerpt: pickLocalizedField(article, seed, 'excerpt', language),
    content: pickLocalizedField(article, seed, 'content', language),
  };
}

/**
 * Remove stale `_en` and `_zh` overrides whenever an operator edits a base field.
 */
export function stripStaleTranslations<T extends object>(
  nextItem: T,
  previousItem: T | undefined,
  fields: readonly (keyof T & string)[]
): T {
  const cleaned = { ...nextItem } as Record<string, unknown>;
  for (const field of fields) {
    const nextVal = norm(String(cleaned[field] || ''));
    const prevVal = previousItem ? norm(String(previousItem[field] || '')) : '';
    if (!previousItem || nextVal !== prevVal) {
      delete cleaned[`${field}_en`];
      delete cleaned[`${field}_zh`];
    }
  }
  return cleaned as T;
}

/**
 * Infer browser MIME type for a favicon path or URL, stripping query strings first.
 */
export function inferFaviconMimeType(url: string): string | undefined {
  const clean = url.split(/[?#]/)[0].trim().toLowerCase();
  if (clean.endsWith('.svg')) return 'image/svg+xml';
  if (clean.endsWith('.png')) return 'image/png';
  if (clean.endsWith('.webp')) return 'image/webp';
  if (clean.endsWith('.ico')) return 'image/x-icon';
  if (clean.endsWith('.gif')) return 'image/gif';
  if (clean.endsWith('.jpg') || clean.endsWith('.jpeg')) return 'image/jpeg';
  return undefined;
}
