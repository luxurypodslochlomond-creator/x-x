import React from 'react';
import { Link } from 'react-router-dom';

// The citations, numbered the way a printed record numbers them. An entry's own origin is
// the only thing that makes an answer checkable, so it is never hidden behind a "details"
// tap: it is on the same sheet, one line each, at a size you can read without pinching.
const isFar = (url) => /^https?:\/\//i.test(String(url || ''));

const line = 'font-body text-sm leading-relaxed text-record-ink underline decoration-record-mark decoration-1 underline-offset-4 hover:text-record-mark';

export default function BaseOneSources({ claims }) {
  if (!claims?.length) return null;
  return (
    <div className="mt-5 border-t border-record-ink/20 pt-4">
      <p className="base-one-label font-mono uppercase mb-3 text-record-mark">
        Where it came from
      </p>
      <ol className="space-y-2">
        {claims.map((claim, index) => {
          const label = `${claim.source_name}${claim.source_date ? ` · ${claim.source_date}` : ''}`;
          return (
            <li key={`${claim.source_name}-${index}`} className="flex items-start gap-2">
              <span className="base-one-label font-mono uppercase mt-0.5 shrink-0 text-record-mark">{index + 1}</span>
              {isFar(claim.source_url) ? (
                <a href={claim.source_url} target="_blank" rel="noopener noreferrer" className={line}>{label}</a>
              ) : (
                <Link to={claim.source_url || '/TogetherChangeClimate'} className={line}>{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}