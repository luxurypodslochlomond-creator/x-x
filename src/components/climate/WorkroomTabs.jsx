import React from 'react';
import { MarkKey, MarkEye, MarkLedger, MarkRoot } from './keeper/KeeperMarks';

// The rooms of the shed, as one bar, each with its own mark rather than a word alone.
// On a phone it slides under the thumb rather than stacking, so the page never moves
// while you are reading it.
const MARKS = { decide: MarkKey, check: MarkEye, desk: MarkLedger, score: MarkRoot };

export default function WorkroomTabs({ tabs, active, onChange }) {
  return (
    <div className="overflow-x-auto climate-nav-rail -mx-1 mb-5">
      <div className="flex items-stretch gap-1 w-max min-w-full">
        {tabs.map((t) => {
          const on = active === t.key;
          const Mark = MARKS[t.key];
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              aria-current={on ? 'true' : undefined}
              className={`flex flex-col items-center justify-center gap-1 min-h-[54px] px-3.5 border-2 text-[9.5px] font-black font-mono uppercase tracking-[0.12em] whitespace-nowrap transition-colors ${
                on
                  ? 'border-[#141210] bg-[#141210] text-[#f4efe4]'
                  : 'border-[#141210]/25 bg-[#efe7d6] text-[#141210] active:border-[#141210]'
              }`}
            >
              {Mark ? (
                <Mark size={15} className={on ? 'text-[#f4efe4]' : 'text-[#141210]'} />
              ) : null}
              <span>
                {t.label}
                {t.note ? (
                  <span className={`ml-1.5 ${on ? 'text-[#f4efe4]/60' : 'text-[#8a8375]'}`}>{t.note}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}