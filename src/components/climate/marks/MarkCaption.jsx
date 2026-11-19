import React from 'react';
import { Link } from 'react-router-dom';

export default function MarkCaption({ chosen, onNavigate }) {
  return (
    <figcaption id="record-mark-caption" className="marks-plate-caption" aria-live="polite" aria-atomic="true">
      {chosen ? (
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="block h-14 w-14 shrink-0 text-record-ink [&>svg]:h-full [&>svg]:w-full"><chosen.Mark size={40} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold leading-tight text-record-ink">{chosen.name}</p>
            <p className="mt-1 text-pretty text-[12.5px] leading-[1.45] text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>{chosen.means}</p>
            {chosen.to && (
              <Link to={chosen.to} onClick={onNavigate} className="inline-flex min-h-11 items-center gap-2 text-[12px] font-bold text-record-mark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark">
                {chosen.door}
                <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true"><path d="M0 0l7 4-7 4Z" fill="currentColor" /></svg>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="py-1">
          <p className="text-[17px] font-bold leading-tight text-record-ink">Press a mark to read it.</p>
          <p className="mt-2 text-pretty text-[13px] leading-relaxed text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>Its meaning appears here. Follow its name to go through.</p>
        </div>
      )}
    </figcaption>
  );
}