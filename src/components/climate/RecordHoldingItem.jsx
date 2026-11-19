import React from 'react';
import { Link } from 'react-router-dom';
import useRecordImage from '@/components/climate/useRecordImage';
import RecordEntryPicture from '@/components/climate/RecordEntryPicture';
import RecordEntryKind from '@/components/climate/RecordEntryKind';

export default function RecordHoldingItem({ item }) {
  const image = useRecordImage(item, { entryOnly: true });
  return (
    <Link to={`/ClimateDetail/${item.entry_type}/${item.id}`} className="group block border-t border-record-ink/25 py-4 first:border-t-0 first:pt-0">
      <RecordEntryPicture image={image} />
      <div className="mt-2">
        <RecordEntryKind item={item} />
        <h3 className="record-holding-small-title mt-1.5 leading-snug text-record-ink group-hover:text-record-red">{item.title}</h3>
        {item.source_name && <p className="record-meta mt-1.5 text-xs text-record-muted">{item.source_name}</p>}
      </div>
    </Link>
  );
}