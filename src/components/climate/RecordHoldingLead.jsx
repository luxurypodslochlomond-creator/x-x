import React from 'react';
import { Link } from 'react-router-dom';
import useRecordImage from '@/components/climate/useRecordImage';
import RecordEntryPicture from '@/components/climate/RecordEntryPicture';
import RecordEntryKind from '@/components/climate/RecordEntryKind';

export default function RecordHoldingLead({ item }) {
  const image = useRecordImage(item, { entryOnly: true });
  return (
    <Link to={`/ClimateDetail/${item.entry_type}/${item.id}`} className="group block min-w-0">
      <RecordEntryPicture image={image} priority />
      <div className="mt-3">
        <RecordEntryKind item={item} />
        <h3 className="record-holding-title mt-2 leading-tight text-record-ink group-hover:text-record-red">{item.title}</h3>
        {item.summary && <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-record-ink/80">{item.summary}</p>}
        {item.source_name && <p className="record-meta mt-3 text-xs text-record-muted">{item.source_name}</p>}
      </div>
    </Link>
  );
}