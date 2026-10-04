import React, { useEffect, useState } from 'react';
import { GAEKS_UPDATE_EVENT, PartnerLogo, getStoredHero } from '../utils/adminStorage';

const usable = (items: PartnerLogo[] | undefined) => (Array.isArray(items) ? items : []).filter((item) => item.name.trim() && item.imageUrl.trim());

const LogoLink: React.FC<{ item: PartnerLogo; compact?: boolean }> = ({ item, compact }) => {
  const content = <img src={item.imageUrl} alt={item.name} loading="lazy" decoding="async" className={compact ? 'h-6 w-auto max-w-28 object-contain sm:h-7' : 'h-10 w-auto max-w-36 object-contain sm:h-12'} />;
  return item.websiteUrl ? <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={`Buka situs ${item.name}`} className="flex min-h-11 items-center justify-center">{content}</a> : <div className="flex min-h-11 items-center justify-center">{content}</div>;
};

export const HomeNetworks: React.FC = () => {
  const [items, setItems] = useState(() => usable(getStoredHero().networks));
  useEffect(() => { const reload = () => setItems(usable(getStoredHero().networks)); window.addEventListener(GAEKS_UPDATE_EVENT, reload); return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload); }, []);
  if (!items.length) return null;
  return <section aria-labelledby="network-partners-title" className="border-b border-slate-200 bg-[#eef3f1] py-5"><div className="page-shell flex flex-col gap-4 sm:flex-row sm:items-center"><h2 id="network-partners-title" className="shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Our Networks</h2><div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-7 gap-y-3 sm:justify-end">{items.map((item) => <LogoLink key={item.id} item={item} compact />)}</div></div></section>;
};

export const HomeClients: React.FC = () => {
  const [items, setItems] = useState(() => usable(getStoredHero().clients));
  useEffect(() => { const reload = () => setItems(usable(getStoredHero().clients)); window.addEventListener(GAEKS_UPDATE_EVENT, reload); return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload); }, []);
  if (!items.length) return null;
  return <section aria-labelledby="clients-title" className="border-b border-slate-200 bg-white py-10 sm:py-12"><div className="page-shell"><div className="flex items-end justify-between gap-6"><div><p className="section-label">Mitra bisnis</p><h2 id="clients-title" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#12363a] sm:text-3xl">Our Clients</h2></div><p className="hidden max-w-md text-right text-sm leading-6 text-slate-500 sm:block">Perusahaan yang mempercayakan koordinasi pengirimannya kepada GAEKS.</p></div><div className="mt-7 grid grid-cols-2 border-l border-t border-slate-200 sm:grid-cols-3 lg:grid-cols-5">{items.map((item) => <div key={item.id} className="flex min-h-24 items-center justify-center border-b border-r border-slate-200 px-5 py-4 transition-colors hover:bg-cyan-50/60"><LogoLink item={item} /></div>)}</div></div></section>;
};
