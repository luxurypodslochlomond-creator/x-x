import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarkStamp, MarkEye, MarkLedger, MarkRoot, MarkGate, MarkSearch, MarkSeal, MarkWire,
} from './KeeperMarks';

// ── THE SHED, AS A BOARD OF MARKS, SIDE BY SIDE ─────────────────────────────────
// This wall has been three things and none of them worked in a hand. A grid of cells read
// like paperwork. A column of full-width rows read like a settings menu and made a phone
// into a scroll. One enormous door with the rest stacked under it was handsome and slow:
// to reach the fourth thing you pushed past three.
//
// So: marks side by side, two to a line, ruled off by hairlines like plates engraved on one
// sheet. The whole board is on the screen at once — nothing folded, nothing to scroll past,
// nothing to remember — and every plate is the same size, so a thumb learns it in one go.
// That is what "easy" means here: you see all of it, you know what each one is, and you hit
// it first time.
//
// The words under the marks are the job itself, in the plainest sentence that fits a plate.
// A mark and no words is a riddle, and a riddle is not cool, it is just hard work.
const WORK = [
  { key: 'decide', Mark: MarkStamp, label: 'Yes or not yet', count: 'decide' },
  { key: 'check', Mark: MarkEye, label: 'Read & note', count: 'check' },
  { key: 'people', Mark: MarkGate, label: 'Who may come in', count: 'asks' },
  { key: 'desk', Mark: MarkLedger, label: 'Counts' },
  { key: 'score', Mark: MarkRoot, label: 'Sourcing' },
];

const RECORD = [
  { to: '/ClimateSearch', Mark: MarkSearch, label: 'Search' },
  { to: '/ClimateSeals', Mark: MarkSeal, label: 'Seals' },
  { to: '/ClimateWire', Mark: MarkWire, label: 'Wire' },
];

function Plate({ t, wide, on, onGo, count }) {
  const Mark = t.Mark;
  const colour = on ? '#b3261e' : '#141210';

  return (
    <button
      type="button"
      onClick={() => onGo(t.key)}
      aria-current={on ? 'true' : undefined}
      className={`relative flex flex-col items-center justify-center gap-2 px-2 py-4 text-center transition-colors active:bg-[#141210]/5 ${
        wide ? 'col-span-2 min-h-[86px] flex-row justify-start gap-3.5 px-4 text-left' : 'min-h-[124px]'
      }`}
    >
      <span className="shrink-0" style={{ color: colour }}>
        <Mark size={wide ? 40 : 50} />
      </span>
      <span
        className="block"
        style={{
          fontFamily: 'var(--font-reading)',
          fontSize: wide ? '16px' : '14.5px',
          fontWeight: 600,
          lineHeight: 1.22,
          letterSpacing: '-0.01em',
          color: colour,
          textWrap: 'balance',
        }}
      >
        {t.label}
      </span>
      {typeof count === 'number' && count > 0 && (
        <span
          className="absolute right-2.5 top-2 leading-none text-[#b3261e]"
          style={{ fontFamily: 'var(--font-reading)', fontSize: '21px', fontWeight: 600, letterSpacing: '-0.03em' }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export default function ShedPortal({ counts = {}, isKeeper, isChecker, active, onGo }) {
  // A checker is a pair of eyes and nothing else, so their list is what fits in a hand.
  const soloChecker = isChecker && !isKeeper;
  const tiles = soloChecker ? WORK.filter((t) => t.key === 'check') : WORK;
  const countOf = (t) => (t.count ? counts[t.count] : undefined);

  const single = tiles.length % 2 === 1 ? tiles.length - 1 : -1;

  return (
    <div>
      <div className="grid grid-cols-2 border-b border-[#141210]/15">
        {tiles.map((t, i) => (
          <div
            key={t.key}
            className={`border-t border-[#141210]/15 ${i % 2 === 1 ? 'border-l' : ''}`}
          >
            <Plate
              t={t}
              wide={i === single}
              on={active === t.key}
              onGo={onGo}
              count={countOf(t)}
            />
          </div>
        ))}
      </div>

      {/* To read, which changes nothing: three small marks under the board. */}
      <div className="mt-5 flex items-center justify-between gap-2">
        {RECORD.map((r) => {
          const Mark = r.Mark;
          return (
            <Link
              key={r.to}
              to={r.to}
              className="flex flex-1 items-center justify-center gap-1.5 py-2 text-[#6b5f4f] transition-colors active:text-[#b3261e]"
            >
              <Mark size={19} />
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