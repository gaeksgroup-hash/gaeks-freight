import { contactLink, measureContactClick } from '../utils/quoteFlow';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown, Clock3, Mail, Search, Share2 } from 'lucide-react';
import { ArticleItem, Language } from '../types/freight';
import { getStoredArticles } from '../utils/newsStorage';
import { GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { localizeArticle } from '../utils/localizeContent';
import { articlePath, articleSlug } from '../utils/articleRoutes';
import { isPublishedArticle } from '../utils/serviceContent';
import { subscribeToNewsletter } from '../services/newsletterApi';

const displayDate = (value: string, language: Language) => {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'zh' ? 'zh-CN' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};
const fallbackImage = (article: ArticleItem) => /udara|bandara|air freight|penerbangan/i.test(`${article.title} ${article.category}`)
  ? '/uploads/1789234609_387712.webp'
  : /laut|maritim|kapal|pelabuhan|kontainer/i.test(`${article.title} ${article.category}`)
    ? '/uploads/1789234509_387710.webp'
    : '/uploads/gaeks-hero-cargo-poster.webp';
const useFallbackImage = (event: React.SyntheticEvent<HTMLImageElement>, article: ArticleItem) => {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = fallbackImage(article);
};

const localized = (article: ArticleItem, language: Language) => localizeArticle(article, language);

const ArticleBody: React.FC<{ content: string }> = ({ content }) => <div className="news-prose">
  {content.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => {
    const lines = paragraph.split('\n').filter(Boolean);
    if (lines.every((line) => /^\d+\.\s/.test(line))) return <ol key={index}>{lines.map((line) => <li key={line}>{line.replace(/^\d+\.\s*/, '')}</li>)}</ol>;
    if (paragraph.trim().endsWith(':') && paragraph.length < 120) return <h2 key={index}>{paragraph.trim().replace(/:$/, '')}</h2>;
    return <p key={index}>{paragraph}</p>;
  })}
</div>;

export const NewsPage: React.FC<{ activeDetailId?: string; onBackToList?: () => void; onSelectArticle?: (id: string) => void; currentLang?: Language }> = ({ activeDetailId, onBackToList, onSelectArticle, currentLang = 'id' }) => {
  const [articles, setArticles] = useState<ArticleItem[]>(() => getStoredArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [sort, setSort] = useState<'latest' | 'oldest' | 'title'>('latest');
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const state = new URLSearchParams(window.location.search).get('newsletter');
    if (state === 'confirmed') toast.success('Langganan aktif', { description: 'Berita berikutnya akan dikirim ke email Anda.' });
    if (state === 'unsubscribed') toast.success('Langganan dihentikan');
    if (state === 'invalid') toast.error('Tautan newsletter tidak berlaku');
    if (state) window.history.replaceState({}, '', window.location.pathname);
  }, []);

  useEffect(() => {
    const reload = () => setArticles(getStoredArticles());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const published = useMemo(() => articles.filter(isPublishedArticle), [articles]);
  const categories = useMemo(() => ['Semua', ...new Set(published.map((article) => article.category))], [published]);
  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return published.filter((article) => {
      const text = localized(article, currentLang);
      return (category === 'Semua' || article.category === category)
        && (!query || `${text.title} ${text.excerpt} ${text.category}`.toLocaleLowerCase().includes(query));
    }).sort((a, b) => sort === 'title'
      ? localized(a, currentLang).title.localeCompare(localized(b, currentLang).title)
      : sort === 'oldest' ? a.publishedDate.localeCompare(b.publishedDate) : b.publishedDate.localeCompare(a.publishedDate));
  }, [published, searchQuery, category, sort, currentLang]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / 6));
  const visible = filtered.slice((page - 1) * 6, page * 6);
  const detailRaw = activeDetailId ? published.find((article) => article.id === activeDetailId || articleSlug(article) === activeDetailId) : undefined;
  const detail = detailRaw ? localized(detailRaw, currentLang) : undefined;

  const openArticle = (event: React.MouseEvent, article: ArticleItem) => {
    if (!onSelectArticle || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onSelectArticle(article.id);
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!consent || submitting) return;
    setSubmitting(true);
    try {
      const message = await subscribeToNewsletter(email, consent, company);
      toast.success('Periksa email Anda', { description: message });
      setEmail(''); setConsent(false);
    } catch (error) {
      toast.error('Pendaftaran belum berhasil', { description: error instanceof Error ? error.message : 'Coba lagi nanti.' });
    } finally { setSubmitting(false); }
  };

  if (detail) return <div className="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]">
    <article className="page-shell max-w-5xl py-12 sm:py-16">
      <button type="button" onClick={onBackToList} className="button-link"><ArrowLeft className="h-4 w-4" />Semua berita</button>
      <header className="mt-10 max-w-4xl">
        <p className="section-label">{detail.category} <span className="mx-2 text-slate-400">/</span> {displayDate(detail.publishedDate, currentLang)}</p>
        <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{detail.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{detail.excerpt}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-300 pt-5 text-sm text-slate-500"><span>{detail.author || 'GAEKS Editorial'}</span>{detail.readTime && <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{detail.readTime}</span>}<button type="button" className="inline-flex items-center gap-1.5 font-semibold text-[#12363a] hover:underline" onClick={async () => { await navigator.clipboard.writeText(window.location.href); toast.success('Tautan artikel disalin'); }}><Share2 className="h-4 w-4" />Bagikan</button></div>
      </header>
      {detail.imageUrl && <img src={detail.imageUrl} onError={(event) => useFallbackImage(event, detailRaw!)} alt="" width="1200" height="675" className="mt-9 aspect-[16/9] w-full object-cover" />}
      <div className="mx-auto mt-10 max-w-3xl"><ArticleBody content={detail.content} />
        {detail.sources?.length ? <details className="group mt-12 border-y border-slate-300"><summary className="flex min-h-16 items-center justify-between font-bold">Sumber dan rujukan<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary><ul className="list-disc space-y-2 pb-5 pl-5 text-sm text-slate-600">{detail.sources.map((source) => <li key={source}>{source}</li>)}</ul></details> : null}
        <a href={contactLink('whatsapp', 'general')} target="_blank" rel="noopener noreferrer" onClick={() => measureContactClick('whatsapp', 'general')} className="button-primary mt-8">Bahas dampaknya pada pengiriman<ArrowRight className="h-4 w-4" /></a>
      </div>
    </article>
  </div>;

  return <div className="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]">
    <section className="page-shell news-page py-12 sm:py-20">
      <header className="news-heading"><div><p className="section-label">GAEKS / Wawasan logistik</p><h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-6xl">Berita yang membantu keputusan pengiriman.</h1></div><p className="max-w-sm text-base leading-7 text-slate-600">Pembaruan freight, kepabeanan, dan rute untuk tim operasional yang membutuhkan konteks jelas sebelum bertindak.</p></header>
      <div className="news-toolbar" role="search"><label className="news-search"><Search className="h-4 w-4 shrink-0 text-slate-500" /><span className="sr-only">Cari berita</span><input type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setPage(1); }} placeholder="Cari judul atau topik" /></label><label className="sr-only" htmlFor="news-category">Kategori</label><select id="news-category" value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }}>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select><label className="sr-only" htmlFor="news-sort">Urutkan berita</label><select id="news-sort" value={sort} onChange={(event) => { setSort(event.target.value as typeof sort); setPage(1); }}><option value="latest">Terbaru</option><option value="oldest">Terlama</option><option value="title">Judul A–Z</option></select></div>
      <p className="mt-4 text-sm text-slate-500" aria-live="polite">{filtered.length} artikel ditemukan</p>
      {visible.length ? <div className="news-grid">
        {visible.map((article, index) => { const text = localized(article, currentLang); return <a key={article.id} href={articlePath(article)} onClick={(event) => openArticle(event, article)} className={`news-card ${index === 0 && page === 1 ? 'news-card-featured' : ''}`}>
          <div className="news-card-media">{article.imageUrl && <img src={article.imageUrl} onError={(event) => useFallbackImage(event, article)} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" width="800" height="520" />}<span className="news-card-media-arrow" aria-hidden="true"><ArrowRight className="h-5 w-5" /></span></div>
          <div className="news-card-content"><span className="news-card-kicker">{text.category} <span aria-hidden="true">·</span> {displayDate(article.publishedDate, currentLang)}</span><h2>{text.title}</h2><p>{text.excerpt}</p><span className="news-card-read">Baca analisis <ArrowRight className="h-4 w-4" /></span></div>
        </a>; })}
      </div> : <div className="mt-7 border-t border-slate-300 py-12 text-slate-600">Tidak ada artikel yang cocok. Coba kata kunci atau kategori lain.</div>}
      {totalPages > 1 && <nav aria-label="Halaman berita" className="mt-10 flex items-center justify-between border-t border-slate-300 pt-6"><button type="button" className="button-secondary disabled:opacity-40" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Sebelumnya</button><span className="text-sm text-slate-600">{page} / {totalPages}</span><button type="button" className="button-secondary disabled:opacity-40" disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Berikutnya</button></nav>}
      <aside className="news-subscribe" aria-labelledby="news-subscribe-title"><div><div className="inline-flex items-center gap-2 text-cyan-200"><Mail className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.16em]">Briefing GAEKS</span></div><h2 id="news-subscribe-title" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Berita penting, langsung ke inbox.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-cyan-50/75">Terima artikel baru dan pembaruan ketika tim GAEKS menerbitkannya. Konfirmasi email diperlukan; tautan berhenti berlangganan tersedia di setiap kiriman.</p></div><form onSubmit={submit} className="news-subscribe-form"><div className="flex flex-col gap-2 sm:flex-row"><label className="sr-only" htmlFor="news-email">Alamat email</label><input id="news-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@perusahaan.com" /><button type="submit" disabled={submitting || !consent} className="button-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Mengirim…' : 'Berlangganan'}<ArrowRight className="h-4 w-4" /></button></div><label className="mt-3 flex items-start gap-2 text-xs leading-5 text-cyan-50/75"><input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 accent-cyan-300" />Saya setuju menerima pembaruan GAEKS melalui email.</label><label className="absolute -left-[10000px]" aria-hidden="true">Perusahaan<input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} /></label></form></aside>
    </section>
  </div>;
};
