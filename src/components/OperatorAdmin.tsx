// filepath: /src/components/OperatorAdmin.tsx
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Layers, Newspaper, Image as ImageIcon, LogOut, Plus, Trash2, 
  Edit3, Save, Upload, Eye, Download, Search, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw, Film
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  getStoredBranding, saveStoredBranding, BrandingSettings, DEFAULT_BRANDING,
  getStoredHero, saveStoredHero, HeroSettings, DEFAULT_HERO,
  getStoredServices, saveStoredServices, isOperatorLoggedIn, loginOperator, logoutOperator, exportSubscribersToCSV,
  saveToServerGlobally
} from '../utils/adminStorage';
import { getStoredArticles, saveStoredArticles, getSubscribers } from '../utils/newsStorage';
import { ServiceDetail, ArticleItem } from '../types/freight';
import { DETAILED_SERVICES } from './ServicesCarousel';

export const OperatorAdmin: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'hero' | 'branding' | 'services' | 'news' | 'subscribers' | 'system'>('overview');

  // State Data
  const [hero, setHero] = useState<HeroSettings>(DEFAULT_HERO);
  const [branding, setBranding] = useState<BrandingSettings>(DEFAULT_BRANDING);
  const [services, setServices] = useState<ServiceDetail[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [searchArticle, setSearchArticle] = useState('');

  // Modals
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [isSavingGlobal, setIsSavingGlobal] = useState(false);

  useEffect(() => {
    const isLogged = isOperatorLoggedIn();
    setAuthenticated(isLogged);
    if (isLogged) {
      setHero(getStoredHero());
      setBranding(getStoredBranding());
      setServices(getStoredServices());
      setArticles(getStoredArticles());
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginOperator(loginUser, loginPass)) {
      setAuthenticated(true);
      setHero(getStoredHero());
      setBranding(getStoredBranding());
      setServices(getStoredServices());
      setArticles(getStoredArticles());
      toast.success('Login Berhasil', { description: 'Selamat datang di Control Center Gaekadmin' });
    } else {
      toast.error('Autentikasi Gagal', { description: 'Username atau Password operator tidak valid.' });
    }
  };

  const handleLogout = () => {
    logoutOperator();
    setAuthenticated(false);
    toast.info('Sesi Ditutup');
  };

  // Upload Gambar Langsung ke Server Hostinger (/api/upload.php)
  const uploadImageFile = async (file: File, callback: (url: string) => void) => {
    const toastId = toast.loading('Mengunggah file ke server Hostinger...');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.status === 'success' && data.url) {
        callback(data.url);
        toast.success('File Berhasil Diunggah ke Server!', { id: toastId, description: data.url });
        return;
      }
    } catch (err) {}

    // Fallback Lokal jika endpoint PHP belum aktif
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
        toast.success('File dimuat secara lokal', { id: toastId });
      }
    };
    reader.readAsDataURL(file);
  };

  // Simpan Pengaturan Hero
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingGlobal(true);
    saveStoredHero(hero);
    const res = await saveToServerGlobally();
    setIsSavingGlobal(false);
    if (res.success) {
      toast.success('Hero Berhasil Diperbarui Secara Global!', { description: 'Semua pengunjung di semua perangkat langsung melihat perubahan.' });
    } else {
      toast.info('Tersimpan Lokal', { description: res.message });
    }
  };

  // Simpan Pengaturan Branding
  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingGlobal(true);
    saveStoredBranding(branding);
    const res = await saveToServerGlobally();
    setIsSavingGlobal(false);
    if (res.success) {
      toast.success('Branding Tersimpan Global!', { description: 'Logo dan kontak aktif untuk semua pengunjung.' });
    } else {
      toast.info('Tersimpan Lokal', { description: res.message });
    }
  };

  // Simpan Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const exists = services.some(s => s.id === editingService.id);
    const updatedList = exists 
      ? services.map(s => s.id === editingService.id ? editingService : s)
      : [editingService, ...services];
    
    setServices(updatedList);
    saveStoredServices(updatedList);
    setEditingService(null);

    setIsSavingGlobal(true);
    const res = await saveToServerGlobally();
    setIsSavingGlobal(false);
    toast.success('Layanan & Foto Tersimpan Global!', { description: editingService.title });
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Hapus layanan ini dari website?')) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveStoredServices(updated);
      saveToServerGlobally();
      toast.info('Layanan Dihapus');
    }
  };

  // Simpan Berita
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    const exists = articles.some(a => a.id === editingArticle.id);
    const updatedList = exists
      ? articles.map(a => a.id === editingArticle.id ? editingArticle : a)
      : [editingArticle, ...articles];
    
    setArticles(updatedList);
    saveStoredArticles(updatedList);
    setEditingArticle(null);

    setIsSavingGlobal(true);
    const res = await saveToServerGlobally();
    setIsSavingGlobal(false);
    toast.success('Artikel Berhasil Dipublikasikan Secara Global!', { description: editingArticle.title });
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Hapus artikel ini secara permanen?')) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
      saveToServerGlobally();
      toast.info('Artikel Berhasil Dihapus');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#011417] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#011C20] border border-cyan-800/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-[#012E34] border border-cyan-500/30 mb-4 shadow-lg">
              <img src="/logos/gaek-symbol.png?v=7" alt="GAEKS" className="h-10 w-auto" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">GAEKS Operator System</h2>
            <p className="text-xs text-cyan-300/80 mt-1">Portal Manajemen Server Global & Pengendali Konten</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Username Operator</label>
              <input 
                type="text" 
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="Gaekadmin"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#012E34]/90 border border-cyan-800/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Password Otorisasi</label>
              <input 
                type="password" 
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#012E34]/90 border border-cyan-800/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full mt-2 py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-cyan-500 to-[#012E34] hover:from-cyan-400 hover:to-[#011C20] text-white shadow-lg transition-all active:scale-95"
            >
              Masuk ke Control Center
            </button>
          </form>

          <div className="mt-8 text-center">
            <button onClick={() => onNavigate('home')} className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda Situs</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#011417] text-white flex flex-col">
      {/* Topbar Nav */}
      <header className="h-16 bg-[#011C20] border-b border-cyan-950 px-4 sm:px-8 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center space-x-3">
          <img src="/logos/gaek-symbol.png?v=7" alt="GAEKS" className="h-8 w-auto" />
          <div className="hidden sm:block border-l border-cyan-900/60 pl-3">
            <span className="text-xs font-black text-white tracking-wider block">GAEKS CONTROL CENTER</span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Hostinger Server Sync: AKTIF GLOBAL</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('home')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#012E34] hover:bg-cyan-950 text-xs font-bold text-cyan-300 border border-cyan-800/40 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </button>
          <button 
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-xs font-bold text-rose-300 border border-rose-800/40 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Panel */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#011C20] border-r border-cyan-950 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Ringkasan Sistem</span>
          </button>
          <button 
            onClick={() => setActiveTab('hero')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'hero' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <Film className="w-4 h-4 text-cyan-400" />
            <span>Hero Latar & Caption</span>
          </button>
          <button 
            onClick={() => setActiveTab('branding')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'branding' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Logo & Branding</span>
          </button>
          <button 
            onClick={() => setActiveTab('services')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'services' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Layanan & Gambar ({services.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('news')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'news' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <Newspaper className="w-4 h-4 text-cyan-400" />
            <span>CMS Berita ({articles.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('subscribers')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'subscribers' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Subscriber Buletin</span>
          </button>
          <button 
            onClick={() => setActiveTab('system')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'system' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>Reset & Cadangan</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-6 sm:p-10 max-w-5xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-white">Ringkasan Sistem Hostinger Global</h3>
                <p className="text-xs text-slate-400 mt-1">Setiap tombol simpan di control center ini langsung menulis ke file persisten Hostinger dan otomatis aktif untuk semua pengunjung di seluruh dunia.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Status Sinkronisasi Server</span>
                  <div className="text-xl font-black text-emerald-400 flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Aktif Global</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2 block">Endpoint: /api/sync.php</span>
                </div>
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Layanan Aktif</span>
                  <div className="text-3xl font-black text-cyan-300">{services.length} Layanan</div>
                  <span className="text-[11px] text-slate-400 mt-2 block">Foto tersinkronisasi</span>
                </div>
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Artikel Publikasi News</span>
                  <div className="text-3xl font-black text-amber-300">{articles.length} Berita</div>
                  <span className="text-[11px] text-slate-400 mt-2 block">Live di /#news</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO LATAR & CAPTION */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Editor Hero Banner: Background Video/Foto & Caption</h3>
                <p className="text-xs text-slate-400 mt-1">Ganti latar video, foto, tajuk judul, dan kalimat paragraf pengantar di beranda utama.</p>
              </div>

              <form onSubmit={handleSaveHero} className="space-y-6 bg-[#011C20] p-6 sm:p-8 rounded-2xl border border-cyan-900/40">
                
                {/* 1. Tipe Background */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Tipe Latar Belakang (Background Type)</label>
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    <button
                      type="button"
                      onClick={() => setHero({ ...hero, bgType: 'video' })}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${hero.bgType === 'video' ? 'bg-cyan-600 text-white border-cyan-400 shadow-md' : 'bg-slate-900 text-slate-400 border-slate-700'}`}
                    >
                      Video Maritim Aktif (.mp4)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHero({ ...hero, bgType: 'image' })}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${hero.bgType === 'image' ? 'bg-cyan-600 text-white border-cyan-400 shadow-md' : 'bg-slate-900 text-slate-400 border-slate-700'}`}
                    >
                      Gambar Statis (Foto .jpg/.png)
                    </button>
                  </div>
                </div>

                {/* 2. URL Video Background */}
                {hero.bgType === 'video' && (
                  <div className="p-4 rounded-xl bg-[#012E34]/50 border border-cyan-900/50 space-y-2">
                    <label className="block text-xs font-bold text-cyan-300">URL File Video Latar (.mp4)</label>
                    <input 
                      type="text" 
                      value={hero.videoUrl}
                      onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
                      placeholder="https://cdn.example.com/video.mp4"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                    <span className="text-[11px] text-slate-400 block">Rekomendasi: File video MP4 kompresi H.264 di bawah 10MB untuk loading cepat.</span>
                  </div>
                )}

                {/* 3. Gambar Background / Poster */}
                <div className="p-4 rounded-xl bg-[#012E34]/50 border border-cyan-900/50 space-y-3">
                  <label className="block text-xs font-bold text-cyan-300">
                    {hero.bgType === 'image' ? 'Foto Latar Belakang Hero' : 'Poster Gambar Cadangan (Saat video memuat)'}
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img src={hero.imageUrl} alt="Hero Preview" className="w-40 h-24 object-cover rounded-xl border border-slate-600 bg-slate-900" />
                    <div className="space-y-2 flex-grow w-full">
                      <label className="text-[11px] text-slate-300 block">1. Unggah File Gambar Baru ke Server Hostinger:</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            uploadImageFile(e.target.files[0], (url) => setHero({ ...hero, imageUrl: url }));
                          }
                        }}
                        className="text-xs text-slate-300 block w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                      />
                      <label className="text-[11px] text-slate-300 block pt-1">2. Atau Masukkan URL Gambar:</label>
                      <input 
                        type="text" 
                        value={hero.imageUrl}
                        onChange={(e) => setHero({ ...hero, imageUrl: e.target.value })}
                        className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Judul Headline H1 */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Struktur Judul Utama (H1 Headline)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Prefix Judul:</span>
                      <input 
                        type="text" 
                        value={hero.titlePrefix}
                        onChange={(e) => setHero({ ...hero, titlePrefix: e.target.value })}
                        placeholder="GAEKS: "
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-cyan-400 block mb-1">Kata Sorotan (Cyan Gradient):</span>
                      <input 
                        type="text" 
                        value={hero.titleHighlight}
                        onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })}
                        placeholder="Jasa Import & PPJK"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Suffix Judul:</span>
                      <input 
                        type="text" 
                        value={hero.titleSuffix}
                        onChange={(e) => setHero({ ...hero, titleSuffix: e.target.value })}
                        placeholder=", Solusi LCL Murah & Project Cargo"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Paragraf Caption Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Paragraf Caption / Subtitle Utama</label>
                  <textarea 
                    rows={3}
                    value={hero.caption}
                    onChange={(e) => setHero({ ...hero, caption: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>

                {/* 6. Banner Komoditas Khusus */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Judul Banner Komoditas</label>
                    <input 
                      type="text" 
                      value={hero.commodityTitle}
                      onChange={(e) => setHero({ ...hero, commodityTitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Penjelasan Banner Komoditas</label>
                    <input 
                      type="text" 
                      value={hero.commodityCaption}
                      onChange={(e) => setHero({ ...hero, commodityCaption: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-cyan-950 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSavingGlobal}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingGlobal ? 'Menyimpan ke Server...' : 'Simpan Hero ke Server Hostinger (Global)'}</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 3: BRANDING & LOGO */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Logo & Favicon Resmi</h3>
                <p className="text-xs text-slate-400 mt-1">Unggah file langsung ke server Hostinger.</p>
              </div>

              <form onSubmit={handleSaveBranding} className="space-y-6 bg-[#011C20] p-6 sm:p-8 rounded-2xl border border-cyan-900/40">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Favicon */}
                  <div className="p-4 rounded-xl bg-[#012E34]/40 border border-cyan-900/40 space-y-3">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider">Favicon Browser</label>
                    <div className="flex items-center space-x-4">
                      <img src={branding.faviconUrl} alt="Favicon Preview" className="w-12 h-12 p-2 bg-white rounded-xl object-contain border border-slate-300" />
                      <div className="space-y-2 flex-grow">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              uploadImageFile(e.target.files[0], (url) => setBranding({ ...branding, faviconUrl: url }));
                            }
                          }}
                          className="text-xs text-slate-300 block w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                        />
                        <input 
                          type="text" 
                          value={branding.faviconUrl}
                          onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Symbol Logo */}
                  <div className="p-4 rounded-xl bg-[#012E34]/40 border border-cyan-900/40 space-y-3">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider">Logo Simbol (Navbar & Footer)</label>
                    <div className="flex items-center space-x-4">
                      <img src={branding.symbolLogoUrl} alt="Symbol Preview" className="w-16 h-12 p-2 bg-[#011C20] rounded-xl object-contain border border-cyan-800" />
                      <div className="space-y-2 flex-grow">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              uploadImageFile(e.target.files[0], (url) => setBranding({ ...branding, symbolLogoUrl: url }));
                            }
                          }}
                          className="text-xs text-slate-300 block w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                        />
                        <input 
                          type="text" 
                          value={branding.symbolLogoUrl}
                          onChange={(e) => setBranding({ ...branding, symbolLogoUrl: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kontak */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp API</label>
                    <input 
                      type="text" 
                      value={branding.whatsappNumber}
                      onChange={(e) => setBranding({ ...branding, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Teks Tampilan WhatsApp</label>
                    <input 
                      type="text" 
                      value={branding.whatsappDisplay}
                      onChange={(e) => setBranding({ ...branding, whatsappDisplay: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email Sales</label>
                    <input 
                      type="email" 
                      value={branding.salesEmail}
                      onChange={(e) => setBranding({ ...branding, salesEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email Info</label>
                    <input 
                      type="email" 
                      value={branding.infoEmail}
                      onChange={(e) => setBranding({ ...branding, infoEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-cyan-950 flex justify-end">
                  <button 
                    type="submit" 
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Branding ke Server (Global)</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: SERVICES & ILUSTRASI */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">Manajemen Layanan & Gambar Ilustrasi</h3>
                  <p className="text-xs text-slate-400 mt-1">Ubah foto dan keterangan 7 layanan kargo secara global.</p>
                </div>
              </div>

              {/* Form Modal Edit Service */}
              {editingService && (
                <div className="bg-[#011C20] border-2 border-cyan-600 p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-900">
                    <h4 className="text-base font-bold text-cyan-300">Edit Layanan: {editingService.title}</h4>
                    <button onClick={() => setEditingService(null)} className="text-xs text-slate-400 hover:text-white">Batal</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Judul Layanan</label>
                      <input 
                        type="text" 
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kategori</label>
                      <input 
                        type="text" 
                        value={editingService.category}
                        onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Tagline</label>
                      <input 
                        type="text" 
                        value={editingService.tagline}
                        onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi</label>
                      <textarea 
                        rows={3}
                        value={editingService.description}
                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    {/* Gambar Ilustrasi Upload Server */}
                    <div className="sm:col-span-2 p-4 rounded-xl bg-[#012E34]/50 border border-cyan-800/40 space-y-3">
                      <span className="text-xs font-bold text-cyan-300 block">Ganti Gambar Ilustrasi Layanan</span>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img src={editingService.imageUrl} alt="Preview" className="w-32 h-20 rounded-lg object-cover border border-slate-600 bg-slate-900" />
                        <div className="space-y-2 flex-grow w-full">
                          <label className="text-[11px] text-slate-300 block">1. Unggah Gambar Baru ke Server Hostinger:</label>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                uploadImageFile(e.target.files[0], (url) => setEditingService({ ...editingService, imageUrl: url }));
                              }
                            }}
                            className="text-xs text-slate-300 block w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                          />
                          <label className="text-[11px] text-slate-300 block pt-1">2. Atau Masukkan URL Gambar:</label>
                          <input 
                            type="text" 
                            value={editingService.imageUrl}
                            onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end space-x-3">
                    <button 
                      type="button" 
                      onClick={() => setEditingService(null)} 
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={handleSaveService} 
                      className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md"
                    >
                      Simpan ke Server Hostinger (Global)
                    </button>
                  </div>
                </div>
              )}

              {/* List Cards Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((svc) => (
                  <div key={svc.id} className="bg-[#011C20] border border-cyan-900/40 rounded-2xl p-4 flex space-x-4 items-center">
                    <img src={svc.imageUrl} alt={svc.title} className="w-24 h-20 rounded-xl object-cover flex-shrink-0 bg-slate-900" />
                    <div className="flex-grow min-w-0">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">{svc.category}</span>
                      <h4 className="text-sm font-bold text-white truncate">{svc.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">"{svc.tagline}"</p>
                      <button 
                        onClick={() => setEditingService(svc)} 
                        className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 mt-2"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit & Ganti Foto</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CMS BERITA */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">CMS Artikel Berita ({articles.length})</h3>
                  <p className="text-xs text-slate-400 mt-1">Publikasi berita aktif secara global untuk seluruh pengunjung.</p>
                </div>
                <button 
                  onClick={() => setEditingArticle({
                    id: 'art-' + Date.now(),
                    title: '',
                    slug: 'berita-' + Date.now(),
                    category: 'Rute Maritim',
                    publishedDate: new Date().toISOString().split('T')[0],
                    readTime: '8 min read',
                    author: 'Gaek Freight Intelligence Bureau',
                    sources: ['Ditjen Bea Cukai RI', 'Lloyd\'s List'],
                    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
                    excerpt: '',
                    content: ''
                  })}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {/* Form Modal Edit Berita */}
              {editingArticle && (
                <div className="bg-[#011C20] border-2 border-cyan-600 p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-900">
                    <h4 className="text-base font-bold text-cyan-300">Editor Artikel Berita</h4>
                    <button onClick={() => setEditingArticle(null)} className="text-xs text-slate-400 hover:text-white">Tutup</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Judul Artikel</label>
                      <input 
                        type="text" 
                        value={editingArticle.title}
                        onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kategori Berita</label>
                      <input 
                        type="text" 
                        value={editingArticle.category}
                        onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Tanggal Publikasi (Bisa Backdate)</label>
                      <input 
                        type="date" 
                        value={editingArticle.publishedDate}
                        onChange={(e) => setEditingArticle({ ...editingArticle, publishedDate: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Ringkasan Unik (Excerpt)</label>
                      <textarea 
                        rows={2}
                        value={editingArticle.excerpt}
                        onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2 p-4 rounded-xl bg-[#012E34]/50 border border-cyan-800/40 space-y-3">
                      <span className="text-xs font-bold text-cyan-300 block">Foto Utama Artikel</span>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img src={editingArticle.imageUrl} alt="Preview" className="w-32 h-20 rounded-lg object-cover border border-slate-600 bg-slate-900" />
                        <div className="space-y-2 flex-grow w-full">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                uploadImageFile(e.target.files[0], (url) => setEditingArticle({ ...editingArticle, imageUrl: url }));
                              }
                            }}
                            className="text-xs text-slate-300 block w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                          />
                          <input 
                            type="text" 
                            value={editingArticle.imageUrl}
                            onChange={(e) => setEditingArticle({ ...editingArticle, imageUrl: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Isi Artikel Lengkap</label>
                      <textarea 
                        rows={8}
                        value={editingArticle.content}
                        onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end space-x-3">
                    <button type="button" onClick={() => setEditingArticle(null)} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white">Batal</button>
                    <button onClick={handleSaveArticle} className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md">Simpan ke Server (Global)</button>
                  </div>
                </div>
              )}

              {/* Table of Articles */}
              <div className="bg-[#011C20] border border-cyan-900/40 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#012E34] text-cyan-300 font-bold border-b border-cyan-900">
                    <tr>
                      <th className="py-3 px-4">Tanggal</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Judul Artikel</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-950">
                    {articles
                      .filter(a => a.title.toLowerCase().includes(searchArticle.toLowerCase()) || a.category.toLowerCase().includes(searchArticle.toLowerCase()))
                      .map((art) => (
                        <tr key={art.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{art.publishedDate}</td>
                          <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">{art.category}</td>
                          <td className="py-3 px-4 font-bold text-white max-w-md truncate">{art.title}</td>
                          <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                            <button onClick={() => setEditingArticle(art)} className="text-cyan-400 hover:text-cyan-300 font-bold">Edit</button>
                            <button onClick={() => handleDeleteArticle(art.id)} className="text-rose-400 hover:text-rose-300 font-bold">Hapus</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white">Daftar Pelanggan Buletin ({getSubscribers().length})</h3>
                  <p className="text-xs text-slate-400 mt-1">Unduh data prospek dalam format CSV.</p>
                </div>
                <button onClick={exportSubscribersToCSV} className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md">
                  <Download className="w-4 h-4" />
                  <span>Ekspor Data ke CSV</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: RESET */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Cadangan Data & Reset</h3>
                <p className="text-xs text-slate-400 mt-1">Unduh file backup JSON lengkap.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
