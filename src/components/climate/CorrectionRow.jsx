import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── ONE LINE OF THE ERRATA SHEET ────────────────────────────────────────────────
// Set as a register line, not a card: the number down the left, the date in the date
// column, then the entry, the correction in the keeper's own words exactly as written,
// and the way to the entry it belongs to. Never shortened, never tidied, never softened
// — the note is the record of what was wrong, and a tidied correction is a second one.
export default function CorrectionRow({ correction, n }) {
  const changed = correction.changed ? new Date(correction.changed) : null;
  const when = changed && !Number.isNaN(changed.getTime())
    ? changed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : null;

  return (
    <li className="grid grid-cols-[1.9rem_1fr] gap-x-3 border-b border-record-ink/20 py-4 lg:grid-cols-[1.9rem_7rem_1fr] lg:gap-x-5">
      <span className="pt-0.5 font-mono text-[11px] font-bold tabular-nums text-[#b3261e]">{n}</span>
      <span className="hidden pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#5a5246] lg:block">
        {when || 'undated'}
      </span>

      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5a5246]">
          {correction.kind}
          {when && <span className="lg:hidden"> · {when}</span>}
        </p>

        <h3 className="mt-1.5 font-display text-[17px] font-bold leading-snug text-record-ink lg:text-lg">
          {correction.title}
        </h3>

        <p className="mt-2 border-l-2 border-l-[#b3261e] pl-3 text-[13.5px] leading-[1.7] text-[#141210] whitespace-pre-line">
          {correction.note}
        </p>

        <Link
          to={correction.to}
          className="mt-3 inline-flex min-h-11 items-center gap-2 border-b border-record-ink/50 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-record-ink transition-colors hover:border-record-red hover:text-record-red"
        >
          Read the entry as it stands <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </li>
  );
}