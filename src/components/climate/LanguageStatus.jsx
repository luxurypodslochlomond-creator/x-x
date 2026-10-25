import React from 'react';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';

export default function LanguageStatus() {
  const { chosen, translationError, retryLanguage } = useSiteLanguage();
  if (!translationError && chosen !== 'chr') return null;
  return (
    <div data-no-translate className="border-t border-record-signal/20 px-5 py-2 text-[11px] font-mono leading-relaxed text-record-paper/80">
      {translationError ? (
        <div role="status" className="flex items-center justify-between gap-3">
          <span>{translationError}</span>
          <button type="button" onClick={retryLanguage} className="shrink-0 border border-record-signal px-2 py-1 text-record-paper focus-visible:outline focus-visible:outline-record-signal">Try again</button>
        </div>
      ) : <p>Cherokee is machine-translated, not checked by a speaker.</p>}
    </div>
  );
}