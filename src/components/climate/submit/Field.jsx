import React from 'react';

/* ── ONE LINE, EVERY LINE ─────────────────────────────────────────────────────────
   The form had its box written out by hand twenty-two times: the same border, the same
   padding, the same placeholder grey, copied and drifting. That is how a form gets "too
   loose" — not by one bad decision but by twenty small ones that never had to agree.

   Brian, 25 November: it still looks old, and he is right. The reason was here. Every
   answer sat in its own bordered rectangle on a tinted panel — a grid of boxes is the shape
   of a database entry screen, and it has been since the first one. Nothing about a box says
   "write what you know"; a box says "field 14 of 22".

   So an answer is a ruled line now, the way every printed form in the world has taken a
   written answer since paper: warm paper, one hairline to write on, and the record's red
   when the cursor is in it. No box, no panel, no grey. The label is quiet and the words
   you type are the loudest thing on the line, because your words are the point of this.

   Sixteen pixels on a phone, because a smaller one makes iOS zoom the whole page on the
   first tap and the reader has to find their place again. */
export const fieldClass =
  'w-full bg-transparent border-b border-[#141210]/35 px-0 py-2.5 min-h-[46px] text-[17px] sm:text-[15px] text-[#141210] placeholder-[#9a9084] outline-none focus:border-b-[#b3261e] transition-colors';

export const labelClass =
  'text-[10px] font-bold uppercase tracking-[0.13em] text-[#6b6258] block mb-1';

export const hintClass = 'text-[11px] text-[#6b6258] mt-1.5 leading-relaxed';

export default function Field({ label, hint, children }) {
  return (
    <div>
      {label && <label className={labelClass}>{label}</label>}
      {children}
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );
}