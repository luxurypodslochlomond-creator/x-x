import React from 'react';
import { Link } from 'react-router-dom';

// ── WHO BUILT THIS, AND IN WHICH SENSE ───────────────────────────────────────
// This line existed in four places and said "Platform built by Brian Hughes" in all four,
// which credited one person for three different jobs and left out two of the three.
// Brian asked for it to be said properly, 15 November.
//
// It is set as a plate rather than a sentence: an eyebrow in the machine's own tracked
// mono, then the names stacked large in the record's display voice. Three names, no
// ranking, no "founder &" or "CEO of" — a credit is a list of hands, not a CV.
//
// Gillian Barbara Brown leads because Brian asked for zero ego, and the person who
// created the thing leads the line that says who created it. BRO51 is named last and
// named as an AI, because a tool may hold a tool's credit honestly and a person's only
// by pretending to be one. Three claims, three names, nothing blurred.
//
// It lives in one file now. Four copies of a credit is how three of them came to be wrong.
export default function RecordCredit({ className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-md px-6 text-center ${className}`}>
      <div className="mx-auto mb-4 h-px w-10 bg-record-red/60" />
      <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-record-muted">
        Platform built by
      </p>
      <div className="mt-3 flex flex-col items-center gap-0.5 font-display text-[17px] uppercase leading-[1.5] tracking-[0.06em] text-record-ink">
        <span>Gillian Barbara Brown</span>
        <span>Brian Hughes</span>
        <span className="text-record-muted">and BRO51</span>
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-record-muted">
        <Link to="/Welcome" className="underline decoration-dotted underline-offset-2 transition-colors hover:text-record-red">
          UF51 CIC
        </Link>
        {' '}· Scotland
      </p>
    </div>
  );
}