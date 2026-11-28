import React from 'react';

// ── A PLAIN WARNING, PUT WHERE THE READER MEETS IT FIRST ──────────────────────
// Added on 28 November 2026, after reading the thinking pages on this record against the
// physics they claim. The thinking is somebody's and it is worth keeping. But a page that
// tells a reader they can draw power out of the vacuum, or build plasma safely in a
// microwave, cannot sit on the record's shelf looking like a finding. So the page stays,
// the question stays, and the claim is marked for what it is at the top.
export default function NotResearchWarning() {
  return (
    <div className="mx-auto mb-6 max-w-3xl border-2 border-amber-500 bg-amber-950/50 px-4 py-3">
      <p className="font-black text-amber-300 text-sm tracking-wide">
        THIS PAGE IS THINKING, NOT RESEARCH. NOTHING HERE HAS BEEN MEASURED.
      </p>
      <p className="mt-2 text-xs leading-relaxed text-amber-100/90">
        Two claims further down are written as facts and are not facts: that thousands of patents
        were suppressed, and that the phase 0 device works because an LED lights up. An LED lighting
        up shows a circuit, not a device that gives out more than it takes. The honest position is
        the one in the last section: nobody has shown that energy can be drawn from the vacuum at a
        household plug, and whether it could be is a question, not a discovery. Keep asking it. Do
        not build anything here expecting free power, and do not repeat the suppressed-patents line
        to anybody as though it were documented.
      </p>
    </div>
  );
}