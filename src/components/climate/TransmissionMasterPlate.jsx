import React from 'react';

// ── WHAT ACTUALLY ARRIVED ──
// Every streamer hands you a squeezed copy. This says the one thing ours can:
// the master file itself, its real numbers, and that nothing was thrown away.
// The specs are the file's own — verified on the asset, not claimed.
const SPECS = ['Master', 'WAV · 44.1 kHz / 16-bit', 'Nothing thrown away'];

export default function TransmissionMasterPlate() {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2.5">
      {SPECS.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          {i > 0 && <span className="w-1 h-1 bg-[#e2602a]/70" />}
          <span
            className={`text-[9px] font-mono uppercase tracking-[0.2em] ${
              i === 0 ? 'text-[#e2602a] font-black' : 'text-[#efe7d6]/45'
            }`}
          >
            {s}
          </span>
        </span>
      ))}
    </div>
  );
}