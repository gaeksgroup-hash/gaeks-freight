import React from 'react';
import { ArrowUpRight, Check, CheckCircle2, ChevronRight, Mail, Phone } from 'lucide-react';
import { GAEKS_UPDATE_EVENT, getSiteCopy, getStoredBranding, getStoredServices } from '../utils/adminStorage';
import { contactPhoneTeams, phoneTeamTitle } from '../utils/contactDirectory';
import { measureContactClick } from '../utils/quoteFlow';
import { pagePaths } from '../utils/routes';
import { CopyEmailButton, WhatsAppIcon } from './ContactActions';

export function PhoneContactsPage() {
  const [, refresh] = React.useReducer((value) => value + 1, 0);
  React.useEffect(() => {
    window.addEventListener(GAEKS_UPDATE_EVENT, refresh);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, refresh);
  }, []);

  const copy = getSiteCopy();
  const teams = contactPhoneTeams(getStoredBranding().contactGroups || []);
  const services = getStoredServices();

  return (
    <div className="phone-page">
      <header className="phone-intro">
        <div className="phone-intro-visual" aria-hidden="true">
          <img src="/tracking/approved-maritime-illustration.webp" width="398" height="233" alt="" decoding="async" />
        </div>
        <div className="page-shell">
          <nav className="phone-breadcrumb" aria-label={copy.phoneBreadcrumbLabel}>
            <ol>
              <li>
                <a href="/">{copy.phoneHomeLabel}</a>
              </li>
              <li>
                <ChevronRight size={14} aria-hidden="true" />
                <a href={pagePaths.contact}>{copy.phoneContactLabel}</a>
              </li>
              <li>
                <ChevronRight size={14} aria-hidden="true" />
                <a href={pagePaths.phones} aria-current="page">
                  {copy.phonePageLabel}
                </a>
              </li>
            </ol>
          </nav>
          <div className="phone-intro-grid">
            <div>
              <p className="phone-eyebrow">{copy.phoneEyebrow}</p>
              <h1>{copy.phoneHeading}</h1>
            </div>
            <p className="phone-intro-copy">{copy.phoneIntro}</p>
          </div>
        </div>
      </header>

      <div className="page-shell phone-layout">
        <section className="phone-cards-grid" aria-label={copy.phoneDirectoryLabel}>
          {teams.map(({ number, members }, index) => {
            const first = members[0];
            const ids = [...new Set(members.flatMap((group) => group.serviceIds))];
            const scope = services.filter((service) => ids.includes(service.id));
            const emails = [...new Set(members.map((group) => group.email))];
            const title = phoneTeamTitle(members, copy);
            const message = `${copy.phoneMessage} ${title}.`;
            const subject = `Konsultasi ${title}`;
            const primaryService = ids[0] || 'general';

            return (
              <article className="phone-team phone-team-card" key={number}>
                <div className="phone-team-scope">
                  <span className="phone-team-badge">
                    0{index + 1} / 0{teams.length}
                  </span>
                  <h2>{title}</h2>
                  {members.some((group) => group.id === 'general') && <p className="phone-team-note">{copy.phoneGeneralNote}</p>}
                  {scope.length > 0 && (
                    <ul className="phone-scope-checklist">
                      {scope.map((service) => (
                        <li key={service.id}>
                          <Check size={15} className="mt-1 shrink-0 text-[#0b6873]" aria-hidden="true" />
                          <span>{service.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="phone-team-actions phone-team-card-footer">
                  <a className="phone-number" href={'tel:+' + number}>
                    <Phone size={18} aria-hidden="true" />
                    <span>{first.whatsappDisplay}</span>
                  </a>

                  <div className="phone-action-pair">
                    <a
                      className="phone-whatsapp"
                      href={'https://wa.me/' + number + '?text=' + encodeURIComponent(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => measureContactClick('whatsapp', primaryService)}
                      aria-label={copy.phoneWhatsapp + ': ' + title}
                    >
                      <WhatsAppIcon size={17} />
                      <span>{copy.phoneWhatsapp}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    <a className="phone-call" href={'tel:+' + number} aria-label={copy.phoneCall + ': ' + title}>
                      <Phone size={15} aria-hidden="true" />
                      <span>{copy.phoneCall}</span>
                    </a>
                  </div>

                  {emails.map((email) => (
                    <div key={email} className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-3">
                      <a
                        className="phone-team-email"
                        href={'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message)}
                        onClick={() => measureContactClick('email', primaryService)}
                      >
                        <Mail size={15} aria-hidden="true" />
                        <span>{email}</span>
                      </a>
                      <CopyEmailButton
                        email={email}
                        label={copy.serviceCopyEmailLabel}
                        copiedLabel={copy.serviceCopiedEmailLabel}
                        failedLabel={copy.serviceCopyFailedLabel}
                        tone="light"
                      />
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
          {!teams.length && <p className="phone-empty">{copy.phoneEmpty}</p>}
        </section>

        <aside className="phone-preparation phone-prep-card">
          <div>
            <p className="phone-eyebrow">{copy.phonePreparationLabel}</p>
            <h2>{copy.phonePreparationHeading}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#496269]">{copy.phoneFormIntro}</p>
            <a href={pagePaths.contact} className="phone-prep-cta">
              <span>{copy.phoneFormCta}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <ul className="phone-prep-checklist">
            {[copy.phonePrepareRoute, copy.phonePrepareCargo, copy.phonePrepareTiming].map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#0b6873]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
