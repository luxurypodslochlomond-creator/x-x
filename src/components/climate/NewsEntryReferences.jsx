import React from 'react';
import SourceBlock from '@/components/climate/SourceBlock';
import SourceArchiveNote from '@/components/climate/SourceArchiveNote';
import RecordCitation from '@/components/climate/RecordCitation';

// ── WHERE THIS COMES FROM, IN THE OPEN ─────────────────────────────────────────
// Brian, 26 November: "the sources drop down thing what is that feels old and disconnected
// bro not us at all".
//
// He was right, and it was the only piece of the Wire built like a different website: a
// disclosure triangle over a heavy black box with blue machine labels, sitting under an
// entry that had just been set like a document. Worse than the look, the shape was wrong —
// a source is the proof of an entry, and proof that is folded away reads as something being
// kept back. Everywhere else on this record the proof is standing in the open.
//
// So there is no triangle and no box. The section is headed in the register's own hand, with
// the same double rule the register line uses at the top of an entry, and the source, the
// archive note and the citation follow in the record's ink. Nothing was removed: the same
// three things are on the page, and they are on it without being asked for.
export default function NewsEntryReferences({ entry, citation }) {
  return (
    <section id="sources" className="news-references" aria-label="Where this comes from, and how to cite it">
      <p className="news-references-head">
        Where this comes from <span aria-hidden="true">·</span> and how to cite it
      </p>
      <div className="news-references-content">
        <SourceBlock
          sourceName={entry.source_name}
          sourceUrl={entry.source_url}
          sourceAuthor={entry.source_author}
          sourceDate={entry.when_label}
          publisherType={entry.publisher_type}
          kindLabel={entry.kind}
          accessed={entry.created_date}
        />
        <SourceArchiveNote entryId={entry.id} sourceUrl={entry.source_url} />
        <RecordCitation
          citation={citation}
          label="Cite this account"
          note="The source, date and permanent link travel with the citation. Any correction stays visible on the account."
        />
      </div>
    </section>
  );
}