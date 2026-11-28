import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Building2, Check, ChevronDown, FileText, Layers, Mail, Phone, Sparkles, User, X } from 'lucide-react';
import { getSiteCopy, getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import {
  measureContactClick,
  quoteContext,
  QuoteService,
  resolveSmartContact,
  serviceLabel,
  SmartRoutingResult,
} from '../utils/quoteFlow';
import { CopyEmailButton, WhatsAppIcon } from './ContactActions';

export const QuoteForm: React.FC<{
  defaultService?: QuoteService;
  onServiceChange?: (service: string) => void;
  onRoutingChange?: (routing: SmartRoutingResult, onSend: (channel: 'whatsapp' | 'email') => void) => void;
  showEmailCopy?: boolean;
}> = ({
  defaultService = 'general',
  onServiceChange,
  onRoutingChange,
  showEmailCopy = false,
}) => {
  const [initial] = useState(() => quoteContext(defaultService));
  const [services, setServices] = useState(getStoredServices);
  const [copy, setCopy] = useState(getSiteCopy);
  const [selectedServices, setSelectedServices] = useState<string[]>(() =>
    initial.service && initial.service !== 'general' ? [initial.service] : []
  );
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [description, setDescription] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const note = params.get('note');
    if (category === 'tarif') {
      return note ? `Permintaan informasi tarif pengiriman: ${note}` : 'Permintaan informasi tarif pengiriman.';
    }
    return note || '';
  });
  const [honeypot, setHoneypot] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [opened, setOpened] = useState<'whatsapp' | 'email' | null>(null);
  const [savedNotice, setSavedNotice] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const formId = useId();

  useEffect(() => {
    const reload = () => {
      setServices(getStoredServices());
      setCopy(getSiteCopy());
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [dropdownOpen]);

  const serviceOptions = useMemo(() => {
    const dynamic = services.map((item) => ({
      value: item.id === 'air-shipment' ? 'air' : item.id === 'undername-impor' ? 'undername' : item.id,
      label: item.title,
    }));
    return [...dynamic, { value: 'general', label: 'Konsultasi Umum / Lainnya' }];
  }, [services]);

  const selectedLabels = useMemo(
    () =>
      selectedServices.map((id) => {
        const match = serviceOptions.find((opt) => opt.value === id);
        return match ? match.label : serviceLabel(id);
      }),
    [selectedServices, serviceOptions]
  );

  const hasCustomInput = Boolean(
    company.trim() ||
      contactName.trim() ||
      contactPhone.trim() ||
      contactEmail.trim() ||
      selectedLabels.length ||
      description.trim()
  );

  const smart = useMemo(() => {
    const lines = [
      company.trim() ? `Perusahaan: ${company.trim()}` : hasCustomInput ? 'Status: Perorangan' : '',
      contactName.trim() ? `Nama: ${contactName.trim()}` : '',
      contactPhone.trim() ? `No. Telp / WhatsApp: ${contactPhone.trim()}` : '',
      contactEmail.trim() ? `Email: ${contactEmail.trim()}` : '',
      selectedLabels.length ? `Preferensi layanan: ${selectedLabels.join(', ')}` : '',
      description.trim() ? `Kebutuhan: ${description.trim()}` : '',
    ].filter(Boolean);
    const senderLabel = [company.trim(), contactName.trim()].filter(Boolean).join(' · ');
    return resolveSmartContact(selectedServices, description, {
      extraBody: lines.length ? lines.join('\n') : undefined,
      senderLabel: senderLabel || undefined,
    });
  }, [selectedServices, description, company, contactName, contactPhone, contactEmail, selectedLabels, hasCustomInput]);

  useEffect(() => {
    onServiceChange?.(smart.primaryServiceId);
  }, [smart.primaryServiceId, onServiceChange]);

  const toggleService = (value: string) => {
    setSelectedServices((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const recordInquiryInCms = async (channel: 'whatsapp' | 'email', routedTeam: string, routedGroupId: string, routingReason: string) => {
    if (!hasCustomInput) return;
    try {
      const response = await fetch('/api/inquiries.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          _hp: honeypot,
          company: company.trim(),
          picName: contactName.trim(),
          picPhone: contactPhone.trim(),
          picEmail: contactEmail.trim(),
          services: selectedLabels,
          description: description.trim(),
          routedGroupId,
          routedTeam,
          routingReason,
          channel,
          sourcePath: window.location.pathname,
        }),
      });
      if (response.ok) {
        const result = await response.json().catch(() => null);
        if (result?.recorded) {
          setSavedNotice('Data tercatat di sistem GAEKS.');
        }
      }
    } catch {}
  };

  const send = (channel: 'whatsapp' | 'email') => {
    const target = smart.resolved;
    if (channel === 'whatsapp') {
      if (!target.whatsappNumber) return;
      window.open(target.whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      if (!target.email) return;
      window.location.href = target.emailUrl;
    }
    measureContactClick(channel, smart.primaryServiceId);
    void recordInquiryInCms(
      channel,
      target.group?.name || 'Tim GAEKS',
      target.group?.id || 'general',
      smart.routingReason
    );
    setOpened(channel);
  };

  const sendRef = useRef(send);
  sendRef.current = send;

  useEffect(() => {
    onRoutingChange?.(smart, (ch) => sendRef.current(ch));
  }, [smart, onRoutingChange]);

  const fieldClass =
    'min-h-12 min-w-0 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-base text-[#12363a] placeholder:text-slate-500 transition-colors focus:border-[#0a5861] focus:outline-none focus:ring-2 focus:ring-[#0a5861]/20 sm:text-sm';
  const labelClass = 'flex items-center gap-1.5 text-sm font-semibold text-[#12363a]';
  const iconClass = 'pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0a5861]';

  return (
    <form
      id="quote-form"
      noValidate
      aria-labelledby={`${formId}-heading`}
      onSubmit={(event) => {
        event.preventDefault();
        send('whatsapp');
      }}
      className="quote-surface min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="rounded-t-2xl border-b border-slate-200 bg-[#f8fbfb] px-5 py-6 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0a5861]">Formulir Konsultasi Cepat</p>
        <h2 id={`${formId}-heading`} className="mt-2 font-display text-2xl font-bold tracking-tight text-[#012E34]">
          {copy.quoteOptionalHeading || 'Ceritakan kebutuhan pengiriman Anda'}
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-slate-600">
          {copy.quoteOptionalIntro ||
            'Isi data ringkas di bawah ini — pesan WhatsApp atau email dirangkai otomatis tanpa perlu mengetik ulang.'}
        </p>
      </div>

      <div className="space-y-5 p-5 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-company`} className={labelClass}>
              <span>Nama perusahaan</span>
              <span className="font-normal text-slate-500">(kosongkan jika perorangan)</span>
            </label>
            <div className="relative mt-1.5">
              <Building2 className={iconClass} aria-hidden="true" />
              <input
                id={`${formId}-company`}
                name="company"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="PT / CV / Usaha atau biarkan kosong"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-contactName`} className={labelClass}>
              <span>Nama lengkap</span>
            </label>
            <div className="relative mt-1.5">
              <User className={iconClass} aria-hidden="true" />
              <input
                id={`${formId}-contactName`}
                name="picName"
                autoComplete="name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nama lengkap Anda"
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-contactPhone`} className={labelClass}>
              <span>No. Telp / WhatsApp</span>
            </label>
            <div className="relative mt-1.5">
              <Phone className={iconClass} aria-hidden="true" />
              <input
                id={`${formId}-contactPhone`}
                name="picPhone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Contoh: +62 812-xxxx-xxxx"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-contactEmail`} className={labelClass}>
              <span>Email</span>
            </label>
            <div className="relative mt-1.5">
              <Mail className={iconClass} aria-hidden="true" />
              <input
                id={`${formId}-contactEmail`}
                name="picEmail"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="nama@perusahaan.com"
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        {/* Multi-select service preferences dropdown */}
        <div ref={dropdownRef}>
          <span id={`${formId}-services-label`} className={labelClass}>
            <span>Preferensi layanan</span>
            <span className="font-normal text-slate-500">(bisa pilih lebih dari satu)</span>
          </span>

          <div className="relative mt-1.5">
            <button
              type="button"
              aria-labelledby={`${formId}-services-label`}
              aria-expanded={dropdownOpen}
              aria-controls={`${formId}-services-list`}
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-left text-base text-[#12363a] transition-colors hover:border-[#0a5861] focus:border-[#0a5861] focus:outline-none focus:ring-2 focus:ring-[#0a5861]/20 sm:text-sm"
            >
              <Layers className={iconClass} aria-hidden="true" />
              <span className={selectedLabels.length ? 'font-medium text-[#012E34]' : 'text-slate-600'}>
                {selectedLabels.length
                  ? `${selectedLabels.length} layanan dipilih`
                  : 'Pilih satu atau lebih layanan yang dibutuhkan'}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {dropdownOpen && (
              <div
                id={`${formId}-services-list`}
                role="group"
                aria-labelledby={`${formId}-services-label`}
                className="absolute inset-x-0 top-full z-30 mt-1.5 max-h-72 space-y-1 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
              >
                {serviceOptions.map((opt) => {
                  const checked = selectedServices.includes(opt.value);
                  return (
                    <label
                      key={opt.value}
                      className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        checked ? 'bg-[#eef6f6] font-semibold text-[#012E34]' : 'text-[#12363a] hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleService(opt.value)}
                          className="h-4 w-4 rounded accent-[#012E34]"
                        />
                        <span>{opt.label}</span>
                      </span>
                      {checked && <Check className="h-4 w-4 text-[#0a5861]" aria-hidden="true" />}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {selectedServices.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {selectedServices.map((id) => {
                const label = serviceOptions.find((o) => o.value === id)?.label || serviceLabel(id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#b8d4d6] bg-[#eef6f6] px-2.5 py-1 text-xs font-semibold text-[#012E34]"
                  >
                    <span>{label}</span>
                    <button
                      type="button"
                      onClick={() => toggleService(id)}
                      aria-label={`Hapus ${label}`}
                      className="inline-flex h-5 w-5 items-center justify-center rounded text-[#0a5861] hover:bg-[#012E34] hover:text-white"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-description`} className={labelClass}>
            <span>Apa kebutuhanmu?</span>
            <span className="font-normal text-slate-500">(deskripsi singkat)</span>
          </label>
          <div className="relative mt-1.5">
            <FileText className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#0a5861]" aria-hidden="true" />
            <textarea
              id={`${formId}-description`}
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Kirim 1x40ft FCL dari Shanghai ke Tanjung Priok + pengurusan PIB, atau pengiriman udara 200 kg dari Singapura."
              className="min-h-28 min-w-0 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3.5 py-2.5 text-base text-[#12363a] placeholder:text-slate-500 transition-colors focus:border-[#0a5861] focus:outline-none focus:ring-2 focus:ring-[#0a5861]/20 sm:text-sm"
            />
          </div>
        </div>

        {/* Honeypot for spam bots */}
        <label className="sr-only" aria-hidden="true">
          Website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      {/* Smart Routing Banner & Actions */}
      <div className="rounded-b-2xl border-t border-slate-200 bg-[#f8fbfb] px-5 py-5 sm:px-8">
        <div
          aria-live="polite"
          className="mb-4 flex items-start gap-3 rounded-xl border border-[#b9d9dc] bg-[#edf6f7] p-3.5 text-sm text-[#012E34]"
        >
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#0a5861]" aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-bold">
              Diarahkan ke: {smart.resolved.group.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-700">{smart.routingReason}</p>
            {hasCustomInput && (
              <p className="mt-1.5 text-xs font-medium text-[#0a5861]">
                Detail formulir sudah dirangkai ke pesan WhatsApp &amp; email — langsung klik untuk membuka dan menyimpan ke sistem GAEKS.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="button-primary min-h-12 w-full sm:w-auto">
            <WhatsAppIcon size={17} />
            <span>{smart.resolved.whatsappLabel}</span>
          </button>
          <button
            type="button"
            onClick={() => send('email')}
            className="button-secondary min-h-12 w-full sm:w-auto"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>{smart.resolved.emailLabel}</span>
          </button>
        </div>

        {showEmailCopy && (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>
              Email tim: <strong className="select-all text-[#12363a]">{smart.resolved.email}</strong>
            </span>
            <CopyEmailButton
              email={smart.resolved.email}
              label={copy.serviceCopyEmailLabel}
              copiedLabel={copy.serviceCopiedEmailLabel}
              failedLabel={copy.serviceCopyFailedLabel}
              tone="light"
            />
          </div>
        )}

        <p role="status" aria-live="polite" className="mt-3 text-xs leading-5 text-slate-600">
          {opened === 'whatsapp'
            ? `WhatsApp dibuka untuk ${smart.resolved.group.name}${savedNotice ? ` · ${savedNotice}` : ''}`
            : opened === 'email'
              ? `Aplikasi email dibuka untuk ${smart.resolved.email}${savedNotice ? ` · ${savedNotice}` : ''}`
              : 'Isi formulir seperlunya atau langsung klik Chat WhatsApp / Kirim Email — data otomatis terlampir dan tersimpan.'}
        </p>
      </div>
    </form>
  );
};
