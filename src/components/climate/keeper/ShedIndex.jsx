import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MarkKey, MarkEye, MarkLedger, MarkRoot } from './KeeperMarks';

// ── EVERY DOOR, ON ONE SCREEN, IN A SOFT HAND ───────────────────────────────────
// Nothing here scrolls: the work is four marks in a square, and the record they answer
// to is five lines under them. Counts sit on the doors themselves, so nobody opens a
// room to find out whether it is worth opening.
//
// The room used to be ruled like a form — hard black frames, every label in tracked
// capitals. That reads as an office, and the people who keep this record are not
// clerks. Now each door is a warm plate with a hairline edge and a stamped mark, the
// words are the record's own reading voice at a size a tired eye can take, and only
// the counts keep the machine's letter, because a number is the machine's business.

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
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2">
        {doors.map((d) => {
          const n = counts[d.key];
          const Mark = d.Mark;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => onGo(d.key)}
              className="text-left rounded-xl border border-[#141210]/12 bg-[#f4efe4] px-3.5 pt-3 pb-3.5 min-h-[108px] flex flex-col justify-between transition-colors active:bg-[#f0e9db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b3261e]"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="w-9 h-9 rounded-full border border-[#141210]/12 bg-[#efe7d6] flex items-center justify-center flex-shrink-0">
                  <Mark size={18} className="text-[#b3261e]" />
                </span>
                {typeof n === 'number' && n > 0 && (
                  <span className="font-mono text-[12.5px] font-black text-[#b3261e] leading-none pt-1.5">{n}</span>
                )}
              </span>
              <span className="block mt-3">
                <span className="block text-[13.5px] font-semibold text-[#141210] leading-tight">{d.label}</span>
                <span className="block mt-1 text-[11.5px] leading-snug text-[#6b5f4f]">{d.note}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 rounded-xl border border-[#141210]/10 bg-[#efe7d6]/60 overflow-hidden">
        {RECORD.map((r, i) => (
          <Link
            key={r.to}
            to={r.to}
            className={`flex items-center justify-between gap-3 px-4 min-h-[48px] text-[13px] text-[#141210] active:bg-[#141210]/5 transition-colors ${
              i ? 'border-t border-[#141210]/10' : ''
            }`}
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            <span className="min-w-0">{r.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#b3261e] flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}