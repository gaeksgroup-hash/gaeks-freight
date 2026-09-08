// filepath: /src/components/Footer.tsx
import React from 'react';
import { Ship, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy border-t border-brand-darkBlue text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-orange p-2 rounded-lg text-white">
                <Ship className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">GAEKS FREIGHT</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed max-w-md">
              Divisi Logistik & Ekspedisi Internasional dari <strong>GAEKS GROUP</strong>. Menghadirkan solusi kargo laut, udara, trucking darat, dan pengurusan kepabeanan yang transparan dan tepat waktu.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} GAEKS GROUP (gaeks.com). All rights reserved.
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Ekosistem Grup</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://gaeks.com" className="text-brand-orange font-semibold hover:underline">
                  GAEKS FREIGHT (Main Portal)
                </a>
              </li>
              <li>
                <a 
                  href="https://dgp.gaeks.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1 hover:text-white transition-colors"
                >
                  <span>DGP (Digital Gaeks Product)</span>
                  <ExternalLink className="w-3 h-3 text-brand-orange" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Hubungi Operasional</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>freight@gaeks.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>Indonesia & Global Port Operations</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};