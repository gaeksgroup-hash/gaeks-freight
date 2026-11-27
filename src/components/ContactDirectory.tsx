import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ContactGroup, getSiteCopy } from '../utils/adminStorage';
import { measureContactClick, whatsappDigits } from '../utils/quoteFlow';

export function ContactDirectory({ groups }: { groups: ContactGroup[] }) {
  return <details className="contact-directory" id="kontak-layanan">
    <summary><ChevronRight size={20} aria-hidden="true" /><span>{getSiteCopy().contactDirectory}</span></summary>
    <div className="contact-directory-list">{groups.map(group => <article key={group.id}>
      <h3>{group.name}</h3>
      <a href={'https://wa.me/' + whatsappDigits(group.whatsappNumber) + '?text=' + encodeURIComponent('Halo GAEKS, konsultasi ' + group.name)} onClick={() => measureContactClick('whatsapp', group.serviceIds[0] || 'general')}>{group.whatsappDisplay}</a>
      <a href={'mailto:' + group.email + '?subject=' + encodeURIComponent(group.name)} onClick={() => measureContactClick('email', group.serviceIds[0] || 'general')}>{group.email}</a>
    </article>)}</div>
  </details>;
}
