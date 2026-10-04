import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getStoredArticles } from '../utils/newsStorage';
import { ArticleItem, Language } from '../types/freight';

interface HomeEditorialProps {
  currentLang?: Language;
  onNavigate: (page: string) => void;
  onSelectArticle: (articleId: string) => void;
}

const steps = [
  ['01', 'Pahami kebutuhan', 'Komoditas, volume, Incoterms, asal, dan tujuan dipetakan sebelum moda dipilih.'],
  ['02', 'Periksa kepatuhan', 'Dokumen, HS code, pembatasan, dan kebutuhan PPJK ditinjau sebelum pengapalan.'],
  ['03', 'Atur pergerakan', 'Booking, konsolidasi, trucking, dan milestone dikelola dalam satu alur.'],
  ['04', 'Selesaikan serah terima', 'Status, dokumen, dan tindakan berikutnya diteruskan saat kargo tiba.']
];

const localize = (article: ArticleItem, language: Language) => ({
  title: language === 'en' ? article.title_en || article.title : language === 'zh' ? article.title_zh || article.title : article.title,
  category: language === 'en' ? article.category_en || article.category : language === 'zh' ? article.category_zh || article.category : article.category
});

export const HomeEditorial: React.FC<HomeEditorialProps> = ({ currentLang = 'id', onNavigate, onSelectArticle }) => {
  const articles = getStoredArticles()
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  return (
    <section aria-labelledby="process-title" className="section-block bg-[#f4f5f1]">
      <div className="page-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="section-label">Cara kerja</p>
          <h2 id="process-title" className="section-title">Empat tahap, satu jalur koordinasi.</h2>
          <div className="mt-8 border-b border-slate-300">
            {steps.map(([number, title, description]) => (
              <details key={number} className="group border-t border-slate-300">
                <summary className="flex min-h-[70px] items-center gap-4 py-3">
                  <span className="font-mono text-xs text-cyan-700">{number}</span>
                  <strong className="flex-1 text-sm text-[#12363a]">{title}</strong>
                  <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-6 pl-9 text-sm leading-6 text-slate-600">{description}</p>
              </details>
            ))}
          </div>
          <button type="button" onClick={() => onNavigate('contact')} className="button-primary mt-7">Mulai konsultasi<ArrowRight className="h-4 w-4" /></button>
        </div>

        <div>
          <p className="section-label">Pembaruan</p>
          <h2 className="section-title">Catatan untuk keputusan pengiriman.</h2>
          <div className="mt-8 border-b border-slate-300">
            {articles.map((article) => {
              const item = localize(article, currentLang);
              return (
                <button key={article.id} type="button" onClick={() => onSelectArticle(article.id)} className="group flex min-h-[92px] w-full items-center gap-4 border-t border-slate-300 py-4 text-left">
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase tracking-wider text-cyan-700">{item.category}</span>
                    <strong className="mt-2 block text-base leading-6 text-[#12363a]">{item.title}</strong>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => onNavigate('news')} className="button-link mt-5">Lihat semua berita<ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
};
