import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { PRIMARY_NAV, FOOTER_NAV, ELSEWHERE_NAV, SUPPORTING_PAGES } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';

// ── THE CONTENTS, OVER THE PAGE ────────────────────────────────────────────────
// "All pages" used to carry a reader off the record and onto a page that explained the
// record, which is the wrong thing to do to somebody who only wanted to see where they
// could go. The index comes to them instead: a sheet laid over the page they were
// reading, the same paper, the same drawn marks, one line saying what each door is for.
// Close it and they are exactly where they were. The long written manual still exists and
// is offered at the foot of the sheet, in one line, for the reader who wants it.
const GROUPS = [
  { heading: 'The record', note: 'The six doors always at the foot of the screen.', items: PRIMARY_NAV },
  { heading: 'How it is kept', note: 'The record’s own terms, printed under its name.', items: FOOTER_NAV },
  { heading: 'Elsewhere', note: 'What the record gives, and what it costs to carry.', items: ELSEWHERE_NAV },
  { heading: 'Also on the record', items: SUPPORTING_PAGES },
];

function PanelDoor({ to, label, what, onClose }) {
  const Mark = markFor(to);
  return (
    <Link
      to={to}
      onClick={onClose}
      className="flex items-start gap-3 border-b border-record-ink/10 py-3 transition-colors hover:bg-record-bone/40"
    >
      <Mark size={26} className="mt-0.5 shrink-0 text-record-ink" />
      <span className="min-w-0">
        <span className="block text-[16px] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          {label}
        </span>
        {what && <span className="mt-0.5 block text-[12px] leading-snug text-record-muted">{what}</span>}
      </span>
    </Link>
  );
}

export default function RecordPagesPanel({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Every way through the record"
      className="fixed inset-0 z-[95] overflow-y-auto bg-record-paper text-record-ink"
    >
      <div aria-hidden="true" className="h-[3px] w-full bg-record-mark" />
      <div className="mx-auto max-w-[720px] px-4 pb-16 pt-4 lg:px-8">
        <div className="flex items-baseline justify-between gap-6">
          <span className="text-[23px] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Every way through
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 border-b border-record-mark py-1 text-[13px] leading-none text-record-red"
          >
            Close
          </button>
        </div>

        {GROUPS.map(({ heading, note, items }) => (
          <section key={heading} className="mt-7">
            <h2 className="text-[11px] uppercase tracking-[0.14em] text-record-ink/60">{heading}</h2>
            {note && <p className="mb-1 mt-1 text-[12px] leading-snug text-record-muted">{note}</p>}
            <div className="mt-1">
              {items.map((item) => (
                <PanelDoor key={item.to} {...item} onClose={onClose} />
              ))}
            </div>
          </section>
        ))}

        <p className="mt-7 text-[12px] leading-snug text-record-muted">
          The long version, in words, is a page of its own:{' '}
          <Link to="/ClimateGuide" onClick={onClose} className="border-b border-record-mark text-record-red">
            the written guide
          </Link>
          .
        </p>
      </div>
    </div>,
    document.body
  );
}