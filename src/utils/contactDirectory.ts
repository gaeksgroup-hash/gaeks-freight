import { ContactGroup } from './adminStorage';
import { whatsappDigits } from './quoteFlow';

export function orderedContactGroups(groups: ContactGroup[]) {
  const priority = ['general', 'fcl', 'ppjk', 'undername', 'air'];
  return [...groups].sort((a, b) => {
    const rank = (id: string) => priority.includes(id) ? priority.indexOf(id) : priority.length;
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
  return orderedContactGroups(groups).filter(group => {
    const email = group.email.trim().toLowerCase();
    if (!email || seen.has(email)) return false;
    seen.add(email);
    return true;
  });
}

export function phoneTeamTitle(members: ContactGroup[], copy: Record<string, string>) {
  if (members.length === 1 && members[0].id === 'general') return copy.phoneGeneralTeam;
  if (members.length > 1 && members.every(group => ['fcl', 'ppjk', 'undername'].includes(group.id))) return copy.phoneTradeTeam;
  return members.map(group => group.name).join(' · ');
}
