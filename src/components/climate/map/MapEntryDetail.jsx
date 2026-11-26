import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import MapSignalMark from '@/components/climate/MapSignalMark';
import MapEntrySources from '@/components/climate/map/MapEntrySources';
import MapPlaceEntries from '@/components/climate/map/MapPlaceEntries';

const labels = { crisis: 'Climate crisis', solution: 'Solution', action: 'Action', wire: 'The Wire', cartoon: 'Cartoon' };
export default function MapEntryDetail({ entry, here, onPick, onClose, category }) {
  const href = entry.type === 'wire' ? `/ClimateWireEntry/${entry.entryId}`
    : entry.type === 'cartoon' ? `/ClimateCartoons?drawing=${encodeURIComponent(entry.entryId)}`
      : `/ClimateDetail/${entry.type === 'crisis' ? 'climate_crisis' : entry.type}/${entry.entryId}`;
  return (
    <div className="record-map-picked">
      <div className="flex items-center gap-2">
        <MapSignalMark kind={entry.type} />
        <span className="record-meta text-record-muted">{labels[entry.type]}</span>
        <button type="button" onClick={onClose} aria-label="Close entry details" className="ml-auto grid h-11 w-11 shrink-0 place-items-center"><X size={18} /></button>
      </div>
      {entry.country && <p className="record-meta mt-1 text-record-muted">{entry.country}</p>}
      {/* ── THE DRAWING ITSELF, ON THE PLATE ──────────────────────────────────────
          A cartoon selected on the map used to give its title, its line and a link away to
          the wall — everything except the drawing. On a plate made of drawings, that was the
          one thing missing: you could see where a picture was made and not the picture. It
          stands here now, whole and uncropped, and tapping it opens it on the wall. */}
      {entry.type === 'cartoon' && entry.display_image_url && (
        <Link
          to={href}
          state={{ recordReturn: 'map' }}
          className="mt-3 block border border-record-ink/20 bg-record-bone p-1"
        >
          <img
            src={entry.display_image_url}
            alt={entry.artist_name ? `A drawing by ${entry.artist_name}` : 'A drawing on the wall'}
            loading="lazy"
            className="mx-auto block max-h-[42vh] w-auto max-w-full object-contain"
          />
        </Link>
      )}
      <h2 className="mt-2 text-xl leading-snug text-record-ink">{entry.title}</h2>
      {entry.summary && <p className="mt-3 text-sm leading-relaxed text-record-ink">{entry.summary}</p>}
      <div className="mt-4"><MapEntrySources entry={entry} /></div>
      <Link to={href} state={{ recordReturn: 'map' }} className="record-map-open">{entry.type === 'cartoon' ? 'See this cartoon on the Wall →' : 'Open the full entry →'}</Link>
      {entry.category && <p className="record-meta mt-3 text-record-muted">{category(entry.category)}</p>}
      <MapPlaceEntries entries={here} picked={entry} onPick={onPick} />
    </div>
  );
}