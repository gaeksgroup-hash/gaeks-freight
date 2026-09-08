import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem } from '../types/freight';

export const NewsPage: React.FC = () => {
  const [articles] = useState<ArticleItem[]>(getStoredArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

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
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di newsletter resmi GAEKS GROUP.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
            Pusat Edukasi & Regulasi Ekspor-Impor
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Update Industri, Kebijakan Pabean, & Rute
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Kumpulan 20 artikel komprehensif seputar regulasi Ceisa 4.0, kebijakan Lartas impor, perhitungan CBM, dan dinamika pelayaran maritim dunia.
          </p>
        </div>

        <div className="mb-14 bg-gradient-to-r from-brand-darkBlue to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
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
                className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-brand-orange/20"
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

        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat ? 'bg-brand-orange text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Menampilkan {filtered.length} dari {articles.length} Publikasi
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-brand-darkBlue/80 rounded-3xl border border-slate-800/80 overflow-hidden shadow-sm hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-brand-orange px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border border-slate-800">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{item.publishedDate}</span>
                    <span>•</span>
                    <span>Oleh {item.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="text-xs font-bold text-brand-orange hover:text-amber-400 flex items-center space-x-1.5 transition-colors"
                >
                  <span>Baca Analisis Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800">
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase">{selectedArticle.category}</span>
                <h2 className="text-2xl font-black mt-1 leading-snug">{selectedArticle.title}</h2>
                <span className="text-xs text-slate-400 block mt-1">Dipublikasikan pada {selectedArticle.publishedDate} • Oleh {selectedArticle.author}</span>
              </div>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-800 pt-4">
                {selectedArticle.content}
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-2.5 rounded-xl font-bold text-xs"
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
