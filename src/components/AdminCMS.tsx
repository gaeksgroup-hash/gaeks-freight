// filepath: /src/components/AdminCMS.tsx
import React, { useState } from 'react';
import { Lock, PlusCircle, Trash2, Mail, LogOut, CheckCircle, ShieldAlert } from 'lucide-react';
import { ArticleItem, NewsletterSubscriber } from '../types/freight';
import { getStoredArticles, saveStoredArticles, getSubscribers } from '../utils/newsStorage';

export const AdminCMS: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [articles, setArticles] = useState<ArticleItem[]>(getStoredArticles());
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(getSubscribers());

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Regulasi Kepabeanan');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80');
  const [authorName, setAuthorName] = useState('Admin GAEKS');
  const [publishSuccess, setPublishSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userValid = usernameInput.trim() === 'Admingaekspost';
    const emailValid = emailInput.trim().toLowerCase().endsWith('@gaeks.com');
    const passValid = passwordInput === 'gaeksnewsku001';

    if (!userValid) {
      setLoginError('Username salah. Wajib menggunakan Admingaekspost.');
      return;
    }
    if (!emailValid) {
      setLoginError('Email wajib menggunakan akun resmi berakhiran @gaeks.com (contoh: info@gaeks.com, admin@gaeks.com).');
      return;
    }
    if (!passValid) {
      setLoginError('Password otorisasi salah.');
      return;
    }

    setIsAuthenticated(true);
    setLoginError('');
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newArt: ArticleItem = {
      id: 'art-' + Date.now(),
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      excerpt: newExcerpt || newContent.substring(0, 120) + '...',
      content: newContent,
      imageUrl: newImageUrl,
      author: authorName,
      publishedDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    };

    const updated = [newArt, ...articles];
    setArticles(updated);
    saveStoredArticles(updated);

    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setPublishSuccess('Artikel berhasil dipublikasikan langsung ke halaman Berita & Publikasi!');
    setTimeout(() => setPublishSuccess(''), 4000);
  };

  const handleDeleteArticle = (id: string) => {
    if (!window.confirm('Yakin ingin menghapus artikel ini?')) return;
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    saveStoredArticles(updated);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-brand-surface flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-brand-border p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center mx-auto text-brand-orange">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-brand-navy">Portal CMS GAEKS GROUP</h2>
            <p className="text-xs text-slate-500">
              Otorisasi internal khusus staf editorial. Wajib menggunakan akun email resmi <strong className="text-slate-800">@gaeks.com</strong>.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2 text-xs text-red-700 font-semibold">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username Otorisasi</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Admingaekspost"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Resmi (@gaeks.com)</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="nama@gaeks.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-navy hover:bg-brand-darkBlue text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-brand-navy/30"
            >
              Masuk Dashboard CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-sm">
          <div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              Sesi Login Terverifikasi (@gaeks.com)
            </span>
            <h1 className="text-2xl font-black text-brand-navy mt-1">Dashboard Konten & Newsletter</h1>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <PlusCircle className="w-4 h-4" />
              <span>Publikasikan Berita Baru</span>
            </div>

            {publishSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs text-emerald-700 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>{publishSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Update Regulasi Jalur Pabean Impor Pelabuhan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Berita</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none bg-white"
                  >
                    <option value="Regulasi Kepabeanan">Regulasi Kepabeanan</option>
                    <option value="Operational Freight">Operational Freight</option>
                    <option value="Rute Maritim">Rute Maritim</option>
                    <option value="Update Komoditas">Update Komoditas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Penulis / Editor</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Gambar Header (Unsplash / CDN)</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan (Excerpt)</label>
                <input
                  type="text"
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Ringkasan singkat untuk kartu pratinjau..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Konten Lengkap Berita *</label>
                <textarea
                  rows={6}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Tuliskan isi artikel lengkap di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                Terbitkan ke Website Utama
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-brand-navy text-xs font-bold uppercase tracking-wider">
                <Mail className="w-4 h-4 text-brand-orange" />
                <span>Pelanggan Newsletter ({subscribers.length})</span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
                {subscribers.length === 0 ? (
                  <p className="text-slate-400 italic">Belum ada pelanggan terdaftar.</p>
                ) : (
                  subscribers.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{s.email}</span>
                      <span className="text-[10px] text-slate-400">{new Date(s.subscribedAt).toLocaleDateString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm space-y-4">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Daftar Artikel Aktif ({articles.length})
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {articles.map((art) => (
                  <div key={art.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-start justify-between space-x-2">
                    <div>
                      <span className="text-[10px] font-bold text-brand-orange block uppercase">{art.category}</span>
                      <h4 className="text-xs font-bold text-brand-navy leading-snug">{art.title}</h4>
                      <span className="text-[10px] text-slate-400">{art.publishedDate}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
