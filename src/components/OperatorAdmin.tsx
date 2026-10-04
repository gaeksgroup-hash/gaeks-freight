import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowUp, CheckCircle2, Download, Eye, FileText, FolderOpen,
  Image as ImageIcon, Layers, LayoutDashboard, LogOut, Newspaper, Plus, Save,
  Search, Settings2, ShieldCheck, Trash2, Users,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  DEFAULT_BRANDING, DEFAULT_HERO, DEFAULT_SEO, DEFAULT_SITE_SETTINGS,
  BrandingSettings, HeroSettings, ManagedOperator, OperatorRole, OperatorUser, PartnerLogo, SeoSettings, SiteSettings, SocialPlatform,
  deleteOperatorAccount, exportSubscribersToCSV, fetchOperators, getOperatorSession, getStoredBranding,
  getStoredHero, getStoredSeo, getStoredServices, getStoredSiteSettings, hasPermission, loginOperator,
  logoutOperator, operatorFetch, saveOperatorAccount, saveSectionToServer, syncFromServer,
} from '../utils/adminStorage';
import { getStoredArticles } from '../utils/newsStorage';
import { fetchNewsletterSubscribers } from '../services/newsletterApi';
import { ArticleItem, NewsletterSubscriber, ServiceDetail } from '../types/freight';

type TabId = 'overview' | 'users' | 'branding' | 'navigation' | 'hero' | 'services' | 'media' | 'news' | 'subscribers' | 'seo';
type SectionId = 'branding' | 'hero' | 'siteSettings' | 'services' | 'articles' | 'seo';

interface MediaServerItem { id: string; name: string; url: string; type: 'image' | 'video' | 'document'; size: string; uploadedAt: string; }

const roleLabels: Record<OperatorRole, string> = {
  super_admin: 'Gaekadmin', website_admin: 'Administrator Website', cms: 'CMS Berita', seo: 'SEO',
};

const socialOptions: Array<{ value: SocialPlatform; label: string }> = [
  { value: 'instagram', label: 'Instagram' }, { value: 'facebook', label: 'Facebook' },
  { value: 'linkedin', label: 'LinkedIn' }, { value: 'youtube', label: 'YouTube' },
  { value: 'x', label: 'X' }, { value: 'tiktok', label: 'TikTok' },
];

const tabDefinitions: Array<{ id: TabId; label: string; permission?: string; icon: React.ElementType }> = [
  { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
  { id: 'users', label: 'Pengguna & Peran', permission: 'users.manage', icon: Users },
  { id: 'branding', label: 'Brand & Kontak', permission: 'site.branding', icon: ImageIcon },
  { id: 'navigation', label: 'Navigasi & Footer', permission: 'site.navigation', icon: Settings2 },
  { id: 'hero', label: 'Beranda', permission: 'site.home', icon: FileText },
  { id: 'services', label: 'Layanan', permission: 'site.services', icon: Layers },
  { id: 'media', label: 'Media', permission: 'media.manage', icon: FolderOpen },
  { id: 'news', label: 'CMS Berita', permission: 'content.news', icon: Newspaper },
  { id: 'subscribers', label: 'Newsletter', permission: 'newsletter.read', icon: Download },
  { id: 'seo', label: 'SEO', permission: 'site.seo', icon: Search },
];

const inputClass = 'mt-1.5 w-full rounded-lg border border-slate-700 bg-[#071d21] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400';
const labelClass = 'block text-xs font-semibold text-slate-300';
const panelClass = 'border border-cyan-950 bg-[#071d21] p-5 sm:p-6';
const primaryClass = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-400 px-4 text-sm font-bold text-[#011417] hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50';
const secondaryClass = 'inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-700 px-3 text-sm font-semibold text-slate-200 hover:border-cyan-700 hover:text-white';

const newService = (): ServiceDetail => ({
  id: `service-${Date.now()}`, title: '', category: '', tagline: '', description: '', features: [], equipment: '', imageUrl: '', commodities: '',
});
const newArticle = (): ArticleItem => ({
  id: `article-${Date.now()}`, title: '', category: 'Berita', excerpt: '', content: '', imageUrl: '', author: 'GAEKS Editorial',
  publishedDate: new Date().toISOString().slice(0, 10), readTime: '5 menit', sources: [],
});
const emptyOperator = (): ManagedOperator & { password: string } => ({ username: '', displayName: '', role: 'website_admin', active: true, password: '' });

const Field: React.FC<{ label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; rows?: number; required?: boolean; disabled?: boolean }> = ({ label, value, onChange, type = 'text', placeholder, rows, required, disabled }) => (
  <label className={labelClass}>{label}{rows
    ? <textarea rows={rows} required={required} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={inputClass} />
    : <input type={type} required={required} disabled={disabled} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`} />}
  </label>
);

export const OperatorAdmin: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [session, setSession] = useState<OperatorUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [saving, setSaving] = useState(false);

  const [branding, setBranding] = useState<BrandingSettings>(DEFAULT_BRANDING);
  const [hero, setHero] = useState<HeroSettings>(DEFAULT_HERO);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [seo, setSeo] = useState<SeoSettings>(DEFAULT_SEO);
  const [services, setServices] = useState<ServiceDetail[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  const [mediaList, setMediaList] = useState<MediaServerItem[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [newsletterSender, setNewsletterSender] = useState('news@gaeks.com');
  const [mailStatus, setMailStatus] = useState('Belum diperiksa');
  const [operators, setOperators] = useState<ManagedOperator[]>([]);
  const [editingOperator, setEditingOperator] = useState<ManagedOperator & { password: string } | null>(null);

  const allowedTabs = useMemo(() => tabDefinitions.filter((tab) => !tab.permission || hasPermission(tab.permission, session)), [session]);

  const loadLocalData = () => {
    setBranding(getStoredBranding()); setHero(getStoredHero()); setSiteSettings(getStoredSiteSettings()); setSeo(getStoredSeo());
    setServices(getStoredServices()); setArticles(getStoredArticles());
  };

  const fetchMediaLibrary = async () => {
    try { const response = await fetch('/api/upload.php', { cache: 'no-store' }); const result = await response.json(); if (response.ok) setMediaList(result.files || []); } catch {}
  };
  const loadSubscribers = async () => {
    try {
      const result = await fetchNewsletterSubscribers(); setSubscribers(result.subscribers); setNewsletterSender(result.sender);
      setMailStatus(result.smtpConfigured ? 'SMTP aktif' : result.mailAvailable ? 'PHP mail aktif' : 'Email belum tersedia');
    } catch (error) { toast.error('Newsletter belum dapat dimuat', { description: error instanceof Error ? error.message : undefined }); }
  };
  const loadOperators = async () => {
    try { setOperators(await fetchOperators()); } catch (error) { toast.error('Daftar pengguna belum dapat dimuat', { description: error instanceof Error ? error.message : undefined }); }
  };

  const loadAuthorizedData = async (user: OperatorUser) => {
    await syncFromServer(); loadLocalData();
    const work: Promise<unknown>[] = [];
    if (hasPermission('media.manage', user)) work.push(fetchMediaLibrary());
    if (hasPermission('newsletter.read', user)) work.push(loadSubscribers());
    if (hasPermission('users.manage', user)) work.push(loadOperators());
    await Promise.all(work);
  };

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const user = await getOperatorSession();
      if (!mounted) return;
      setSession(user); setCheckingSession(false);
      if (user) await loadAuthorizedData(user);
    })();
    return () => { mounted = false; };
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await loginOperator(loginUser, loginPass);
    if (!result.success || !result.user) { toast.error('Login gagal', { description: result.message }); return; }
    setSession(result.user); setLoginPass(''); setActiveTab('overview'); await loadAuthorizedData(result.user);
    toast.success(`Selamat datang, ${result.user.displayName}`);
  };

  const handleLogout = async () => { await logoutOperator(); setSession(null); setActiveTab('overview'); toast.info('Sesi operator ditutup'); };

  const saveSection = async (section: SectionId, payload: unknown, successMessage: string) => {
    setSaving(true); const result = await saveSectionToServer(section, payload); setSaving(false);
    if (!result.success) { toast.error('Perubahan belum tersimpan', { description: result.message }); return false; }
    const delivery = result.newsletter?.articles ? ` Newsletter: ${result.newsletter.sent} terkirim, ${result.newsletter.failed} gagal.` : '';
    toast.success(successMessage, { description: `Perubahan aktif untuk seluruh pengunjung.${delivery}` }); return true;
  };

  const uploadMedia = async (file: File, onDone?: (url: string) => void) => {
    const toastId = toast.loading(`Mengunggah ${file.name}`);
    try {
      const body = new FormData(); body.append('file', file);
      const response = await operatorFetch('/api/upload.php', { method: 'POST', body }); const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Upload gagal.');
      await fetchMediaLibrary(); onDone?.(result.url); toast.success('Media tersimpan', { id: toastId });
    } catch (error) { toast.error('Media belum tersimpan', { id: toastId, description: error instanceof Error ? error.message : undefined }); }
  };

  const deleteMedia = async (url: string) => {
    if (!confirm('Hapus media ini dari server?')) return;
    const response = await operatorFetch('/api/upload.php?action=delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
    if (response.ok) { await fetchMediaLibrary(); toast.success('Media dihapus'); } else toast.error('Media belum dapat dihapus');
  };

  if (checkingSession) return <div className="flex min-h-screen items-center justify-center bg-[#011417] text-sm text-slate-300">Memeriksa sesi operator…</div>;
  if (!session) return (
    <main className="flex min-h-screen items-center justify-center bg-[#011417] p-4 text-white">
      <section className="w-full max-w-sm border border-cyan-900 bg-[#071d21] p-7">
        <img src="/logos/gaek-symbol.png?v=7" alt="GAEKS" className="h-9 w-auto brightness-0 invert" />
        <h1 className="mt-7 text-2xl font-bold">Operator GAEKS</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">Masuk untuk mengelola modul sesuai peran Anda.</p>
        <form onSubmit={handleLogin} className="mt-7 space-y-4">
          <Field label="Username" value={loginUser} onChange={setLoginUser} required />
          <Field label="Kata sandi" type="password" value={loginPass} onChange={setLoginPass} required />
          <button className={`${primaryClass} w-full`} type="submit">Masuk</button>
        </form>
        <button type="button" onClick={() => onNavigate('home')} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" />Kembali ke website</button>
      </section>
    </main>
  );

  return (
    <div className="min-h-screen bg-[#011417] text-white">
      <header className="border-b border-cyan-950 bg-[#061b1f]">
        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3"><img src="/logos/gaek-symbol.png?v=7" alt="GAEKS" className="h-7 w-auto brightness-0 invert" /><div className="min-w-0"><p className="truncate text-sm font-bold">{session.displayName}</p><p className="text-xs text-cyan-300">{roleLabels[session.role]}</p></div></div>
          <div className="flex items-center gap-2"><button type="button" aria-label="Lihat website" onClick={() => onNavigate('home')} className={secondaryClass}><Eye className="h-4 w-4" /><span className="hidden sm:inline">Lihat website</span></button><button type="button" aria-label="Keluar" onClick={handleLogout} className={secondaryClass}><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Keluar</span></button></div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] flex-col md:flex-row">
        <aside className="border-b border-cyan-950 bg-[#061b1f] p-3 md:min-h-[calc(100vh-4rem)] md:w-60 md:border-b-0 md:border-r">
          <nav aria-label="Modul operator" className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
            {allowedTabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} type="button" onClick={() => { setActiveTab(tab.id); if (tab.id === 'users') void loadOperators(); if (tab.id === 'subscribers') void loadSubscribers(); }} className={`flex min-h-11 shrink-0 items-center gap-2.5 rounded-md px-3 text-left text-sm font-semibold md:w-full ${activeTab === tab.id ? 'bg-cyan-400 text-[#011417]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><Icon className="h-4 w-4" />{tab.label}</button>; })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-7 lg:p-10">
          {activeTab === 'overview' && <Overview session={session} services={services.length} articles={articles.length} media={mediaList.length} subscribers={subscribers.length} allowedTabs={allowedTabs} onOpen={setActiveTab} />}

          {activeTab === 'users' && hasPermission('users.manage', session) && <section className="space-y-6">
            <PageTitle title="Pengguna & peran" copy="Gaekadmin mengatur siapa yang dapat mengubah situs, berita, atau SEO. Pemeriksaan akses juga berjalan di server." action={<button className={primaryClass} onClick={() => setEditingOperator(emptyOperator())}><Plus className="h-4 w-4" />Tambah pengguna</button>} />
            {editingOperator && <form className={panelClass} onSubmit={async (event) => {
              event.preventDefault(); setSaving(true);
              try { await saveOperatorAccount(editingOperator); setEditingOperator(null); await loadOperators(); toast.success('Akun operator tersimpan'); }
              catch (error) { toast.error('Akun belum tersimpan', { description: error instanceof Error ? error.message : undefined }); }
              finally { setSaving(false); }
            }}><div className="grid gap-4 sm:grid-cols-2"><Field label="Username" value={editingOperator.username} onChange={(value) => setEditingOperator({ ...editingOperator, username: value })} required disabled={operators.some((item) => item.username === editingOperator.username)} /><Field label="Nama tampilan" value={editingOperator.displayName} onChange={(value) => setEditingOperator({ ...editingOperator, displayName: value })} required /><label className={labelClass}>Peran<select className={inputClass} value={editingOperator.role} onChange={(event) => setEditingOperator({ ...editingOperator, role: event.target.value as OperatorRole })}><option value="website_admin">Administrator Website</option><option value="cms">CMS Berita</option><option value="seo">SEO</option></select></label><Field label="Kata sandi (minimal 12 karakter; kosongkan bila tidak diganti)" type="password" value={editingOperator.password} onChange={(value) => setEditingOperator({ ...editingOperator, password: value })} /><label className="flex min-h-11 items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={editingOperator.active} onChange={(event) => setEditingOperator({ ...editingOperator, active: event.target.checked })} className="h-4 w-4 accent-cyan-400" />Akun aktif</label></div><FormActions saving={saving} onCancel={() => setEditingOperator(null)} /></form>}
            <div className="divide-y divide-cyan-950 border border-cyan-950 bg-[#071d21]">{operators.map((operator) => <div key={operator.username} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><strong>{operator.displayName}</strong><span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${operator.active ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>{operator.active ? 'Aktif' : 'Nonaktif'}</span></div><p className="mt-1 text-xs text-slate-400">{operator.username} · {roleLabels[operator.role]}</p></div>{operator.role !== 'super_admin' && <div className="flex gap-2"><button className={secondaryClass} onClick={() => setEditingOperator({ ...operator, password: '' })}>Edit</button><button className={secondaryClass} onClick={async () => { if (!confirm(`Hapus akun ${operator.username}?`)) return; try { await deleteOperatorAccount(operator.username); await loadOperators(); toast.success('Akun dihapus'); } catch (error) { toast.error('Akun belum dapat dihapus', { description: error instanceof Error ? error.message : undefined }); } }}><Trash2 className="h-4 w-4" /></button></div>}</div>)}</div>
          </section>}

          {activeTab === 'branding' && hasPermission('site.branding', session) && <section className="space-y-6"><PageTitle title="Brand & kontak" copy="Aset dan informasi di sini dipakai oleh navbar, footer, halaman kontak, favicon, dan tombol WhatsApp." />
            <form className={`${panelClass} space-y-6`} onSubmit={async (event) => { event.preventDefault(); await saveSection('branding', branding, 'Brand dan kontak tersimpan'); }}>
              <div className="grid gap-4 sm:grid-cols-2"><AssetField label="Favicon" value={branding.faviconUrl} onChange={(value) => setBranding({ ...branding, faviconUrl: value })} uploadMedia={uploadMedia} /><AssetField label="Logo navbar" value={branding.navbarLogoUrl} onChange={(value) => setBranding({ ...branding, navbarLogoUrl: value })} uploadMedia={uploadMedia} /><AssetField label="Logo footer" value={branding.footerLogoUrl} onChange={(value) => setBranding({ ...branding, footerLogoUrl: value })} uploadMedia={uploadMedia} /><AssetField label="Logo lengkap" value={branding.fullLogoUrl} onChange={(value) => setBranding({ ...branding, fullLogoUrl: value })} uploadMedia={uploadMedia} /></div>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Nomor WhatsApp" value={branding.whatsappNumber} onChange={(value) => setBranding({ ...branding, whatsappNumber: value })} required /><Field label="Tampilan nomor" value={branding.whatsappDisplay} onChange={(value) => setBranding({ ...branding, whatsappDisplay: value })} required /><Field label="Email penjualan" type="email" value={branding.salesEmail} onChange={(value) => setBranding({ ...branding, salesEmail: value })} required /><Field label="Email informasi" type="email" value={branding.infoEmail} onChange={(value) => setBranding({ ...branding, infoEmail: value })} /><div className="sm:col-span-2"><Field label="Alamat operasional" value={branding.companyAddress} onChange={(value) => setBranding({ ...branding, companyAddress: value })} required /></div></div><SaveButton saving={saving} />
            </form></section>}

          {activeTab === 'navigation' && hasPermission('site.navigation', session) && <section className="space-y-6"><PageTitle title="Navigasi & footer" copy="Atur urutan menu, tampilkan atau sembunyikan halaman, tautan sosial, dan identitas footer." />
            <form className="space-y-6" onSubmit={async (event) => { event.preventDefault(); await saveSection('siteSettings', siteSettings, 'Navigasi dan footer tersimpan'); }}>
              <div className={panelClass}><h2 className="text-sm font-bold">Menu utama</h2><div className="mt-4 divide-y divide-slate-800">{siteSettings.navigation.map((item, index) => <div key={item.page} className="grid gap-3 py-3 sm:grid-cols-[1fr_1fr_auto_auto]"><input aria-label={`Label ${item.page}`} className={inputClass.replace('mt-1.5 ', '')} value={item.label} onChange={(event) => { const navigation = [...siteSettings.navigation]; navigation[index] = { ...item, label: event.target.value }; setSiteSettings({ ...siteSettings, navigation }); }} /><input aria-label={`Label seluler ${item.page}`} className={inputClass.replace('mt-1.5 ', '')} value={item.mobileLabel} onChange={(event) => { const navigation = [...siteSettings.navigation]; navigation[index] = { ...item, mobileLabel: event.target.value }; setSiteSettings({ ...siteSettings, navigation }); }} /><label className="flex min-h-10 items-center gap-2 text-xs"><input type="checkbox" checked={item.visible} onChange={(event) => { const navigation = [...siteSettings.navigation]; navigation[index] = { ...item, visible: event.target.checked }; setSiteSettings({ ...siteSettings, navigation }); }} />Tampil</label><div className="flex gap-1"><MoveButton icon={ArrowUp} disabled={index === 0} onClick={() => setSiteSettings({ ...siteSettings, navigation: move(siteSettings.navigation, index, index - 1) })} /><MoveButton icon={ArrowDown} disabled={index === siteSettings.navigation.length - 1} onClick={() => setSiteSettings({ ...siteSettings, navigation: move(siteSettings.navigation, index, index + 1) })} /></div></div>)}</div></div>
              <div className={panelClass}><div className="grid gap-4 sm:grid-cols-2"><Field label="Judul ajakan tracking" value={siteSettings.footerHeading} onChange={(value) => setSiteSettings({ ...siteSettings, footerHeading: value })} /><Field label="Tagline footer" value={siteSettings.footerTagline} onChange={(value) => setSiteSettings({ ...siteSettings, footerTagline: value })} /><Field label="Label produk digital" value={siteSettings.digitalProductLabel} onChange={(value) => setSiteSettings({ ...siteSettings, digitalProductLabel: value })} /><Field label="Tautan produk digital" type="url" value={siteSettings.digitalProductUrl} onChange={(value) => setSiteSettings({ ...siteSettings, digitalProductUrl: value })} /></div><div className="mt-6 flex items-center justify-between"><div><h2 className="text-sm font-bold">Media sosial</h2><p className="mt-1 text-xs text-slate-400">Pilih platform agar ikon ditampilkan otomatis di website.</p></div><button type="button" className={secondaryClass} onClick={() => setSiteSettings({ ...siteSettings, socialLinks: [...siteSettings.socialLinks, { id: `social-${Date.now()}`, platform: 'instagram', url: '' }] })}><Plus className="h-4 w-4" />Tambah</button></div><div className="mt-3 space-y-3">{siteSettings.socialLinks.map((item, index) => <div key={item.id} className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]"><select aria-label="Platform media sosial" className={inputClass.replace('mt-1.5 ', '')} value={item.platform || 'instagram'} onChange={(event) => { const socialLinks = [...siteSettings.socialLinks]; socialLinks[index] = { ...item, platform: event.target.value as SocialPlatform }; setSiteSettings({ ...siteSettings, socialLinks }); }}>{socialOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><input aria-label="Tautan media sosial" type="url" required placeholder="https://" className={inputClass.replace('mt-1.5 ', '')} value={item.url} onChange={(event) => { const socialLinks = [...siteSettings.socialLinks]; socialLinks[index] = { ...item, url: event.target.value }; setSiteSettings({ ...siteSettings, socialLinks }); }} /><button type="button" aria-label="Hapus media sosial" className={secondaryClass} onClick={() => setSiteSettings({ ...siteSettings, socialLinks: siteSettings.socialLinks.filter((link) => link.id !== item.id) })}><Trash2 className="h-4 w-4" /></button></div>)}</div></div><SaveButton saving={saving} />
            </form></section>}

          {activeTab === 'hero' && hasPermission('site.home', session) && <section className="space-y-6"><PageTitle title="Beranda" copy="Atur teks, media latar, jaringan, dan client. Semua perubahan tersimpan ke server dan langsung dipakai situs publik." />
            <form className="space-y-6" onSubmit={async (event) => { event.preventDefault(); await saveSection('hero', hero, 'Konten beranda tersimpan'); }}>
              <div className={`${panelClass} space-y-4`}><h2 className="text-sm font-bold">Hero utama</h2><Field label="Label kecil" value={hero.eyebrow} onChange={(value) => setHero({ ...hero, eyebrow: value })} /><div className="grid gap-4 sm:grid-cols-3"><Field label="Judul awal" value={hero.titlePrefix} onChange={(value) => setHero({ ...hero, titlePrefix: value })} /><Field label="Judul penekanan" value={hero.titleHighlight} onChange={(value) => setHero({ ...hero, titleHighlight: value })} /><Field label="Judul akhir" value={hero.titleSuffix} onChange={(value) => setHero({ ...hero, titleSuffix: value })} /></div><Field label="Deskripsi" rows={3} value={hero.caption} onChange={(value) => setHero({ ...hero, caption: value })} /><div className="grid gap-4 sm:grid-cols-2"><Field label="Tombol utama" value={hero.primaryLabel} onChange={(value) => setHero({ ...hero, primaryLabel: value })} /><Field label="Tombol kedua" value={hero.secondaryLabel} onChange={(value) => setHero({ ...hero, secondaryLabel: value })} /></div></div>
              <div className={panelClass}><div className="grid gap-4 lg:grid-cols-[220px_1fr]"><label className={labelClass}>Jenis background<select className={inputClass} value={hero.bgType} onChange={(event) => setHero({ ...hero, bgType: event.target.value as HeroSettings['bgType'] })}><option value="video">Video</option><option value="gif">GIF</option><option value="image">Gambar</option><option value="none">Tanpa media</option></select></label>{hero.bgType !== 'none' && <MediaField label={`File ${hero.bgType === 'video' ? 'video' : hero.bgType === 'gif' ? 'GIF' : 'gambar'}`} value={hero.bgType === 'video' ? hero.videoUrl : hero.imageUrl} mediaType={hero.bgType === 'video' ? 'video' : 'image'} onChange={(value) => setHero(hero.bgType === 'video' ? { ...hero, videoUrl: value } : { ...hero, imageUrl: value })} uploadMedia={uploadMedia} />}{hero.bgType === 'video' && <div className="lg:col-start-2"><AssetField label="Gambar poster video" value={hero.imageUrl} onChange={(value) => setHero({ ...hero, imageUrl: value })} uploadMedia={uploadMedia} /></div>}</div><p className="mt-3 text-xs leading-5 text-slate-400">Gambar poster tampil lebih dulu. Video hanya dimuat di desktop sesudah halaman siap saat browser senggang, dan dilewati pada tablet, ponsel, koneksi 3G atau lebih lambat, mode hemat data, serta reduced motion.</p></div>
              <LogoCollectionEditor title="Our Networks" description="Logo kecil di atas Layanan. Section otomatis tidak tampil bila daftar kosong." items={hero.networks || []} onChange={(networks) => setHero({ ...hero, networks })} uploadMedia={uploadMedia} />
              <LogoCollectionEditor title="Our Clients" description="Logo client di bawah Layanan. Section otomatis tidak tampil bila daftar kosong." items={hero.clients || []} onChange={(clients) => setHero({ ...hero, clients })} uploadMedia={uploadMedia} />
              <SaveButton saving={saving} />
            </form></section>}

          {activeTab === 'services' && hasPermission('site.services', session) && <section className="space-y-6"><PageTitle title="Layanan" copy="Tambah, ubah, atau kurangi layanan yang tampil pada carousel dan halaman layanan." action={<button className={primaryClass} onClick={() => setEditingService(newService())}><Plus className="h-4 w-4" />Tambah layanan</button>} />
            {editingService && <form className={`${panelClass} space-y-4`} onSubmit={async (event) => { event.preventDefault(); const exists = services.some((item) => item.id === editingService.id); const updated = exists ? services.map((item) => item.id === editingService.id ? editingService : item) : [editingService, ...services]; if (await saveSection('services', updated, 'Layanan tersimpan')) { setServices(updated); setEditingService(null); } }}><div className="grid gap-4 sm:grid-cols-2"><Field label="Nama layanan" value={editingService.title} onChange={(value) => setEditingService({ ...editingService, title: value })} required /><Field label="Kategori" value={editingService.category} onChange={(value) => setEditingService({ ...editingService, category: value })} required /></div><Field label="Tagline" value={editingService.tagline} onChange={(value) => setEditingService({ ...editingService, tagline: value })} /><Field label="Deskripsi" rows={4} value={editingService.description} onChange={(value) => setEditingService({ ...editingService, description: value })} required /><AssetField label="Foto layanan" value={editingService.imageUrl} onChange={(value) => setEditingService({ ...editingService, imageUrl: value })} uploadMedia={uploadMedia} /><Field label="Fitur (satu per baris)" rows={4} value={editingService.features.join('\n')} onChange={(value) => setEditingService({ ...editingService, features: value.split('\n').map((line) => line.trim()).filter(Boolean) })} /><div className="grid gap-4 sm:grid-cols-2"><Field label="Peralatan" value={editingService.equipment} onChange={(value) => setEditingService({ ...editingService, equipment: value })} /><Field label="Komoditas" value={editingService.commodities} onChange={(value) => setEditingService({ ...editingService, commodities: value })} /></div><FormActions saving={saving} onCancel={() => setEditingService(null)} /></form>}
            <div className="grid gap-3 sm:grid-cols-2">{services.map((service) => <article key={service.id} className="flex gap-4 border border-cyan-950 bg-[#071d21] p-4"><img src={service.imageUrl} alt="" className="h-20 w-24 shrink-0 object-cover" /><div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">{service.category}</p><h2 className="mt-1 truncate text-sm font-bold">{service.title}</h2><div className="mt-3 flex gap-2"><button className={secondaryClass} onClick={() => setEditingService(service)}>Edit</button><button className={secondaryClass} onClick={async () => { if (services.length <= 1) { toast.error('Website harus memiliki minimal satu layanan'); return; } if (!confirm(`Hapus ${service.title}?`)) return; const updated = services.filter((item) => item.id !== service.id); if (await saveSection('services', updated, 'Layanan dihapus')) setServices(updated); }}><Trash2 className="h-4 w-4" /></button></div></div></article>)}</div>
          </section>}

          {activeTab === 'media' && hasPermission('media.manage', session) && <section className="space-y-6"><PageTitle title="Media" copy="File disimpan di server Hostinger dan dapat dipakai untuk logo, layanan, atau berita." /><label className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-cyan-700 bg-[#071d21] p-8 text-center"><FolderOpen className="h-7 w-7 text-cyan-300" /><span className="mt-3 text-sm font-bold">Pilih gambar, video, atau dokumen</span><input type="file" className="sr-only" accept="image/*,video/mp4,video/webm,application/pdf" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadMedia(file); }} /></label><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{mediaList.map((item) => <article key={item.id} className="border border-cyan-950 bg-[#071d21] p-3">{item.type === 'image' ? <img src={item.url} alt={item.name} className="h-32 w-full object-cover" /> : <div className="flex h-32 items-center justify-center bg-[#011417] text-xs uppercase text-slate-400">{item.type}</div>}<p className="mt-3 truncate text-sm font-semibold">{item.name}</p><p className="mt-1 text-xs text-slate-500">{item.size}</p><div className="mt-3 flex gap-2"><button className={secondaryClass} onClick={() => { navigator.clipboard.writeText(item.url); toast.success('Tautan disalin'); }}>Salin URL</button><button className={secondaryClass} onClick={() => void deleteMedia(item.url)}><Trash2 className="h-4 w-4" /></button></div></article>)}</div></section>}

          {activeTab === 'news' && hasPermission('content.news', session) && <section className="space-y-6"><PageTitle title="CMS berita" copy="Artikel yang dipublikasikan langsung tampil di situs. Artikel baru dikirim ke pelanggan newsletter yang sudah mengonfirmasi email." action={<button className={primaryClass} onClick={() => setEditingArticle(newArticle())}><Plus className="h-4 w-4" />Tulis berita</button>} />
            {editingArticle && <form className={`${panelClass} space-y-4`} onSubmit={async (event) => { event.preventDefault(); const exists = articles.some((item) => item.id === editingArticle.id); const updated = exists ? articles.map((item) => item.id === editingArticle.id ? editingArticle : item) : [editingArticle, ...articles]; if (await saveSection('articles', updated, 'Berita dipublikasikan')) { setArticles(updated); setEditingArticle(null); await loadSubscribers(); } }}><div className="grid gap-4 sm:grid-cols-2"><Field label="Judul" value={editingArticle.title} onChange={(value) => setEditingArticle({ ...editingArticle, title: value })} required /><Field label="Kategori" value={editingArticle.category} onChange={(value) => setEditingArticle({ ...editingArticle, category: value })} required /><Field label="Tanggal publikasi" type="date" value={editingArticle.publishedDate} onChange={(value) => setEditingArticle({ ...editingArticle, publishedDate: value })} required /><Field label="Penulis" value={editingArticle.author || ''} onChange={(value) => setEditingArticle({ ...editingArticle, author: value })} /><Field label="Waktu baca" value={editingArticle.readTime || ''} onChange={(value) => setEditingArticle({ ...editingArticle, readTime: value })} /></div><Field label="Ringkasan" rows={3} value={editingArticle.excerpt} onChange={(value) => setEditingArticle({ ...editingArticle, excerpt: value })} required /><AssetField label="Foto utama" value={editingArticle.imageUrl} onChange={(value) => setEditingArticle({ ...editingArticle, imageUrl: value })} uploadMedia={uploadMedia} /><Field label="Isi artikel" rows={12} value={editingArticle.content} onChange={(value) => setEditingArticle({ ...editingArticle, content: value })} required /><Field label="Sumber (satu per baris)" rows={3} value={(editingArticle.sources || []).join('\n')} onChange={(value) => setEditingArticle({ ...editingArticle, sources: value.split('\n').map((line) => line.trim()).filter(Boolean) })} /><FormActions saving={saving} onCancel={() => setEditingArticle(null)} /></form>}
            <div className="divide-y divide-cyan-950 border border-cyan-950 bg-[#071d21]">{articles.map((article) => <article key={article.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="text-xs text-cyan-300">{article.publishedDate} · {article.category}</p><h2 className="mt-1 truncate text-sm font-bold">{article.title}</h2></div><div className="flex gap-2"><button className={secondaryClass} onClick={() => setEditingArticle(article)}>Edit</button><button className={secondaryClass} onClick={async () => { if (!confirm(`Hapus artikel ${article.title}?`)) return; const updated = articles.filter((item) => item.id !== article.id); if (await saveSection('articles', updated, 'Artikel dihapus')) setArticles(updated); }}><Trash2 className="h-4 w-4" /></button></div></article>)}</div>
          </section>}

          {activeTab === 'subscribers' && hasPermission('newsletter.read', session) && <section className="space-y-6"><PageTitle title="Newsletter" copy={`Pengirim ${newsletterSender} · ${mailStatus}`} action={<button className={primaryClass} onClick={() => exportSubscribersToCSV(subscribers)}><Download className="h-4 w-4" />Ekspor CSV</button>} /><div className="overflow-x-auto border border-cyan-950 bg-[#071d21]"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-[#0b292e] text-xs uppercase tracking-wide text-cyan-300"><tr><th className="p-3">Email</th><th className="p-3">Status</th><th className="p-3">Terdaftar</th><th className="p-3">Konfirmasi</th></tr></thead><tbody className="divide-y divide-cyan-950">{subscribers.map((subscriber) => <tr key={subscriber.email}><td className="p-3 font-semibold">{subscriber.email}</td><td className="p-3">{subscriber.status}</td><td className="p-3 text-slate-400">{subscriber.subscribedAt}</td><td className="p-3 text-slate-400">{subscriber.confirmedAt || 'Belum dikonfirmasi'}</td></tr>)}{subscribers.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-400">Belum ada pelanggan.</td></tr>}</tbody></table></div></section>}

          {activeTab === 'seo' && hasPermission('site.seo', session) && <section className="space-y-6"><PageTitle title="SEO" copy="Metadata ini diterapkan ke halaman publik dan dapat dirayapi mesin pencari setelah halaman dimuat." /><form className={`${panelClass} space-y-4`} onSubmit={async (event) => { event.preventDefault(); await saveSection('seo', seo, 'Pengaturan SEO tersimpan'); }}><Field label="Judul situs" value={seo.siteTitle} onChange={(value) => setSeo({ ...seo, siteTitle: value })} required /><Field label="Deskripsi mesin pencari" rows={3} value={seo.metaDescription} onChange={(value) => setSeo({ ...seo, metaDescription: value })} required /><Field label="Kata kunci" value={seo.keywords} onChange={(value) => setSeo({ ...seo, keywords: value })} /><div className="grid gap-4 sm:grid-cols-2"><Field label="Judul saat dibagikan" value={seo.ogTitle} onChange={(value) => setSeo({ ...seo, ogTitle: value })} /><Field label="Gambar saat dibagikan" value={seo.ogImageUrl} onChange={(value) => setSeo({ ...seo, ogImageUrl: value })} /></div><Field label="Deskripsi saat dibagikan" rows={3} value={seo.ogDescription} onChange={(value) => setSeo({ ...seo, ogDescription: value })} /><label className="flex min-h-11 items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={seo.robotsIndex} onChange={(event) => setSeo({ ...seo, robotsIndex: event.target.checked })} className="h-4 w-4 accent-cyan-400" />Izinkan mesin pencari mengindeks situs</label><SaveButton saving={saving} /></form></section>}
        </main>
      </div>
    </div>
  );
};

const PageTitle: React.FC<{ title: string; copy: string; action?: React.ReactNode }> = ({ title, copy, action }) => <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{copy}</p></div>{action}</header>;
const SaveButton: React.FC<{ saving: boolean }> = ({ saving }) => <div className="flex justify-end border-t border-slate-800 pt-5"><button type="submit" disabled={saving} className={primaryClass}><Save className="h-4 w-4" />{saving ? 'Menyimpan…' : 'Simpan ke server'}</button></div>;
const FormActions: React.FC<{ saving: boolean; onCancel: () => void }> = ({ saving, onCancel }) => <div className="flex justify-end gap-2 border-t border-slate-800 pt-5"><button type="button" onClick={onCancel} className={secondaryClass}>Batal</button><button type="submit" disabled={saving} className={primaryClass}><Save className="h-4 w-4" />{saving ? 'Menyimpan…' : 'Simpan ke server'}</button></div>;
const MoveButton: React.FC<{ icon: React.ElementType; disabled: boolean; onClick: () => void }> = ({ icon: Icon, disabled, onClick }) => <button type="button" disabled={disabled} onClick={onClick} className="inline-flex h-10 w-10 items-center justify-center border border-slate-700 text-slate-300 hover:text-white disabled:opacity-25"><Icon className="h-4 w-4" /></button>;
const move = <T,>(items: T[], from: number, to: number): T[] => { const updated = [...items]; const [item] = updated.splice(from, 1); updated.splice(to, 0, item); return updated; };

const AssetField: React.FC<{ label: string; value: string; onChange: (value: string) => void; uploadMedia: (file: File, onDone?: (url: string) => void) => Promise<void> }> = ({ label, value, onChange, uploadMedia }) => <div className="border border-slate-800 p-3"><label className={labelClass}>{label}</label><div className="mt-3 flex items-center gap-3">{value ? <img src={value} alt="" className="h-14 w-20 bg-[#011417] object-contain" /> : <div className="flex h-14 w-20 items-center justify-center bg-[#011417]"><ImageIcon className="h-5 w-5 text-slate-600" /></div>}<label className={`${secondaryClass} cursor-pointer`}>Unggah<input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadMedia(file, onChange); }} /></label></div><input aria-label={`URL ${label}`} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} placeholder="/uploads/..." /></div>;

const MediaField: React.FC<{ label: string; value: string; mediaType: 'image' | 'video'; onChange: (value: string) => void; uploadMedia: (file: File, onDone?: (url: string) => void) => Promise<void> }> = ({ label, value, mediaType, onChange, uploadMedia }) => <div className="border border-slate-800 p-3"><label className={labelClass}>{label}</label><div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">{value ? mediaType === 'video' ? <video src={value} muted playsInline className="h-20 w-32 bg-[#011417] object-cover" /> : <img src={value} alt="" className="h-20 w-32 bg-[#011417] object-cover" /> : <div className="flex h-20 w-32 items-center justify-center bg-[#011417]"><ImageIcon className="h-5 w-5 text-slate-600" /></div>}<label className={`${secondaryClass} cursor-pointer`}>Unggah file<input type="file" accept={mediaType === 'video' ? 'video/mp4,video/webm' : 'image/*'} className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadMedia(file, onChange); }} /></label></div><input aria-label={`URL ${label}`} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} placeholder="/uploads/..." /></div>;

const LogoCollectionEditor: React.FC<{ title: string; description: string; items: PartnerLogo[]; onChange: (items: PartnerLogo[]) => void; uploadMedia: (file: File, onDone?: (url: string) => void) => Promise<void> }> = ({ title, description, items, onChange, uploadMedia }) => (
  <div className={panelClass}>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="text-sm font-bold">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-400">{description}</p></div><button type="button" className={secondaryClass} onClick={() => onChange([...items, { id: `partner-${Date.now()}`, name: '', imageUrl: '', websiteUrl: '' }])}><Plus className="h-4 w-4" />Tambah logo</button></div>
    {items.length === 0 ? <p className="mt-5 border border-dashed border-slate-700 p-5 text-center text-sm text-slate-500">Belum ada logo. Section publik tetap tersembunyi.</p> : <div className="mt-5 space-y-3">{items.map((item, index) => <div key={item.id} className="grid gap-3 border border-slate-800 p-3 lg:grid-cols-[1fr_1.15fr_1.15fr_auto]"><Field label="Nama" value={item.name} onChange={(value) => { const next = [...items]; next[index] = { ...item, name: value }; onChange(next); }} required /><AssetField label="Logo" value={item.imageUrl} onChange={(value) => { const next = [...items]; next[index] = { ...item, imageUrl: value }; onChange(next); }} uploadMedia={uploadMedia} /><Field label="Tautan situs (opsional)" type="url" value={item.websiteUrl} onChange={(value) => { const next = [...items]; next[index] = { ...item, websiteUrl: value }; onChange(next); }} placeholder="https://" /><div className="flex items-end gap-1"><MoveButton icon={ArrowUp} disabled={index === 0} onClick={() => onChange(move(items, index, index - 1))} /><MoveButton icon={ArrowDown} disabled={index === items.length - 1} onClick={() => onChange(move(items, index, index + 1))} /><button type="button" aria-label={`Hapus ${item.name || 'logo'}`} className={secondaryClass} onClick={() => onChange(items.filter((entry) => entry.id !== item.id))}><Trash2 className="h-4 w-4" /></button></div></div>)}</div>}
  </div>
);

const Overview: React.FC<{ session: OperatorUser; services: number; articles: number; media: number; subscribers: number; allowedTabs: typeof tabDefinitions; onOpen: (tab: TabId) => void }> = ({ session, services, articles, media, subscribers, allowedTabs, onOpen }) => <section className="space-y-7"><PageTitle title={`Halo, ${session.displayName}`} copy="Setiap perubahan yang disimpan dari panel ini ditulis ke server dan dipakai oleh website publik untuk semua pengunjung." /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{ label: 'Layanan', value: services }, { label: 'Berita', value: articles }, { label: 'Media', value: media }, { label: 'Newsletter', value: subscribers }].map((item) => <div key={item.label} className={panelClass}><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p><p className="mt-2 text-3xl font-bold text-cyan-300">{item.value}</p></div>)}</div><div className={panelClass}><div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-300" /><h2 className="font-bold">Akses aktif: {roleLabels[session.role]}</h2></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{allowedTabs.filter((tab) => tab.id !== 'overview').map((tab) => <button key={tab.id} type="button" onClick={() => onOpen(tab.id)} className="flex min-h-12 items-center justify-between border border-slate-800 px-3 text-left text-sm font-semibold hover:border-cyan-700"><span>{tab.label}</span><CheckCircle2 className="h-4 w-4 text-cyan-300" /></button>)}</div></div></section>;

export default OperatorAdmin;
