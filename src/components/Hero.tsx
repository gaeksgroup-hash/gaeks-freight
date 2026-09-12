// filepath: /src/components/Hero.tsx
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Compass, FileCheck2, Globe2, Clock4, AlertCircle } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredHero, getStoredBranding, GAEKS_UPDATE_EVENT, HeroSettings, DEFAULT_HERO } from '../utils/adminStorage';

export interface HeroProps {
  onNavigate?: (page: string) => void;
  currentLang?: Language;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, currentLang = 'id' }) => {
  const [heroData, setHeroData] = useState<HeroSettings>(getStoredHero());
  const [brandingData, setBrandingData] = useState(getStoredBranding());

  useEffect(() => {
    const reload = () => {
      setHeroData(getStoredHero());
      setBrandingData(getStoredBranding());
    };
    reload();
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
      window.removeEventListener('storage', reload);
    };
  }, []);

  const handleNav = (page: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(page);
  };

  // Logika Pemilihan Bahasa Dinamis
  const titlePrefix = currentLang === 'en' ? (heroData.titlePrefix_en || heroData.titlePrefix) : currentLang === 'zh' ? (heroData.titlePrefix_zh || heroData.titlePrefix) : heroData.titlePrefix;
  const titleHighlight = currentLang === 'en' ? (heroData.titleHighlight_en || heroData.titleHighlight) : currentLang === 'zh' ? (heroData.titleHighlight_zh || heroData.titleHighlight) : heroData.titleHighlight;
  const titleSuffix = currentLang === 'en' ? (heroData.titleSuffix_en || heroData.titleSuffix) : currentLang === 'zh' ? (heroData.titleSuffix_zh || heroData.titleSuffix) : heroData.titleSuffix;
  const caption = currentLang === 'en' ? (heroData.caption_en || heroData.caption) : currentLang === 'zh' ? (heroData.caption_zh || heroData.caption) : heroData.caption;
  const commodityTitle = currentLang === 'en' ? (heroData.commodityTitle_en || heroData.commodityTitle) : currentLang === 'zh' ? (heroData.commodityTitle_zh || heroData.commodityTitle) : heroData.commodityTitle;
  const commodityCaption = currentLang === 'en' ? (heroData.commodityCaption_en || heroData.commodityCaption) : currentLang === 'zh' ? (heroData.commodityCaption_zh || heroData.commodityCaption) : heroData.commodityCaption;

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#011417] text-white">
      
      {/* 1. Dynamic Background: Video atau Foto Sesuai Pengaturan Operator */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroData.bgType === 'video' ? (
          <video 
            key={heroData.videoUrl}
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-105 filter brightness-75"
            src={heroData.videoUrl}
            poster={heroData.imageUrl}
          />
        ) : (
          <img 
            key={heroData.imageUrl}
            src={heroData.imageUrl} 
            alt="GAEKS Background" 
            className="w-full h-full object-cover scale-105 filter brightness-75"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#012E34]/95 via-[#012E34]/85 to-[#011C20]/90 mix-blend-multiply" />
      </div>

      {/* 2. Top Live Port Telemetry Ticker */}
      <div className="absolute top-16 left-0 right-0 z-20 bg-[#011417]/90 backdrop-blur-md border-b border-cyan-950/80 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-bold text-slate-300 overflow-x-auto no-scrollbar space-x-6">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 uppercase tracking-widest font-black">Live Radar Maritim</span>
          </div>
          <div className="flex items-center space-x-6 flex-shrink-0 text-slate-300 font-mono">
            <span>Tanjung Priok: <strong className="text-emerald-400 font-bold">NORMAL (SLA 99.4%)</strong></span>
            <span>Tanjung Emas: <strong className="text-emerald-400 font-bold">NORMAL</strong></span>
            <span>Tanjung Perak: <strong className="text-emerald-400 font-bold">NORMAL</strong></span>
            <span>Bunker VLSFO: <strong className="text-cyan-300 font-bold">$612/MT</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Kolom Kiri: Konten Teks & Aksi */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            
            {/* Logo Simbol GAEKS */}
            <div className="inline-flex items-center">
              <img 
                src={brandingData.symbolLogoUrl || "/logos/gaek-symbol.png"} 
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/logos/gaek-symbol.svg';
                }}
                alt="GAEKS Logo" 
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-md" 
              />
            </div>

            {/* Headline H1 Multilingual */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {titlePrefix}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-100 to-white">
                {titleHighlight}
              </span>
              {titleSuffix}
            </h1>

            {/* Paragraf Caption Multilingual */}
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
              {caption}
            </p>

            {/* Banner Komoditas Khusus Multilingual */}
            <div className="p-4 rounded-2xl bg-[#011C20]/80 border border-cyan-800/40 text-left flex items-start space-x-3.5 shadow-lg max-w-xl mx-auto lg:mx-0">
              <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="text-cyan-300 block font-bold text-sm mb-0.5">{commodityTitle}</strong>
                <p className="text-slate-300 leading-relaxed">{commodityCaption}</p>
              </div>
            </div>

            {/* Tombol Aksi Cepat */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#calculator"
                onClick={(e) => handleNav('calculator', e)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-[#012E34] hover:from-cyan-400 hover:to-[#011C20] text-white shadow-xl shadow-cyan-950/30 transition-all active:scale-95"
              >
                <span>Hitung Tarif Kargo (CBM / Volumetrik)</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="https://wa.me/6285608561745"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95"
              >
                <span>Konsultasi Slot Kapal & AWB</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-cyan-950/80 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-300">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#011C20]/80 border border-cyan-900/40">
                <FileCheck2 className="w-4 h-4 text-cyan-400" />
                <span>PPJK Ceisa 4.0</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#011C20]/80 border border-cyan-900/40">
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span>Global Liners</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#011C20]/80 border border-cyan-900/40">
                <Clock4 className="w-4 h-4 text-cyan-400" />
                <span>24/7 SLA Support</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#011C20]/80 border border-cyan-900/40">
                <img src="/logos/wca.svg" alt="WCA" className="h-4 w-auto" />
                <span className="text-amber-300 font-bold">WCA World Member</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#011C20]/80 border border-cyan-900/40">
                <img src="/logos/jctrans.svg" alt="JCtrans" className="h-4 w-auto" />
                <span className="text-[#FFA333] font-bold">JCtrans GCP Member</span>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Radar 360 Derajat */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center relative">
            <div className="w-72 h-72 rounded-full border-2 border-cyan-500/30 relative flex items-center justify-center bg-[#011C20]/60 backdrop-blur-xl shadow-2xl">
              <div className="w-56 h-56 rounded-full border border-cyan-500/20" />
              <div className="w-36 h-36 rounded-full border border-cyan-500/20" />
              <div className="w-16 h-16 rounded-full border border-cyan-500/30 bg-cyan-950/40 flex items-center justify-center">
                <Compass className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute top-12 right-16 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <div className="absolute bottom-16 left-14 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#011C20]/90 border border-cyan-900/40 text-center w-full max-w-xs shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block mb-0.5">Coverage Global</span>
              <p className="text-xs text-slate-300 font-semibold">Intra-Asia, Middle East, Europe & USA Trade Lanes</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
