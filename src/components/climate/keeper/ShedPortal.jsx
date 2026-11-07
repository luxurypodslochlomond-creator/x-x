import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarkKey, MarkEye, MarkLedger, MarkRoot, MarkGate, MarkSearch, MarkSeal, MarkWire,
} from './KeeperMarks';

// ── MARKS ON PAPER, NOT CARDS ON A PAGE ─────────────────────────────────────────
// Three goes at this wall, and the fault was the same every time: it was dressed as an
// interface. A grid of cells, then a list of rows, then a mosaic of plates — each one
// carried a frame, a label, a helper line under the label and a number in a corner,
// because that is what a dashboard does, and a dashboard is the least cool thing on earth.
//
// So all of it is gone. There are no frames here and nothing is boxed, because nothing on
// this wall is a field to fill in. There is one door given the whole width and a mark the
// size of a hand — the job somebody came to do — and then the other doors as bare
// engravings on the paper, in a quiet pair below a hairline. A helper line only where a
// person genuinely cannot guess (the one door that decides something).
//
// The only chrome left is two rules that run the full width of the sheet and one number in
// the record's red. That is the whole design, and it is the whole point: on this record,
// restraint is the look, and anything added to it is a loss.
const WORK = [
  { key: 'decide', Mark: MarkKey, label: 'Yes or not yet', note: 'Yes puts it on the record, sealed and signed with your name.', count: 'decide' },
  { key: 'check', Mark: MarkEye, label: 'Read & note', note: 'Your note is signed in your own name.', count: 'check' },
  { key: 'people', Mark: MarkGate, label: 'Who may come in', count: 'asks' },
  { key: 'desk', Mark: MarkLedger, label: 'Counts' },
  { key: 'score', Mark: MarkRoot, label: 'Sourcing' },
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
      className="leading-none text-[#b3261e]"
      style={{ fontFamily: 'var(--font-reading)', fontSize: size, fontWeight: 600, letterSpacing: '-0.02em' }}
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

  const has = (t) => typeof (t.count ? counts[t.count] : null) === 'number' && counts[t.count] > 0;
  // The door given the width is whichever one actually has somebody behind it; on a quiet
  // day it is the lightest job, so the wall never opens on nothing.
  const leadKey = (tiles.find(has) || tiles[0])?.key;
  const lead = tiles.find((t) => t.key === leadKey);
  const rest = tiles.filter((t) => t.key !== leadKey);

  const Lead = lead?.Mark;

  return (
    <div>
      {/* ── THE ONE DOOR ─────────────────────────────────────────────────────── */}
      <div className="border-t border-[#141210]/20 pt-5">
        <button
          type="button"
          onClick={() => onGo(lead.key)}
          className="flex w-full items-start gap-4 text-left"
        >
          <span
            className="shrink-0"
            style={{ color: active === lead.key ? '#b3261e' : '#141210' }}
          >
            <Lead size={74} />
          </span>
          <span className="min-w-0 flex-1 pt-1">
            <span className="flex items-start justify-between gap-2">
              <span
                className="block text-[#141210]"
                style={{
                  fontFamily: 'var(--font-reading)',
                  fontSize: '25px',
                  fontWeight: 600,
                  lineHeight: 1.14,
                  letterSpacing: '-0.015em',
                  color: active === lead.key ? '#b3261e' : '#141210',
                }}
              >
                {lead.label}
              </span>
              <Numeral n={lead.count ? counts[lead.count] : null} size="30px" />
            </span>
            {lead.note && (
              <span
                className="mt-1.5 block text-[12.5px] leading-[1.5] text-[#6b5f4f]"
                style={{ fontFamily: 'var(--font-reading)' }}
              >
                {lead.note}
              </span>
            )}
          </span>
        </button>
      </div>

      {/* ── THE OTHER DOORS — bare engravings, nothing drawn round them ───────── */}
      {rest.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-[#141210]/20 pt-5">
          {rest.map((t) => {
            const Mark = t.Mark;
            const on = active === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onGo(t.key)}
                className="flex items-start gap-2.5 text-left"
              >
                <span
                  className="shrink-0"
                  style={{ color: on ? '#b3261e' : '#141210' }}
                >
                  <Mark size={34} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-[14px]"
                    style={{
                      fontFamily: 'var(--font-reading)',
                      fontWeight: 600,
                      lineHeight: 1.25,
                      color: on ? '#b3261e' : '#141210',
                    }}
                  >
                    {t.label}
                  </span>
                  {typeof (t.count ? counts[t.count] : null) === 'number' && counts[t.count] > 0 && (
                    <span className="mt-0.5 block">
                      <Numeral n={counts[t.count]} size="16px" />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── TO READ, WHICH CHANGES NOTHING ───────────────────────────────────── */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#141210]/20 pt-3.5">
        {RECORD.map((r) => {
          const Mark = r.Mark;
          return (
            <Link
              key={r.to}
              to={r.to}
              className="flex items-center gap-1.5 text-[#6b5f4f] transition-colors active:text-[#b3261e]"
            >
              <Mark size={17} />
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