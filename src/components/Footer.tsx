// filepath: /src/components/Footer.tsx
import React from 'react';
import { Ship, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: 'home' | 'services' | 'calculator' | 'network' | 'contact') => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-navy border-t border-brand-darkBlue text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-orange p-2 rounded-lg text-white">
                <Ship className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">GAEKS FREIGHT</span>
            </div>
            <p className="text-xs leading-relaxed">
              Solusi International Freight Forwarding, Custom Brokerage PPJK, Bongkar Muat PBM, Pergudangan, dan Domestic Trucking terintegrasi di bawah <strong>GAEKS GROUP</strong>.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} GAEKS GROUP (gaeks.com). All rights reserved.
            </div>
          </div>

          {/* Col 2: Services List */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">7 Layanan Kargo</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">PPJK (Customs Clearance)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Gudang & PBM</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Domestic Trucking</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Project Cargo (ODOW)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Ocean Freight LCL & FCL</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Air Shipment Priority</button></li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">Home Portal</button></li>
              <li><button onClick={() => onNavigate('calculator')} className="hover:text-white">Kalkulator CBM & Port</button></li>
              <li><button onClick={() => onNavigate('network')} className="hover:text-white">Peta Rute Maritim Global</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Formulir Contact Us</button></li>
              <li>
                <a 
                  href="https://dgp.gaeks.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1 text-brand-orange font-semibold hover:underline"
                >
                  <span>DGP (Digital Gaeks Product)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contacts */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Kontak Resmi Operasional</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold">
                  +62 856-0856-1745
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href="mailto:Sales01@gaeks.com" className="hover:text-white font-bold">
                  Sales01@gaeks.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a href="mailto:info@gaeks.com" className="hover:text-white">
                  info@gaeks.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>Pelabuhan Tanjung Priok (Jakarta), Tanjung Emas (Semarang), Tanjung Perak (Surabaya).</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};
