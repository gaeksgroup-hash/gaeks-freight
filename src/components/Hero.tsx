import React from 'react';
import { ArrowRight, Calculator, Route, Ship } from 'lucide-react';
import { Language } from '../types/freight';

export interface HeroProps {
  onNavigate?: (page: string) => void;
  currentLang?: Language;
}

const copy = {
  id: {
    eyebrow: 'Freight forwarding dan kepabeanan',
    title: 'Kargo bergerak dengan rencana yang jelas.',
    body: 'GAEKS mengatur freight laut dan udara, kepabeanan, serta pengiriman darat melalui satu tim operasional.',
    primary: 'Minta estimasi',
    secondary: 'Lihat layanan',
    utilities: [
      ['Hitung kebutuhan kargo', 'CBM dan berat volumetrik', 'calculator'],
      ['Cari rute pengiriman', 'Jadwal laut dan udara', 'network'],
      ['Bahas kebutuhan khusus', 'Project cargo dan kepabeanan', 'contact']
    ]
  },
  en: {
    eyebrow: 'Freight forwarding and customs',
    title: 'Cargo moves better with a clear plan.',
    body: 'GAEKS coordinates ocean and air freight, customs clearance, and inland delivery through one operations team.',
    primary: 'Request an estimate',
    secondary: 'View services',
    utilities: [
      ['Calculate cargo', 'CBM and volumetric weight', 'calculator'],
      ['Find a route', 'Ocean and air schedules', 'network'],
      ['Discuss special cargo', 'Projects and customs', 'contact']
    ]
  },
  zh: {
    eyebrow: '货运代理与清关服务',
    title: '清晰规划，让货物高效流转。',
    body: 'GAEKS 通过一个运营团队协调海运、空运、清关和陆路配送。',
    primary: '获取估算',
    secondary: '查看服务',
    utilities: [
      ['计算货物数据', '体积与体积重量', 'calculator'],
      ['查找运输路线', '海运及空运班次', 'network'],
      ['咨询特殊货物', '项目货与清关', 'contact']
    ]
  }
} as const;

const icons = [Calculator, Route, Ship];

export const Hero: React.FC<HeroProps> = ({ onNavigate, currentLang = 'id' }) => {
  const text = copy[currentLang];

  return (
    <section id="home" aria-labelledby="hero-title" className="border-b border-slate-200 bg-[#f4f5f1] pt-16 text-[#12363a]">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex min-h-[520px] flex-col justify-center px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <p className="section-label">{text.eyebrow}</p>
          <h1 id="hero-title" className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#092f34] sm:text-5xl lg:text-6xl">{text.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">{text.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => onNavigate?.('calculator')} className="button-primary">{text.primary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
            <button type="button" onClick={() => onNavigate?.('services')} className="button-link">{text.secondary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden bg-[#0b3438] lg:min-h-[520px]">
          <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=82" alt="Terminal peti kemas dan operasi pengiriman kargo" className="absolute inset-0 h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082e33]/65 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/25 bg-[#082e33]/90 px-6 py-4 text-sm text-white backdrop-blur-sm">Satu titik koordinasi untuk dokumen, pengangkutan, dan pengantaran.</div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl border-x border-slate-200 bg-white md:grid-cols-3">
        {text.utilities.map(([title, description, page], index) => {
          const Icon = icons[index];
          return (
            <button key={page} type="button" onClick={() => onNavigate?.(page)} className="group flex min-h-[112px] items-center gap-4 border-b border-slate-200 px-5 py-5 text-left transition-colors hover:bg-cyan-50 md:border-b-0 md:border-r last:border-r-0">
              <Icon className="h-5 w-5 shrink-0 text-cyan-700" aria-hidden="true" />
              <span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-[#12363a]">{title}</strong><span className="mt-1 block text-sm text-slate-500">{description}</span></span>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
};
