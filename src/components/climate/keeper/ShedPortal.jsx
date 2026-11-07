import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarkStamp, MarkEye, MarkLedger, MarkRoot, MarkGate, MarkSearch, MarkSeal, MarkWire,
} from './KeeperMarks';

// ── MARKS ON PAPER, NOT CARDS ON A PAGE ─────────────────────────────────────────
// Three goes at this wall, and the fault was the same every time: it was dressed as an
// interface. A grid of cells, then a list of rows, then a mosaic of plates — each one
// carried a frame, a label, a helper line under the label and a number in a corner,
// because that is what a dashboard does, and a dashboard is the least cool thing on earth.
//
// So no frames, nothing boxed: nothing on this wall is a field to fill in. There is one door
// given the whole width and a mark the size of a hand — the job somebody came to do — and
// then the other doors as engravings on the paper, ruled off from one another the way a
// book's contents page rules off its lines.
//
// What changed after somebody tried to use it on a phone: it was beautiful and it was a
// guessing game. A mark and two words is a riddle if you have not been shown the room, and
// "Sourcing" tells a person nothing until they have opened it once. So every door now says,
// in one short line of plain words, what happens if you push it — and every mark is drawn
// for the job behind its door rather than for the shape it makes. That is the whole
// correction: not more furniture, just no riddles.
//
// The only chrome is still a hairline and one number in the record's red.
const WORK = [
  {
    key: 'decide',
    Mark: MarkStamp,
    label: 'Yes or not yet',
    note: 'Read it, then put it on the record or leave it waiting.',
    count: 'decide',
  },
  {
    key: 'check',
    Mark: MarkEye,
    label: 'Read & note',
    note: 'Open where an entry is claimed from and say what you find.',
    count: 'check',
  },
  {
    key: 'people',
    Mark: MarkGate,
    label: 'Who may come in',
    note: 'Add a person, pause them, or take them off the list.',
    count: 'asks',
  },
  { key: 'desk', Mark: MarkLedger, label: 'Counts', note: 'What the record holds, and how much of it.' },
  { key: 'score', Mark: MarkRoot, label: 'Sourcing', note: 'Where each claim came from, and how well it is known.' },
];

const RECORD = [
  { to: '/ClimateSearch', Mark: MarkSearch, label: 'Search' },
  { to: '/ClimateSeals', Mark: MarkSeal, label: 'The seals' },
  { to: '/ClimateWire', Mark: MarkWire, label: 'The wire' },
];

function Numeral({ n, size }) {
  if (!(typeof n === 'number' && n > 0)) return null;
  return (
    <span
      className="shrink-0 leading-none text-[#b3261e]"
      style={{ fontFamily: 'var(--font-reading)', fontSize: size, fontWeight: 600, letterSpacing: '-0.03em' }}
    >
      {n}
    </span>
  );
}

export default function ShedPortal({ counts = {}, isKeeper, isChecker, active, onGo }) {
  // A checker is a pair of eyes and nothing else, so the one door their line opens takes the
  // whole wall. A keeper who also checks keeps every door: an empty queue is a quiet day.
  const soloChecker = isChecker && !isKeeper;
  const tiles = soloChecker ? WORK.filter((t) => t.key === 'check') : WORK;

  const countOf = (t) => (t.count ? counts[t.count] : null);
  const has = (t) => typeof countOf(t) === 'number' && countOf(t) > 0;
  // The door given the width is whichever one actually has somebody behind it; on a quiet
  // day it is the lightest job, so the wall never opens on nothing.
  const leadKey = (tiles.find(has) || tiles[0])?.key;
  const lead = tiles.find((t) => t.key === leadKey);
  const rest = tiles.filter((t) => t.key !== leadKey);

  const Lead = lead?.Mark;
  const leadOn = active === lead?.key;

  return (
    <div>
      {/* ── THE ONE DOOR ─────────────────────────────────────────────────────── */}
      <div className="border-t border-[#141210]/20 pt-5">
        <button
          type="button"
          onClick={() => onGo(lead.key)}
          aria-current={leadOn ? 'true' : undefined}
          className="-mx-2 flex w-full items-start gap-4 rounded-sm px-2 py-1 text-left transition-colors active:bg-[#141210]/5"
        >
          <span className="shrink-0 pt-0.5" style={{ color: leadOn ? '#b3261e' : '#141210' }}>
            <Lead size={72} />
          </span>
          <span className="min-w-0 flex-1 pt-1">
            <span className="flex items-start justify-between gap-2">
              <span
                className="block"
                style={{
                  fontFamily: 'var(--font-reading)',
                  fontSize: '26px',
                  fontWeight: 600,
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  color: leadOn ? '#b3261e' : '#141210',
                }}
              >
                {lead.label}
              </span>
              <Numeral n={countOf(lead)} size="34px" />
            </span>
            {lead.note && (
              <span
                className="mt-2 block text-[13.5px] leading-[1.5] text-[#5c5145]"
                style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}
              >
                {lead.note}
              </span>
            )}
          </span>
        </button>
      </div>

      {/* ── THE OTHER DOORS — engravings ruled off like a contents page ───────── */}
      {rest.length > 0 && (
        <div className="mt-5 border-t border-[#141210]/20">
          {rest.map((t) => {
            const Mark = t.Mark;
            const on = active === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onGo(t.key)}
                aria-current={on ? 'true' : undefined}
                className="-mx-2 flex w-full items-center gap-3.5 border-b border-[#141210]/12 px-2 py-3.5 text-left transition-colors active:bg-[#141210]/5"
              >
                <span className="shrink-0" style={{ color: on ? '#b3261e' : '#141210' }}>
                  <Mark size={44} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block"
                    style={{
                      fontFamily: 'var(--font-reading)',
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                      color: on ? '#b3261e' : '#141210',
                    }}
                  >
                    {t.label}
                  </span>
                  <span
                    className="mt-1 block text-[12.5px] leading-[1.45] text-[#6b5f4f]"
                    style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}
                  >
                    {t.note}
                  </span>
                </span>
                <Numeral n={countOf(t)} size="22px" />
              </button>
            );
          })}
        </div>
      )}

      {/* ── TO READ, WHICH CHANGES NOTHING ───────────────────────────────────── */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-[#141210]/20 pt-3.5">
        {RECORD.map((r) => {
          const Mark = r.Mark;
          return (
            <Link
              key={r.to}
              to={r.to}
              className="-my-2 flex items-center gap-1.5 py-2 text-[#6b5f4f] transition-colors active:text-[#b3261e]"
            >
              <Mark size={18} />
              <span className="text-[12.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
                {r.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}