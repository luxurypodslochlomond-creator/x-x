import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { recordSlug } from '@/components/climate/recordSlug';
import ClimateDetail from '@/pages/ClimateDetail';
import ShortDoorChooser from '@/components/climate/ShortDoorChooser';

// ── THE SHORT DOOR TO ONE SOLUTION, CRISIS OR ACTION ──────────────────────────
// /e/mangrove-restoration-bonaire — an entry's own title as its address, instead of
// /ClimateDetail/solution/6afde227b4e9502ba607dff8. These three are the entries a reader
// most often sends to somebody else, so they are the ones that most needed a name.
//
// A crisis is a solution row with its own entry_type, so both live in one table and the
// two tables are read together here. The entry page is the same page the long address
// opens: one entry, not a second copy of one.
export default function ClimateEntryShort() {
  const { slug } = useParams();
  const [state, setState] = useState('loading');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    let alive = true;
    setState('loading');
    Promise.all([base44.entities.ClimateSolution.list(), base44.entities.ClimateAction.list()])
      .then(([solutions, actions]) => {
        if (!alive) return;
        const rows = [
          ...(Array.isArray(solutions) ? solutions : solutions?.items || []).map((row) => ({
            ...row,
            __type: row.entry_type === 'climate_crisis' ? 'climate_crisis' : 'solution',
          })),
          ...(Array.isArray(actions) ? actions : actions?.items || []).map((row) => ({ ...row, __type: 'action' })),
        ];
        const found = rows.filter((row) => recordSlug(row.title, 44) === slug);
        setMatches(found);
        setState(found.length ? 'ready' : 'missing');
      })
      .catch(() => { if (alive) setState('missing'); });
    return () => { alive = false; };
  }, [slug]);

  useEffect(() => {
    if (state !== 'missing') return;
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [state]);

  if (state === 'loading') {
    return <p className="mx-auto max-w-[640px] px-6 py-16 record-meta text-record-muted" role="status">Opening the entry…</p>;
  }

  if (state === 'missing') {
    return (
      <div className="mx-auto max-w-[640px] px-6 py-16 text-record-ink">
        <h1 className="text-xl font-bold">No entry at this address.</h1>
        <p className="mt-3 text-[14px] text-record-muted">An entry has a name here once it is on the public record.</p>
        <Link to="/TogetherChangeClimate" className="mt-6 inline-block record-meta underline">The record</Link>
      </div>
    );
  }

  if (matches.length > 1) {
    return (
      <ShortDoorChooser
        slug={slug}
        items={matches.map((row) => ({
          label: row.title,
          note: row.__type === 'action' ? 'Action' : row.__type === 'climate_crisis' ? 'Crisis' : 'Solution',
          to: `/ClimateDetail/${row.__type}/${row.id}`,
        }))}
      />
    );
  }

  return <ClimateDetail type={matches[0].__type} id={matches[0].id} />;
}