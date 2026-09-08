// filepath: /src/components/StatsNetwork.tsx
import React from 'react';
import { Anchor, Compass, Award, ShieldAlert } from 'lucide-react';

export const StatsNetwork: React.FC = () => {
  return (
    <section id="coverage" className="py-20 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-brand-darkBlue pb-16">
          <div className="flex flex-col items-center">
            <Anchor className="w-6 h-6 text-brand-orange mb-2" />
            <div className="text-4xl sm:text-5xl font-black text-brand-orange">150+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Koneksi Pelabuhan Dunia</div>
          </div>
          <div className="flex flex-col items-center">
            <Compass className="w-6 h-6 text-brand-orange mb-2" />
            <div className="text-4xl sm:text-5xl font-black text-brand-orange">99.2%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Tingkat Ketepatan Jadwal</div>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-brand-orange mb-2" />
            <div className="text-4xl sm:text-5xl font-black text-brand-orange">24/7</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Dukungan Tracking & Support</div>
          </div>
          <div className="flex flex-col items-center">
            <ShieldAlert className="w-6 h-6 text-brand-orange mb-2" />
            <div className="text-4xl sm:text-5xl font-black text-brand-orange">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Kepatuhan Regulasi Bea Cukai</div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Butuh Penanganan Komoditas Tertentu?</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Mulai dari kargo umum (general cargo), semen, bahan baku industri, tekstil, mesin berat, hingga produk bersuhu terkontrol (reefer container).
          </p>
          <a
            href="https://wa.me/6285608561745?text=Halo%20GAEKS%20Freight,%20saya%20ingin%20berdiskusi%20tentang%20proyek%20pengiriman%20kargo%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white hover:bg-slate-100 text-brand-navy px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg"
          >
            Hubungi Spesialis Kargo Kami
          </a>
        </div>
      </div>
    </section>
  );
};
