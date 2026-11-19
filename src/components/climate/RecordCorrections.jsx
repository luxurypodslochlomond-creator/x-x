import React from 'react';
import CorrectionRow from '@/components/climate/CorrectionRow';
import useCorrections from '@/components/climate/useCorrections';
import { MarkCorrection } from '@/components/climate/RecordFootMarks';
import '@/components/climate/corrections-sheet.css';

export default function RecordCorrections() {
  const corrections = useCorrections();
  return (
    <section id="corrections" className="record-method-wide corr-section" data-record-layout="compact" aria-labelledby="corrections-title">
      <header className="corr-heading">
        <MarkCorrection size={24} />
        <h2 id="corrections-title">Corrections</h2>
        {!!corrections?.length && <span className="corr-count">{corrections.length}</span>}
      </header>
      <p className="corr-intro">What we got wrong, and what changed. Open a note to read it in full.</p>
      {!corrections && <p className="corr-intro" role="status">Loading corrections…</p>}
      {corrections?.length === 0 && <p className="corr-intro">No correction notes are recorded yet.</p>}
      {!!corrections?.length && (
        <ol className="corr-sheet">
          {corrections.map((correction, index) => <CorrectionRow key={correction.key} correction={correction} n={String(index + 1).padStart(2, '0')} />)}
        </ol>
      )}
      <a href="#say" className="corr-report">Report a mistake or ask for a removal →</a>
    </section>
  );
}