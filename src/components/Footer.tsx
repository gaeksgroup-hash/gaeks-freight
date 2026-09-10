// filepath: /src/components/Footer.tsx
import React from 'react';
import { Ship, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const Footer: React.FC<{ onNavigate: (tab: string) => void; currentLang?: Language }> = ({ onNavigate, currentLang = 'id' }) => {
  return (
    <footer className="bg-[#011C20] border-t border-cyan-900/40 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-tr from-cyan-400 to-emerald-400 p-2 rounded-lg text-slate-950">
                <Ship className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight block leading-none">Gaek Freight</span>
                <span className="text-[9px] text-cyan-400 uppercase font-extrabold tracking-wider block mt-0.5">
                  Global Andalan Ekspress
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Penyedia jasa International Freight Forwarding, Custom Clearance PPJK Ceisa 4.0, Stevedoring PBM, Pergudangan Transit, dan Inland Trucking terpadu ke seluruh Indonesia.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Gaek Freight. All rights reserved.
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Layanan Utama</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('services')} className="hover:text-cyan-400">PPJK (Customs Clearance)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-cyan-400">Gudang & PBM</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-cyan-400">Domestic Trucking</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-cyan-400">Project Cargo & Heavy Lift</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-cyan-400">Ocean Freight LCL & FCL</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-cyan-400">Air Shipment Priority</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Navigasi Halaman</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white">Services</button></li>
              <li><button onClick={() => onNavigate('calculator')} className="hover:text-white">Cargo Check!</button></li>
              <li><button onClick={() => onNavigate('network')} className="hover:text-white">Route & Schedule</button></li>
              <li><button onClick={() => onNavigate('news')} className="hover:text-white">News & Updates</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Contact Us</button></li>
              <li className="pt-2">
                <button onClick={() => onNavigate('admin')} className="flex items-center space-x-1.5 text-[11px] text-slate-500 hover:text-cyan-400 transition-colors">
                  <Lock className="w-3 h-3" />
                  <span>Portal CMS (@gaeks.com)</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Kontak Resmi Operasional</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold">
                  +62 856-0856-1745
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="mailto:Sales01@gaeks.com" className="hover:text-white font-bold">
                  Sales01@gaeks.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a href="mailto:info@gaeks.com" className="hover:text-white">
                  info@gaeks.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Pelabuhan Tanjung Priok (Jakarta), Tanjung Emas (Semarang), Tanjung Perak (Surabaya).</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};
