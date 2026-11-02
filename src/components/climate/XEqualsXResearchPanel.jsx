import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// The claims the page makes — held as records, not as sentences typed into a component.
//
// Every line here can be corrected by a keeper in daylight, and every line says what it
// does NOT establish. On this page all of them are decisions: promises about how the record
// behaves, not findings about the world. That is deliberate. A decision can be checked by
// watching what the record actually does, which is a stronger test than a citation.

const DOMAIN_LABEL = {
  decision: 'Decision · not a finding',
  mathematics: 'Mathematics · true by definition',
  physics: 'Physics · measured',
  arithmetic: 'Arithmetic · this page’s own sums',
};

export default function XEqualsXResearchPanel() {
  const [claims, setClaims] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateClaim
      .filter({ status: 'published' }, { sort: 'sort_order', limit: 50 })
      .then((page) => { if (live) setClaims(page.items); })
      .catch((e) => { if (live) setError(e?.message || 'The panel could not be read.'); });
    return () => { live = false; };
  }, []);

  return (
    <section aria-labelledby="research-panel" className="py-7 border-b-2 border-[#141210]">
      <p className="font-mono text-[8.5px] font-black uppercase tracking-[0.32em] text-[#6b6258]">
        The claims this page makes
      </p>

      <h2
        id="research-panel"
        className="mt-3 font-mono font-black text-[26px] leading-[1.05] tracking-[-0.03em] text-[#141210]"
      >
        What the record is<br />allowed to say.
      </h2>

      <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        Each one is kept here as a record, not typed into this page. Every line says who it came
        from, what it does not establish, and whether a person has signed it yet.
      </p>

      {error && (
        <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-[#b3261e]">
          The panel could not be read just now: {error}
        </p>
      )}

      {!error && claims === null && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b6258]">
          Reading the panel…
        </p>
      )}

      {!error && claims !== null && claims.length === 0 && (
        <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-[#141210]">
          No claims are on the record yet. Until they are, this page makes none.
        </p>
      )}

      {claims !== null && claims.length > 0 && (
        <div className="mt-5">
          {claims.map((c, i) => (
            <div key={c.id} className="border-t border-[#141210]/25 pt-3 pb-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[9.5px] font-black tracking-[0.18em] text-[#6b6258]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[8.5px] font-black uppercase tracking-[0.14em] text-[#e2602a] text-right">
                  {DOMAIN_LABEL[c.domain] || DOMAIN_LABEL.decision}
                </span>
              </div>

              <p className="mt-2 font-mono font-black text-[19px] leading-none tracking-[-0.02em] text-[#141210]">
                {c.mark}
              </p>

              <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-[#141210]">
                {c.plain}
              </p>

              {c.does_not_establish && (
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-[#6b6258]">
                  <span className="font-black uppercase tracking-[0.14em] text-[9px]">Does not establish </span>
                  {c.does_not_establish}
                </p>
              )}

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {c.origin_url ? (
                  <a
                    href={c.origin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#141210] underline decoration-dotted underline-offset-2 hover:text-[#b3261e]"
                  >
                    {c.origin_name}{c.origin_date ? ` · ${c.origin_date}` : ''}
                  </a>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#141210]">
                    {c.origin_name}{c.origin_date ? ` · ${c.origin_date}` : ''}
                  </span>
                )}
              </div>

              {c.correction_note && (
                <p className="mt-1.5 font-mono text-[9.5px] leading-relaxed text-[#b3261e]">
                  Correction: {c.correction_note}
                </p>
              )}

              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6b6258]/80">
                {c.editor ? `Signed ${c.editor}` : 'Unsigned · no keeper has put their name to this yet'}
              </p>
            </div>
          ))}

          <p className="mt-4 border-t border-[#141210]/25 pt-3 font-mono text-[10px] leading-relaxed text-[#6b6258]">
            None of these is a discovery, so none of them is proved by a second source. Each one
            is checked the only way a promise can be: by using the record — open an entry, follow
            its origin, and see whether the rule above held.
          </p>
        </div>
      )}
    </section>
  );
}