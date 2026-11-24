import React from 'react';
import VerificationBadge from '@/components/climate/VerificationBadge';

export default function MapEntrySources({ entry }) {
  return (
    <div className="record-map-sources">
      {entry.type !== 'cartoon' && <VerificationBadge entry={entry} />}
      {entry.source_name && (entry.source_url ? (
        <a href={entry.source_url} target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-record-muted underline underline-offset-4">{entry.source_name} ↗</a>
      ) : <p className="record-meta mt-2 text-record-muted">{entry.source_name}</p>)}
      {entry.credit && <p className="record-meta mt-2 text-record-muted">{entry.credit}</p>}
    </div>
  );
}