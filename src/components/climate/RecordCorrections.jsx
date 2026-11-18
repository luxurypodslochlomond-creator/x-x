import React from 'react';
import CorrectionRow from '@/components/climate/CorrectionRow';
import useCorrections from '@/components/climate/useCorrections';

export default function RecordCorrections() {
  const corrections = useCorrections();
  return (
    <section id="corrections" className="record-method-wide scroll-mt-36 border-t-4 border-record-red bg-record-paper p-4 lg:p-6" aria-labelledby="corrections-title">
      <h2 id="corrections-title" className="text-2xl font-bold leading-tight text-record-ink">Corrections, in daylight</h2>
      <p className="mb-5 mt-3 max-w-2xl text-[15px] leading-[1.7] text-record-muted">
        Method is how an entry is checked. This is what changed afterwards: the correction in the signer's own words, alongside the entry it belongs to. The original entry keeps its correction note.
      </p>
      {!corrections && <p role="status" className="py-4 text-sm text-record-muted">Reading the corrections…</p>}
      {corrections?.length === 0 && <p className="text-[15px] leading-relaxed">No corrections yet. That is not a claim of perfection. The first one appears here with the entry it belongs to.</p>}
      {corrections?.length > 0 && <ul className="space-y-4">{corrections.map((correction) => <CorrectionRow key={correction.key} correction={correction} />)}</ul>}
      <a href="#say" className="mt-5 inline-flex min-h-11 items-center border-b border-record-red text-sm font-bold text-record-red">Report a mistake or ask for a removal →</a>
    </section>
  );
}