import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SocialLink, SocialPlatform } from '../utils/adminStorage';

const platformLabels: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  x: 'X',
  tiktok: 'TikTok',
};

export const SocialIcon: React.FC<{ platform: SocialPlatform; size?: number }> = ({ platform, size = 17 }) => {
  if (platform === 'instagram') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.3" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (platform === 'facebook') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.8 21v-8.1h2.7l.4-3.1h-3.1V7.8c0-.9.3-1.5 1.6-1.5H17V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.6v3.1h2.7V21h3.5Z" />
      </svg>
    );
  }
  if (platform === 'linkedin') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.9 8.5A2.1 2.1 0 1 1 6.9 4.3a2.1 2.1 0 0 1 0 4.2ZM5.1 10.1h3.6V20H5.1v-9.9Zm5.9 0h3.4v1.4h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.4V20h-3.6v-4.4c0-1.1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V20H11v-9.9Z" />
      </svg>
    );
  }
  if (platform === 'youtube') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.4a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9C2 9.1 2 12 2 12s0 2.9.4 4.6a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9C22 14.9 22 12 22 12s0-2.9-.4-4.6ZM10 15.1V8.9L15.4 12 10 15.1Z" />
      </svg>
    );
  }
  if (platform === 'tiktok') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.6 5.8a4.7 4.7 0 0 1-1.1-2.8h-3v12.1a2.5 2.5 0 1 1-1.8-2.4V9.6a5.6 5.6 0 1 0 4.8 5.5V9.1a7.6 7.6 0 0 0 4.4 1.4V7.5a4.7 4.7 0 0 1-3.3-1.7Z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 3.5h2.9l-6.3 7.2 7.4 9.8h-5.8l-4.5-5.9-5.2 5.9H3.8l6.7-7.7L3.4 3.5h5.9l4.1 5.4 4.8-5.4Zm-1 15.3h1.6L8.5 5.1H6.8l10.4 13.7Z" />
    </svg>
  );
};

export const SocialLinks: React.FC<{ links: SocialLink[]; showLabels?: boolean; tone?: 'light' | 'dark' }> = ({
  links,
  showLabels = false,
  tone = 'dark',
}) => {
  const validLinks = links.filter((link) => link.url && /^https?:\/\//i.test(link.url));
  if (validLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2.5" aria-label="Media sosial GAEKS">
      {validLinks.map((link) => {
        const platform = link.platform || 'instagram';
        const label = platformLabels[platform];
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buka ${label} GAEKS`}
            title={label}
            className={`btn-press inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 text-xs font-medium tracking-[0.01em] transition-colors ${
              tone === 'light'
                ? 'border-slate-300 bg-white text-[#12363a] hover:border-cyan-700 hover:bg-cyan-50/60 hover:text-cyan-900'
                : 'border-white/15 bg-transparent text-[#d5e5e5] hover:border-[#8de8ef]/55 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <SocialIcon platform={platform} size={16} />
            {showLabels && <span>{label}</span>}
            {showLabels && <ArrowUpRight size={13} className="opacity-70" aria-hidden="true" />}
          </a>
        );
      })}
    </div>
  );
};
