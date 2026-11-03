import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';

// What this page promises.
//
// The page's promises are held as records, not typed into a component, so a keeper can
// correct one in daylight instead of editing it quietly. Every promise says what it does
// NOT establish — that line is the point, not decoration.
//
// Kept deliberately plain: six lines, no badges, no jargon, and one signature note at the
// foot rather than six. A list a reader scrolls past has failed to be read.

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
    <section aria-labelledby="promises" className="py-7 border-b-2 border-[#141210]">
      <RecordSectionHeading
        eyebrow="Kept as records, so they can be corrected"
        title="What this record promises."
      />

      <p className="font-mono text-[11.5px] leading-relaxed text-[#141210]">
        Not findings about the world — promises about how the record behaves. Every one of them
        can be tested by using the record for five minutes.
      </p>

      {error && (
        <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-[#b3261e]">
          This section could not be read just now: {error}
        </p>
      )}

      {!error && claims === null && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5a5246]">
          Reading…
        </p>
      )}

      {!error && claims !== null && claims.length === 0 && (
        <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-[#141210]">
          None are on the record yet. Until they are, this page promises nothing.
        </p>
      )}

      {claims !== null && claims.length > 0 && (
        <div className="mt-4">
          {claims.map((c, i) => (
            <div key={c.id} className="grid grid-cols-[26px_1fr] gap-x-1 border-t border-[#141210]/25 pt-3 pb-4">
              <p className="font-mono text-[10.5px] font-black text-[#e2602a]">
                {String(i + 1).padStart(2, '0')}
              </p>

              <div>
                <p className="font-mono font-black text-[16px] leading-tight tracking-[-0.01em] text-[#141210]">
                  {c.mark}
                </p>

                <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-[#141210]">
                  {c.plain}
                </p>

                {c.does_not_establish && (
                  <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-[#5a5246]">
                    <span className="text-[9px] font-black uppercase tracking-[0.14em]">Does not establish </span>
                    {c.does_not_establish}
                  </p>
                )}

                {/* Who says so, always. Most of these are the record's own decisions,
                    and a decision has nothing to click — but a reader is still owed the
                    line saying whose it is, and whether it is a finding at all. */}
                <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#141210]">
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
                  <p className="mt-1.5 font-mono text-[9.5px] leading-relaxed text-[#b3261e]">
                    Correction: {c.correction_note}
                  </p>
                )}
              </div>
            </div>
          ))}

          <p className="mt-1 border-t-2 border-[#141210] pt-3.5 font-mono text-[10.5px] leading-relaxed text-[#5a5246]">
            None of these is signed yet — a machine cannot sign, and no person has put their name
            here. When one does, it will show. A promise is checked the only way a promise can be:
            open an entry, follow its origin, and see whether the rule held.
          </p>

          <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-[#5a5246]">
            How an entry is actually made — where it came from, how well it is known, who signed
            it — is the record&apos;s protocol, kept on{' '}
            <Link
              to="/ClimateMethod"
              className="text-[#141210] underline decoration-[#e2602a] decoration-2 underline-offset-2"
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