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
// Still a page of the record, not a dashboard — the marks are drawn, the grid is
// hairlines, and the only red is the line saying where you are.
const WORK = [
  { key: 'decide', Mark: MarkKey, label: 'Yes or not yet', note: 'One entry at a time', count: 'decide' },
  { key: 'check', Mark: MarkEye, label: 'Read & note', note: 'Open the source, sign a note', count: 'check' },
  { key: 'people', Mark: MarkGate, label: 'Who may come in', note: 'Keepers and checkers', count: 'asks' },
  { key: 'desk', Mark: MarkLedger, label: 'Counts', note: 'What the record holds' },
  { key: 'score', Mark: MarkRoot, label: 'Sourcing', note: 'How well it is known' },
];

const RECORD = [
  { to: '/ClimateSearch', Mark: MarkSearch, label: 'Search the record' },
  { to: '/ClimateSeals', Mark: MarkSeal, label: 'The seals' },
  { to: '/ClimateWire', Mark: MarkWire, label: 'The wire' },
];

export default function ShedPortal({ counts = {}, isChecker, active, onGo }) {
  const tiles = isChecker && !counts.decide && !counts.asks
    ? WORK.filter((t) => t.key === 'check')
    : WORK;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-l border-[#141210]/20">
        {tiles.map((t) => {
          const Mark = t.Mark;
          const n = t.count ? counts[t.count] : null;
          const on = active === t.key;
          const hot = typeof n === 'number' && n > 0;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onGo(t.key)}
              className="relative text-left p-3.5 min-h-[128px] border-b border-r border-[#141210]/20 active:bg-[#141210]/10 transition-colors"
              style={on ? { background: 'rgba(20,18,16,0.04)' } : {}}
            >
              {on && <span className="absolute top-0 left-0 right-0 bg-[#b3261e]" style={{ height: '2px' }} />}
              <Mark size={46} className="text-[#141210]" />
              <span
                className="block mt-2.5 text-[14px] leading-tight text-[#141210]"
                style={{ fontFamily: 'var(--font-reading)', fontWeight: 600 }}
              >
                {t.label}
              </span>
              <span
                className="block mt-0.5 text-[11.5px] leading-snug text-[#6b5f4f]"
                style={{ fontFamily: 'var(--font-reading)' }}
              >
                {t.note}
              </span>
              {hot && (
                <span className="absolute top-3 right-3 font-mono text-[14px] font-black text-[#b3261e] leading-none">
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[12.5px] text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>
        Or leave the shed for the record
      </p>
      <div className="mt-1 grid grid-cols-3 border-t border-l border-[#141210]/20">
        {RECORD.map((r) => {
          const Mark = r.Mark;
          return (
            <Link
              key={r.to}
              to={r.to}
              className="flex flex-col items-start gap-1.5 p-2.5 min-h-[76px] border-b border-r border-[#141210]/20 active:bg-[#141210]/5 transition-colors"
            >
              <Mark size={26} className="text-[#141210]" />
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