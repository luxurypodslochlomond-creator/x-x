import React, { useState } from 'react';
import NewsIndex from '@/components/climate/NewsIndex';
import WireOpening from '@/components/climate/wire/WireOpening';
import WireEventNote from '@/components/climate/wire/WireEventNote';
import NewsSubmitForm from '@/components/climate/NewsSubmitForm';
import useRecordViewState from '@/components/climate/useRecordViewState';
import useSignalPage from '@/components/climate/useSignalPage';
import recordKindOf from '@/components/climate/recordKinds';
export default function ClimateWire() {
  const [filter, setFilter] = useRecordViewState('verification', 'all');
  const [kind, setKind] = useRecordViewState('kind', 'all');
  const [formOpen, setFormOpen] = useState(() => new URLSearchParams(window.location.search).get('submit') === '1');
  const [q, setQ] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
  const signals = useSignalPage({ query: q, kind, verification: filter });
  return <div id="record-wire" className="news-page text-record-ink" data-record-kind={recordKindOf(kind)}>
    <WireOpening onAdd={() => setFormOpen(true)} />
    <WireEventNote />
    <NewsIndex entries={signals.entries} keptDay={signals.keptDay} loading={signals.isPending || signals.searching} query={q} onQueryChange={setQ} kind={kind} onKindChange={setKind} verification={filter} onVerificationChange={setFilter} hasMore={signals.hasNextPage} loadingMore={signals.isFetchingNextPage} onMore={() => signals.fetchNextPage()} />
    {formOpen && <NewsSubmitForm initialKind={kind} onClose={() => setFormOpen(false)} onSent={() => signals.refetch()} />}
  </div>;
}