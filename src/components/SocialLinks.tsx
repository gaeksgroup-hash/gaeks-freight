import React from 'react';
import { Facebook, Instagram, Linkedin, Music2, Youtube } from 'lucide-react';
import { SocialLink, SocialPlatform } from '../utils/adminStorage';

const platformLabels: Record<SocialPlatform, string> = {
  instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn', youtube: 'YouTube', x: 'X', tiktok: 'TikTok',
};

const SocialIcon: React.FC<{ platform: SocialPlatform }> = ({ platform }) => {
  const iconClass = 'h-4 w-4';
  if (platform === 'instagram') return <Instagram className={iconClass} aria-hidden="true" />;
  if (platform === 'facebook') return <Facebook className={iconClass} aria-hidden="true" />;
  if (platform === 'linkedin') return <Linkedin className={iconClass} aria-hidden="true" />;
  if (platform === 'youtube') return <Youtube className={iconClass} aria-hidden="true" />;
  if (platform === 'tiktok') return <Music2 className={iconClass} aria-hidden="true" />;
  return <span aria-hidden="true" className="font-display text-sm font-bold leading-none">X</span>;
};

export const SocialLinks: React.FC<{ links: SocialLink[]; showLabels?: boolean; tone?: 'light' | 'dark' }> = ({ links, showLabels = false, tone = 'dark' }) => {
  const validLinks = links.filter((link) => link.url && /^https?:\/\//i.test(link.url));
  if (validLinks.length === 0) return null;

  return <div className="flex flex-wrap gap-2" aria-label="Media sosial GAEKS">{validLinks.map((link) => {
    const platform = link.platform || 'instagram';
    const label = platformLabels[platform];
    return <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Buka ${label} GAEKS`} title={label} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-3 text-sm font-semibold transition-colors ${tone === 'light' ? 'border-slate-300 text-[#12363a] hover:border-cyan-700 hover:text-cyan-800' : 'border-white/20 text-slate-300 hover:border-cyan-300 hover:text-cyan-200'}`}><SocialIcon platform={platform} />{showLabels && <span>{label}</span>}</a>;
  })}</div>;
};
