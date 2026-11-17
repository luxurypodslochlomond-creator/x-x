import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── ONE CORRECTION, AS IT WAS MADE ────────────────────────────────────────────
// The note is printed exactly as the keeper wrote it: never shortened, never tidied,
// never summarised into something softer. Beside it, the entry it belongs to and the
// day that entry last changed — so a reader can see the correction and the thing it
// corrects in one place, rather than being asked to take either on trust.
export default function CorrectionRow({ correction }) {
  const changed = correction.changed ? new Date(correction.changed) : null;
  const when = changed && !Number.isNaN(changed.getTime())
    ? changed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : null;

  return (
    <li className="border border-record-ink/30 border-t-4 border-t-record-red bg-record-paper p-4 lg:p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
        <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#b3261e]">
          {correction.kind}
        </span>
        {when && (
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#5a5246] whitespace-nowrap">
            entry last changed {when}
          </span>
        )}
      </div>

      <h3 className="record-correction-title mb-4 font-display text-[17px] font-bold leading-snug text-record-ink lg:text-lg">
        {correction.title}
      </h3>

      <p className="border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2 text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210] whitespace-pre-line">
        {correction.note}
      </p>

      <Link
        to={correction.to}
        className="mt-4 inline-flex min-h-11 items-center gap-2 border-b-2 border-record-ink font-display text-xs font-bold uppercase tracking-wide text-record-ink transition-colors hover:border-record-red hover:text-record-red"
      >
        Read the entry as it stands <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </li>
  );
}