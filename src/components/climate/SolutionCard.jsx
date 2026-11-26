import React from 'react';
import { Link } from 'react-router-dom';
import useRecordImage from '@/components/climate/useRecordImage';
import SubjectMark from '@/components/climate/SubjectMark';
import RecordKindStamp from '@/components/climate/RecordKindStamp';

export default function SolutionCard({ item, lead = false }) {
  const isSolution = item.entry_type === 'solution';
  const image = useRecordImage(item, { entryOnly: true });
  // ── THE CARD WEARS ITS ROOM'S PIGMENT ─────────────────────────────────────────
  // A solution card used to carry the yellow rule and the yellow badge, which is the
  // GROUPS' colour — so on one page a solution and a gathering looked like the same
  // thing, and neither matched the green plate the room is opened by. Four rooms, four
  // pigments, and now the card, the badge and the section heading all agree: solutions
  // botanical green, crises signal red. Nothing added, one colour put back where it
  // belongs.
  const borderTone = isSolution ? 'border-t-record-botanical' : 'border-t-record-red';
  const titleSize = lead ? 'lg:text-[23px]' : 'lg:text-lg';
  return (
    <Link
      to={`/ClimateDetail/${item.entry_type}/${item.id}`}
      data-has-image={Boolean(image.src)}
      className="record-entry-plate record-media-mount relative flex h-full w-full min-w-0 flex-col bg-record-paper text-left text-record-ink"
    >
      {image.src && <span className="record-entry-image relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-record-bone">
        {/* The picture stays, and so does its credit: a picture with its source on it is the
            honest thing, and taking them away left the record blank (Brian, 18 November). */}
        <img src={image.src} alt="" loading={lead ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 h-full w-full object-cover" onError={image.onError} />
        {image.credit && (
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-record-ink via-record-ink/70 to-transparent px-2 pb-1.5 pt-7 font-mono text-[9px] uppercase leading-[1.4] tracking-[0.12em] text-record-paper/90">
            {image.credit}
          </span>
        )}
      </span>}
      <div className={['record-entry-copy w-full flex-1 border-t-4 bg-record-paper p-4', borderTone].join(' ')}>
        {/* ── THE SUBJECT'S OWN DRAWING, ON THE CARD ────────────────────────────────
            Brian, 19 November: "love icons coolasfuck coming through to relevant bits of
            pages." The card already said which room it was in; it now says what the entry
            is about, in the record's printed hand rather than a borrowed glyph — so a
            reader scanning the pictures can see two entries on the same subject before
            reading a word. */}
        <div className="mb-3 flex items-center gap-2">
          <RecordKindStamp kind={isSolution ? 'solution' : 'crisis'} />
          {item.category && <SubjectMark subject={item.category} size={18} className="shrink-0" />}
        </div>
        <h3 className={['record-header-type text-[15px] uppercase leading-[1.4] sm:text-lg', titleSize].join(' ')}>
          {item.title}
        </h3>
        {!image.src && <span className="mt-2 block text-xs text-record-muted">{image.missingLabel}</span>}
      </div>
    </Link>
  );
}