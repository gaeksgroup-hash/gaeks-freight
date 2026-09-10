// filepath: /src/components/Footer.tsx
import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { Language } from '../types/freight';

export interface FooterProps {
  onNavigate?: (page: string) => void;
  currentLang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentLang = 'id' }) => {
  const handleNav = (page: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-[#011C20] text-slate-300 border-t border-cyan-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Kolom 1: Simbol Resmi GAEKS (Sama persis dengan navbar, tanpa box putih) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center">
              <img 
                src="/logos/gaek-symbol.svg" 
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/favicon.svg';
                }}
                alt="GAEKS" 
                className="h-10 sm:h-11 w-auto object-contain" 
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Penyedia solusi logistik rantai pasok global terintegrasi: Ocean Freight (FCL/LCL), Priority Air Cargo, Customs Brokerage PPJK Ceisa 4.0, Stevedoring PBM, dan Inland Trucking.
            </p>
            <div className="flex items-center space-x-2 text-xs text-cyan-400 pt-1 font-bold">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Verified Member of WCA World & JCtrans Network</span>
            </div>
          </div>

          {/* Kolom 2: Layanan Utama */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Layanan Utama</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" onClick={(e) => handleNav('services', e)} className="hover:text-cyan-400 transition-colors">Customs Clearance (PPJK Ceisa 4.0)</a></li>
              <li><a href="#services" onClick={(e) => handleNav('services', e)} className="hover:text-cyan-400 transition-colors">Full Container Load (FCL Ocean)</a></li>
              <li><a href="#services" onClick={(e) => handleNav('services', e)} className="hover:text-cyan-400 transition-colors">Less than Container Load (LCL Consolidation)</a></li>
              <li><a href="#services" onClick={(e) => handleNav('services', e)} className="hover:text-cyan-400 transition-colors">Air Shipment Priority (Express Air)</a></li>
              <li><a href="#services" onClick={(e) => handleNav('services', e)} className="hover:text-cyan-400 transition-colors">Project Cargo & Heavy Lift (ODOW / Breakbulk)</a></li>
              <li><a href="#services" onClick={(e) => handleNav('services', e)} className="hover:text-cyan-400 transition-colors">Gudang & PBM (Stevedoring Dermaga)</a></li>
              <li><a href="#services" onClick={(e) => handleNav('services', e)} className="hover:text-cyan-400 transition-colors">Domestic Trucking Multi-Moda</a></li>
            </ul>
          </div>

          {/* Kolom 3: Hub Pelabuhan */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Pelabuhan Hub</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /><span>Tanjung Priok, Jakarta</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /><span>Tanjung Emas, Semarang</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /><span>Tanjung Perak, Surabaya</span></li>
              <li className="flex items-center space-x-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /><span>Bandara Soekarno-Hatta</span></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak Resmi & Admin CMS */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Kontak & Operasional</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>+62 0856-0856-1745</span>
              </a>
              <a href="mailto:Sales01@gaeks.com" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sales01@gaeks.com</span>
              </a>
              <a href="mailto:info@gaeks.com" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>info@gaeks.com</span>
              </a>
            </div>
            <div className="pt-2">
              <a 
                href="#admin" 
                onClick={(e) => handleNav('admin', e)}
                className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-slate-400 hover:text-cyan-400 bg-[#012E34] px-3 py-1.5 rounded-lg border border-cyan-800/40 transition-colors"
              >
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>Portal CMS Admin</span>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-cyan-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} GAEKS - Global Andalan Ekspress. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#calculator" onClick={(e) => handleNav('calculator', e)} className="hover:text-cyan-400">Kalkulator Kargo</a>
            <a href="#network" onClick={(e) => handleNav('network', e)} className="hover:text-cyan-400">Rute & Maskapai</a>
            <a href="#news" onClick={(e) => handleNav('news', e)} className="hover:text-cyan-400">News & Updates</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
