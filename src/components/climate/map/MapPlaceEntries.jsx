import React from 'react';
import MapSignalMark from '@/components/climate/MapSignalMark';

export default function MapPlaceEntries({ entries, picked, onPick }) {
  if (entries.length < 2) return null;
  return (
    <div className="record-map-place-entries">
      <p className="record-meta mb-2 text-record-muted">{entries.length} entries in {picked.country || 'this place'}</p>
      <div className="grid gap-1">
        {entries.map((entry) => (
          <button type="button" key={entry.id} onClick={() => onPick(entry)} aria-pressed={picked.id === entry.id} className="flex min-h-11 items-start gap-2 border border-record-ink/15 px-2 py-3 text-left text-sm text-record-ink">
            <MapSignalMark kind={entry.type} className="mt-0.5 shrink-0" />
            <span>{entry.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}