import React from 'react';

// The rooms of the shed, as words ruled underneath — the way a printed page marks where
// you are. No pills, no fills, no icons: the marks have already been used once above,
// and a second set of them under a row of buttons was dressing, not information.
export default function WorkroomTabs({ tabs, active, onChange }) {
  return (
    <div className="overflow-x-auto climate-nav-rail mb-5 border-b border-[#141210]/20">
      <div className="flex items-stretch gap-5 w-max min-w-full">
        {tabs.map((t) => {
          const on = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              aria-current={on ? 'true' : undefined}
              className={`-mb-px pb-2.5 pt-1 text-[13.5px] whitespace-nowrap border-b-2 transition-colors ${
                on
                  ? 'border-[#b3261e] text-[#141210] font-semibold'
                  : 'border-transparent text-[#6b5f4f] active:text-[#141210]'
              }`}
              style={{ fontFamily: 'var(--font-reading)' }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}