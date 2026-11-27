import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, FileDown, Printer } from 'lucide-react';
import { LegalBlock, LegalDocumentData, PRIVACY_TERMS_DOCUMENT, TERMS_OF_USE_DOCUMENT } from '../data/legalDocuments';

export interface LegalDocumentPageProps {
  document?: LegalDocumentData;
  documentType?: 'terms' | 'privacy';
  onNavigate?: (page: string) => void;
}

const PROTECTED_TERMS_REGEX = /(PT Global Andalan Ekspress|GAEKS)/g;

function renderLegalText(text: string): React.ReactNode {
  const parts = text.split(PROTECTED_TERMS_REGEX);
  return parts.map((part, index) => {
    if (part === 'PT Global Andalan Ekspress' || part === 'GAEKS') {
      return (
        <span key={index} className="notranslate" translate="no">
          {part}
        </span>
      );
    }
    return part;
  });
}

function renderBlocks(blocks: LegalBlock[]): React.ReactNode {
  return blocks.map((block, index) => {
    if (block.type === 'paragraph') {
      return <p key={index}>{renderLegalText(block.text)}</p>;
    }
    if (block.type === 'list') {
      return (
        <ul key={index} className="legal-list">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderLegalText(item)}</li>
          ))}
        </ul>
      );
    }
    const mailtoHref = block.emailSubject
      ? `mailto:${block.email}?subject=${encodeURIComponent(block.emailSubject)}`
      : `mailto:${block.email}`;
    return (
      <div key={index} className="legal-contact-card">
        <p className="legal-contact-company">
          <span className="notranslate" translate="no">
            {block.company}
          </span>
        </p>
        <p className="legal-contact-division">{block.division}</p>
        <dl className="legal-contact-details">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={mailtoHref} className="notranslate" translate="no">
                {block.email}
              </a>
            </dd>
          </div>
          {block.emailSubject && (
            <div>
              <dt>Email subject</dt>
              <dd className="notranslate" translate="no">
                {block.emailSubject}
              </dd>
            </div>
          )}
          <div>
            <dt>Website</dt>
            <dd>
              <a href={block.website} target="_blank" rel="noopener noreferrer" className="notranslate" translate="no">
                {block.website}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    );
  });
}

export const LegalDocumentPage: React.FC<LegalDocumentPageProps> = ({ document: documentProp, documentType = 'terms', onNavigate }) => {
  const doc = documentProp ?? (documentType === 'privacy' ? PRIVACY_TERMS_DOCUMENT : TERMS_OF_USE_DOCUMENT);
  const [activeId, setActiveId] = useState<string>(doc.articles[0]?.id || 'pasal-1');
  const tocNavRef = useRef<HTMLElement>(null);
  const mobileTocRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    setActiveId(doc.articles[0]?.id || 'pasal-1');
  }, [doc.key, doc.articles]);

  useEffect(() => {
    const supportsScrollTargetGroup =
      typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('scroll-target-group: auto');

    if (supportsScrollTargetGroup) {
      const syncAriaCurrent = () => {
        const nav = tocNavRef.current;
        if (!nav) return;
        const currentLink = nav.querySelector('a:target-current');
        if (currentLink) {
          const href = currentLink.getAttribute('href');
          if (href?.startsWith('#')) {
            setActiveId(href.slice(1));
          }
        }
      };
      syncAriaCurrent();
      window.addEventListener('scrollend', syncAriaCurrent, { passive: true });
      return () => window.removeEventListener('scrollend', syncAriaCurrent);
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('.legal-article[id]'));
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [doc.key]);

  const handleNavClick = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      onNavigate(page);
    }
  };

  const handleAnchorClick = (id: string) => {
    setActiveId(id);
    if (mobileTocRef.current) {
      mobileTocRef.current.removeAttribute('open');
    }
  };

  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="page-shell">
          <nav className="legal-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/" onClick={(e) => handleNavClick('home', e)}>
                  Home
                </a>
              </li>
              <li>
                <ChevronRight size={14} aria-hidden="true" />
                <span aria-current="page">{doc.pageTitle}</span>
              </li>
            </ol>
          </nav>

          <div className="legal-header-grid">
            <div className="legal-title-group">
              <p className="legal-subtitle">{doc.subtitle}</p>
              <h1>{doc.pageTitle}</h1>
              <dl className="legal-meta">
                <div>
                  <dt>Entity</dt>
                  <dd className="notranslate" translate="no">
                    {doc.entityName}
                  </dd>
                </div>
                <div>
                  <dt>Effective Date</dt>
                  <dd className="notranslate" translate="no">
                    {doc.effectiveDate}
                  </dd>
                </div>
                <div>
                  <dt>Document Version</dt>
                  <dd className="notranslate" translate="no">
                    {doc.version}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="legal-actions">
              <a
                href={doc.pdfUrl}
                download={doc.pdfFileName}
                className="legal-btn-primary"
              >
                <FileDown size={18} aria-hidden="true" />
                <span>Download PDF (ID / EN)</span>
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="legal-btn-secondary"
              >
                <Printer size={18} aria-hidden="true" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="page-shell legal-body">
        <details ref={mobileTocRef} className="legal-mobile-toc">
          <summary>
            <span>Table of Contents ({doc.articles.length} Articles)</span>
            <ChevronDown size={18} aria-hidden="true" className="legal-mobile-toc-chevron" />
          </summary>
          <nav aria-label="Table of Contents">
            <ol>
              {doc.articles.map((article) => (
                <li key={article.id}>
                  <a
                    href={`#${article.id}`}
                    aria-current={activeId === article.id ? 'true' : undefined}
                    onClick={() => handleAnchorClick(article.id)}
                  >
                    <span className="legal-toc-num notranslate" translate="no">
                      {article.number}.
                    </span>
                    <span>{article.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </details>

        <div className="legal-layout">
          <aside className="legal-sidebar" aria-label="Document navigation">
            <p className="legal-toc-label">Table of Contents</p>
            <nav ref={tocNavRef} className="legal-toc" aria-label="Table of Contents">
              <ol>
                {doc.articles.map((article) => {
                  const isActive = activeId === article.id;
                  return (
                    <li key={article.id}>
                      <a
                        href={`#${article.id}`}
                        className={isActive ? 'target-current' : undefined}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={() => handleAnchorClick(article.id)}
                      >
                        <span className="legal-toc-num notranslate" translate="no">
                          {article.number}.
                        </span>
                        <span>{article.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <article className="legal-document">
            <div className="legal-document-sheet">
              {doc.articles.map((article) => (
                <section key={article.id} id={article.id} tabIndex={-1} className="legal-article">
                  <h2>
                    <span className="legal-article-num notranslate" translate="no">
                      {article.number}.
                    </span>{' '}
                    {article.title}
                  </h2>

                  {article.blocks && renderBlocks(article.blocks)}

                  {article.subsections?.map((sub) => (
                    <div key={sub.id} id={sub.id} className="legal-subsection">
                      <h3>
                        <span className="notranslate" translate="no">
                          {sub.number}
                        </span>{' '}
                        {sub.title}
                      </h3>
                      {renderBlocks(sub.blocks)}
                    </div>
                  ))}
                </section>
              ))}

              <footer className="legal-document-end">
                <div className="legal-end-meta">
                  <p className="legal-end-entity notranslate" translate="no">
                    {doc.entityName}
                  </p>
                  <p className="legal-end-version">
                    Effective Date:{' '}
                    <span className="notranslate" translate="no">
                      {doc.effectiveDate}
                    </span>{' '}
                    · Document Version:{' '}
                    <span className="notranslate" translate="no">
                      {doc.version}
                    </span>
                  </p>
                </div>

                <a
                  href={doc.siblingRoute}
                  onClick={(e) => handleNavClick(doc.siblingPage, e)}
                  className="legal-sibling-link"
                >
                  <span>Read {doc.siblingLabel}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
