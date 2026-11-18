import { ServiceDetail } from '../types/freight';
import serviceKnowledge from '../data/serviceKnowledge.json';

type Knowledge = { summary: string; compare: [string, string, string][]; faq: [string, string][] };

export function serviceContent(service: ServiceDetail): Knowledge {
  const legacy = serviceKnowledge[service.id as keyof typeof serviceKnowledge] as Knowledge | undefined;
  return {
    summary: service.summary?.trim() || legacy?.summary || service.description,
    compare: service.compare?.length ? service.compare : legacy?.compare || [],
    faq: service.faq?.length ? service.faq : legacy?.faq || [],
  };
}

export function isPublishedArticle(article: { status?: string; publishedDate: string }): boolean {
  return article.status !== 'draft' && article.publishedDate <= new Date().toISOString().slice(0, 10);
}
