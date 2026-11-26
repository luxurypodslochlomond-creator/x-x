import React from 'react';
import { ExternalLink } from 'lucide-react';

// THE SOURCE BLOCK — the record's own bibliographic line, in the shape the record's people
// already use by hand: SOURCE, then who, then the link, then the author, the date, and when we
// last looked at it.
//
// A reader — a researcher, a journalist, a student — should be able to lift this off the page
// and put it in a footnote without asking us anything. That is what makes an entry citable,
// and a citable entry is what makes the record worth citing.

const PUBLISHER_LABELS = {
  official_body: 'Official body',
  journal: 'Journal',
  news_media: 'News media',
  ngo: 'Organisation on the ground',
  field_dispatch: 'Dispatch from the field',
  document: 'Document',
};

function fmtAccessed(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return '';
    return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return ''; }
}

const Row = ({ label, children }) => (
  <div className="grid grid-cols-[74px_1fr] gap-2 items-baseline">
    <span className="source-row-label text-[11px] font-black font-mono uppercase tracking-widest text-record-ocean">{label}</span>
    <span className="text-[13px] lg:text-[14px] font-body text-record-ink leading-relaxed min-w-0">{children}</span>
  </div>
);

export default function SourceBlock({ sourceName, sourceUrl, sourceAuthor, sourceDate, publisherType, kindLabel, accessed }) {
  if (!sourceName && !sourceUrl) return null;

  return (
    <div className="mt-5 bg-[#f7f1e5] border-2 border-[#141210] p-4">
      <p className="source-block-head text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-3">Where this comes from</p>
      <div className="space-y-1.5">
        {sourceName && (
          <Row label="Source">
            <span className="font-bold">{sourceName}</span>
          </Row>
        )}
        {sourceUrl && (
          <Row label="Link">
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#0f5f7a] break-all inline-flex items-start gap-1.5">
              <span className="break-all">{sourceUrl}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5" />
            </a>
          </Row>
        )}
        {sourceAuthor && <Row label="Author">{sourceAuthor}</Row>}
        {sourceDate && <Row label="Date">{sourceDate}</Row>}
        {publisherType && PUBLISHER_LABELS[publisherType] && <Row label="Type">{PUBLISHER_LABELS[publisherType]}</Row>}
        {kindLabel && <Row label="Kind">{kindLabel}</Row>}
        <Row label="Accessed">{fmtAccessed(accessed) || '—'}</Row>
      </div>
      {!sourceUrl && (
        <p className="text-[10px] font-mono text-[#b3261e] mt-3 leading-relaxed">
          No link to the origin is held for this entry. It can be quoted as the record's own — and if you know where it came from, tell us and it is added in the open.
        </p>
      )}
    </div>
  );
}