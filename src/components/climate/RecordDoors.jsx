import React from 'react';

// ── THE FOUR ROOMS ─────────────────────────────────────────────────────────────
// Brian, 19 November: "actions crises solutions groups on climate record page these are the
// backbone of our record… I cant help but feel they are lost and dont make sense on page and
// people dont know what I mean."
//
// He is right, and the reason was structural rather than cosmetic. They were four small
// chips in a toolbar, all the same dark ground, all the same 10px weight, two of them the
// same yellow once opened — and tapping one only changed a filter, without taking the reader
// anywhere. So the page's backbone looked like a filter bar, said nothing about what was in
// it, and gave no sign that anything had happened.
//
// A plate per room instead: the room's own pigment, how much is on the record in it, and one
// plain line saying what it is for. A door is a statement about the record, so the count is
// the record's own — not the reader's last tap. Opening one carries the reader down to it.
const ROOMS = [
  {
    key: 'solution',
    label: 'Solutions',
    line: 'What works — and can be copied.',
    ground: 'bg-record-botanical text-record-paper',
    rule: 'bg-record-signal',
  },
  {
    key: 'climate_crisis',
    label: 'Climate crises',
    line: 'What is burning, right now.',
    ground: 'bg-[#b3261e] text-[#efe7d6]',
    rule: 'bg-[#efe7d6]',
  },
  {
    key: 'groups',
    label: 'Groups',
    line: 'People working on the same thing, near you.',
    ground: 'bg-[#ffd447] text-[#141210]',
    rule: 'bg-[#b3261e]',
  },
  {
    key: 'actions',
    label: 'Actions',
    line: 'Cleanups, plantings, meetings, on the ground.',
    ground: 'bg-[#e2602a] text-[#141210]',
    rule: 'bg-[#141210]',
  },
];

export default function RecordDoors({ counts = {}, selected, onSelect }) {
  return (
    <section
      aria-labelledby="record-doors-title"
      className="bg-record-paper px-4 lg:px-10 pt-7 pb-2 lg:pt-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-3">
        <div>
          <p className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-[#b3261e]">
            The record · four rooms
          </p>
          <h2
            id="record-doors-title"
            className="mt-1 font-display text-[25px] lg:text-[34px] font-bold uppercase leading-[1.02] text-[#141210]"
          >
            Everything here is in one of these
          </h2>
        </div>
        <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#5a5246] pb-1">
          {selected === 'all' ? 'Tap a room to open it' : 'One room open'}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {ROOMS.map(room => {
          const open = selected === room.key;
          const count = counts[room.key] ?? 0;
          return (
            <button
              key={room.key}
              type="button"
              onClick={() => onSelect(room.key)}
              aria-pressed={open}
              className={`group flex min-h-[124px] lg:min-h-[148px] flex-col justify-between gap-2 border-2 p-3 text-left transition-transform duration-150 active:scale-[0.98] ${
                room.ground
              } ${open ? 'border-[#141210]' : 'border-[#141210]/25 hover:border-[#141210]'}`}
            >
              <span className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-black font-mono uppercase tracking-[0.13em] leading-[1.3]">
                  {room.label}
                </span>
                <span className="text-[24px] lg:text-[30px] font-black font-mono leading-[0.9] tabular-nums">
                  {count}
                </span>
              </span>
              <span className={`block h-1 w-8 ${room.rule}`} aria-hidden="true" />
              <span className="text-[11.5px] lg:text-[12.5px] leading-[1.35] font-body">
                {room.line}
              </span>
              <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] opacity-75">
                {open ? 'Open · tap to close' : 'Open →'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}