import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarkKey, MarkEye, MarkLedger, MarkRoot, MarkGate, MarkSearch, MarkSeal, MarkWire,
} from './KeeperMarks';

// ── THE BOARD, DRAWN RATHER THAN FILLED IN ──────────────────────────────────────
// Two earlier versions of this wall are worth remembering, because both were tidy and
// both were wrong. The first was a two-column grid of identical hairline cells, which is
// how a council tells you which department to queue in. The second was a list of rows,
// which is how a settings menu tells you what it can do. Neither had a centre, so the eye
// had nowhere to land and the room felt like paperwork about a room.
//
// This is a plate you read, not a form you fill. The door that wants you today is given
// the whole width and the largest engraving, because that is the thing a person came here
// to do. The rest sit beneath it at their own weights — two wide, then a narrow one and a
// broad one — so the wall has an order before you read a word of it. The number wanting
// you hangs in the corner of its plate in the record's red, and nothing is drawn round
// anything else: a box means a field, and none of these are fields.
const WORK = [
  { key: 'decide', Mark: MarkKey, label: 'Yes or not yet', note: 'One entry, one decision', count: 'decide', span: 6, height: 148, mark: 60, lead: true },
  { key: 'check', Mark: MarkEye, label: 'Read & note', note: 'The source, signed by you', count: 'check', span: 3, height: 118, mark: 36 },
  { key: 'people', Mark: MarkGate, label: 'Who may come in', note: 'Keepers and checkers', count: 'asks', span: 3, height: 118, mark: 36 },
  { key: 'desk', Mark: MarkLedger, label: 'Counts', note: 'What it holds', span: 2, height: 104, mark: 28 },
  { key: 'score', Mark: MarkRoot, label: 'Sourcing', note: 'How well it is known', span: 4, height: 104, mark: 32 },
];

const RECORD = [
  { to: '/ClimateSearch', Mark: MarkSearch, label: 'Search' },
  { to: '/ClimateSeals', Mark: MarkSeal, label: 'The seals' },
  { to: '/ClimateWire', Mark: MarkWire, label: 'The wire' },
];

function BandLabel({ children, right }) {
  return (
    <div className="flex items-baseline justify-between gap-3 pb-2">
      <span className="text-[12.5px] text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>
        {children}
      </span>
      {right && (
        <span className="text-[11.5px] text-[#8a7f6d]" style={{ fontFamily: 'var(--font-reading)' }}>
          {right}
        </span>
      )}
    </div>
  );
}

export default function ShedPortal({ counts = {}, isKeeper, isChecker, active, onGo }) {
  // A checker is a pair of eyes and nothing else, so their wall carries the one plate their
  // line opens, and it takes the whole width because it is the whole day. A keeper who also
  // checks keeps all five: an empty decision queue is a quiet day, not a lost key.
  const soloChecker = isChecker && !isKeeper;
  const tiles = soloChecker
    ? WORK.filter((t) => t.key === 'check').map((t) => ({ ...t, span: 6, height: 168, mark: 52, lead: true }))
    : WORK;

  const has = (t) => typeof (t.count ? counts[t.count] : null) === 'number' && counts[t.count] > 0;
  // The start of the day is whichever open door actually has somebody behind it. If nothing
  // wants you, it is simply the lightest job, which is the first plate.
  const startKey = (tiles.find(has) || tiles[0])?.key;

  return (
    <div>
      <BandLabel right={tiles.length > 1 ? 'easiest first' : null}>
        {tiles.length > 1 ? 'What wants a person' : 'What wants you'}
      </BandLabel>

      <div className="grid grid-cols-6 gap-2">
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
              className={`relative flex flex-col justify-between overflow-hidden border p-3 text-left transition-colors active:bg-[#141210]/5 ${
                start ? 'border-[#141210]/25 bg-[#efe7d6]' : 'border-[#141210]/15 bg-[#f4efe4]'
              } ${on ? 'border-[#b3261e]/60' : ''}`}
              style={{ gridColumn: `span ${t.span}`, minHeight: `${t.height}px` }}
            >
              {/* The number that wants you, hung in the corner of its own plate. */}
              {hot && (
                <span
                  className="absolute right-2.5 top-1.5 leading-none text-[#b3261e]"
                  style={{
                    fontFamily: 'var(--font-reading)',
                    fontSize: t.lead ? '30px' : '22px',
                    fontWeight: 600,
                  }}
                >
                  {n}
                </span>
              )}

              <span style={{ color: on ? '#b3261e' : '#141210' }}>
                <Mark size={t.mark} />
              </span>

              <span className="mt-3 block">
                <span
                  className="block text-[#141210]"
                  style={{
                    fontFamily: 'var(--font-reading)',
                    fontSize: t.lead ? '21px' : '15px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    letterSpacing: t.lead ? '-0.01em' : '0',
                    color: on ? '#b3261e' : '#141210',
                  }}
                >
                  {t.label}
                </span>
                {t.note && (
                  <span
                    className="mt-1 block text-[12px] leading-snug text-[#6b5f4f]"
                    style={{ fontFamily: 'var(--font-reading)' }}
                  >
                    {t.note}
                  </span>
                )}
                {start && (
                  <span
                    className="mt-1.5 block text-[12px] text-[#b3261e]"
                    style={{ fontFamily: 'var(--font-reading)' }}
                  >
                    start here
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <BandLabel right="changes nothing">Just to read</BandLabel>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#141210]/15 pt-3">
        {RECORD.map((r) => {
          const Mark = r.Mark;
          return (
            <Link
              key={r.to}
              to={r.to}
              className="flex items-center gap-1.5 text-[#141210] transition-colors active:text-[#b3261e]"
            >
              <Mark size={18} className="text-[#6b5f4f]" />
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