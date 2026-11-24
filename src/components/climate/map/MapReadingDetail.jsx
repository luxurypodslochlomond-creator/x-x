import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function MapReadingDetail({ place, onClose }) {
  return (
    <div className="record-map-picked">
      <div className="flex items-center justify-between gap-2">
        <span className="record-meta text-record-muted">Readership · approximate place</span>
        <button type="button" onClick={onClose} aria-label="Close readership details" className="grid h-11 w-11 shrink-0 place-items-center"><X size={18} /></button>
      </div>
      <h2 className="text-xl text-record-ink">{place.name}</h2>
      <p className="mt-3 font-bold text-record-ink">{place.reads}</p>
      <p className="record-meta mt-3 text-record-muted">Entry openings, not people. This place was stated by readers’ devices or by readers themselves. It does not identify which entry was read here.</p>
      <Link to={`/ClimateReachPlace/${place.kind}/${encodeURIComponent(place.place)}`} state={{ recordReturn: 'map' }} className="record-map-open">Read this place’s count →</Link>
    </div>
  );
}