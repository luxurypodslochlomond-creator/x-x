import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MarkKey, MarkEye, MarkLedger, MarkRoot } from './KeeperMarks';

// ── THE ROOMS, AS A PRINTED INDEX ───────────────────────────────────────────────
// No plates, no pills, no fills, no shadows. The shed was dressed in warm rounded
// cards and it read like a website from twenty years ago — colour doing work that
// type should do. So it is ruled like the rest of the record now: hairline, paper,
// ink, and one red that appears only on a number, because a count that wants you is
// the only thing on this page allowed to raise its voice.

const WORK = [
  { key: 'decide', Mark: MarkKey, label: 'To decide', note: 'Yes, or not yet' },
  { key: 'check', Mark: MarkEye, label: 'To check', note: 'Open the source' },
  { key: 'desk', Mark: MarkLedger, label: 'Counts', note: 'What the record holds' },
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
    <div>
      <div className="border-t border-[#141210]/20">
        {doors.map((d) => {
          const n = counts[d.key];
          const Mark = d.Mark;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => onGo(d.key)}
              className="w-full flex items-center gap-3.5 py-3 border-b border-[#141210]/12 text-left active:bg-[#141210]/5 transition-colors"
            >
              <Mark size={21} className="text-[#141210] flex-shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block text-[14.5px] text-[#141210] leading-snug" style={{ fontFamily: 'var(--font-reading)', fontWeight: 600 }}>
                  {d.label}
                </span>
                <span className="block text-[12.5px] text-[#6b5f4f] leading-snug mt-0.5" style={{ fontFamily: 'var(--font-reading)' }}>
                  {d.note}
                </span>
              </span>
              {typeof n === 'number' && n > 0 && (
                <span className="font-mono text-[12.5px] font-black text-[#b3261e] leading-none">{n}</span>
              )}
              <ArrowRight className="w-3.5 h-3.5 text-[#6b5f4f] flex-shrink-0" />
            </button>
          );
        })}
      </div>

      <p className="mt-5 mb-1.5 text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#6b5f4f]">The record</p>
      <div className="border-t border-[#141210]/20">
        {RECORD.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            className="flex items-center justify-between gap-3 py-2.5 border-b border-[#141210]/12 text-[13.5px] text-[#141210] active:bg-[#141210]/5 transition-colors"
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            <span className="min-w-0">{r.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#6b5f4f] flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}