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
    <li className="border-2 border-[#141210] bg-[#f7f1e5] p-3 lg:p-4">
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#b3261e]">
          {correction.kind}
        </span>
        {when && (
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#5a5246] whitespace-nowrap">
            entry last changed {when}
          </span>
        )}
      </div>

      <p className="text-[12.5px] lg:text-[13px] font-black font-mono leading-snug text-[#141210] mb-2">
        {correction.title}
      </p>

      <p className="border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2 text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210] whitespace-pre-line">
        {correction.note}
      </p>

      <Link
        to={correction.to}
        className="mt-2.5 inline-flex items-center gap-1.5 text-[10.5px] font-black font-mono uppercase tracking-wider text-[#141210] border-b-2 border-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors min-h-[32px]"
      >
        Read the entry as it stands <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </li>
  );
}