import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar, Share2, Copy, MessageCircle, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem } from '../types/freight';

export const NewsPage: React.FC<{ activeDetailId?: string; onBackToList?: () => void; onSelectArticle?: (id: string) => void }> = ({ activeDetailId, onBackToList, onSelectArticle }) => {
  const [articles] = useState<ArticleItem[]>(getStoredArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Jika ada ID detail aktif, buka single page detail
  const detailArticle = activeDetailId ? articles.find(a => a.id === activeDetailId) : null;

  const categories = ['Semua', 'Regulasi Kepabeanan', 'Operational Freight', 'Rute Maritim', 'Kargo Khusus', 'Project Cargo & Alat Berat'];

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const ok = addSubscriber(emailInput);
    if (ok) {
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di buletin intelijen kargo Gaek Freight.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  const handleShare = (platform: 'wa' | 'tw' | 'li' | 'copy', article: ArticleItem) => {
    const url = window.location.origin + '/#news?id=' + article.id;
    const text = `${article.title} - Baca artikel logistik & regulasi impor ekspor dari Gaek Freight:`;

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

  // --- VIEW: SINGLE PAGE READER DETAIL ---
  if (detailArticle) {
    return (
      <div className="pt-32 pb-24 bg-brand-obsidian text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onBackToList && onBackToList()}
            className="inline-flex items-center space-x-2 text-xs font-bold text-brand-cyan hover:text-white mb-8 bg-brand-surface border border-brand-border px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Update</span>
          </button>

          <article className="space-y-8">
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
                {detailArticle.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                {detailArticle.title}
              </h1>
              <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold border-b border-brand-border pb-6">
                <span>Rilis: {detailArticle.publishedDate}</span>
                <span>•</span>
                <span>Penulis: {detailArticle.author}</span>
                <span>•</span>
                <span className="text-brand-emerald">{detailArticle.readTime}</span>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-brand-border shadow-2xl">
              <img src={detailArticle.imageUrl} alt={detailArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Social Share Bar */}
            <div className="bg-brand-surface p-4 rounded-2xl border border-brand-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                <Share2 className="w-4 h-4 text-brand-cyan" />
                <span>Bagikan Artikel Ini:</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare('wa', detailArticle)}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                  title="Bagikan via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('li', detailArticle)}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                  title="Bagikan via LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('tw', detailArticle)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  title="Bagikan via Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy', detailArticle)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-brand-card hover:bg-slate-800 text-slate-200 border border-brand-border text-xs font-bold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? 'Tautan Disalin!' : 'Salin Tautan'}</span>
                </button>
              </div>
            </div>

            <div className="text-base sm:text-lg text-slate-300 leading-relaxed whitespace-pre-line space-y-6 pt-4">
              {detailArticle.content}
            </div>

            {/* Bottom Consultation Box */}
            <div className="mt-12 p-8 bg-brand-surface border border-brand-border rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="text-xl font-bold text-white">Butuh Solusi untuk Topik Ini?</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Konsultasikan dokumen pabean, perizinan Lartas, atau slot kargo Anda langsung dengan Gaek Freight.
                </p>
              </div>
              <a
                href="https://wa.me/6285608561745?text=Halo%20Gaek%20Freight,%20saya%20tertarik%20konsultasi%20mengenai%20artikel%20logistik."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-gradient-to-r from-brand-cyan to-brand-emerald text-slate-950 px-6 py-3 rounded-xl font-black text-xs"
              >
                Konsultasi WhatsApp
              </a>
            </div>
          </article>

        </div>
      </div>
    );
  }

  // --- VIEW: LIST 20 ARTICLES ---
  return (
    <div className="pt-32 pb-24 bg-brand-obsidian text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-cyan block mb-2">
            Pusat Edukasi & Regulasi Ekspor-Impor
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Update Industri, Kebijakan Pabean, & Rute
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Kumpulan 20 artikel mendalam seputar regulasi Ceisa 4.0, kebijakan Lartas impor, perhitungan CBM, dan dinamika pelayaran maritim dunia.
          </p>
        </div>

        {/* Newsletter Subscription Card */}
        <div className="mb-14 bg-brand-surface rounded-3xl p-8 sm:p-12 border border-brand-border shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider block">
              Langganan Buletin Intelijen Logistik
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Dapatkan Pembaruan Kode HS & Tarif Kapal Berkala
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pb-2">
              Kirimkan pembaruan regulasi jalur pabean dan tren freight rate langsung ke email perusahaan Anda.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda..."
                className="px-4 py-3 rounded-xl bg-brand-obsidian border border-brand-border text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-cyan to-brand-emerald text-slate-950 px-6 py-3 rounded-xl font-black text-sm transition-all shadow-md shadow-cyan-500/20"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
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

        {/* Category Pills & Search */}
        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat ? 'bg-brand-cyan text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-brand-surface text-slate-400 border border-brand-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik (misal: Ceisa, Lartas, Form E, CBM)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-sm text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Menampilkan {filtered.length} dari {articles.length} Publikasi
            </span>
          </div>
        </div>

        {/* Articles Grid (20+ Items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-brand-surface rounded-3xl border border-brand-border overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-brand-obsidian/90 backdrop-blur-md text-brand-cyan px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border border-brand-border">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>{item.publishedDate}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-brand-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-border flex items-center justify-between">
                <button
                  onClick={() => onSelectArticle && onSelectArticle(item.id)}
                  className="text-xs font-bold text-brand-cyan hover:text-emerald-400 flex items-center space-x-1.5 transition-colors"
                >
                  <span>Baca Pembahasan Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
