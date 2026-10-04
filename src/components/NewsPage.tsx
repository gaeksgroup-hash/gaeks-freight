// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Send, Search, CheckCircle2, ArrowRight, Calendar, Share2, Copy, MessageCircle, Twitter, Linkedin, ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Clock, UserCheck, BookmarkCheck, ChevronDown } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const NewsPage: React.FC<{ activeDetailId?: string; onBackToList?: () => void; onSelectArticle?: (id: string) => void; currentLang?: Language }> = ({ activeDetailId, onBackToList, onSelectArticle, currentLang = 'id' }) => {
  const rawArticles = getStoredArticles();
  const sortedArticles = [...rawArticles].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const [articles] = useState<ArticleItem[]>(sortedArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');

  // Paginasi: 6 artikel per halaman
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const articlesPerPage = 6;

  const rawDetailArticle = activeDetailId ? articles.find(a => a.id === activeDetailId) : null;
  const detailArticle = rawDetailArticle ? {
    ...rawDetailArticle,
    title: currentLang === 'en' ? rawDetailArticle.title_en || rawDetailArticle.title : currentLang === 'zh' ? rawDetailArticle.title_zh || rawDetailArticle.title : rawDetailArticle.title,
    category: currentLang === 'en' ? rawDetailArticle.category_en || rawDetailArticle.category : currentLang === 'zh' ? rawDetailArticle.category_zh || rawDetailArticle.category : rawDetailArticle.category,
    content: currentLang === 'en' ? rawDetailArticle.content_en || rawDetailArticle.content : currentLang === 'zh' ? rawDetailArticle.content_zh || rawDetailArticle.content : rawDetailArticle.content,
  } : null;

  const categories = ['Semua', 'Regulasi Kepabeanan', 'Operational Freight', 'Rute Maritim', 'Kargo Khusus', 'Project Cargo & Alat Berat'];

  const filtered = articles.filter(a => {
    const titleText = currentLang === 'en' ? a.title_en || a.title : currentLang === 'zh' ? a.title_zh || a.title : a.title;
    const excerptText = currentLang === 'en' ? a.excerpt_en || a.excerpt : currentLang === 'zh' ? a.excerpt_zh || a.excerpt : a.excerpt;
    const matchSearch = titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        excerptText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / articlesPerPage) || 1;
  const currentArticles = filtered.slice((currentPageNum - 1) * articlesPerPage, currentPageNum * articlesPerPage);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const ok = addSubscriber(emailInput);
    if (ok) {
      toast.success('Pendaftaran Berhasil!', {
        description: 'Terima kasih, email Anda telah terdaftar di buletin intelijen Gaek Freight.'
      });
      setEmailInput('');
    } else {
      toast.info('Email Sudah Terdaftar', {
        description: 'Alamat email ini sudah terdaftar dalam sistem buletin kami.'
      });
    }
  };

  const handleShare = (platform: 'wa' | 'tw' | 'li' | 'copy', article: ArticleItem) => {
    const url = window.location.origin + '/#news?id=' + article.id;
    const text = `${article.title} - Baca artikel regulasi & logistik maritim terpercaya:`;

    if (platform === 'wa') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
      toast.success('Membuka WhatsApp untuk berbagi');
    } else if (platform === 'tw') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'li') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Tautan Berhasil Disalin!', {
        description: 'Tautan artikel telah disalin ke papan klip Anda.'
      });
    }
  };

  const renderStructuredContent = (rawText: string) => {
    const paragraphs = rawText.split('\n\n').filter(p => p.trim().length > 0);

    return paragraphs.map((p, idx) => {
      if (/^\d+\./m.test(p)) {
        const lines = p.split('\n').filter(l => l.trim().length > 0);
        return (
          <div key={idx} className="space-y-3 my-6">
            {lines.map((line, lIdx) => {
              const match = line.match(/^(\d+)\.\s*(.*)/);
              if (match) {
                return (
                  <div key={lIdx} className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-cyan-400 hover:shadow-md transition-all duration-200">
                    <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-tr from-[#012E34] to-cyan-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-blue-500/20">
                      {match[1]}
                    </span>
                    <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                      {match[2]}
                    </div>
                  </div>
                );
              }
              return <p key={lIdx} className="text-base text-slate-700 leading-relaxed">{line}</p>;
            })}
          </div>
        );
      }

      if (p.endsWith(':') || (p.length < 90 && p.includes(':'))) {
        return (
          <div key={idx} className="mt-8 mb-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2.5 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-[#012E34] rounded-full inline-block flex-shrink-0" />
              <span>{p}</span>
            </h3>
          </div>
        );
      }

      if (idx === 0) {
        return (
          <div key={idx} className="bg-cyan-50/70 border-l-4 border-[#012E34] p-6 sm:p-8 rounded-2xl text-slate-800 text-base sm:text-lg leading-relaxed font-medium mb-8 shadow-sm">
            {p}
          </div>
        );
      }

      return (
        <p key={idx} className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
          {p}
        </p>
      );
    });
  };

  if (detailArticle) {
    return (
      <main className="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]">
        <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <button type="button" onClick={() => onBackToList?.()} className="button-link"><ArrowLeft className="h-4 w-4" />Kembali ke daftar</button>
          <header className="mt-7 border-b border-slate-300 pb-8">
            <p className="section-label">{detailArticle.category}</p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">{detailArticle.title}</h1>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <span>{detailArticle.publishedDate}</span>
              <span>{detailArticle.author}</span>
              <span>{detailArticle.readTime}</span>
            </div>
          </header>
          <img src={detailArticle.imageUrl} alt="" className="mt-8 aspect-[16/8] w-full object-cover" />
          <div className="prose prose-slate mt-9 max-w-none">{renderStructuredContent(detailArticle.content)}</div>

          {detailArticle.sources && detailArticle.sources.length > 0 && (
            <details className="group mt-10 border-y border-slate-300">
              <summary className="flex min-h-14 items-center justify-between text-sm font-bold">Sumber artikel<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary>
              <ul className="space-y-2 pb-5 text-sm text-slate-600">
                {detailArticle.sources.map((source, index) => <li key={index}>{source}</li>)}
              </ul>
            </details>
          )}

          <details className="group border-b border-slate-300">
            <summary className="flex min-h-14 items-center justify-between text-sm font-bold">Bagikan artikel<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary>
            <div className="flex flex-wrap gap-2 pb-5">
              <button type="button" onClick={() => handleShare('wa', detailArticle)} className="button-secondary">WhatsApp</button>
              <button type="button" onClick={() => handleShare('li', detailArticle)} className="button-secondary">LinkedIn</button>
              <button type="button" onClick={() => handleShare('tw', detailArticle)} className="button-secondary">X</button>
              <button type="button" onClick={() => handleShare('copy', detailArticle)} className="button-secondary">Salin tautan</button>
            </div>
          </details>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="button-primary mt-8">Bahas dampaknya pada pengiriman<ArrowRight className="h-4 w-4" /></a>
        </article>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]">
      <section className="page-shell py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <header>
            <p className="section-label">Berita dan pembaruan</p>
            <h1 className="section-title">Informasi yang membantu keputusan pengiriman.</h1>
            <p className="section-copy">Cari catatan regulasi, rute, dan operasi. Setiap artikel tampil sebagai baris ringkas.</p>
            <details className="mt-8 border-y border-slate-300">
              <summary className="flex min-h-14 items-center justify-between text-sm font-bold">Langganan pembaruan<ChevronDown className="h-4 w-4" /></summary>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 pb-5 sm:flex-row">
                <label className="sr-only" htmlFor="news-email">Email</label>
                <input id="news-email" type="email" required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email perusahaan" className="field flex-1" />
                <button type="submit" className="button-primary">Daftar</button>
              </form>
            </details>
          </header>

          <div>
            <div className="grid gap-3 border-b border-slate-300 pb-5 sm:grid-cols-[1fr_auto]">
              <label><span className="sr-only">Cari berita</span><input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPageNum(1); }} placeholder="Cari judul atau topik" className="field" /></label>
              <label><span className="sr-only">Kategori</span><select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPageNum(1); }} className="field sm:w-56">{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            </div>
            <p className="py-4 text-sm text-slate-500">{filtered.length} artikel ditemukan</p>
            <div className="border-b border-slate-300">
              {currentArticles.map((article) => (
                <button key={article.id} type="button" onClick={() => onSelectArticle?.(article.id)} className="group grid min-h-[108px] w-full grid-cols-[1fr_auto] items-center gap-5 border-t border-slate-300 py-5 text-left">
                  <span className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">{article.category}</span>
                    <strong className="mt-2 block text-lg leading-6 text-[#12363a]">{article.title}</strong>
                    <span className="mt-2 block text-xs text-slate-500">{new Date(article.publishedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
            {filtered.length === 0 && <p className="border-t border-slate-300 py-8 text-sm text-slate-500">Tidak ada artikel yang cocok.</p>}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <button type="button" disabled={currentPageNum === 1} onClick={() => setCurrentPageNum((page) => Math.max(1, page - 1))} className="button-secondary disabled:opacity-40">Sebelumnya</button>
                <span className="text-sm text-slate-500">{currentPageNum} / {totalPages}</span>
                <button type="button" disabled={currentPageNum === totalPages} onClick={() => setCurrentPageNum((page) => Math.min(totalPages, page + 1))} className="button-secondary disabled:opacity-40">Berikutnya</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
