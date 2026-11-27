import React from 'react';
import { ArrowRight, ChevronDown, ClipboardCheck, MessageSquare, Package, CheckCircle2 } from 'lucide-react';
import { getStoredArticles } from '../utils/newsStorage';
import { ArticleItem, Language } from '../types/freight';
import { GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { isPublishedArticle } from '../utils/serviceContent';

interface HomeEditorialProps {
  currentLang?: Language;
  onNavigate: (page: string) => void;
  onSelectArticle: (articleId: string) => void;
}

const steps = [
  { number: '01', title: 'Pahami Kebutuhan', description: 'Komoditas, volume, Incoterms, asal, dan tujuan ditinjau untuk menentukan kebutuhan pengiriman.', Icon: MessageSquare },
  { number: '02', title: 'Periksa Kepatuhan', description: 'Dokumen, HS code, dan ketentuan kepabeanan diperiksa sesuai kebutuhan kargo.', Icon: ClipboardCheck },
  { number: '03', title: 'Atur Pergerakan', description: 'Koordinasi booking, konsolidasi, dan transportasi dilakukan sesuai rencana pengiriman.', Icon: Package },
  { number: '04', title: 'Selesaikan Serah Terima', description: 'Status pengiriman dan dokumen terkait dikoordinasikan hingga proses serah terima.', Icon: CheckCircle2 }
] as const;

const localize = (article: ArticleItem, language: Language) => ({
  title: language === 'en' ? article.title_en || article.title : language === 'zh' ? article.title_zh || article.title : article.title,
  category: language === 'en' ? article.category_en || article.category : language === 'zh' ? article.category_zh || article.category : article.category,
  excerpt: language === 'en' ? article.excerpt_en || article.excerpt : language === 'zh' ? article.excerpt_zh || article.excerpt : article.excerpt,
});

const articleThumbUrl = (url: string, width: number) =>
  url?.includes('images.unsplash.com')
    ? url
        .replace(/([?&])w=\d+/i, `$1w=${width}`)
        .replace(/([?&])q=\d+/i, '$1q=70') + (url.includes('fm=') ? '' : '&fm=webp')
    : url || '/uploads/gaeks-hero-cargo-poster.webp';

export const HomeEditorial: React.FC<HomeEditorialProps> = ({ currentLang = 'id', onNavigate, onSelectArticle }) => {
  const latestArticles = () => getStoredArticles().filter(isPublishedArticle).sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()).slice(0, 3);
  const [articles, setArticles] = React.useState(latestArticles);
  const [activeStep, setActiveStep] = React.useState<string | null>('01');
  const [reveal, setReveal] = React.useState<'static' | 'visible'>('static');
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});
  const processRef = React.useRef<HTMLDivElement>(null);
  const processId = React.useId();

  React.useEffect(() => {
    const element = processRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Keep content visible by default so scroll/capture never gets stuck at opacity 0.
    if (!element || motion.matches || typeof IntersectionObserver === 'undefined') return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setReveal('visible');
        observer.disconnect();
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

    observer.observe(element);
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setReveal('static');
        observer.disconnect();
      }
    };
    motion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  React.useEffect(() => {
    const reload = () => setArticles(latestArticles());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  return (
    <section aria-labelledby="process-title" data-reveal="custom" className="section-block bg-[#f4f5f1]">
      <div className="page-shell grid min-w-0 grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-2 lg:gap-20">
        <div ref={processRef} className="shipping-process min-w-0" data-reveal={reveal}>
          <header className="shipping-process-heading">
            <p className="section-label">ALUR PENGIRIMAN</p>
            <h2 id="process-title" className="section-title">Alur Pengiriman Bersama GAEKS</h2>
            <p className="section-copy max-w-lg">Dari konsultasi kebutuhan logistik hingga barang tiba di tujuan, setiap tahapan dikoordinasikan oleh tim GAEKS Freight.</p>
          </header>
          <ol className="shipping-timeline" aria-label="Tahapan pengiriman">
            {steps.map(({ number, title, description, Icon }, index) => {
              const expanded = activeStep === number;
              const triggerId = `${processId}-trigger-${number}`;
              const panelId = `${processId}-panel-${number}`;
              return (
                <li key={number} className="shipping-step" data-active={expanded} style={{ '--step-index': index } as React.CSSProperties}>
                  <span className="shipping-step-number" aria-hidden="true">{number}</span>
                  <div className="shipping-step-card">
                    <h3>
                      <button id={triggerId} type="button" className="shipping-step-trigger" aria-expanded={expanded} aria-controls={panelId} onClick={() => setActiveStep(expanded ? null : number)}>
                        <Icon className="shipping-step-icon" aria-hidden="true" />
                        <span className="min-w-0 flex-1"><span className="sr-only">{number} — </span>{title}</span>
                        <ChevronDown className="shipping-step-chevron" aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!expanded} className="shipping-step-panel">
                      <div className="shipping-step-panel-inner"><p>{description}</p></div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <button type="button" onClick={() => onNavigate('contact')} className="button-primary btn-press mt-7">Mulai konsultasi<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
        </div>

        <div>
          <p className="section-label">Pembaruan</p>
          <h2 className="section-title">Berita dan informasi logistik.</h2>
          {articles.length > 0 && (() => {
            const lead = articles[0];
            const leadItem = localize(lead, currentLang);
            const leadSrc = !failedImages[lead.id] ? articleThumbUrl(lead.imageUrl, 680) : '/uploads/gaeks-hero-cargo-poster.webp';
            const secondary = articles.slice(1);
            return (
              <div className="mt-7 space-y-3.5">
                <button
                  type="button"
                  onClick={() => onSelectArticle(lead.id)}
                  className="home-news-lead btn-press group block w-full overflow-hidden rounded-xl border border-[#d4dedd] bg-white text-left shadow-[0_14px_30px_-24px_rgba(8,47,52,0.35)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#062d32] sm:h-48 sm:aspect-auto">
                    <img
                      src={leadSrc}
                      alt={leadItem.title}
                      decoding="async"
                      fetchPriority="low"
                      onError={() => setFailedImages((prev) => ({ ...prev, [lead.id]: true }))}
                      className="home-news-photo h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(3,25,30,0.45)_100%)]" aria-hidden="true" />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className="rounded bg-[#e6f4f3] px-2 py-0.5 font-bold uppercase tracking-wider text-[#0a5861]">{leadItem.category}</span>
                      {lead.publishedDate && (
                        <time dateTime={lead.publishedDate} className="font-mono text-slate-600">
                          {new Date(lead.publishedDate + 'T12:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </time>
                      )}
                      {lead.readTime && <span className="text-slate-600">· {lead.readTime}</span>}
                    </div>
                    <strong className="mt-2.5 block text-base font-bold leading-6 tracking-[-0.015em] text-[#12363a] transition-colors group-hover:text-[#0a5861] sm:text-lg">
                      {leadItem.title}
                    </strong>
                    {leadItem.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{leadItem.excerpt}</p>
                    )}
                    <span className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0a5861]">
                      <span>Baca berita</span>
                      <ArrowRight className="home-news-arrow h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </button>

                {secondary.length > 0 && (
                  <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-[#d4dedd] bg-white">
                    {secondary.map((article) => {
                      const item = localize(article, currentLang);
                      const thumb = !failedImages[article.id] ? articleThumbUrl(article.imageUrl, 320) : '/uploads/gaeks-hero-cargo-poster.webp';
                      return (
                        <button
                          key={article.id}
                          type="button"
                          onClick={() => onSelectArticle(article.id)}
                          className="home-news-row btn-press group flex min-h-[92px] w-full items-center gap-4 p-3.5 text-left"
                        >
                          <div className="h-[68px] w-[86px] shrink-0 overflow-hidden rounded-lg bg-[#062d32]">
                            <img
                              src={thumb}
                              alt=""
                              decoding="async"
                              fetchPriority="low"
                              onError={() => setFailedImages((prev) => ({ ...prev, [article.id]: true }))}
                              className="home-news-photo h-full w-full object-cover"
                            />
                          </div>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0a5861]">
                              <span>{item.category}</span>
                              {article.publishedDate && (
                                <time dateTime={article.publishedDate} className="font-mono font-medium normal-case tracking-normal text-slate-600">
                                  {new Date(article.publishedDate + 'T12:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </time>
                              )}
                            </span>
                            <strong className="mt-1.5 line-clamp-2 block text-sm font-bold leading-5 text-[#12363a] transition-colors group-hover:text-[#0a5861] sm:text-[15px]">
                              {item.title}
                            </strong>
                          </span>
                          <ArrowRight className="home-news-arrow h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
          <button type="button" onClick={() => onNavigate('news')} className="button-link mt-5">Lihat semua berita<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
};
