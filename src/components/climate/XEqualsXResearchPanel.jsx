import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

// What this page promises.
//
// The page's promises are held as records, not typed into a component, so a keeper can
// correct one in daylight instead of editing it quietly. Every promise says what it does
// NOT establish — that line is the point, not decoration.
//
// Kept deliberately plain: six lines, no badges, no jargon, and one signature note at the
// foot rather than six. A list a reader scrolls past has failed to be read.
//
// It used to borrow the record's shared section band, which sets its heading in condensed
// capitals at twenty-six pixels with a rule running out to the edge. On this page that band
// was the loudest thing on screen and it announced a section of six short lines. The heading
// here is the same size as every other heading on the page, in the same hand.

export default function XEqualsXResearchPanel() {
  const [claims, setClaims] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateClaim
      .filter({ status: 'published' }, { sort: 'sort_order', limit: 50 })
      .then((page) => { if (live) setClaims(page.items); })
      .catch((e) => { if (live) setError(e?.message || 'This section could not be read.'); });
    return () => { live = false; };
  }, []);

  return (
    <section aria-labelledby="promises" className="py-9 border-t border-[#141210]/15 border-b border-[#141210]/15">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div
          id="promises"
          role="heading"
          aria-level={2}
          className="text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: '21px', lineHeight: 1.25 }}
        >
          What this record promises
        </div>
        <p className="font-mono text-[12.5px] text-[#5a5246]">Kept as records, so they can be corrected</p>
      </div>

      <p className="mt-3">
        Not findings about the world — promises about how the record behaves. Every one of them
        can be tested by using the record for five minutes.
      </p>

      {error && (
        <p className="mt-4 text-[#b3261e]">This section could not be read just now: {error}</p>
      )}

      {!error && claims === null && (
        <p className="mt-4 font-mono text-[12.5px] text-[#5a5246]">Reading…</p>
      )}

      {!error && claims !== null && claims.length === 0 && (
        <p className="mt-4">None are on the record yet. Until they are, this page promises nothing.</p>
      )}

      {!error && claims !== null && claims.length > 0 && (
        <div className="mt-6">
          {claims.map((c, i) => (
            <div key={c.id} className="grid grid-cols-[28px_1fr] gap-x-3 border-t border-[#141210]/20 pt-4 pb-5">
              <p className="font-mono text-[12.5px] text-[#5a5246]">{String(i + 1).padStart(2, '0')}</p>

              <div>
                <div
                  className="text-[#141210]"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '17px', lineHeight: 1.3 }}
                >
                  {c.mark}
                </div>

                <p className="mt-1.5">{c.plain}</p>

                {c.does_not_establish && (
                  <p className="mt-2 text-[#5a5246]">
                    <span className="font-mono text-[12.5px] tracking-[0.06em]">Does not establish. </span>
                    {c.does_not_establish}
                  </p>
                )}

                {/* Who says so, always. Most of these are the record's own decisions, and a
                    decision has nothing to click — but a reader is still owed the line saying
                    whose it is, and whether it is a finding at all. */}
                <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-[#5a5246]">
                  {c.domain === 'decision' ? 'A decision, not a finding' : (c.domain || null)}
                  {c.domain ? ' · ' : ''}
                  {c.origin_url ? (
                    <a
                      href={c.origin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-dotted underline-offset-2 hover:text-[#b3261e]"
                    >
                      {c.origin_name}{c.origin_date ? ` · ${c.origin_date}` : ''}
                    </a>
                  ) : (
                    <span>{c.origin_name}{c.origin_date ? ` · ${c.origin_date}` : ''}</span>
                  )}
                </p>

                {c.correction_note && (
                  <p className="mt-1.5 text-[#b3261e]">Correction: {c.correction_note}</p>
                )}
              </div>
            </div>
          ))}

          <p className="mt-1 border-t border-[#141210]/20 pt-4 text-[#5a5246]">
            None of these is signed yet — a machine cannot sign, and no person has put their name
            here. When one does, it will show. A promise is checked the only way a promise can be:
            open an entry, follow its origin, and see whether the rule held.
          </p>

          <p className="mt-4 text-[#5a5246]">
            How an entry is actually made — where it came from, how well it is known, who signed
            it — is the record&apos;s protocol, kept on{' '}
            <Link
              to="/ClimateMethod"
              className="text-[#141210] underline decoration-[#e2602a] underline-offset-2"
            >
              How the record works
            </Link>
            .
          </p>
        </div>
      )}
    </section>
  );
}