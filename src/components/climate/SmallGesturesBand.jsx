import React from 'react';

// Janine's list of the smallest gestures. Not advice, not a campaign — the things a
// person can start today with nothing bought and nothing asked of anyone. x = x.

const GESTURES = [
  'Mangrove planting',
  'Adding a sweater',
  'Buying less',
  'Walking',
  'Using mass transportation',
  'Not wasting food',
];

export default function SmallGesturesBand() {
  return (
    <section className="px-4 py-5 border-b-2 border-[#141210]">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', letterSpacing: '-0.025em' }}>
          The smallest gestures
        </h2>
        <div className="flex-1 h-px bg-[#141210]/20" />
      </div>
      <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">
        Small enough to start today, and free.
      </p>
      <div className="flex flex-wrap gap-2">
        {GESTURES.map(gesture => (
          <span
            key={gesture}
            className="px-3 py-2 bg-[#f7f1e5] border-2 border-[#141210] text-[11px] font-black font-mono uppercase tracking-wide text-[#141210]"
          >
            {gesture}
          </span>
        ))}
      </div>
      <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-3">
        Everything on this record carries a line on what can be copied from it. These can be copied by anyone, this afternoon.
      </p>
    </section>
  );
}