import React from 'react';

const OPTIONS = [
  { value: 'anonymous', label: 'No name', note: 'Nothing is written down about you but the fact that you gave.' },
  { value: 'public', label: 'My name on the wall', note: 'Your name stands beside the record, in public, in the order it arrived.' },
  { value: 'private', label: 'My name, with the keepers', note: 'The keepers know who you are. The world does not.' },
];

export default function NameChoice({ visibility, onVisibility, name, onName }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wider text-record-muted">Your name</p>
      <div className="mt-2 space-y-2">
        {OPTIONS.map(option => {
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
          <span className="text-[10px] font-black uppercase tracking-wider text-record-muted">The name to show</span>
          <input
            value={name}
            onChange={e => onName(e.target.value)}
            maxLength={40}
            placeholder="Name"
            className="mt-1 w-full border-2 border-record-ink/25 focus:border-record-ink bg-record-paper px-3 py-3 min-h-[44px] text-[13px] text-record-ink placeholder-record-muted outline-none"
          />
        </label>
      )}
    </div>
  );
}