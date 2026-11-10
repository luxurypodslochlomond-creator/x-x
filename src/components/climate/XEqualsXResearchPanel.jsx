import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import RecordBand from './RecordBand';

// What this page promises.
//
// The promises are held as records, not typed into a component, so a keeper can correct one
// in daylight instead of editing it quietly. Every promise says what it does NOT establish —
// that line is the point, not decoration.
//
// The framing around them is gone. It used to be four paragraphs explaining what a promise
// is before the reader got to a promise, and two more after the last one. The heading says
// it, each line says its own limit, and the one thing that cannot be shortened — that none
// of these is signed yet — is kept to a single line.

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
    <RecordBand id="promises" label="Supporting detail" title="Recorded commitments">
      <p>The published commitments, their sources and their stated limits.</p>

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
        <div className="mt-5">
          {claims.map((c) => (
            <div key={c.id} className="border-t border-[#141210]/20 pt-4 pb-4">
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
          ))}

          <p className="mt-1 border-t border-[#141210]/20 pt-3 text-[#5a5246]">
            None is signed yet — a machine cannot sign. How an entry is actually made is kept on{' '}
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
    </RecordBand>
  );
}