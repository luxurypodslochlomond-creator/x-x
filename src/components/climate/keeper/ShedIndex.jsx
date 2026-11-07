import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MarkKey, MarkEye, MarkLedger, MarkRoot } from './KeeperMarks';

// ── THE SHED'S INDEX, GROUPED BY WHAT IT DOES TO YOU ────────────────────────────
// A flat list of four doors made a keeper read all four every time to work out which
// one was asking. So they are grouped the way the work actually arrives: something
// wants your yes; something wants a second look; the rest is what the record holds,
// which can wait. The order is the order of pressure, and the pressure is said out
// loud — including when there is none, because a room that goes silent at zero makes
// a person wonder if it is broken.
//
// Every mark here is one of the shed's own four: a key for the yes, an eye for the
// second look, a ledger for what is held, a root for where a thing came from. Nothing
// borrowed from a dashboard icon set, so this reads as a page of the record rather
// than a control panel.

const WORK = {
  decide: {
    Mark: MarkKey,
    label: 'Say yes or not yet',
    note: 'Yes puts it on the record, sealed and signed with your name. Not yet leaves it waiting, untouched.',
  },
  check: {
    Mark: MarkEye,
    label: 'Read the source, write a note',
    note: 'Opens where the entry is claimed from. Your note is signed in your name. Nothing is published or changed.',
  },
  desk: {
    Mark: MarkLedger,
    label: 'Counts',
    note: 'What the record actually holds — entries, keepers, what is waiting.',
  },
  score: {
    Mark: MarkRoot,
    label: 'Sourcing',
    note: 'How well each thing on the record is known, and from how many places.',
  },
};

const GROUPS = [
  { title: 'Wants your yes', count: 'decide', keys: ['decide'], quiet: 'Nothing is waiting for a decision.' },
  { title: 'Wants a second look', count: 'check', keys: ['check'], quiet: 'No source is waiting to be read.' },
  { title: 'What the record holds', keys: ['desk', 'score'] },
];

const RECORD = [
  { label: 'Search the whole record', to: '/ClimateSearch' },
  { label: 'The seals — check a fingerprint yourself', to: '/ClimateSeals' },
  { label: 'The wire — what changed, where', to: '/ClimateWire' },
  { label: 'The record itself', to: '/TogetherChangeClimate' },
];

export default function ShedIndex({ waiting, toCheck, isChecker, onGo }) {
  const counts = { decide: waiting, check: toCheck };
  const groups = isChecker
    ? GROUPS.filter((g) => g.keys.some((k) => k === 'check'))
    : GROUPS;

  return (
    <div>
      {groups.map((g) => {
        const n = g.count ? counts[g.count] : null;
        const known = !g.count || typeof n === 'number';
        return (
          <div key={g.title} className="mb-4 last:mb-0">
            <div className="flex items-baseline justify-between gap-3 border-b border-[#141210]/25 pb-1.5 mb-0.5">
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#6b5f4f]">{g.title}</p>
              {!known && <span className="text-[9px] font-mono text-[#6b5f4f]/70">…</span>}
            </div>

            {/* The quiet answer, said rather than left blank. */}
            {g.quiet && known && n === 0 && (
              <p className="py-2.5 text-[12.5px] text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>
                {g.quiet}
              </p>
            )}

            {g.keys.map((key) => {
              const d = WORK[key];
              const Mark = d.Mark;
              const show = g.count && n > 0;
              // Nothing waiting: the door is still there, just standing down rather than shouting.
              const dim = g.count && known && n === 0;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onGo(key)}
                  className={`w-full flex items-start gap-3 py-3 border-b border-[#141210]/12 text-left active:bg-[#141210]/5 transition-colors ${dim ? 'opacity-70' : ''}`}
                >
                  <Mark size={20} className={`flex-shrink-0 mt-0.5 ${show ? 'text-[#141210]' : 'text-[#6b5f4f]'}`} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-[14px] text-[#141210] leading-snug" style={{ fontFamily: 'var(--font-reading)', fontWeight: 600 }}>
                        {d.label}
                      </span>
                      {show && (
                        <span className="font-mono text-[13px] font-black text-[#b3261e] leading-none flex-shrink-0">{n}</span>
                      )}
                    </span>
                    <span className="block text-[12px] text-[#6b5f4f] leading-[1.5] mt-0.5" style={{ fontFamily: 'var(--font-reading)' }}>
                      {d.note}
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6b5f4f] flex-shrink-0 mt-1.5" />
                </button>
              );
            })}
          </div>
        );
      })}

      <p className="mt-5 mb-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-[#6b5f4f]">The record</p>
      <div className="border-t border-[#141210]/25">
        {RECORD.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            className="flex items-center justify-between gap-3 py-2.5 border-b border-[#141210]/12 text-[13px] text-[#141210] active:bg-[#141210]/5 transition-colors"
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