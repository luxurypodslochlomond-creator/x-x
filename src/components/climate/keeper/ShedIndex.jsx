import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MarkKey, MarkEye, MarkLedger, MarkRoot } from './KeeperMarks';

// ── EVERY DOOR, ON ONE SCREEN ───────────────────────────────────────────────────
// The shed used to make a keeper walk down the page to find the room they wanted, and
// then walk further to find the record it was about. Nothing here scrolls: the work is
// four marks in a square, and the record it answers to is five lines under them. Every
// room is one tap from the front, and the counts are printed on the doors themselves so
// nobody has to open a room to find out whether it is worth opening.
//
// The marks are the art: drawn strokes, not stock icons, so the square reads as an
// engraving rather than a dashboard. Words carry the record's rooms because a reader's
// doors are reading, not doing.

const WORK = [
  { key: 'decide', Mark: MarkKey, label: 'To decide', note: 'Yes or not yet' },
  { key: 'check', Mark: MarkEye, label: 'To check', note: 'Open the source' },
  { key: 'desk', Mark: MarkLedger, label: 'Counts', note: 'What it holds' },
  { key: 'score', Mark: MarkRoot, label: 'Sourcing', note: 'Where it came from' },
];

const RECORD = [
  { label: 'Search the record', to: '/ClimateSearch' },
  { label: 'The seals — check a fingerprint', to: '/ClimateSeals' },
  { label: 'The wire', to: '/ClimateWire' },
  { label: 'The record itself', to: '/TogetherChangeClimate' },
  { label: 'Stuck? What each door does', to: '/ClimateGuide' },
];

export default function ShedIndex({ waiting, toCheck, isChecker, onGo }) {
  const doors = isChecker ? WORK : WORK.filter(d => d.key !== 'check');
  const counts = { decide: waiting, check: toCheck };

  return (
    <section className="border-t-2 border-[#141210]">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {doors.map((d, i) => {
          const n = counts[d.key];
          const odd = doors.length % 2 === 1 && i === doors.length - 1;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => onGo(d.key)}
              className={`flex items-start gap-2.5 px-3.5 py-3.5 text-left min-h-[92px] border-[#141210]/20 border-r-2 border-b-2 hover:bg-[#141210]/5 active:bg-[#141210]/10 transition-colors ${
                odd ? 'col-span-2 sm:col-span-1' : ''
              } ${i % 2 === 1 ? 'border-r-0 sm:border-r-2' : ''} sm:last:border-r-0`}
            >
              <d.Mark size={26} className="text-[#b3261e] flex-shrink-0 mt-0.5" />
              <span className="min-w-0">
                <span className="flex items-baseline gap-1.5">
                  <span className="text-[10px] font-black font-mono uppercase tracking-[0.14em] text-[#141210] leading-tight">
                    {d.label}
                  </span>
                  {typeof n === 'number' && n > 0 && (
                    <span className="text-[12px] font-black font-mono text-[#b3261e] leading-none">{n}</span>
                  )}
                </span>
                <span className="block text-[10px] font-mono text-[#5a5246] leading-snug mt-1">{d.note}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#efe7d6]">
        {RECORD.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            className="flex items-center justify-between gap-2 px-3.5 min-h-[46px] border-b border-[#141210]/20 sm:border-r border-[#141210]/20 text-[10px] font-black font-mono uppercase tracking-[0.12em] text-[#141210] hover:text-[#b3261e] active:bg-[#141210]/5 transition-colors"
          >
            <span className="min-w-0">{r.label}</span>
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}