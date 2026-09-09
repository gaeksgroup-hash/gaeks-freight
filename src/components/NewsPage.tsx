// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar, Share2, Copy, MessageCircle, Twitter, Linkedin, ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Clock, UserCheck, BookmarkCheck } from 'lucide-react';
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
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

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
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di buletin intelijen Gaek Freight.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  const handleShare = (platform: 'wa' | 'tw' | 'li' | 'copy', article: ArticleItem) => {
    const url = window.location.origin + '/#news?id=' + article.id;
    const text = `${article.title} - Baca artikel regulasi & logistik maritim terpercaya:`;

    if (platform === 'wa') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'tw') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'li') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // Parser Konten Editorial Menjadi Paragraf, Subheading, dan Ordered List Cantik
  const renderStructuredContent = (rawText: string) => {
    const paragraphs = rawText.split('\n\n').filter(p => p.trim().length > 0);

    return paragraphs.map((p, idx) => {
      // Cek apakah paragraf adalah daftar bernomor (1., 2., 3., 4.)
      if (/^\d+\./m.test(p)) {
        const lines = p.split('\n').filter(l => l.trim().length > 0);
        return (
          <div key={idx} className="space-y-3 my-6">
            {lines.map((line, lIdx) => {
              const match = line.match(/^(\d+)\.\s*(.*)/);
              if (match) {
                return (
                  <div key={lIdx} className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                    <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-blue-500/20">
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

      // Cek apakah paragraf bertindak sebagai Subheading (diakhiri titik dua :)
      if (p.endsWith(':') || (p.length < 90 && p.includes(':'))) {
        return (
          <div key={idx} className="mt-8 mb-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2.5 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-blue-600 rounded-sm inline-block flex-shrink-0" />
              <span>{p}</span>
            </h3>
          </div>
        );
      }

      // Paragraf pertama dijadikan Executive Callout Summary Box
      if (idx === 0) {
        return (
          <div key={idx} className="bg-blue-50/70 border-l-4 border-blue-600 p-6 sm:p-8 rounded-2xl text-slate-800 text-base sm:text-lg leading-relaxed font-medium mb-8 shadow-sm">
            {p}
          </div>
        );
      }

      // Paragraf Biasa yang Rapi
      return (
        <p key={idx} className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
          {p}
        </p>
      );
    });
  };

  // --- VIEW: SINGLE PAGE READER DETAIL EDITORIAL RAPI ---
  if (detailArticle) {
    return (
      <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onBackToList && onBackToList()}
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:text-blue-800 mb-8 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{getTranslation(currentLang, UI_TEXT.news.backBtn)}</span>
          </button>

          <article className="space-y-8 bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-xl">
            
            {/* Editorial Header */}
            <div className="space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center space-x-2">
                <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200">
                  {detailArticle.category}
                </span>
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <BookmarkCheck className="w-3 h-3" />
                  <span>Riset Terverifikasi</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900 font-sans">
                {detailArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-2">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{detailArticle.publishedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  <span>{detailArticle.author}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5 text-blue-600 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{detailArticle.readTime}</span>
                </span>
              </div>
            </div>

            {/* Featured Visual Image */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img src={detailArticle.imageUrl} alt={detailArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Social Share Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>{getTranslation(currentLang, UI_TEXT.news.shareTitle)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare('wa', detailArticle)}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('li', detailArticle)}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('tw', detailArticle)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy', detailArticle)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold shadow-sm transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                  <span>{copySuccess ? getTranslation(currentLang, UI_TEXT.news.copySuccess) : getTranslation(currentLang, UI_TEXT.news.copyBtn)}</span>
                </button>
              </div>
            </div>

            {/* In-Depth Parsed Structured Content (> 3000 Karakter) */}
            <div className="pt-2">
              {renderStructuredContent(detailArticle.content)}
            </div>

            <hr className="my-8 border-slate-200" />

            {/* Kotak Sumber Referensi Resmi & Otoritas Industri */}
            {detailArticle.sources && detailArticle.sources.length > 0 && (
              <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{getTranslation(currentLang, UI_TEXT.news.sourcesTitle)}</span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                  {detailArticle.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Strategic Consultation Card */}
            <div className="mt-10 p-8 bg-blue-50 border border-blue-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{getTranslation(currentLang, UI_TEXT.news.consultTitle)}</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {getTranslation(currentLang, UI_TEXT.news.consultDesc)}
                </p>
              </div>
              <a
                href="https://wa.me/6285608561745"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-md"
              >
                {getTranslation(currentLang, UI_TEXT.news.consultBtn)}
              </a>
            </div>
          </article>

        </div>
      </div>
    );
  }

  // --- VIEW: DAFTAR ARTIKEL DENGAN PAGINASI ---
  return (
    <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bersih */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
            {getTranslation(currentLang, UI_TEXT.news.badge)}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {getTranslation(currentLang, UI_TEXT.news.title)}
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {getTranslation(currentLang, UI_TEXT.news.intro)}
          </p>
        </div>

        {/* Newsletter Subscription Card */}
        <div className="mb-14 bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {getTranslation(currentLang, UI_TEXT.news.newsletterTitle)}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Dapatkan Pembaruan Kode HS & Regulasi Berkala
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pb-2">
              {getTranslation(currentLang, UI_TEXT.news.newsletterDesc)}
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda..."
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Langganan</span>
              </button>
            </form>

            {subscribeStatus && (
              <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{subscribeStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPageNum(1); }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPageNum(1); }}
                placeholder={getTranslation(currentLang, UI_TEXT.news.searchPlaceholder)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {getTranslation(currentLang, UI_TEXT.news.showingText)} {filtered.length} Publikasi (Halaman {currentPageNum} dari {totalPages})
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((item) => {
            const displayTitle = currentLang === 'en' ? item.title_en || item.title : currentLang === 'zh' ? item.title_zh || item.title : item.title;
            const displayCategory = currentLang === 'en' ? item.category_en || item.category : currentLang === 'zh' ? item.category_zh || item.category : item.category;
            const displayExcerpt = currentLang === 'en' ? item.excerpt_en || item.excerpt : currentLang === 'zh' ? item.excerpt_zh || item.excerpt : item.excerpt;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={item.imageUrl} alt={displayTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                      {displayCategory}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{item.publishedDate}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {displayTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {displayExcerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectArticle && onSelectArticle(item.id)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1.5 transition-colors"
                  >
                    <span>{getTranslation(currentLang, UI_TEXT.news.readMoreBtn)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginasi Bar */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 pt-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentPageNum(prev => Math.max(prev - 1, 1))}
              disabled={currentPageNum === 1}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPageNum(num)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentPageNum === num
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setCurrentPageNum(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPageNum === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
