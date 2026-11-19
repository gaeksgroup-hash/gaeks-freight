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
  category: language === 'en' ? article.category_en || article.category : language === 'zh' ? article.category_zh || article.category : article.category
});

export const HomeEditorial: React.FC<HomeEditorialProps> = ({ currentLang = 'id', onNavigate, onSelectArticle }) => {
  const latestArticles = () => getStoredArticles().filter(isPublishedArticle).sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()).slice(0, 3);
  const [articles, setArticles] = React.useState(latestArticles);
  const [activeStep, setActiveStep] = React.useState<string | null>(null);
  const [reveal, setReveal] = React.useState<'static' | 'pending' | 'visible'>('static');
  const processRef = React.useRef<HTMLDivElement>(null);
  const processId = React.useId();

  React.useEffect(() => {
    const element = processRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Content is visible by default, including when observation is unavailable.
    if (!element || motion.matches || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setReveal('visible');
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    setReveal('pending');
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
        <div ref={processRef} className="shipping-process min-w-0" data-reveal={reveal} onFocusCapture={() => setReveal((current) => current === 'pending' ? 'visible' : current)}>
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
          <button type="button" onClick={() => onNavigate('contact')} className="button-primary mt-7">Mulai konsultasi<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
        </div>

        <div>
          <p className="section-label">Pembaruan</p>
          <h2 className="section-title">Berita dan informasi logistik.</h2>
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
