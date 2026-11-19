import React, { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { getStoredBranding, getStoredSiteSettings, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { SocialLinks } from './SocialLinks';
import { QuoteForm } from './QuoteForm';
import { measureContactClick, quoteContext, whatsappDigits } from '../utils/quoteFlow';

export const ContactPage: React.FC = () => {
  const [branding, setBranding] = useState(getStoredBranding);
  const [siteSettings, setSiteSettings] = useState(getStoredSiteSettings);
  const service = quoteContext().service;
  useEffect(() => {
    const reload = () => { setBranding(getStoredBranding()); setSiteSettings(getStoredSiteSettings()); };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);
  return <main className="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]"><section className="page-shell py-14 sm:py-20"><div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-16"><header>
    {branding.fullLogoUrl && <img src={branding.fullLogoUrl} alt="GAEKS" className="mb-7 h-9 w-auto object-contain" />}
    <p className="section-label">Kontak</p><h1 className="section-title">Ceritakan rute dan kebutuhan kargo Anda.</h1>
    <p className="section-copy">Pesan akan disiapkan di WhatsApp untuk Anda tinjau dan kirim sendiri.</p>
    <div className="mt-8 border-y border-slate-300 py-4 text-sm">
      <a href={`https://wa.me/${whatsappDigits(branding.whatsappNumber)}`} onClick={() => measureContactClick('whatsapp', service)} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 hover:text-cyan-700"><Phone className="h-4 w-4 shrink-0" />{branding.whatsappDisplay}</a>
      <a href={`mailto:${branding.salesEmail}`} onClick={() => measureContactClick('email', service)} className="flex min-h-11 items-center gap-3 hover:text-cyan-700"><Mail className="h-4 w-4 shrink-0" />{branding.salesEmail}</a>
    </div>
    {siteSettings.socialLinks.length > 0 && <div className="mt-6"><p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Media sosial</p><SocialLinks links={siteSettings.socialLinks} showLabels tone="light" /></div>}
  </header><QuoteForm defaultService={service} /></div></section></main>;
};
