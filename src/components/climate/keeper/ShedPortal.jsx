import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarkKey, MarkEye, MarkLedger, MarkRoot, MarkGate, MarkSearch, MarkSeal, MarkWire,
} from './KeeperMarks';

// ── THE DOORS ARE WRITING, NOT CELLS ────────────────────────────────────────────
// The board used to be a two-column grid of hairline boxes with a number, a mark, a label
// and a note crammed into 150 pixels each. It was tidy, and it read like a form: five
// identical cells is how a council tells you which department to queue in, and nothing
// about a room where somebody decides what goes on the record should feel like queueing.
//
// So the boxes are gone. A door is now a line of writing you read once — the mark beside
// it, the thing it does said in a sentence, and the number wanting you at the far edge in
// the record's red. One hairline between each. Nothing is drawn around anything, because a
// border is what you put round a field on a form.
//
// Two groups, still, because the board holds two different kinds of thing and mixing them
// made a keeper work out on every visit which of the five was a job and which was a look:
//   · the work — what wants a person, ordered so the lightest job is nearest the thumb.
//     A queue of one decision comes before a sourcing sweep that could eat an evening.
//     Easiest first is not laziness; it is how a nervous person starts at all.
//   · the record — where you go to read, search and check, which changes nothing.
// And one door says "start here", chosen by what is actually waiting rather than by its
// position: if somebody is at the gate, the gate is the start of the day.
const WORK = [
  { key: 'decide', Mark: MarkKey, label: 'Yes or not yet', note: 'One entry, one decision', count: 'decide' },
  { key: 'check', Mark: MarkEye, label: 'Read & note', note: 'Open the source, sign a note', count: 'check' },
  { key: 'people', Mark: MarkGate, label: 'Who may come in', note: 'Keepers and checkers', count: 'asks' },
  { key: 'desk', Mark: MarkLedger, label: 'Counts', note: 'What the record holds' },
  { key: 'score', Mark: MarkRoot, label: 'Sourcing', note: 'How well it is known' },
];

const RECORD = [
  { to: '/ClimateSearch', Mark: MarkSearch, label: 'Search' },
  { to: '/ClimateSeals', Mark: MarkSeal, label: 'The seals' },
  { to: '/ClimateWire', Mark: MarkWire, label: 'The wire' },
];

function BandLabel({ children, right }) {
  return (
    <div className="flex items-baseline justify-between gap-3 pb-2">
      <span className="text-[12.5px] text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>
        {children}
      </span>
      {right && (
        <span className="text-[11.5px] text-[#8a7f6d]" style={{ fontFamily: 'var(--font-reading)' }}>
          {right}
        </span>
      )}
    </div>
  );
}

export default function ShedPortal({ counts = {}, isKeeper, isChecker, active, onGo }) {
  // A checker is a pair of eyes and nothing else, so their wall carries the one door their
  // line opens. A keeper who also checks keeps all five: an empty decision queue is a quiet
  // day, not a lost key.
  const tiles = isChecker && !isKeeper ? WORK.filter((t) => t.key === 'check') : WORK;

  const has = (t) => typeof (t.count ? counts[t.count] : null) === 'number' && counts[t.count] > 0;
  // The start of the day is whichever open door actually has somebody behind it. If nothing
  // wants you, it is simply the lightest job, which is the first line.
  const startKey = (tiles.find(has) || tiles[0])?.key;

  return (
    <div>
      <BandLabel right={tiles.length > 1 ? 'easiest first' : null}>
        {tiles.length > 1 ? 'What wants a person' : 'What wants you'}
      </BandLabel>

      <div className="border-t border-[#141210]/20">
        {tiles.map((t) => {
          const Mark = t.Mark;
          const n = t.count ? counts[t.count] : null;
          const on = active === t.key;
          const hot = typeof n === 'number' && n > 0;
          const start = t.key === startKey;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onGo(t.key)}
              className={`flex w-full items-start gap-3 border-b border-[#141210]/20 py-3.5 text-left transition-colors active:bg-[#141210]/5 ${
                on ? 'bg-[#141210]/5' : ''
              }`}
            >
              <span
                className="mt-0.5 shrink-0"
                style={{ color: hot || on ? '#b3261e' : '#141210' }}
              >
                <Mark size={32} />
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className="block text-[#141210]"
                  style={{
                    fontFamily: 'var(--font-reading)',
                    fontSize: '17px',
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: on ? '#b3261e' : '#141210',
                  }}
                >
                  {t.label}
                </span>
                <span
                  className="mt-0.5 block text-[12.5px] leading-snug text-[#6b5f4f]"
                  style={{ fontFamily: 'var(--font-reading)' }}
                >
                  {t.note}
                </span>
                {start && (
                  <span
                    className="mt-1 block text-[11.5px] leading-snug text-[#b3261e]"
                    style={{ fontFamily: 'var(--font-reading)' }}
                  >
                    start here
                  </span>
                )}
              </span>

              <span className="shrink-0 pl-2 text-right">
                {hot ? (
                  <span
                    className="block leading-none text-[#b3261e]"
                    style={{ fontFamily: 'var(--font-reading)', fontSize: '26px', fontWeight: 600 }}
                  >
                    {n}
                  </span>
                ) : (
                  <span
                    className="block leading-none text-[#8a7f6d]"
                    style={{ fontFamily: 'var(--font-reading)', fontSize: '18px' }}
                  >
                    →
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <BandLabel right="changes nothing">Just to read</BandLabel>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#141210]/20 pt-3">
        {RECORD.map((r) => {
          const Mark = r.Mark;
          return (
            <Link
              key={r.to}
              to={r.to}
              className="flex items-center gap-1.5 text-[#141210] active:text-[#b3261e] transition-colors"
            >
              <Mark size={18} className="text-[#6b5f4f]" />
              <span
                className="text-[12.5px]"
                style={{ fontFamily: 'var(--font-reading)' }}
              >
                {r.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}