import React from 'react';

export default function SupportThanks({ result }) {
  if (!result) return null;

  const line = !result.recorded
    ? 'We could not confirm that gift just yet. If Stripe has emailed you a receipt, the gift is real — the keepers will see it.'
    : result.visibility === 'public'
    ? `${result.display_name || 'Your name'} now stands on the wall.`
    : result.visibility === 'private'
    ? 'Your name is with the keepers, and nowhere else.'
    : 'Nothing about you was written down — no name, no record. Only the gift.';

  return (
    <section className="border-2 border-record-ink bg-record-bone p-4 sm:p-5">
      <p className="text-[10px] font-black uppercase tracking-wider text-record-signal">
        {result.recorded ? 'Gift received' : 'Thank you'}
      </p>
      <h2 className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-record-ink">Thank you.</h2>
      <p className="mt-2 text-[12px] leading-relaxed text-record-muted">{line}</p>
      {result.recorded && (
        <p className="mt-2 text-[12px] leading-relaxed text-record-muted">
          The record stays free to read, in every language, for everyone.
        </p>
      )}
    </section>
  );
}