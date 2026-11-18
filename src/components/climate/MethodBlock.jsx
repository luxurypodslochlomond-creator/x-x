import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function MethodBlock({ n, title, children, full = false }) {
  return (
    <details className={`record-method-rule group border-t border-record-ink/25 bg-record-paper ${full ? 'record-method-wide' : ''}`}>
      <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red lg:px-5">
        <span className="shrink-0 text-xs font-bold tabular-nums text-record-red">{n}</span>
        <h2 className="flex-1 text-[17px] font-bold leading-snug text-record-ink">{title}</h2>
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-record-muted group-open:rotate-180" />
      </summary>
      <div className="space-y-4 px-4 pb-5 text-[15px] leading-[1.75] text-record-ink lg:px-5">{children}</div>
    </details>
  );
}