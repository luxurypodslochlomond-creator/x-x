import React from 'react';

// ── ONE SHAPE FOR EVERY BAND ON A RECORD PAGE ──────────────────────────────────
// These bands used to be built one at a time: a mono caps label here, a display
// heading there, one band opening on a mark and another on a rule, headings at 20px,
// 21px, 22px and clamp(21px, 4.6vw, 26px) on the same page. Nothing was wrong with any
// single band and the page still read as four people's work, which is exactly what makes
// a record look assembled rather than printed.
//
// So: a hairline, a small letterspaced label, one display heading at one size, then the
// content. Every band on the page uses it, and the page starts reading down like a sheet
// instead of sideways like a folder.
export default function RecordBand({ id, label, title, icon: Icon, children, className = '' }) {
  return (
    <section aria-labelledby={id} className={`my-10 border-t border-record-ink/25 pt-5 ${className}`}>
      <div className="flex items-center gap-2.5">
        {Icon && <Icon size={18} className="shrink-0 text-record-ink" />}
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-record-muted">{label}</p>
      </div>
      {title && (
        <h2
          id={id}
          className="mt-2.5 max-w-[24ch] text-[24px] leading-[1.12] text-record-ink"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.005em' }}
        >
          {title}
        </h2>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}