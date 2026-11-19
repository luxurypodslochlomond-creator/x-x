import React from 'react';
import { ChevronDown } from 'lucide-react';
import SourceBlock from '@/components/climate/SourceBlock';
import SourceArchiveNote from '@/components/climate/SourceArchiveNote';
import RecordCitation from '@/components/climate/RecordCitation';

export default function NewsEntryReferences({ entry, citation }) {
  return (
    <details className="news-references">
      <summary>Source details & citation <ChevronDown size={15} aria-hidden="true" /></summary>
      <div className="news-references-content">
        <SourceBlock sourceName={entry.source_name} sourceUrl={entry.source_url} sourceAuthor={entry.source_author} sourceDate={entry.when_label} publisherType={entry.publisher_type} kindLabel={entry.kind} accessed={entry.created_date} />
        <SourceArchiveNote entryId={entry.id} sourceUrl={entry.source_url} />
        <RecordCitation citation={citation} label="Cite this account" note="The source, date and permanent link travel with the citation. Any correction stays visible on the account." />
      </div>
    </details>
  );
}