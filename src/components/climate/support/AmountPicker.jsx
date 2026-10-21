import React, { useState } from 'react';

const CHIPS = [200, 500, 1000, 2500];

export default function AmountPicker({ amount, onChange, t }) {
  const [custom, setCustom] = useState('');

  const handleCustom = (raw) => {
    const value = raw.replace(/[^0-9.]/g, '');
    setCustom(value);
    const pence = Math.round(Number(value) * 100);
    onChange(Number.isFinite(pence) ? pence : 0);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CHIPS.map(chip => {
          const chosen = amount === chip && custom === '';
          return (
            <button
              key={chip}
              type="button"
              onClick={() => { setCustom(''); onChange(chip); }}
              aria-pressed={chosen}
              className={`px-3.5 py-2.5 min-h-[44px] text-[12px] font-black border-2 transition-colors ${chosen ? 'bg-record-ink text-record-bone border-record-ink' : 'bg-record-bone text-record-ink border-record-ink/25 active:border-record-ink'}`}
            >
              £{chip / 100}
            </button>
          );
        })}
      </div>
      <label className="mt-3 block">
        <span className="text-[10px] font-black uppercase tracking-wider text-record-muted">{t.amount_label}</span>
        <div className="mt-1 flex items-center border-2 border-record-ink/25 focus-within:border-record-ink bg-record-bone">
          <span className="pl-3 text-[13px] text-record-muted">£</span>
          <input
            inputMode="decimal"
            value={custom}
            onChange={e => handleCustom(e.target.value)}
            placeholder={t.amount_placeholder}
            className="w-full bg-transparent px-2 py-3 min-h-[44px] text-[13px] text-record-ink placeholder-record-muted outline-none"
          />
        </div>
      </label>
    </div>
  );
}