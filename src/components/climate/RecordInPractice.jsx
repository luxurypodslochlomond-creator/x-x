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
    <section aria-labelledby="record-in-practice" className="my-10 border-y border-record-ink/30 py-6">
      <h2 id="record-in-practice" className="font-body text-xl text-record-ink">Here is one entry. Follow it.</h2>
      <p className="mt-3 text-record-muted">Read the account, then go to its source. Decide what it supports.</p>
      {isPending && <p role="status" className="record-meta mt-5 text-record-muted">Opening an entry from the record…</p>}
      {isError && <p role="alert" className="record-meta mt-5 text-record-red">This example could not be loaded. The record is still linked below.</p>}
      {!isPending && !isError && !entry && <p className="record-meta mt-5 text-record-muted">No published solution to show yet.</p>}
      {entry && (
        <article className="mt-6 border-l-2 border-record-mark pl-4 sm:pl-6">
          <div className="record-meta mb-3 text-record-muted">From the record{entry.country ? ` · ${entry.country}` : ''}</div>
          <h3 className="font-body text-2xl leading-snug text-record-ink">
            <Link to={`/ClimateDetail/solution/${entry.id}`} className="underline decoration-record-ink/25 underline-offset-4 hover:text-record-red">{entry.title}</Link>
          </h3>
          <p className="mt-4">{entry.summary}</p>
          <p className="record-meta mt-4 text-record-muted">Source: {entry.source_name || 'Not named'}<br />{STANDING[entry.verification] || 'Standing not stated'} · {entry.editor ? `Signed by ${entry.editor}` : 'No editor signature yet'}</p>
          {sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-base text-record-red underline underline-offset-4">Read the original source <span className="sr-only"> (opens a new tab)</span></a>}
        </article>
      )}
      <Link to="/TogetherChangeClimate" className="mt-6 inline-flex min-h-11 items-center text-base font-semibold text-record-ink underline underline-offset-4">Open the record →</Link>
    </section>
  );
}