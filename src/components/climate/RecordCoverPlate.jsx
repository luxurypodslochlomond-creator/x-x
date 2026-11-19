import React from 'react';
import { Link } from 'react-router-dom';
// The home page's sheet lives in this file, and it is loaded HERE rather than borrowed from
// the opening that used to stand in this place: when that component went, its stylesheet
// went with it, so the paper under the record's words stopped being declared at all and the
// text was ink on a painting. One import, and the sheet is a sheet again.
import '@/components/climate/record-home.css';
import ShareCardButton from './ShareCardButton';
import { buildRecordShareCard } from './shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from './shareRecordCard';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkGroups, RoomMarkAction } from './RoomMarks';
import { MarkSignal, MarkWall } from './RecordFootMarks';

// ── PLATE, TITLE, CONTENTS ──────────────────────────────────────────────────────
// Brian, 19 November: "cant see the text now… the cover painting taking up first spot…
// any way to bring back background so can see text… the ideas of the entities being
// plates/records and not boxes but not really happening here."
//
// Both halves of that are one fault. The painting had been made the page — the sheet
// behind it was set see-through so the painting could run behind everything, which meant
// the record's own words were ink laid straight onto a painting, and the plates below had
// no sheet to be printed on. Nothing was wrong with the drawings or the plates; they were
// standing on the wrong ground.
//
// So this opening is a printed front page: the painting is reproduced at the top as a
// plate, and everything that is read sits under it in ink on the record's paper — the
// masthead, the line about what the record is, then the legend of its own drawings with
// the counts behind them. Plate, title, contents, in that order, which is the order a
// broadsheet has used for three centuries because it is the order a person reads in.
//
// The drawings stay the only pictures on the paper, and no box is drawn anywhere: one
// hairline per door, the mark, the name, the count. A count is the record's own; a name is
// the door's own name.

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
      className="record-cover-plate record-home-opening w-full text-record-ink"
    >
      {/* The painting, printed on the page. Nothing is written over it, so nothing on it
          has to fight a photograph to be read. */}
      <div aria-hidden="true" className="record-cover-plate-picture" />

      <div className="mx-auto w-full max-w-[1180px] px-4 pt-6 lg:px-10 lg:pt-8">
        <p className="record-header-type border-b border-record-ink/25 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-record-red">
          {copy.service}
        </p>

        <h1
          id="record-home-title"
          className="record-cover-plate-title mt-4 max-w-[20ch] font-display uppercase leading-[0.96] tracking-[-0.015em] text-record-ink"
        >
          {copy.title_a} <span className="text-record-red">{copy.title_b}</span> {copy.title_c}
        </h1>

        <p
          className="mt-4 max-w-[58ch] text-[15px] leading-[1.7] text-record-ink/80 lg:text-[17px]"
          style={{ fontFamily: 'var(--font-reading)' }}
        >
          {copy.sub}
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1180px] px-4 lg:px-10">
        <p className="mt-8 border-t border-record-ink/25 pt-2 text-[9.5px] font-black font-mono uppercase tracking-[0.18em] text-record-muted">
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
                className={`group flex min-h-[96px] flex-col justify-between gap-2 border-l border-record-ink/20 px-3 py-3 text-left transition-colors first:border-l-0 hover:bg-record-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark lg:min-h-[124px] ${open ? 'bg-record-ink/10' : ''}`}
              >
                <span className="flex w-full items-start justify-between gap-2">
                  <Mark size={40} className="text-record-ink transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span className="font-mono text-[15px] leading-none tabular-nums text-record-red">
                    {counts[key] ?? 0}
                  </span>
                </span>
                <span className="text-[9.5px] font-black uppercase leading-none tracking-[0.16em] text-record-ink">
                  {label}
                </span>
              </button>
            );
          })}
          {DOORS.map(({ label, to, Mark }) => (
            <Link
              key={to}
              to={to}
              className="group flex min-h-[96px] flex-col justify-between gap-2 border-l border-record-ink/20 px-3 py-3 text-record-ink/80 transition-colors hover:bg-record-ink/5 hover:text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark lg:min-h-[124px]"
            >
              <span className="flex w-full items-start justify-between gap-2">
                <Mark size={40} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span aria-hidden="true" className="font-mono text-[13px] leading-none text-record-muted">→</span>
              </span>
              <span className="text-[9.5px] font-black uppercase leading-none tracking-[0.16em]">{label}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-record-ink/20 py-2.5">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-record-muted">
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