import React from 'react';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { ContactGroup, getSiteCopy } from '../utils/adminStorage';
import { pagePaths } from '../utils/routes';

export function ContactDirectory({ groups }: { groups: ContactGroup[] }) {
  const copy = getSiteCopy();
  return <aside className="contact-directory" id="kontak-layanan">
    <div className="contact-directory-mark"><PhoneCall size={25} aria-hidden="true" /></div>
    <div><p className="contact-directory-kicker">{copy.phoneEyebrow}</p><h2>{copy.contactDirectory}</h2><p>{copy.phoneIntro}</p></div>
    <a href={pagePaths.phones}>{copy.footerPhoneDirectory}<ArrowUpRight size={18} aria-hidden="true" /></a>
  </aside>;
}
