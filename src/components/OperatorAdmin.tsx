// filepath: /src/components/OperatorAdmin.tsx
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Layers, Newspaper, Image as ImageIcon, LogOut, Plus, Trash2, 
  Edit3, Save, Upload, Eye, Download, Search, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw, Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  getStoredBranding, saveStoredBranding, BrandingSettings, DEFAULT_BRANDING,
  getStoredServices, saveStoredServices, isOperatorLoggedIn, loginOperator, logoutOperator, exportSubscribersToCSV
} from '../utils/adminStorage';
import { getStoredArticles, saveStoredArticles, getSubscribers } from '../utils/newsStorage';
import { ServiceDetail, ArticleItem } from '../types/freight';
import { DETAILED_SERVICES } from './ServicesCarousel';

export const OperatorAdmin: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'branding' | 'services' | 'news' | 'subscribers' | 'system'>('overview');

  // State Data
  const [branding, setBranding] = useState<BrandingSettings>(DEFAULT_BRANDING);
  const [services, setServices] = useState<ServiceDetail[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [searchArticle, setSearchArticle] = useState('');

  // Editor Modal States
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  useEffect(() => {
    const isLogged = isOperatorLoggedIn();
    setAuthenticated(isLogged);
    if (isLogged) {
      setBranding(getStoredBranding());
      setServices(getStoredServices());
      setArticles(getStoredArticles());
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginOperator(loginUser, loginPass)) {
      setAuthenticated(true);
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
    toast.info('Sesi Ditutup', { description: 'Anda telah keluar dari Control Center.' });
  };

  // Upload Gambar Helper (Ubah File Lokal ke Base64)
  const handleFileUpload = (file: File, callback: (base64Url: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
        toast.success('Gambar Berhasil Diunggah', { description: file.name });
      }
    };
    reader.readAsDataURL(file);
  };

  // Simpan Branding
  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredBranding(branding);
    toast.success('Pengaturan Branding Disimpan', { description: 'Perubahan logo & kontak langsung aktif di seluruh website.' });
  };

  // Simpan Service
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const exists = services.some(s => s.id === editingService.id);
    let updatedList: ServiceDetail[];
    if (exists) {
      updatedList = services.map(s => s.id === editingService.id ? editingService : s);
    } else {
      updatedList = [editingService, ...services];
    }
    setServices(updatedList);
    saveStoredServices(updatedList);
    setEditingService(null);
    toast.success('Layanan Berhasil Disimpan', { description: editingService.title });
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Hapus layanan ini dari website?')) {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveStoredServices(updated);
      toast.info('Layanan Dihapus');
    }
  };

  // Simpan Berita
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    const exists = articles.some(a => a.id === editingArticle.id);
    let updatedList: ArticleItem[];
    if (exists) {
      updatedList = articles.map(a => a.id === editingArticle.id ? editingArticle : a);
    } else {
      updatedList = [editingArticle, ...articles];
    }
    setArticles(updatedList);
    saveStoredArticles(updatedList);
    setEditingArticle(null);
    toast.success('Artikel Berhasil Dipublikasikan', { description: editingArticle.title });
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Hapus artikel ini secara permanen?')) {
      const updated = articles.filter(a => a.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
      toast.info('Artikel Berhasil Dihapus');
    }
  };

  // Factory Reset
  const handleFactoryReset = () => {
    if (confirm('PERINGATAN: Mengembalikan semua pengaturan, layanan, dan artikel ke pengaturan awal pabrik?')) {
      localStorage.removeItem('gaeks_branding_v2');
      localStorage.removeItem('gaeks_services_v2');
      localStorage.removeItem('gaeks_articles_v15_full');
      setBranding(DEFAULT_BRANDING);
      setServices(DETAILED_SERVICES);
      setArticles(getStoredArticles());
      toast.success('Sistem Direset ke Default');
    }
  };

  // TAMPILAN LOGIN OPERATOR JIKA BELUM AUTENTIKASI
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#011417] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#011C20] border border-cyan-800/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-[#012E34] border border-cyan-500/30 mb-4 shadow-lg">
              <img src="/logos/gaek-symbol.png?v=7" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logos/gaek-symbol.svg'; }} alt="GAEKS" className="h-10 w-auto" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">GAEKS Operator System</h2>
            <p className="text-xs text-cyan-300/80 mt-1">Portal Manajemen Terpusat & Pengendali Konten</p>
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
              className="w-full mt-2 py-3.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-cyan-500 to-[#012E34] hover:from-cyan-400 hover:to-[#011C20] text-white shadow-lg shadow-cyan-950/40 transition-all active:scale-95"
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

  // TAMPILAN DASHBOARD UTAMA OPERATOR
  return (
    <div className="min-h-screen bg-[#011417] text-white flex flex-col">
      {/* Topbar Nav */}
      <header className="h-16 bg-[#011C20] border-b border-cyan-950 px-4 sm:px-8 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center space-x-3">
          <img src="/logos/gaek-symbol.png?v=7" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logos/gaek-symbol.svg'; }} alt="GAEKS" className="h-8 w-auto" />
          <div className="hidden sm:block border-l border-cyan-900/60 pl-3">
            <span className="text-xs font-black text-white tracking-wider block">GAEKS CONTROL CENTER</span>
            <span className="text-[10px] text-cyan-400 font-mono">Operator: Gaekadmin (Full Root Privilege)</span>
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
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Ringkasan Sistem</span>
          </button>
          <button 
            onClick={() => setActiveTab('branding')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'branding' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Logo & Branding</span>
          </button>
          <button 
            onClick={() => setActiveTab('services')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'services' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Layanan & Gambar ({services.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('news')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'news' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
          >
            <Newspaper className="w-4 h-4 text-cyan-400" />
            <span>CMS Berita ({articles.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('subscribers')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'subscribers' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Subscriber Buletin</span>
          </button>
          <button 
            onClick={() => setActiveTab('system')} 
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'system' ? 'bg-[#012E34] text-cyan-300 border border-cyan-600/40 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>Reset & Cadangan</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-6 sm:p-10 max-w-6xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-white">Ringkasan Operasional Gaek</h3>
                <p className="text-xs text-slate-400 mt-1">Seluruh data yang diubah di control center ini akan otomatis terupdate secara real-time di front end.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Layanan Aktif</span>
                  <div className="text-3xl font-black text-cyan-300">{services.length} Layanan</div>
                  <span className="text-[11px] text-slate-500 mt-2 block">Dikelola via Services Manager</span>
                </div>
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Artikel Publikasi News</span>
                  <div className="text-3xl font-black text-emerald-400">{articles.length} Berita</div>
                  <span className="text-[11px] text-slate-500 mt-2 block">Termasuk Topan Dolphin & Anak Krakatau</span>
                </div>
                <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Pelanggan Buletin</span>
                  <div className="text-3xl font-black text-amber-300">{getSubscribers().length} Email</div>
                  <span className="text-[11px] text-slate-500 mt-2 block">Siap diekspor ke CSV</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#012E34]/60 border border-cyan-800/40">
                <h4 className="text-sm font-bold text-cyan-200 mb-2">Panduan Cepat Operator:</h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Gunakan menu <strong>Logo & Branding</strong> untuk mengganti Favicon dan lambang resmi.</li>
                  <li>Gunakan menu <strong>Layanan & Gambar</strong> untuk mengedit teks atau mengupload foto ilustrasi baru pada 7 kartu layanan.</li>
                  <li>Gunakan menu <strong>CMS Berita</strong> untuk menambah artikel baru, mengatur tanggal mundur (*backdate*), atau merevisi kutipan unik.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: BRANDING & LOGO */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Logo, Favicon & Identitas Kontak</h3>
                <p className="text-xs text-slate-400 mt-1">Kelola logo resmi dan saluran komunikasi langsung ke front end.</p>
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
                              handleFileUpload(e.target.files[0], (url) => setBranding({ ...branding, faviconUrl: url }));
                            }
                          }}
                          className="text-xs text-slate-300 block w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                        />
                        <input 
                          type="text" 
                          value={branding.faviconUrl}
                          onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })}
                          placeholder="/favicon.png"
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
                              handleFileUpload(e.target.files[0], (url) => setBranding({ ...branding, symbolLogoUrl: url }));
                            }
                          }}
                          className="text-xs text-slate-300 block w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                        />
                        <input 
                          type="text" 
                          value={branding.symbolLogoUrl}
                          onChange={(e) => setBranding({ ...branding, symbolLogoUrl: e.target.value })}
                          placeholder="/logos/gaek-symbol.png"
                          className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Nomor WhatsApp API (Tanpa Tanda Plus/Spasi)</label>
                    <input 
                      type="text" 
                      value={branding.whatsappNumber}
                      onChange={(e) => setBranding({ ...branding, whatsappNumber: e.target.value })}
                      placeholder="085608561745"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Teks Tampilan WhatsApp</label>
                    <input 
                      type="text" 
                      value={branding.whatsappDisplay}
                      onChange={(e) => setBranding({ ...branding, whatsappDisplay: e.target.value })}
                      placeholder="+62 0856-0856-1745"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email Sales & Komersial</label>
                    <input 
                      type="email" 
                      value={branding.salesEmail}
                      onChange={(e) => setBranding({ ...branding, salesEmail: e.target.value })}
                      placeholder="Sales01@gaeks.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email Informasi Umum</label>
                    <input 
                      type="email" 
                      value={branding.infoEmail}
                      onChange={(e) => setBranding({ ...branding, infoEmail: e.target.value })}
                      placeholder="info@gaeks.com"
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
                    <span>Simpan Perubahan Branding</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: SERVICES & ILUSTRASI GAMBAR */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">Manajemen Layanan & Gambar Ilustrasi</h3>
                  <p className="text-xs text-slate-400 mt-1">Ubah teks, fitur, dan ganti foto ilustrasi untuk setiap layanan.</p>
                </div>
                <button 
                  onClick={() => setEditingService({
                    id: 'custom-' + Date.now(),
                    title: 'Layanan Baru',
                    category: 'Kargo Khusus',
                    tagline: 'Tagline layanan baru.',
                    description: 'Deskripsi lengkap layanan baru.',
                    features: ['Fitur 1', 'Fitur 2'],
                    equipment: 'Peralatan Standar',
                    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
                    commodities: 'Komoditas umum'
                  })}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Layanan Baru</span>
                </button>
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
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kategori Layanan</label>
                      <input 
                        type="text" 
                        value={editingService.category}
                        onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Tagline Ringkas</label>
                      <input 
                        type="text" 
                        value={editingService.tagline}
                        onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Lengkap</label>
                      <textarea 
                        rows={3}
                        value={editingService.description}
                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    {/* Gambar Ilustrasi Upload & URL */}
                    <div className="sm:col-span-2 p-4 rounded-xl bg-[#012E34]/50 border border-cyan-800/40 space-y-3">
                      <span className="text-xs font-bold text-cyan-300 block">Ganti Gambar Ilustrasi Layanan</span>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img src={editingService.imageUrl} alt="Preview" className="w-32 h-20 rounded-lg object-cover border border-slate-600 bg-slate-900" />
                        <div className="space-y-2 flex-grow w-full">
                          <label className="text-[11px] text-slate-300 block">1. Upload File Gambar Lokal (PNG/JPG):</label>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => setEditingService({ ...editingService, imageUrl: url }));
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

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Spesifikasi Peralatan (Equipment)</label>
                      <input 
                        type="text" 
                        value={editingService.equipment}
                        onChange={(e) => setEditingService({ ...editingService, equipment: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Komoditas yang Dilayani</label>
                      <input 
                        type="text" 
                        value={editingService.commodities}
                        onChange={(e) => setEditingService({ ...editingService, commodities: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
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
                      Simpan Layanan
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
                      <div className="flex items-center space-x-3 mt-2">
                        <button 
                          onClick={() => setEditingService(svc)} 
                          className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit & Ganti Foto</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteService(svc.id)} 
                          className="inline-flex items-center space-x-1 text-xs font-bold text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CMS BERITA LENGKAP */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">CMS Artikel Berita & Publikasi</h3>
                  <p className="text-xs text-slate-400 mt-1">Tambah berita baru, atur tanggal (backdate), kategori, dan foto.</p>
                </div>
                <button 
                  onClick={() => setEditingArticle({
                    id: 'art-' + Date.now(),
                    title: '',
                    slug: 'berita-baru-' + Date.now(),
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

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text" 
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}
                  placeholder="Cari judul artikel atau kategori berita..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#011C20] border border-cyan-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Form Modal Edit Berita */}
              {editingArticle && (
                <div className="bg-[#011C20] border-2 border-cyan-600 p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-900">
                    <h4 className="text-base font-bold text-cyan-300">Editor Publikasi Artikel</h4>
                    <button onClick={() => setEditingArticle(null)} className="text-xs text-slate-400 hover:text-white">Tutup</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Judul Artikel</label>
                      <input 
                        type="text" 
                        value={editingArticle.title}
                        onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                        placeholder="Masukkan judul berita komprehensif..."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Kategori Berita</label>
                      <select 
                        value={editingArticle.category}
                        onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      >
                        <option value="Rute Maritim">Rute Maritim</option>
                        <option value="Regulasi Kepabeanan">Regulasi Kepabeanan</option>
                        <option value="Kargo Khusus">Kargo Khusus</option>
                        <option value="Operational Freight">Operational Freight</option>
                      </select>
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
                        placeholder="Ringkasan spesifik yang tampil di boks berita..."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>

                    {/* Upload Gambar Berita */}
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
                                handleFileUpload(e.target.files[0], (url) => setEditingArticle({ ...editingArticle, imageUrl: url }));
                              }
                            }}
                            className="text-xs text-slate-300 block w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:bg-cyan-600 file:text-white"
                          />
                          <input 
                            type="text" 
                            value={editingArticle.imageUrl}
                            onChange={(e) => setEditingArticle({ ...editingArticle, imageUrl: e.target.value })}
                            placeholder="URL Gambar..."
                            className="w-full px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">Isi Artikel Lengkap</label>
                      <textarea 
                        rows={10}
                        value={editingArticle.content}
                        onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                        placeholder="Tulis ulasan mendalam (>3.000 karakter)..."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white leading-relaxed font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end space-x-3">
                    <button type="button" onClick={() => setEditingArticle(null)} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white">Batal</button>
                    <button onClick={handleSaveArticle} className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md">Publikasikan Artikel</button>
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

          {/* TAB 5: SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white">Daftar Pelanggan Buletin Intelijen</h3>
                  <p className="text-xs text-slate-400 mt-1">Ekspor daftar email prospek yang mendaftar melalui formulir newsletter.</p>
                </div>
                <button 
                  onClick={exportSubscribersToCSV}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Ekspor Data ke CSV</span>
                </button>
              </div>

              <div className="bg-[#011C20] border border-cyan-900/40 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#012E34] text-cyan-300 font-bold border-b border-cyan-900">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Alamat Email</th>
                      <th className="py-3 px-4">Waktu Pendaftaran</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-950">
                    {getSubscribers().map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 text-slate-500">{idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-white">{sub.email}</td>
                        <td className="py-3 px-4 text-slate-400 font-mono">{new Date(sub.subscribedAt).toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SYSTEM & RESET */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">Cadangan Data & Reset Sistem</h3>
                <p className="text-xs text-slate-400 mt-1">Unduh backup data situs atau kembalikan ke pengaturan awal pabrik.</p>
              </div>

              <div className="bg-[#011C20] border border-cyan-900/40 p-6 rounded-2xl space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Cadangan Data Situs (.JSON)</h4>
                  <p className="text-xs text-slate-400 mb-3">Unduh seluruh artikel berita, konfigurasi branding, dan layanan dalam satu file backup.</p>
                  <button 
                    onClick={() => {
                      const data = {
                        branding: getStoredBranding(),
                        services: getStoredServices(),
                        articles: getStoredArticles(),
                        subscribers: getSubscribers()
                      };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `gaeks_backup_${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      toast.success('Backup Berhasil Diunduh');
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#012E34] hover:bg-cyan-950 text-cyan-300 font-bold text-xs border border-cyan-800/40"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full Site Backup</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-cyan-950">
                  <h4 className="text-sm font-bold text-rose-300 mb-1">Factory Reset</h4>
                  <p className="text-xs text-slate-400 mb-3">Kembalikan semua layanan dan berita ke pengaturan standar pabrik jika terjadi kesalahan input.</p>
                  <button 
                    onClick={handleFactoryReset}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-bold text-xs border border-rose-800/60"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset ke Pengaturan Awal Pabrik</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
