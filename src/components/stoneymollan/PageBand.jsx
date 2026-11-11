import React from 'react';

/**
 * One band, one shape, used for every section on the page so it reads down like a
 * sheet instead of sideways like a folder: a hairline, a small letterspaced label,
 * an optional number in the left rail, one heading, then the content.
 *
 * Everything hangs off the same left edge — that is the whole point of it. The rail
 * is only opened when there is actually a number to put in it, so a band without one
 * starts flush with the page rather than being shoved in by an empty column.
 */
export default function PageBand({ label, title, number, children, first = false }) {
  const rail = Boolean(number);

  return (
    <section className={`${first ? '' : 'border-t border-record-ink/25'} pt-4`}>
      <div className={rail ? 'grid grid-cols-[2.4rem_1fr] gap-x-3' : ''}>
        {rail && (
          <span className="pt-[1px] font-mono text-[11px] leading-[1.7] tracking-[0.16em] text-record-signal">
            {number}
          </span>
        )}
        <div className="min-w-0">
          {label && (
            <p className="font-mono text-[10px] uppercase leading-[1.7] tracking-[0.22em] text-record-muted">
              {label}
            </p>
          )}
          {title && (
            <h2
              className="mt-2 max-w-[26ch] text-[22px] leading-[1.14] tracking-tight text-record-ink"
              style={{ fontFamily: 'var(--record-display)' }}
            >
              {title}
            </h2>
          )}
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </section>
  );
}