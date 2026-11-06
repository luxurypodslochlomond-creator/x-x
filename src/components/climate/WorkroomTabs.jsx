import React from 'react';

// The four rooms, as one bar. On a phone it slides under the thumb rather than stacking, so
// the page never moves while you are reading it.
export default function WorkroomTabs({ tabs, active, onChange }) {
  return (
    <div className="overflow-x-auto climate-nav-rail -mx-1 mb-5">
      <div className="flex items-stretch gap-1 w-max min-w-full">
        {tabs.map((t) => {
          const on = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              aria-current={on ? 'true' : undefined}
              className={`min-h-[46px] px-3 border-2 text-[10px] font-black font-mono uppercase tracking-[0.12em] whitespace-nowrap transition-colors ${
                on
                  ? 'border-[#141210] bg-[#141210] text-[#f4efe4]'
                  : 'border-[#141210]/25 bg-[#efe7d6] text-[#141210] active:border-[#141210]'
              }`}
            >
              {t.label}
              {t.note ? (
                <span className={`ml-1.5 ${on ? 'text-[#f4efe4]/60' : 'text-[#8a8375]'}`}>{t.note}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}