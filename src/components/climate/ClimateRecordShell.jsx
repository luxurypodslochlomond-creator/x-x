import React from 'react';
import { Link } from 'react-router-dom';
import RecordBackBar from '@/components/climate/RecordBackBar';
import { ArrowRight } from 'lucide-react';
import { MarkEqual } from '@/components/climate/RecordFootMarks';

// The record's page shell. It used to be a second room: a black-rimmed way out, a dark
// epigraph band, a dark hero, an orange band at the foot — so a reader who walked from the
// masthead into any of the seventeen pages that wear this shell left the printed record and
// arrived in a different product. Two shells on one book is what made the middle of the
// record feel unattached to its top and bottom.
//
// It is now the same sheet as the rest: paper, ink, a hairline way out, the page's own name
// in the record's cut, the x = x mark in the record's borrowed red, and the way back stated
// once. Nothing was removed — the eyebrow, the statement, the foot and the credit are all
// still said. `compact` still drops the opening block for the rooms where somebody has come
// to work rather than to read.
export default function ClimateRecordShell({ dir = 'ltr', eyebrow, marker, title, statement, returnTo, returnLabel, footer, compact = false, mobileCompact = false, wide = false, onBack, backLabel, className = '', children }) {
  return (
    <div dir={dir} data-compact={compact} data-mobile-compact={mobileCompact} className={`climate-record record-page-shell relative min-h-screen text-record-ink ${className}`} style={{ fontFamily: 'var(--font-body)' }}>
      <RecordBackBar eyebrow={eyebrow} fallback={returnTo} onBack={onBack} label={backLabel} />

      {!compact && (
        <div className="record-shell-opening record-continuous-band border-b-4 border-record-signal">
          <div className={`mx-auto max-w-[1100px] px-4 lg:px-10 lg:py-12 ${mobileCompact ? 'py-5' : 'py-9'}`}>
            {marker && (
              <p className={`font-mono text-[11px] uppercase tracking-[0.16em] text-record-signal ${mobileCompact ? 'hidden lg:block' : ''}`}>{marker}</p>
            )}
            <h1
              className="mt-4 max-w-[24ch] text-[27px] uppercase leading-[1.08] text-record-paper lg:text-[42px]"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.005em' }}
            >
              {title}
            </h1>
            {statement && (
              <p className={`record-shell-statement mt-5 max-w-[48ch] text-[13.5px] leading-relaxed text-record-paper/90 ${mobileCompact ? 'hidden lg:block' : ''}`} style={{ fontFamily: 'var(--font-reading)' }}>
                {statement}
              </p>
            )}
            {/* The mark, and the way to what it means — carried on every page of the record. */}
            <Link
              to="/XEqualsX"
              className={`mt-6 min-h-11 items-center gap-2 text-record-signal transition-colors hover:text-record-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-signal ${mobileCompact ? 'hidden lg:inline-flex' : 'inline-flex'}`}
            >
              <MarkEqual size={26} />
              <span className="font-mono text-[11.5px] uppercase tracking-[0.18em]">Why this record</span>
            </Link>
          </div>
        </div>
      )}

      {/* `wide` is for the pages read from across a room — a stage sheet, not a page of prose.
          The reading measure stays where it is on a phone; only a large screen opens out. */}
      <div className="record-shell-body">
        <div className={`record-shell-content mx-auto px-4 ${wide ? 'max-w-2xl lg:max-w-[1080px] lg:px-8' : 'max-w-2xl lg:max-w-3xl'} ${compact ? 'py-4 lg:py-8' : mobileCompact ? 'py-4 lg:py-14' : 'py-8 lg:py-14'}`}>{children}</div>
      </div>

      {/* The way back to the record, stated once, in the record's own hand. */}
      <div className="record-shell-return border-t border-record-ink/15">
        <div className="mx-auto max-w-[1100px] px-4 py-6 lg:px-10 lg:py-8">
          <Link
            to={returnTo}
            className="inline-flex items-center gap-2 text-[13.5px] text-record-ink transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red"
          >
            {returnLabel} <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </div>
      </div>

      {footer && (
        <div className="record-shell-footnote"><p className="mx-auto max-w-md px-4 py-6 text-center font-mono text-[11px] leading-relaxed text-record-muted lg:max-w-2xl lg:py-8 lg:text-[12px]">{footer}</p></div>
      )}

      {/* One left edge: the foot sits at the same 4 units as every paragraph above it. */}
      {/* The credit is not printed here: the record's own foot carries it once, on every
          page, so a page inside the shell does not show it twice. */}
    </div>
  );
}