import React from 'react';

/* ── ONE BOX, EVERY BOX ────────────────────────────────────────────────────────────
   The form had its box written out by hand twenty-two times: the same border, the same
   padding, the same placeholder grey, copied and drifting. That is how a form gets "too
   loose" — not by one bad decision but by twenty small ones that never had to agree.

   So there is one box, here, and everything on the form is that box. Warm paper inside a
   fine ink rule rather than a grey panel; the record's red when the box has the cursor.
   Sixteen pixels on a phone, because a smaller one makes iOS zoom the whole page on the
   first tap and the reader has to find their place again. */
export const fieldClass =
  'w-full bg-[#f7f1e5] border border-[#141210]/60 px-3 py-2.5 min-h-[46px] text-[16px] sm:text-[13px] font-mono text-[#141210] placeholder-[#8a8073] outline-none focus:border-[#b3261e] focus:bg-[#fffdf7] transition-colors';

export const labelClass =
  'text-[9.5px] font-black font-mono uppercase tracking-[0.14em] text-[#141210] block mb-1';

export const hintClass = 'text-[10px] font-mono text-[#6b6258] mt-1 leading-snug';

export default function Field({ label, hint, children }) {
  return (
    <div>
      {label && <label className={labelClass}>{label}</label>}
      {children}
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );
}