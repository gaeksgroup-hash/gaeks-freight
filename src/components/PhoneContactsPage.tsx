import React from 'react';
import { ArrowUpRight, ChevronRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { GAEKS_UPDATE_EVENT, getSiteCopy, getStoredBranding, getStoredServices } from '../utils/adminStorage';
import { contactPhoneTeams, phoneTeamTitle } from '../utils/contactDirectory';
import { measureContactClick } from '../utils/quoteFlow';
import { pagePaths } from '../utils/routes';

export function PhoneContactsPage() {
  const [, refresh] = React.useReducer(value => value + 1, 0);
  React.useEffect(() => {
    window.addEventListener(GAEKS_UPDATE_EVENT, refresh);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, refresh);
  }, []);
  const copy = getSiteCopy();
  const teams = contactPhoneTeams(getStoredBranding().contactGroups || []);
  const services = getStoredServices();
  return <div className="phone-page">
    <header className="phone-intro">
      <div className="page-shell">
        <nav className="phone-breadcrumb" aria-label={copy.phoneBreadcrumbLabel}><ol>
          <li><a href="/">{copy.phoneHomeLabel}</a></li>
          <li><ChevronRight size={14} aria-hidden="true" /><a href={pagePaths.contact}>{copy.phoneContactLabel}</a></li>
          <li><ChevronRight size={14} aria-hidden="true" /><a href={pagePaths.phones} aria-current="page">{copy.phonePageLabel}</a></li>
        </ol></nav>
        <div className="phone-intro-grid"><div><p className="phone-eyebrow">{copy.phoneEyebrow}</p><h1>{copy.phoneHeading}</h1></div><p className="phone-intro-copy">{copy.phoneIntro}</p></div>
      </div>
    </header>
    <div className="page-shell phone-layout">
      <section className="phone-directory-sheet" aria-label={copy.phoneDirectoryLabel}>
        {teams.map(({ number, members }, index) => {
          const first = members[0];
          const ids = [...new Set(members.flatMap(group => group.serviceIds))];
          const scope = services.filter(service => ids.includes(service.id));
          const emails = [...new Set(members.map(group => group.email))];
          const title = phoneTeamTitle(members, copy);
          const message = copy.phoneMessage + ' ' + title + '.';
          return <article className="phone-team" key={number}>
            <div className="phone-team-scope"><span className="phone-team-index" aria-hidden="true">0{index + 1} / 0{teams.length}</span><h2>{title}</h2>{scope.length > 0 && <ul>{scope.map(service => <li key={service.id}>{service.title}</li>)}</ul>}</div>
            <div className="phone-team-actions">
              <a className="phone-number" href={'tel:+' + number}><Phone size={19} aria-hidden="true" /><span>{first.whatsappDisplay}</span></a>
              <div className="phone-action-pair"><a className="phone-whatsapp" href={'https://wa.me/' + number + '?text=' + encodeURIComponent(message)} onClick={() => measureContactClick('whatsapp', ids[0] || 'general')} aria-label={copy.phoneWhatsapp + ': ' + title}><MessageCircle size={18} aria-hidden="true" />{copy.phoneWhatsapp}<ArrowUpRight size={17} aria-hidden="true" /></a><a className="phone-call" href={'tel:+' + number} aria-label={copy.phoneCall + ': ' + title}>{copy.phoneCall}</a></div>
              {emails.map(email => <a key={email} className="phone-team-email" href={'mailto:' + email} onClick={() => measureContactClick('email', ids[0] || 'general')}><Mail size={16} aria-hidden="true" /><span>{email}</span></a>)}
            </div>
          </article>;
        })}
        {!teams.length && <p className="phone-empty">{copy.phoneEmpty}</p>}
      </section>
      <aside className="phone-preparation"><p className="phone-eyebrow">{copy.phonePreparationLabel}</p><h2>{copy.phonePreparationHeading}</h2><ul><li>{copy.phonePrepareRoute}</li><li>{copy.phonePrepareCargo}</li><li>{copy.phonePrepareTiming}</li></ul><p>{copy.phoneFormIntro}</p><a href={pagePaths.contact}>{copy.phoneFormCta}<ArrowUpRight size={18} aria-hidden="true" /></a></aside>
    </div>
  </div>;
}
