import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import SignedBy from '@/components/climate/SignedBy';
import '@/components/climate/wire-register.css';

// ── ONE LINE OF THE WIRE ────────────────────────────────────────────────────────
// Brian, 19 November: on a phone these "feel like a web page", not a record of time.
// They were bordered cards with a coloured bar — the shape of a feed. A record of time
// needs a date you can follow down the page, so the day, month and year now sit in a
// rail on the left, shared by every entry, with a hairline between lines and no box.
//
// Nothing has been removed: the kind, the place, the picture and its credit, what can be
// copied, the correction, who says so, the second source, the source link, the signer and
// the share control are all still here. Only the shape changed, and the date now leads.
// A date the editor did not give is never invented — the rail prints the words they gave.

const KIND = {
  emergency: 'Emergency',
  milestone: 'Milestone',
  initiative: 'Initiative',
};

function rail(whenDate, whenLabel) {
  if (whenDate) {
    const d = new Date(whenDate);
    if (!Number.isNaN(d.getTime())) {
      return {
        day: String(d.getUTCDate()).padStart(2, '0'),
        month: d.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }),
        year: String(d.getUTCFullYear()),
      };
    }
  }
  return { word: whenLabel };
}

export default function NewsEntryCard({ entry, linked = true, n }) {
  const when = rail(entry.when_date, entry.when_label);

  const headline = (
    <h2
      className="font-black uppercase text-[#141210] leading-[1.12]"
      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 5.1vw, 24px)', letterSpacing: '-0.01em' }}
    >
      {entry.headline}
    </h2>
  );

  return (
    <article className="wire-entry">
      <div className="wire-rail" aria-label={entry.when_label || undefined}>
        {when.day ? (
          <>
            <span className="wire-rail-day">{when.day}</span>
            <span className="wire-rail-month">{when.month}</span>
            <span className="wire-rail-year">{when.year}</span>
          </>
        ) : (
          <span className="wire-rail-word">{when.word || 'undated'}</span>
        )}
      </div>

      <div className="wire-entry-body">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] leading-relaxed text-[#5a5246]">
          {n && <span className="text-[#141210]">No. {n}</span>}
          {n && ' · '}
          {KIND[entry.kind] || entry.kind || 'Entry'}
          {entry.where_label && ` · ${entry.where_label}`}
        </p>

        {linked ? (
          <Link to={`/ClimateWireEntry/${entry.id}`} className="mt-1.5 block">{headline}</Link>
        ) : (
          <div className="mt-1.5">{headline}</div>
        )}

        <p className="mt-2 text-[15px] leading-[1.68] text-[#141210]" style={{ fontFamily: 'var(--font-reading)' }}>
          {entry.what_changed}
        </p>

        {entry.image_url && (
          <figure className="record-wire-picture mt-3.5">
            <img
              src={entry.image_url}
              alt={entry.headline}
              loading="lazy"
              className="block w-full object-cover"
              style={{ maxHeight: 320 }}
            />
            {entry.image_credit && (
              <figcaption className="bg-record-signal px-2.5 py-2 font-mono text-[10px] leading-relaxed text-record-ink">
                {entry.image_credit}
              </figcaption>
            )}
          </figure>
        )}

        {/* A picture is never shown without its credit — and a credit is never left standing
            alone as though something were there. */}
        {entry.image_credit && !entry.image_url && (
          <p className="mt-2 font-mono text-[9px] uppercase tracking-wide text-[#5a5246]">
            Picture credited, not held here · {entry.image_credit}
          </p>
        )}

        {entry.replicable && (
          <div className="wire-note">
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#1e3a2b]">
              What can be copied from this
            </p>
            <p className="mt-1 text-[14.5px] leading-[1.65] text-[#141210]" style={{ fontFamily: 'var(--font-reading)' }}>
              {entry.replicable}
            </p>
          </div>
        )}

        {entry.correction_note && (
          <div className="wire-note">
            <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#b3261e]">Correction</p>
            <p className="mt-1 text-[14.5px] leading-[1.65] text-[#141210]" style={{ fontFamily: 'var(--font-reading)' }}>
              {entry.correction_note}
            </p>
            <Link
              to="/ClimateCorrections"
              className="mt-1.5 inline-flex min-h-9 items-center font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#b3261e] underline"
            >
              Every correction, in daylight
            </Link>
          </div>
        )}

        <div className="mt-3 border-t border-[#141210]/20 pt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#5a5246]">Who says so</span>
          <span className="font-mono text-[11px] text-[#141210]">{entry.source_name}</span>
          {entry.corroborating_source && (
            <span className="font-mono text-[10px] text-[#5a5246]">+ {entry.corroborating_source}</span>
          )}
          {entry.source_url && (
            <a
              href={entry.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#e2602a] underline"
            >
              Read the source <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          <SignedBy name={entry.editor} compact />
          {linked && <div className="ml-auto self-center"><ShareCardButton entry={entry} compact /></div>}
        </div>
      </div>
    </article>
  );
}