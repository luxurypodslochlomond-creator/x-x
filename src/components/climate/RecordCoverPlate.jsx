import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from './ShareCardButton';
import { buildRecordShareCard } from './shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from './shareRecordCard';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkGroups, RoomMarkAction } from './RoomMarks';
import { MarkSignal, MarkWall } from './RecordFootMarks';

// ── THE PAINTING IS THE FRONT PAGE ──────────────────────────────────────────────
// Brian, 19 November: "use images for maximum impact for right reasons… put crises solutions
// actions signals drawings on the coolasfuck painting in right place."
//
// The opening used to be a strip, a title band, a yellow summary box and then — further down —
// four coloured rectangles with counts on them. That is a website: a header, a subheader, a
// callout, a filter bar. It is also four boxes of flat colour sitting in front of a painting
// that was made to be looked at.
//
// So the painting is the front page now, and the record's own drawings are laid on it the way
// a legend is printed on a plate: one rule, one row, six marks, each carrying its own name and
// — for the four rooms — how much the record actually holds behind it. No boxes, no fills, no
// colour blocks: the drawings are the only ink on the painting, and the painting is the only
// colour. Pressing a room narrows the record and carries you down to it; pressing Signals or
// The Wall opens those rooms.
//
// Nothing here invents a claim. A count is the record's own; a name is the door's own name.

const ROOMS = [
  { key: 'solution', label: 'Solutions', Mark: RoomMarkSolution },
  { key: 'climate_crisis', label: 'Crises', Mark: RoomMarkCrisis },
  { key: 'groups', label: 'Groups', Mark: RoomMarkGroups },
  { key: 'actions', label: 'Actions', Mark: RoomMarkAction },
];

const DOORS = [
  { label: 'Signals', to: '/ClimateWire', Mark: MarkSignal },
  { label: 'The Wall', to: '/ClimateCartoons', Mark: MarkWall },
];

const RECORD_CARD = { id: 'record-of-the-time', title: RECORD_SHARE_TITLE };

export default function RecordCoverPlate({ copy, counts = {}, selected, onSelect }) {
  return (
    <section
      aria-labelledby="record-home-title"
      className="record-cover-plate record-home-opening relative isolate w-full overflow-hidden text-record-bone"
    >
      {/* The painting is the ground. This veil only exists so the words at the foot of it can
          be read; the top of the painting is left alone, because that is the part a reader
          should meet first. */}
      <div aria-hidden="true" className="record-cover-plate-veil pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex min-h-[72vh] w-full max-w-[1440px] flex-col justify-end px-4 pt-24 lg:min-h-[80vh] lg:px-10 lg:pt-32">
        <p className="record-header-type text-[10px] uppercase tracking-[0.2em] text-record-bone/65">
          {copy.service}
        </p>
        <h1
          id="record-home-title"
          className="record-cover-plate-title mt-4 max-w-[18ch] font-display uppercase leading-[0.98] tracking-[-0.015em] text-record-bone"
        >
          {copy.title_a} <span className="text-cartoon-sun">{copy.title_b}</span> {copy.title_c}
        </h1>
        <p className="mt-5 max-w-[56ch] text-[14.5px] leading-[1.7] text-record-bone/85 lg:text-[16.5px]">
          {copy.sub}
        </p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 lg:px-10">
        <p className="mt-10 border-t border-record-bone/25 pt-2 text-[9.5px] font-black font-mono uppercase tracking-[0.18em] text-record-bone/55">
          Everything here is in one of these
        </p>

        <div className="grid grid-cols-3 lg:grid-cols-6">
          {ROOMS.map(({ key, label, Mark }) => {
            const open = selected === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(key)}
                aria-pressed={open}
                className={`group flex min-h-[86px] flex-col justify-between gap-2 border-l border-record-bone/20 px-3 py-3 text-left transition-colors first:border-l-0 hover:bg-record-bone/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-bone lg:min-h-[104px] ${open ? 'bg-record-bone/15' : ''}`}
              >
                <span className="flex w-full items-start justify-between gap-2">
                  <Mark size={30} className="text-record-bone transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span className="font-mono text-[15px] leading-none tabular-nums text-cartoon-sun">
                    {counts[key] ?? 0}
                  </span>
                </span>
                <span className="text-[9.5px] font-black uppercase leading-none tracking-[0.16em] text-record-bone">
                  {label}
                </span>
              </button>
            );
          })}
          {DOORS.map(({ label, to, Mark }) => (
            <Link
              key={to}
              to={to}
              className="group flex min-h-[86px] flex-col justify-between gap-2 border-l border-record-bone/20 px-3 py-3 text-record-bone/80 transition-colors hover:bg-record-bone/10 hover:text-record-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-bone lg:min-h-[104px]"
            >
              <span className="flex w-full items-start justify-between gap-2">
                <Mark size={30} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span aria-hidden="true" className="font-mono text-[13px] leading-none text-record-bone/40">→</span>
              </span>
              <span className="text-[9.5px] font-black uppercase leading-none tracking-[0.16em]">{label}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-record-bone/20 py-2.5">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-record-bone/55">
            {copy.noads} · {copy.nofund}
          </span>
          <ShareCardButton
            entry={RECORD_CARD}
            build={buildRecordShareCard}
            link={RECORD_LINK}
            description={copy.sub}
            previewFirst
            inline
          />
        </div>
      </div>
    </section>
  );
}