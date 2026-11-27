import { ContactGroup } from './adminStorage';
import { ServiceDetail } from '../types/freight';
import { whatsappDigits } from './quoteFlow';

export function orderedContactGroups(groups: ContactGroup[]) {
  const priority = ['ppjk', 'fcl', 'undername', 'air', 'general'];
  return [...groups].sort((a, b) => {
    const rank = (id: string) => (priority.includes(id) ? priority.indexOf(id) : priority.length);
    return rank(a.id) - rank(b.id);
  });
}

export function contactPhoneTeams(groups: ContactGroup[]) {
  const teams = new Map<string, ContactGroup[]>();
  for (const group of orderedContactGroups(groups)) {
    const number = whatsappDigits(group.whatsappNumber);
    if (number) teams.set(number, [...(teams.get(number) || []), group]);
  }
  return [...teams].map(([number, members]) => ({ number, members }));
}

export function footerEmails(groups: ContactGroup[]) {
  const seen = new Set<string>();
  return orderedContactGroups(groups).filter((group) => {
    const email = group.email.trim().toLowerCase();
    if (!email || seen.has(email)) return false;
    seen.add(email);
    return true;
  });
}

export function phoneTeamTitle(members: ContactGroup[], copy: Record<string, string>) {
  if (members.length === 1 && members[0].id === 'general') return copy.phoneGeneralTeam || members[0].name;
  if (members.length > 1 && members.every((group) => ['fcl', 'ppjk', 'undername'].includes(group.id))) {
    return copy.phoneTradeTeam || 'Kepabeanan, FCL & Undername';
  }
  return members.map((group) => group.name).join(' · ');
}

export interface CustomerContactTeam {
  key: string;
  title: string;
  description: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  primaryServiceId: string;
  serviceNames: string[];
  whatsappUrl: string;
  emailUrl: string;
}

export function customerContactTeams(
  groups: ContactGroup[],
  services: ServiceDetail[],
  copy: Record<string, string>
): CustomerContactTeam[] {
  return contactPhoneTeams(groups).map(({ number, members }) => {
    const primary = members[0];
    const title = phoneTeamTitle(members, copy);
    const serviceIds = [...new Set(members.flatMap((group) => group.serviceIds))];
    const matchedServices = services.filter((service) => serviceIds.includes(service.id));
    const serviceNames = matchedServices.map((service) => service.ctaServiceName?.trim() || service.title);
    const isGeneral = members.some((group) => group.id === 'general');
    const description = isGeneral
      ? copy.phoneGeneralNote || 'Project Cargo, pengiriman domestik, gudang & PBM, LCL, dan pertanyaan umum.'
      : serviceNames.join(', ');
    const message = `${copy.phoneMessage || 'Halo tim GAEKS, saya ingin konsultasi tentang'} ${title}.`;
    const subject = `Konsultasi ${title}`;
    return {
      key: `${number}-${members.map((m) => m.id).join('-')}`,
      title,
      description,
      whatsappNumber: number,
      whatsappDisplay: primary.whatsappDisplay || `+${number}`,
      email: primary.email,
      primaryServiceId: serviceIds[0] || 'general',
      serviceNames,
      whatsappUrl: `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      emailUrl: `mailto:${primary.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
    };
  });
}
