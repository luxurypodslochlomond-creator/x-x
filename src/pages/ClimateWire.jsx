import React, { useState } from 'react';
import NewsIndex from '@/components/climate/NewsIndex';
import NewsSubmitForm from '@/components/climate/NewsSubmitForm';
import useRecordViewState from '@/components/climate/useRecordViewState';
import useSignalPage from '@/components/climate/useSignalPage';
export default function ClimateWire() {
  const [filter, setFilter] = useRecordViewState('verification', 'all');
  const [kind, setKind] = useRecordViewState('kind', 'all');
  const [formOpen, setFormOpen] = useState(false);
  const [q, setQ] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
  const signals = useSignalPage({ query: q, kind, verification: filter });
  return <div className="news-page text-record-ink">
    <NewsIndex entries={signals.entries} keptDay={signals.keptDay} loading={signals.isPending || signals.searching} query={q} onQueryChange={setQ} kind={kind} onKindChange={setKind} verification={filter} onVerificationChange={setFilter} onSubmit={() => setFormOpen(true)} hasMore={signals.hasNextPage} loadingMore={signals.isFetchingNextPage} onMore={() => signals.fetchNextPage()} />
    {formOpen && <NewsSubmitForm onClose={() => setFormOpen(false)} onSent={() => signals.refetch()} />}
  </div>;
}