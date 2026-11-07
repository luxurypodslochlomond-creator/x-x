import React from 'react';
import { MarkKey, MarkEye, MarkLedger, MarkRoot } from './keeper/KeeperMarks';

// The rooms of the shed, as one soft row, each with its own stamp rather than a word
// alone. On a phone it slides under the thumb rather than stacking, so the page never
// moves while you are reading it. A pill, not a tab: this is a room you step into, not
// a spreadsheet you filter.
const MARKS = { decide: MarkKey, check: MarkEye, desk: MarkLedger, score: MarkRoot };

export default function WorkroomTabs({ tabs, active, onChange }) {
  return (
    <div className="overflow-x-auto climate-nav-rail -mx-1 mb-5">
      <div className="flex items-center gap-1.5 w-max min-w-full px-1">
        {tabs.map((t) => {
          const on = active === t.key;
          const Mark = MARKS[t.key];
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              aria-current={on ? 'true' : undefined}
              className={`flex items-center gap-1.5 min-h-[42px] px-3.5 rounded-full border text-[12.5px] font-semibold whitespace-nowrap transition-colors ${
                on
                  ? 'border-[#141210] bg-[#141210] text-[#f4efe4]'
                  : 'border-[#141210]/15 bg-[#efe7d6] text-[#141210] active:bg-[#e6dccb]'
              }`}
            >
              {Mark ? (
                <Mark size={14} className={on ? 'text-[#f4efe4]' : 'text-[#b3261e]'} />
              ) : null}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}