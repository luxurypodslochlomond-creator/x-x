import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MarkKey, MarkEye, MarkLedger, MarkRoot } from './KeeperMarks';

// ── TWO JOBS, NOT FOUR DOORS ────────────────────────────────────────────────────
// "To decide" and "To check" were honest and still meant nothing to a person walking
// in cold — they are the record's words for two jobs a human already understands:
//   say yes or not yet      → it goes on the record, or it waits
//   read the source, note it → nothing changes; a note in your name
// So each line says what pressing it actually does to the record, in the words
// somebody would use out loud. The counts are the only thing in colour, because a
// number that wants you is the only thing here allowed to raise its voice.

const WORK = [
  {
    key: 'decide',
    Mark: MarkKey,
    label: 'Say yes or not yet',
    note: 'Yes puts it on the record, sealed and signed with your name. Not yet leaves it waiting, untouched.',
    keeperOnly: true,
  },
  {
    key: 'check',
    Mark: MarkEye,
    label: 'Read the source, write a note',
    note: 'Opens where the entry is claimed from. Your note is signed in your name. Nothing is published or changed.',
  },
  {
    key: 'desk',
    Mark: MarkLedger,
    label: 'Counts',
    note: 'What the record actually holds — entries, keepers, what is waiting.',
    keeperOnly: true,
  },
  {
    key: 'score',
    Mark: MarkRoot,
    label: 'Sourcing',
    note: 'How well each thing on the record is known, and from how many places.',
    keeperOnly: true,
  },
];

const RECORD = [
  { label: 'Search the whole record', to: '/ClimateSearch' },
  { label: 'The seals — check a fingerprint yourself', to: '/ClimateSeals' },
  { label: 'The wire — what changed, where', to: '/ClimateWire' },
  { label: 'The record itself', to: '/TogetherChangeClimate' },
];

export default function ShedIndex({ waiting, toCheck, isChecker, onGo }) {
  const doors = isChecker ? WORK : WORK.filter(d => !d.keeperOnly);
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
              className="w-full flex items-start gap-3.5 py-3.5 border-b border-[#141210]/12 text-left active:bg-[#141210]/5 transition-colors"
            >
              <Mark size={21} className="text-[#141210] flex-shrink-0 mt-0.5" />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-[14.5px] text-[#141210] leading-snug" style={{ fontFamily: 'var(--font-reading)', fontWeight: 600 }}>
                    {d.label}
                  </span>
                  {typeof n === 'number' && n > 0 && (
                    <span className="font-mono text-[12.5px] font-black text-[#b3261e] leading-none flex-shrink-0">{n}</span>
                  )}
                </span>
                <span className="block text-[12.5px] text-[#6b5f4f] leading-[1.5] mt-1" style={{ fontFamily: 'var(--font-reading)' }}>
                  {d.note}
                </span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#6b5f4f] flex-shrink-0 mt-1" />
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
            className="flex items-center justify-between gap-3 py-3 border-b border-[#141210]/12 text-[13.5px] text-[#141210] active:bg-[#141210]/5 transition-colors"
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