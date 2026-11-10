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
// The framing around them is gone. It opened with a sentence explaining what the list was,
// which the heading already said, and it closed with a paragraph about signatures. Each
// promise now carries its own limit, and the one thing that cannot be shortened — nothing
// here is signed yet — is a single line at the end of the list.
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
    <RecordBand id="promises" label="In its own words" title="Recorded commitments" className="covenant-commitments">
      {error && (
        <p className="text-[#b3261e]">This section could not be read just now: {error}</p>
      )}

      {!error && claims === null && (
        <p className="font-mono text-[12.5px] text-[#5a5246]">Reading…</p>
      )}

      {!error && claims !== null && claims.length === 0 && (
        <p>None are on the record yet. Until they are, this page promises nothing.</p>
      )}

      {!error && claims !== null && claims.length > 0 && (
        <div>
          {claims.map((c) => (
            <div key={c.id} className="covenant-commitment">
              <h3>{c.mark}</h3>

              <p className="mt-1.5">{c.plain}</p>

              {c.does_not_establish && (
                <p className="covenant-commitment-limit mt-2 text-record-muted">
                  <span className="covenant-limit-label">Does not establish. </span>
                  {c.does_not_establish}
                </p>
              )}

              <p className="covenant-caption covenant-commitment-source mt-2 text-record-muted">
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

          <p className="covenant-caption covenant-signature-note text-record-muted">
            None is signed. A machine cannot sign.{' '}
            <Link
              to="/ClimateMethod"
              className="text-record-ink underline decoration-record-mark underline-offset-2"
            >
              How an entry is made
            </Link>
            .
          </p>
        </div>
      )}
    </RecordBand>
  );
}