import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const WhatsAppIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.94.55 3.82 1.6 5.44L2 22l4.72-1.58A9.93 9.93 0 0 0 12.04 22c5.52 0 10-4.48 10-10S17.56 2 12.04 2Zm5.83 14.12c-.25.7-1.45 1.34-2.01 1.42-.52.08-1.18.11-1.91-.12-.44-.14-1-.33-1.73-.65-3.04-1.31-5.02-4.38-5.17-4.58-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.86 2.08.93 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.78 1.29 1.68 2.09 1.15 1.02 2.13 1.34 2.43 1.49.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.23.58.35.07.13.07.73-.18 1.43Z" />
  </svg>
);

function legacyCopyText(text: string): boolean {
  const previousFocus = document.activeElement as HTMLElement | null;
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.append(field);
  field.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export const CopyEmailButton: React.FC<{
  email: string;
  label?: string;
  copiedLabel?: string;
  failedLabel?: string;
  tone?: 'dark' | 'light';
  className?: string;
}> = ({
  email,
  label = 'Salin email',
  copiedLabel = 'Tersalin',
  failedLabel = 'Gagal salin',
  tone = 'light',
  className = '',
}) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timerRef = useRef<number | null>(null);
  const lastAnnouncementRef = useRef('');

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const handleCopy = async () => {
    if (!email) return;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = legacyCopyText(email);
    }
    setStatus(ok ? 'copied' : 'failed');
    timerRef.current = window.setTimeout(() => setStatus('idle'), 2400);
  };

  let announcement = status === 'copied' ? copiedLabel : status === 'failed' ? failedLabel : '';
  if (announcement && announcement === lastAnnouncementRef.current) {
    announcement += '\u00A0';
  }
  if (announcement) lastAnnouncementRef.current = announcement;

  const toneClass =
    tone === 'dark'
      ? 'border-white/25 bg-white/10 text-[#e1eceb] hover:border-cyan-200 hover:bg-white/15 hover:text-white'
      : 'border-slate-300 bg-white text-[#12363a] hover:border-cyan-700 hover:bg-cyan-50';

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => void handleCopy()}
        aria-label={`${label} ${email}`}
        data-copied={status === 'copied' ? 'true' : undefined}
        data-failed={status === 'failed' ? 'true' : undefined}
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${toneClass}`}
      >
        {status === 'copied' ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        <span>{status === 'copied' ? copiedLabel : status === 'failed' ? failedLabel : label}</span>
      </button>
      <span role="status" className={`text-xs font-semibold ${tone === 'dark' ? 'text-cyan-200' : 'text-cyan-800'}`}>
        {announcement}
      </span>
    </span>
  );
};
