import React from 'react';

export default function SupportThanks({ result, t }) {
  if (!result) return null;

  return (
    <section className="border-2 border-record-ink bg-record-bone p-4 sm:p-5">
      <p className="text-[10px] font-black uppercase tracking-wider text-record-signal">
        {result.recorded ? t.thanks_tag : t.thanks_open}
      </p>
      <h2 className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-record-ink">{t.thanks_heading}</h2>
      <p className="mt-2 text-[12px] leading-relaxed text-record-muted">
        {!result.recorded ? (
          t.thanks_unconfirmed
        ) : result.visibility === 'public' ? (
          <>
            <span className="font-black text-record-ink">{result.display_name}</span> {t.thanks_public_tail}
          </>
        ) : result.visibility === 'private' ? (
          t.thanks_private
        ) : (
          t.thanks_anon
        )}
      </p>
      {result.recorded && (
        <p className="mt-2 text-[12px] leading-relaxed text-record-muted">{t.thanks_free}</p>
      )}
    </section>
  );
}