import React from 'react';

const protectedTerms = /(\((?:Less than Container Load|Full Container Load)\))/gi;
const isProtectedTerm = /^\((?:Less than Container Load|Full Container Load)\)$/i;

export const ServiceTitle: React.FC<{ title: string }> = ({ title }) => (
  <>
    {title.split(protectedTerms).filter(Boolean).map((part, index) =>
      isProtectedTerm.test(part)
        ? <span key={`${part}-${index}`} className="notranslate" translate="no">{part}</span>
        : <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
    )}
  </>
);
