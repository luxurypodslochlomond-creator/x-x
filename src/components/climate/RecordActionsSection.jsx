import React from 'react';
import ActionCard from '@/components/climate/ActionCard';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';
import RecordStandfirst from '@/components/climate/RecordStandfirst';
import { RoomMarkAction } from '@/components/climate/RoomMarks';

export default function RecordActionsSection({ actions, totalCount, copy }) {
  return (
    <section className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
      <RecordSectionHeading title={copy.actions} count={actions.length} tone="text-record-ochre" mark={RoomMarkAction} />
      <RecordStandfirst>{copy.actions_sub}</RecordStandfirst>
      {actions.length > 0 ? (
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
          {actions.map(action => <ActionCard key={action.id} action={action} />)}
        </div>
      ) : (
        <p className="py-6 text-center font-mono text-[11px] text-record-muted">{totalCount === 0 ? copy.actions_empty : copy.empty}</p>
      )}
    </section>
  );
}