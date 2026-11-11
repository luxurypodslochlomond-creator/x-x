import React from 'react';

/**
 * One band, one shape, used for every section so the page reads down like a
 * printed sheet rather than sideways like a folder: a hairline, one centred
 * label (with its number, when it has one), one heading, then the content.
 *
 * The label carries the number inline instead of in a left rail — this page is
 * set down the middle, so an index column would drag the eye off it again.
 */
export default function PageBand({ label, title, number, children, first = false }) {
  return (
    <section className={`${first ? '' : 'border-t border-record-ink/25'} pt-5`}>
      {(label || number) && (
        <p className="text-center font-mono text-[10px] uppercase leading-[1.8] tracking-[0.24em] text-record-muted">
          {number && <span className="text-record-signal">{number}</span>}
          {number && label && <span className="px-2 text-record-ink/25">/</span>}
          {label}
        </p>
      )}
      {title && (
        <h2
          className="mx-auto mt-3 max-w-[24ch] text-center text-[23px] leading-[1.14] tracking-tight text-record-ink"
          style={{ fontFamily: 'var(--record-display)' }}
        >
          {title}
        </h2>
      )}
      <div className="mt-3 text-center">{children}</div>
    </section>
  );
}