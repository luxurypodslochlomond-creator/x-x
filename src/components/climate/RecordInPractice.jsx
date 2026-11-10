import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const STANDING = { single_source: 'One source', corroborated: 'Corroborated', official_record: 'Official record' };

export default function RecordInPractice() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['covenant-published-example'],
    queryFn: () => base44.entities.ClimateSolution.filter({ status: 'published', entry_type: 'solution' }, { sort: '-created_date', limit: 1 }),
  });
  const entry = data?.items?.[0];
  const sourceUrl = /^https?:\/\//i.test(entry?.source_url || '') ? entry.source_url : null;
  return (
    <section aria-labelledby="record-in-practice" className="covenant-example">
      <p className="covenant-kicker text-record-muted">From the record</p>
      <h2 id="record-in-practice">One entry. Its evidence.</h2>
      {isPending && <p role="status" className="covenant-caption text-record-muted">Opening an entry from the record…</p>}
      {isError && <p role="alert" className="covenant-caption text-record-red">The example could not be loaded. <Link to="/TogetherChangeClimate" className="underline">Open the record instead.</Link></p>}
      {!isPending && !isError && !entry && <p className="covenant-caption text-record-muted">No published solution to show yet.</p>}
      {entry && (
        <article className="covenant-entry">
          {entry.country && <p className="covenant-kicker text-record-muted">{entry.country}</p>}
          <h3><Link to={`/ClimateDetail/solution/${entry.id}`}>{entry.title}</Link></h3>
          <p className="mt-3">{entry.summary}</p>
          <ol className="covenant-trace" aria-label="Source, evidence and editorial signature">
            <li>
              <span className="covenant-trace-label covenant-kicker">Source</span>
              {sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{entry.source_name || 'Original source'} ↗<span className="sr-only"> (opens a new tab)</span></a> : <span>{entry.source_name || 'Not named'}</span>}
            </li>
            <li><span className="covenant-trace-label covenant-kicker">Evidence</span>{STANDING[entry.verification] || 'Standing not stated'}</li>
            <li><span className="covenant-trace-label covenant-kicker">Editor</span>{entry.editor ? `Signed by ${entry.editor}` : 'Not yet signed'}</li>
          </ol>
          {entry.correction_note && <p className="covenant-caption mt-4 text-record-muted">Correction: {entry.correction_note}</p>}
          <Link to={`/ClimateDetail/solution/${entry.id}`} className="covenant-entry-open"><span>Read the full entry</span><span aria-hidden="true">→</span></Link>
        </article>
      )}
    </section>
  );
}