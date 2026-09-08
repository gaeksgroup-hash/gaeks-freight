// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem } from '../types/freight';

export const NewsPage: React.FC = () => {
  const [articles] = useState<ArticleItem[]>(getStoredArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const ok = addSubscriber(emailInput);
    if (ok) {
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di newsletter berkala GAEKS GROUP.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-brand-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
            Pusat Informasi & Regulasi Kargo
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
            Update Industri, Kebijakan Pabean, & Rute
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Ikuti perkembangan terkini mengenai lartas impor, jadwal pelayaran reguler, panduan CBM, dan efisiensi rantai pasok Indonesia.
          </p>
        </div>

        <div className="mb-16 bg-gradient-to-r from-brand-navy to-brand-darkBlue rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-2">
              Langganan Berita Berkala
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              Dapatkan Ringkasan Tarif & Regulasi Ekspor-Impor
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Kirimkan update resmi perubahan kode HS, kebijakan jalur hijau, dan jadwal kapal langsung ke kotak masuk email Anda.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda..."
                className="px-4 py-3 rounded-xl text-slate-900 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </form>

            {subscribeStatus && (
              <div className="mt-3 flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{subscribeStatus}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel atau kata kunci regulasi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none bg-white"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Menampilkan {filtered.length} Publikasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px] text-slate-400 font-semibold block mb-2">
                    {item.publishedDate} • Oleh {item.author}
                  </span>
                  <h3 className="text-lg font-black text-brand-navy leading-snug mb-3 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="text-xs font-bold text-brand-orange hover:text-brand-orangeHover flex items-center space-x-1"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="relative h-56 rounded-2xl overflow-hidden">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase">{selectedArticle.category}</span>
                <h2 className="text-2xl font-black text-brand-navy mt-1">{selectedArticle.title}</h2>
                <span className="text-xs text-slate-400 block mt-1">{selectedArticle.publishedDate} • Oleh {selectedArticle.author}</span>
              </div>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-4">
                {selectedArticle.content}
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-brand-navy text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-brand-darkBlue"
                >
                  Tutup Artikel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
