import React from 'react';
import { Link } from 'react-router-dom';
import useRecordImage from '@/components/climate/useRecordImage';
import RecordEntryPicture from '@/components/climate/RecordEntryPicture';
import RecordEntryKind from '@/components/climate/RecordEntryKind';

export default function RecordEntryRow({ item, index = 0, flip = false }) {
  const image = useRecordImage(item, { entryOnly: true });
  const hasImage = Boolean(image.src);
  return (
    <Link
      to={`/ClimateDetail/${item.entry_type}/${item.id}`}
      className={`group grid items-start gap-7 border-t border-record-ink/25 py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${hasImage ? 'grid-cols-[minmax(0,6fr)_minmax(0,5fr)]' : 'grid-cols-1'}`}
    >
      {hasImage && <RecordEntryPicture image={image} className={flip ? 'order-2' : 'order-1'} />}
      <div className={`min-w-0 self-center ${hasImage && flip ? 'order-1' : 'order-2'}`}>
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] tabular-nums text-record-muted">{String(index + 1).padStart(2, '0')}</span>
          <RecordEntryKind item={item} />
        </div>
        <h3 className="record-row-title mt-2 leading-tight text-record-ink group-hover:text-record-red">{item.title}</h3>
        {item.summary && <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-record-ink/80">{item.summary}</p>}
        {(item.source_name || item.country) && (
          <p className="record-meta mt-3 text-xs leading-relaxed text-record-muted">
            {[item.source_name, item.country].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  );
}