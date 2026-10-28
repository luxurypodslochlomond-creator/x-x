import React, { useState } from 'react';

// ── CHECK IT YOURSELF ───────────────────────────────────────────────────────────
// The record prints a fingerprint and says it can be checked instead of trusted. This is
// that check, in the listener's own hands: the browser reads the master whole, prints it
// here on the device, and sets it beside the print the artist took before the file ever
// left them. No service in the middle, nothing to take on faith.
//
// It is allowed to say no. If the two prints part company, the record says so plainly —
// a copy that quietly fails its check and still calls itself whole is the one thing this
// page could never survive.

const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

export default function VerifyMaster({ url, print }) {
  const [state, setState] = useState('idle'); // idle | reading | match | differ | unreadable
  const [found, setFound] = useState('');

  const check = async () => {
    setState('reading');
    try {
      if (!window.crypto?.subtle) throw new Error('no-subtle');
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('unreachable');
      const bytes = await res.arrayBuffer();
      const hex = toHex(await window.crypto.subtle.digest('SHA-256', bytes));
      setFound(hex);
      setState(hex.toLowerCase() === String(print).toLowerCase() ? 'match' : 'differ');
    } catch (err) {
      // Not allowed to read it in place, or no way to print it: say that, rather than
      // dressing a failure up as a pass.
      setState('unreadable');
    }
  };

  return (
    <div className="mt-3">
      {state === 'idle' && (
        <button
          onClick={check}
          className="w-full px-3 py-3 min-h-[44px] border-2 border-[#141210] bg-[#f7f1e5] text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
        >
          Check this file against its print
        </button>
      )}

      {state === 'reading' && (
        <p className="px-1 py-3 text-[10px] font-mono text-[#5a5246]">
          Reading the master whole on this device…
        </p>
      )}

      {state === 'match' && (
        <div className="border-2 border-[#1e3a2b] bg-[#1e3a2b]/5 px-3 py-3">
          <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#1e3a2b]">It matches</p>
          <p className="mt-1 text-[10px] font-mono text-[#141210] leading-relaxed">
            The bytes you are listening to are the bytes the artist handed over. Your device printed them just now; the
            record never touched the file in between.
          </p>
          <p className="mt-2 text-[9px] font-mono text-[#5a5246] break-all">{found}</p>
        </div>
      )}

      {state === 'differ' && (
        <div className="border-2 border-[#b3261e] bg-[#b3261e]/5 px-3 py-3">
          <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#b3261e]">It does not match</p>
          <p className="mt-1 text-[10px] font-mono text-[#141210] leading-relaxed">
            This copy is not the file whose print is printed above. Something changed it after it was given, or it did
            not arrive whole. Do not take this copy as the master, and tell a keeper — a removal or a correction on this
            record is made in the open, never quietly.
          </p>
          <p className="mt-2 text-[9px] font-mono text-[#5a5246] break-all">
            On your device: {found}
          </p>
        </div>
      )}

      {state === 'unreadable' && (
        <div className="border-2 border-[#141210]/30 bg-[#efe7d6] px-3 py-3">
          <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210]">This browser would not read it in place</p>
          <p className="mt-1 text-[10px] font-mono text-[#5a5246] leading-relaxed">
            Nothing is wrong with the track — this device or browser declined to read the file. Take the master below and
            print it with any tool you trust; set the result beside the print above.
          </p>
        </div>
      )}
    </div>
  );
}