import React from 'react';
import { ChevronDown } from 'lucide-react';

// ── ONE RULE, READABLE SHUT ─────────────────────────────────────────────────────
// The method used to be ten headings and nothing else until you opened one, so a
// reader who did not already care got a list of titles and no method at all. Brian,
// 19 November: "dinner easy to understand from elite academic to me." So each rule
// carries one plain line under its heading — the gist, in the same words a person
// would use out loud — and the full text is still there behind the tap for a panel
// or a journalist. Nothing was shortened: the long version is one press away.
export default function MethodBlock({ n, title, gist, children, full = false }) {
  return (
    <details className={`record-method-rule group border-t border-record-paper/20 ${full ? 'record-method-wide' : ''}`}>
      <summary className="flex min-h-16 cursor-pointer list-none items-start gap-3 px-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal lg:px-5">
        <span className="mt-0.5 shrink-0 text-xs font-bold tabular-nums text-record-signal">{n}</span>
        <div className="flex-1">
          <h2 className="text-[17px] font-bold leading-snug text-record-paper">{title}</h2>
          {gist && <p className="mt-1 text-[12.5px] leading-snug text-record-paper/75">{gist}</p>}
        </div>
        <ChevronDown aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-record-paper/55 group-open:rotate-180" />
      </summary>
      <div className="space-y-4 px-4 pb-5 text-[15px] leading-[1.75] text-record-paper/90 lg:px-5">{children}</div>
    </details>
  );
}