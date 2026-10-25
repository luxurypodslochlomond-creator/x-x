import React from 'react';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';

export default function EntryLanguageStatus({ translation }) {
  const { retryLanguage } = useSiteLanguage();
  const tr = translation;
  return (
    <>
      {tr.translating && <p className="text-[10px] font-mono text-record-muted mt-4">Translating into your language…</p>}
      {tr.error && (
        <p data-no-translate role="status" className="text-[11px] font-mono text-record-muted mt-4">
          Some entry text could not be translated.{' '}
          <button type="button" onClick={retryLanguage} className="underline underline-offset-2">Try again</button>
        </p>
      )}
      {tr.isTranslated && (
        <button type="button" onClick={() => tr.setShowOriginal(!tr.showOriginal)} className="mt-4 text-[9px] font-mono font-bold uppercase tracking-widest text-record-ink border border-record-ink px-2 py-1">
          {tr.showOriginal ? 'Show translation' : 'View original (English)'}
        </button>
      )}
    </>
  );
}