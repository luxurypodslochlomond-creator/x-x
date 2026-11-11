import React from 'react';

/**
 * One band, one shape, used for every section so the page reads down like a
 * printed sheet rather than sideways like a folder: a hairline, the band's own
 * mark, one centred label (with its number, when it has one), one heading, then
 * the content.
 *
 * The label carries the number inline instead of in a left rail — this page is
 * set down the middle, so an index column would drag the eye off it again.
 *
 * The type here is deliberately larger than the record's house small voice: at
 * ten pixels, uppercase monospace on warm paper is a caption you lean in to read,
 * and this page is read on a phone in a field. Eleven and a half, in full ink, is
 * the smallest that stops being a squint.
 */
export default function PageBand({ label, title, number, mark: Mark, children, first = false }) {
  return (
    <section className={`${first ? '' : 'border-t border-record-ink/25'} pt-6`}>
      {Mark && (
        <div className="mb-3 flex justify-center text-record-ink">
          <Mark className="h-12 w-12 sm:h-14 sm:w-14" />
        </div>
      )}
      {(label || number) && (
        <p className="text-center font-mono text-[11.5px] uppercase leading-[1.9] tracking-[0.13em] text-record-ink">
          {number && <span className="text-record-red">{number}</span>}
          {number && label && <span className="px-2 text-record-ink/40">/</span>}
          {label}
        </p>
      )}
      {title && (
        <h2
          className="mx-auto mt-3 max-w-[24ch] text-center text-[25px] leading-[1.16] tracking-tight text-record-ink sm:text-[27px]"
          style={{ fontFamily: 'var(--record-display)' }}
        >
          {title}
        </h2>
      )}
      <div className="mt-4 text-center">{children}</div>
    </section>
  );
}