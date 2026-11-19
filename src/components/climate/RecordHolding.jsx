import React from 'react';
import RecordHoldingLead from '@/components/climate/RecordHoldingLead';
import RecordHoldingItem from '@/components/climate/RecordHoldingItem';

export default function RecordHolding({ items = [], loading = false }) {
  if (loading) {
    return (
      <div role="status" className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <span className="sr-only">Loading entries</span>
        <div className="aspect-[16/10] w-full animate-pulse bg-record-ink/10" />
        <div className="flex flex-col gap-4">
          <div className="h-28 animate-pulse bg-record-ink/10" />
          <div className="h-28 animate-pulse bg-record-ink/10" />
        </div>
      </div>
    );
  }
  const [lead, ...rest] = items;
  if (!lead) return null;
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-8">
      <RecordHoldingLead item={lead} />
      <div className="min-w-0">
        {rest.map(item => <RecordHoldingItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}