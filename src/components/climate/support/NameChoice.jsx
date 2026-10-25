import React from 'react';

export default function NameChoice({ visibility, onVisibility, name, onName, t }) {
  const options = [
    { value: 'anonymous', label: t.name_none, note: t.name_none_note },
    { value: 'public', label: t.name_public, note: t.name_public_note },
    { value: 'private', label: t.name_private, note: t.name_private_note },
  ];

  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wider text-record-muted">{t.name_label}</p>
      <div className="mt-2 space-y-2">
        {options.map(option => {
          const chosen = visibility === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onVisibility(option.value)}
              aria-pressed={chosen}
              className={`w-full text-left px-3.5 py-3 border-2 transition-colors ${chosen ? 'border-record-ink bg-record-paper' : 'border-record-ink/20 bg-transparent active:border-record-ink/50'}`}
            >
              <span className="block text-[12px] font-black text-record-ink">{option.label}</span>
              <span className="block text-[11px] leading-snug text-record-muted">{option.note}</span>
            </button>
          );
        })}
      </div>
      {visibility !== 'anonymous' && (
        <label className="mt-3 block">
          <span className="text-[10px] font-black uppercase tracking-wider text-record-muted">{t.name_input_label}</span>
          <input
            value={name}
            onChange={e => onName(e.target.value)}
            maxLength={40}
            placeholder={t.name_placeholder}
            className="mt-1 w-full border-2 border-record-ink/25 focus:border-record-ink bg-record-paper px-3 py-3 min-h-[44px] text-[16px] sm:text-[13px] text-record-ink placeholder-record-muted outline-none"
          />
        </label>
      )}
    </div>
  );
}