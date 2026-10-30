import React, { useState } from 'react';

// One field, no suggested amounts. The record does not name a size for a gift:
// a person gives what they choose, and so does an institution.
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
      <label className="block">
        <span className="text-[10px] font-black uppercase tracking-wider text-record-muted">{t.amount_label}</span>
        <div className="mt-1 flex items-center border-2 border-record-ink/25 focus-within:border-record-ink bg-record-bone">
          <span className="pl-3 text-[13px] text-record-muted">£</span>
          <input
            inputMode="decimal"
            value={custom}
            onChange={e => handleCustom(e.target.value)}
            placeholder={t.amount_placeholder}
            className="w-full bg-transparent px-2 py-3 min-h-[44px] text-[16px] sm:text-[13px] text-record-ink placeholder-record-muted outline-none"
            aria-label={t.amount_label}
          />
        </div>
      </label>
    </div>
  );
}