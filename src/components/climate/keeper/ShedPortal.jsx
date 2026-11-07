import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarkKey, MarkEye, MarkLedger, MarkRoot, MarkGate, MarkSearch, MarkSeal, MarkWire,
} from './KeeperMarks';

// ── THE SHOOTING BOARD ──────────────────────────────────────────────────────────
// The shed used to be a page you read: a headline, a button, a folded-away index of
// text rows, then a row of tabs to get somewhere else. Three ways round one small room,
// and all of them wanted reading before they wanted a thumb.
//
// This is one board on the wall instead. Every place is a mark you can hit without
// reading it twice, the number that wants you is on the mark itself, and the room you
// are standing in is the one wearing the red line. Nothing is folded away: a door you
// cannot see is a door you have to remember.
//
// Two bands, because the board holds two different kinds of thing and mixing them made
// a keeper work out on every visit which of the five was a job and which was a look:
//   · the work — what wants a person, ordered so the lightest job is nearest the thumb.
//     A queue of five entries that each take one decision comes before a sourcing sweep
//     that could eat an evening. Easiest first is not laziness; it is how a nervous person
//     starts at all.
//   · the record — where you go to read, search and check, which changes nothing.
// And one door is tagged "start here", chosen by what is actually waiting rather than by
// its position: if two people are at the gate, the gate is the start of the day.
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
    <div className="flex items-baseline justify-between gap-3 pb-1.5">
      <span className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-[#6b5f4f]">
        {children}
      </span>
      {right && (
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#8a7f6d]">
          {right}
        </span>
      )}
    </div>
  );
}

export default function ShedPortal({ counts = {}, isKeeper, isChecker, active, onGo }) {
  // A checker is a pair of eyes and nothing else, so their wall carries the one plate their
  // line opens. A keeper who also checks keeps all five: an empty decision queue is a quiet
  // day, not a lost key.
  const tiles = isChecker && !isKeeper
    ? WORK.filter((t) => t.key === 'check')
    : WORK;

  const has = (t) => typeof (t.count ? counts[t.count] : null) === 'number' && counts[t.count] > 0;
  // The start of the day is whichever open door actually has somebody behind it. If
  // nothing wants you, it is simply the lightest job, which is the first plate.
  const startKey = (tiles.find(has) || tiles[0])?.key;

  return (
    <div>
      <BandLabel right={tiles.length > 1 ? 'easiest first' : null}>
        {tiles.length > 1 ? 'The work' : 'Your work'}
      </BandLabel>

      <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-l border-[#141210]/20">
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
              className={`relative overflow-hidden text-left p-3 min-h-[150px] border-b border-r border-[#141210]/20 active:bg-[#141210]/10 transition-colors ${tiles.length === 1 ? 'col-span-2 sm:col-span-3' : ''}`}
              style={on ? { background: 'rgba(20,18,16,0.04)' } : {}}
            >
              {on && <span className="absolute top-0 left-0 right-0 bg-[#b3261e]" style={{ height: '3px' }} />}

              {start && (
                <span className="absolute top-2.5 right-2.5 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-[#b3261e]">
                  start here
                </span>
              )}
              {hot ? (
                <span
                  className="block font-black leading-none text-[#b3261e]"
                  style={{ fontFamily: 'var(--font-reading)', fontSize: '22px' }}
                >
                  {n}
                </span>
              ) : (
                <span className="block text-[22px] leading-none text-transparent select-none">·</span>
              )}

              <Mark size={50} className="mt-1 text-[#141210]" />

              <span
                className="block mt-2 text-[14px] leading-tight text-[#141210]"
                style={{ fontFamily: 'var(--font-reading)', fontWeight: 600 }}
              >
                {t.label}
              </span>
              <span
                className="block mt-0.5 text-[11px] leading-snug text-[#6b5f4f]"
                style={{ fontFamily: 'var(--font-reading)' }}
              >
                {t.note}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <BandLabel right="changes nothing">The record</BandLabel>
      </div>
      <div className="grid grid-cols-3 border-t border-l border-[#141210]/20">
        {RECORD.map((r) => {
          const Mark = r.Mark;
          return (
            <Link
              key={r.to}
              to={r.to}
              className="flex flex-col items-start gap-2 p-2.5 min-h-[92px] border-b border-r border-[#141210]/20 active:bg-[#141210]/5 transition-colors"
            >
              <Mark size={32} className="text-[#141210]" />
              <span
                className="text-[11.5px] leading-tight text-[#141210]"
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