// filepath: /src/components/OperatorAdmin.tsx
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Layers, Newspaper, Image as ImageIcon, LogOut, Plus, Trash2, 
  Edit3, Save, Eye, Download, CheckCircle2, ArrowLeft, Film, FolderOpen, Copy, FileText
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

export interface MediaServerItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadedAt: string;
}

export const OperatorAdmin: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'hero' | 'branding' | 'services' | 'news' | 'subscribers'>('overview');

  const [hero, setHero] = useState<HeroSettings>(DEFAULT_HERO);
  const [branding, setBranding] = useState<BrandingSettings>(DEFAULT_BRANDING);
  const [services, setServices] = useState<ServiceDetail[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaServerItem[]>([]);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');

  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [isSavingGlobal, setIsSavingGlobal] = useState(false);

  // Ambil daftar file dari Media Server Hostinger
  const fetchMediaLibrary = async () => {
    try {
      const res = await fetch('/api/upload.php');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && Array.isArray(data.files)) {
          setMediaList(data.files);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    const isLogged = isOperatorLoggedIn();
    setAuthenticated(isLogged);
    if (isLogged) {
      setHero(getStoredHero());
      setBranding(getStoredBranding());
      setServices(getStoredServices());
      setArticles(getStoredArticles());
      fetchMediaLibrary();
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
      fetchMediaLibrary();
      toast.success('Login Berhasil', { description: 'Selamat datang di Control Center Gaekadmin' });
    } else {
      toast.error('Autentikasi Gagal', { description: 'Username atau Password tidak valid.' });
    }
  };

  const handleLogout = () => {
    logoutOperator();
    setAuthenticated(false);
    toast.info('Sesi Ditutup');
  };

  // Upload File ke Media Server (/api/upload.php)
  const uploadFileToMediaServer = async (file: File, onDone?: (url: string) => void) => {
    const toastId = toast.loading(`Mengunggah & mengompresi ${file.name}...`);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload.php', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.status === 'success' && data.url) {
        toast.success('File Berhasil Disimpan di Media Server!', { id: toastId, description: data.url });
        await fetchMediaLibrary();
        if (onDone) onDone(data.url);
        return data.url;
      }
    } catch (err) {}
    toast.error('Gagal mengunggah file', { id: toastId });
    return null;
  };

  // Hapus File dari Media Server
  const handleDeleteMedia = async (url: string) => {
    if (confirm('Hapus file ini dari Media Server Hostinger?')) {
      try {
        const res = await fetch('/api/upload.php?action=delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        if (res.ok) {
          toast.info('File Dihapus dari Media Server');
          await fetchMediaLibrary();
        }
      } catch (e) {}
    }
  };

  // Simpan Perubahan ke Server Hostinger Global
  const commitToServer = async () => {
    setIsSavingGlobal(true);
    const res = await saveToServerGlobally();
    setIsSavingGlobal(false);
    if (res.success) {
      toast.success('Perubahan Berhasil Tersimpan di Server Hostinger!', { 
        description: 'Aktif secara global untuk seluruh pengunjung di semua perangkat.' 
      });
    } else {
      toast.error('Peringatan Penyimpanan', { description: res.message });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Tautan Berhasil Disalin ke Clipboard!', { description: text });
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Hapus artikel ini dari server?')) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
      await commitToServer();
      toast.info('Artikel Berhasil Dihapus');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Hapus layanan ini dari website?')) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveStoredServices(updated);
      await commitToServer();
      toast.info('Layanan Berhasil Dihapus');
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
            <p className="text-xs text-cyan-300/80 mt-1">Portal Manajemen Server Global & Media Arsip</p>
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
                className="w-full px-4 py-3 rounded-xl bg-[#012E34]/90 border border-cyan-800/60 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                className="w-full px-4 py-3 rounded-xl bg-[#012E34]/90 border border-cyan-800/60 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

  const filteredMedia = mediaList.filter(item => {
    if (mediaFilter === 'all') return true;
    return item.type === mediaFilter;
  });

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
              <span>Hostinger Media & Server Sync: AKTIF GLOBAL</span>
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
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-xs font-bold text-rose-300 border border-rose-800/40 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Panel */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#011C20] border-r border-cyan-950 p-4 space-y-1 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Ringkasan Sistem</span>
          </button>
          <button 
            onClick={() => setActiveTab('media')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'media' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40' : 'text-slate-400 hover:text-white'}`}
          >
            <FolderOpen className="w-4 h-4 text-cyan-400" />
            <span>Media Server ({mediaList.length})</span>
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
            <span>Layanan & Foto ({services.length})</span>
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
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-6 sm:p-10 max-w-5xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-white">Ringkasan Sistem Hostinger Global</h3>
                <p className="text-xs text-slate-400 mt-1">Setiap tombol simpan langsung menulis ke file server Hostinger sehingga aktif secara global untuk semua pengunjung di seluruh dunia.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Status Server</span>
                  <div className="text-xl font-black text-emerald-400 flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Aktif Global (200 OK)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2 block">Endpoint: /api/sync.php</span>
                </div>
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Media Tersimpan</span>
                  <div className="text-3xl font-black text-cyan-300">{mediaList.length} File</div>
                  <span className="text-[11px] text-slate-400 mt-2 block">Video, Gambar & Dokumen</span>
                </div>
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Layanan & Berita</span>
                  <div className="text-3xl font-black text-amber-300">{services.length + articles.length} Item</div>
                  <span className="text-[11px] text-slate-400 mt-2 block">Penerjemah Universal Aktif</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA SERVER */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Media Server GAEKS (Arsip File, Video & Dokumen)</h3>
                <p className="text-xs text-slate-400 mt-1">Unggah file lokal ke server Hostinger dengan kompresi WebP otomatis untuk performa maksimal.</p>
              </div>

              {/* Upload Dropzone */}
              <div className="p-6 rounded-2xl bg-[#011C20] border-2 border-dashed border-cyan-700/60 flex flex-col items-center justify-center space-y-3">
                <div className="p-3 rounded-2xl bg-[#012E34] text-cyan-400">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white">Pilih file Video (.mp4), Gambar (.jpg/.png/.webp), atau Dokumen (.pdf)</p>
                  <span className="text-[10px] text-slate-400">Gambar otomatis dikonversi ke WebP berkualitas tinggi & ringan.</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*,video/mp4,video/webm,application/pdf"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      uploadFileToMediaServer(e.target.files[0]);
                    }
                  }}
                  className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 cursor-pointer"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-2 border-b border-cyan-950 pb-3">
                <button onClick={() => setMediaFilter('all')} className={`px-3 py-1 rounded-lg text-xs font-bold ${mediaFilter === 'all' ? 'bg-[#012E34] text-cyan-300' : 'text-slate-400'}`}>Semua ({mediaList.length})</button>
                <button onClick={() => setMediaFilter('image')} className={`px-3 py-1 rounded-lg text-xs font-bold ${mediaFilter === 'image' ? 'bg-[#012E34] text-cyan-300' : 'text-slate-400'}`}>Gambar ({mediaList.filter(m => m.type === 'image').length})</button>
                <button onClick={() => setMediaFilter('video')} className={`px-3 py-1 rounded-lg text-xs font-bold ${mediaFilter === 'video' ? 'bg-[#012E34] text-cyan-300' : 'text-slate-400'}`}>Video ({mediaList.filter(m => m.type === 'video').length})</button>
                <button onClick={() => setMediaFilter('document')} className={`px-3 py-1 rounded-lg text-xs font-bold ${mediaFilter === 'document' ? 'bg-[#012E34] text-cyan-300' : 'text-slate-400'}`}>Dokumen ({mediaList.filter(m => m.type === 'document').length})</button>
              </div>

              {/* Media Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredMedia.map((item) => (
                  <div key={item.id} className="bg-[#011C20] border border-cyan-900/40 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-md">
                    <div className="relative h-32 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                      {item.type === 'image' && (
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      )}
                      {item.type === 'video' && (
                        <video src={item.url} muted playsInline className="w-full h-full object-cover" />
                      )}
                      {item.type === 'document' && (
                        <FileText className="w-12 h-12 text-cyan-400" />
                      )}
                      <span className="absolute top-2 left-2 bg-[#012E34]/90 text-cyan-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {item.type} • {item.size}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-white truncate" title={item.name}>{item.name}</h5>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5 truncate">{item.url}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-cyan-950">
                      <button 
                        onClick={() => copyToClipboard(item.url)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#012E34] hover:bg-cyan-950 text-cyan-300 text-[10px] font-bold"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Salin URL</span>
                      </button>

                      {item.type === 'video' && (
                        <button 
                          onClick={async () => {
                            const updated = { ...hero, bgType: 'video' as const, videoUrl: item.url };
                            setHero(updated);
                            saveStoredHero(updated);
                            await commitToServer();
                            toast.success('Video Berhasil Dipasang ke Hero Banner!');
                          }}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-[10px] font-bold"
                        >
                          <Film className="w-3 h-3" />
                          <span>Pasang di Hero</span>
                        </button>
                      )}

                      {item.type === 'image' && (
                        <button 
                          onClick={async () => {
                            const updated = { ...hero, bgType: 'image' as const, imageUrl: item.url };
                            setHero(updated);
                            saveStoredHero(updated);
                            await commitToServer();
                            toast.success('Foto Berhasil Dipasang ke Hero Banner!');
                          }}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-[10px] font-bold"
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>Pasang di Hero</span>
                        </button>
                      )}

                      <button 
                        onClick={() => handleDeleteMedia(item.url)}
                        className="p-1 rounded-lg text-rose-400 hover:bg-rose-950/40 ml-auto"
                        title="Hapus file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HERO LATAR & CAPTION */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Editor Hero Banner (Latar Video/Foto & Caption)</h3>
                <p className="text-xs text-slate-400 mt-1">Ganti latar belakang dan teks pengantar beranda. Video berputar otomatis (*looping*) dan responsif di mobile.</p>
              </div>

              <form onSubmit={async (e) => { e.preventDefault(); saveStoredHero(hero); await commitToServer(); }} className="space-y-6 bg-[#011C20] p-6 sm:p-8 rounded-2xl border border-cyan-900/40">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Tipe Latar Belakang</label>
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

                {hero.bgType === 'video' && (
                  <div className="p-4 rounded-xl bg-[#012E34]/50 border border-cyan-900/50 space-y-3">
                    <label className="block text-xs font-bold text-cyan-300">Pilih / Unggah Video Background (MP4)</label>
                    {mediaList.filter(m => m.type === 'video').length > 0 && (
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-1">Ambil dari Media Server GAEKS:</span>
                        <select
                          value={hero.videoUrl}
                          onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-bold"
                        >
                          {mediaList.filter(m => m.type === 'video').map(v => (
                            <option key={v.id} value={v.url}>{v.name} ({v.size})</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Atau Unggah File Video Baru (.mp4):</span>
                      <input 
                        type="file" 
                        accept="video/mp4,video/webm"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            uploadFileToMediaServer(e.target.files[0], (url) => setHero({ ...hero, videoUrl: url }));
                          }
                        }}
                        className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                      />
                    </div>
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 block mb-1">URL Video Langsung:</span>
                      <input 
                        type="text" 
                        value={hero.videoUrl}
                        onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                      />
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-[#012E34]/50 border border-cyan-900/50 space-y-3">
                  <label className="block text-xs font-bold text-cyan-300">
                    {hero.bgType === 'image' ? 'Foto Latar Belakang Hero' : 'Poster Gambar Cadangan (Saat video dimuat)'}
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img src={hero.imageUrl} alt="Preview" className="w-40 h-24 object-cover rounded-xl border border-slate-600 bg-slate-900" />
                    <div className="space-y-2 flex-grow w-full">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            uploadFileToMediaServer(e.target.files[0], (url) => setHero({ ...hero, imageUrl: url }));
                          }
                        }}
                        className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                      />
                      <input 
                        type="text" 
                        value={hero.imageUrl}
                        onChange={(e) => setHero({ ...hero, imageUrl: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Judul Utama H1</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input type="text" value={hero.titlePrefix} onChange={(e) => setHero({ ...hero, titlePrefix: e.target.value })} placeholder="GAEKS: " className="px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
                    <input type="text" value={hero.titleHighlight} onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })} placeholder="Jasa Import & PPJK" className="px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-bold" />
                    <input type="text" value={hero.titleSuffix} onChange={(e) => setHero({ ...hero, titleSuffix: e.target.value })} placeholder=", Solusi LCL Murah" className="px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Paragraf Caption Utama</label>
                  <textarea rows={3} value={hero.caption} onChange={(e) => setHero({ ...hero, caption: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white leading-relaxed" />
                </div>

                <div className="pt-4 border-t border-cyan-950 flex justify-end">
                  <button type="submit" disabled={isSavingGlobal} className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50">
                    Simpan Hero ke Server Hostinger (Global)
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: BRANDING */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Logo & Favicon Resmi</h3>
                <p className="text-xs text-slate-400 mt-1">Unggah file langsung ke server Hostinger.</p>
              </div>

              <form onSubmit={async (e) => { e.preventDefault(); saveStoredBranding(branding); await commitToServer(); }} className="space-y-6 bg-[#011C20] p-6 sm:p-8 rounded-2xl border border-cyan-900/40">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                              uploadFileToMediaServer(e.target.files[0], (url) => setBranding({ ...branding, faviconUrl: url }));
                            }
                          }}
                          className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                        />
                        <input type="text" value={branding.faviconUrl} onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })} className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200" />
                      </div>
                    </div>
                  </div>

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
                              uploadFileToMediaServer(e.target.files[0], (url) => setBranding({ ...branding, symbolLogoUrl: url }));
                            }
                          }}
                          className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                        />
                        <input type="text" value={branding.symbolLogoUrl} onChange={(e) => setBranding({ ...branding, symbolLogoUrl: e.target.value })} className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-cyan-950 flex justify-end">
                  <button type="submit" disabled={isSavingGlobal} className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md">
                    Simpan Branding ke Server (Global)
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: SERVICES & FOTO */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Manajemen Layanan & Foto</h3>
                <p className="text-xs text-slate-400 mt-1">Ubah foto dan deskripsi 7 layanan kargo secara global.</p>
              </div>

              {editingService && (
                <div className="bg-[#011C20] border-2 border-cyan-600 p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-900">
                    <h4 className="text-base font-bold text-cyan-300">Edit Layanan: {editingService.title}</h4>
                    <button onClick={() => setEditingService(null)} className="text-xs text-slate-400 hover:text-white">Tutup</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Judul Layanan</label>
                      <input type="text" value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kategori</label>
                      <input type="text" value={editingService.category} onChange={(e) => setEditingService({ ...editingService, category: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Tagline</label>
                      <input type="text" value={editingService.tagline} onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi</label>
                      <textarea rows={3} value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
                    </div>

                    <div className="sm:col-span-2 p-4 rounded-xl bg-[#012E34]/50 border border-cyan-800/40 space-y-3">
                      <span className="text-xs font-bold text-cyan-300 block">Foto Ilustrasi Layanan</span>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img src={editingService.imageUrl} alt="Preview" className="w-32 h-20 rounded-lg object-cover border border-slate-600 bg-slate-900" />
                        <div className="space-y-2 flex-grow w-full">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                uploadFileToMediaServer(e.target.files[0], (url) => setEditingService({ ...editingService, imageUrl: url }));
                              }
                            }}
                            className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                          />
                          <input type="text" value={editingService.imageUrl} onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })} className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end space-x-3">
                    <button type="button" onClick={() => setEditingService(null)} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white">Batal</button>
                    <button 
                      onClick={async (e) => {
                        e.preventDefault();
                        const exists = services.some(s => s.id === editingService.id);
                        const updated = exists ? services.map(s => s.id === editingService.id ? editingService : s) : [editingService, ...services];
                        setServices(updated);
                        saveStoredServices(updated);
                        setEditingService(null);
                        await commitToServer();
                      }} 
                      className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md"
                    >
                      Simpan Layanan ke Server (Global)
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((svc) => (
                  <div key={svc.id} className="bg-[#011C20] border border-cyan-900/40 rounded-2xl p-4 flex space-x-4 items-center">
                    <img src={svc.imageUrl} alt={svc.title} className="w-24 h-20 rounded-xl object-cover flex-shrink-0 bg-slate-900" />
                    <div className="flex-grow min-w-0">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">{svc.category}</span>
                      <h4 className="text-sm font-bold text-white truncate">{svc.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">"{svc.tagline}"</p>
                      <button onClick={() => setEditingService(svc)} className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 mt-2">
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit & Ganti Foto</span>
                      </button>
                      <button onClick={() => handleDeleteService(svc.id)} className="inline-flex items-center space-x-1 text-xs font-bold text-rose-400 hover:text-rose-300 mt-2 ml-3">
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CMS BERITA */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">CMS Artikel Berita ({articles.length})</h3>
                <p className="text-xs text-slate-400 mt-1">Publikasi berita aktif secara global untuk seluruh pengunjung.</p>
              </div>

              {editingArticle && (
                <div className="bg-[#011C20] border-2 border-cyan-600 p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-900">
                    <h4 className="text-base font-bold text-cyan-300">Editor Artikel Berita</h4>
                    <button onClick={() => setEditingArticle(null)} className="text-xs text-slate-400 hover:text-white">Tutup</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Judul Artikel</label>
                      <input type="text" value={editingArticle.title} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kategori</label>
                      <input type="text" value={editingArticle.category} onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Ringkasan Unik (Excerpt)</label>
                      <textarea rows={2} value={editingArticle.excerpt} onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white" />
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
                                uploadFileToMediaServer(e.target.files[0], (url) => setEditingArticle({ ...editingArticle, imageUrl: url }));
                              }
                            }}
                            className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                          />
                          <input type="text" value={editingArticle.imageUrl} onChange={(e) => setEditingArticle({ ...editingArticle, imageUrl: e.target.value })} className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200" />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Isi Artikel Lengkap</label>
                      <textarea rows={8} value={editingArticle.content} onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white font-mono" />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end space-x-3">
                    <button type="button" onClick={() => setEditingArticle(null)} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white">Batal</button>
                    <button 
                      onClick={async (e) => {
                        e.preventDefault();
                        const exists = articles.some(a => a.id === editingArticle.id);
                        const updated = exists ? articles.map(a => a.id === editingArticle.id ? editingArticle : a) : [editingArticle, ...articles];
                        setArticles(updated);
                        saveStoredArticles(updated);
                        setEditingArticle(null);
                        await commitToServer();
                      }} 
                      className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md"
                    >
                      Simpan Berita ke Server (Global)
                    </button>
                  </div>
                </div>
              )}

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
                    {articles.map((art) => (
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

          {/* TAB 7: SUBSCRIBERS */}
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

        </main>
      </div>
    </div>
  );
};
