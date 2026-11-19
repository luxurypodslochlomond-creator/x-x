import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── ONE LINE OF THE ERRATA SHEET ────────────────────────────────────────────────
// A line, not a card. Number in the number column, date in the date column, then the
// entry, the correction exactly as the keeper wrote it, and the way to the entry it
// belongs to. On a phone the date steps up into the line's own label so nothing is
// crushed into a column a thumb cannot read. Never shortened, never tidied: a tidied
// correction is a second correction.
export default function CorrectionRow({ correction, n }) {
  const changed = correction.changed ? new Date(correction.changed) : null;
  const when = changed && !Number.isNaN(changed.getTime())
    ? changed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : null;

  return (
    <li className="corr-line corr-row">
      <span className="pt-0.5 font-mono text-[11px] font-bold tabular-nums text-[#b3261e]">{n}</span>
      <span className="hidden pt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#5a5246] lg:block">
        {when || 'undated'}
      </span>

      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#5a5246]">
          {correction.kind}
          <span className="lg:hidden"> · {when || 'undated'}</span>
        </p>

        <h3 className="mt-1 font-display text-[16.5px] font-bold leading-snug text-record-ink lg:text-[17px]">
          {correction.title}
        </h3>

        <p className="mt-1.5 text-[14.5px] leading-[1.72] text-[#141210] whitespace-pre-line">{correction.note}</p>

        <Link
          to={correction.to}
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 border-b border-record-ink/40 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-record-ink transition-colors hover:border-record-red hover:text-record-red"
        >
          The entry as it stands <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </li>
  );
}