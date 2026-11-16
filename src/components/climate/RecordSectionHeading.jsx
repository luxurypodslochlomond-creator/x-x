import React from 'react';

// ── THE BAND ───────────────────────────────────────────────────────────────────
// This record has five territories on one page — the pictures, solutions, crises,
// groups, actions — and until now every one of them opened with the same 28px serif
// line, in the same place, in the same colour, with no edge between them. Five
// identical words floating in one continuous sheet of paper do not read as five
// sections; they read as one long list, and the eye has no way of knowing it has
// crossed into somewhere else.
//
// So each territory now opens with a rule across the full width of the page, the
// name standing on it in the record's own voice, and one small catalogue number at
// the far right end of that line. Nothing has been added that was not already here:
// the same face, the same ink, the same count in the same colour it wore before. Two
// things have changed, and both of them were wrong before.
//
//   1. THE RULE. A section needs an edge, not a bigger word. The hairline does the
//      separating, which means the title never has to raise its voice to do it — and
//      that is the only way sections can be distinct on this record without becoming
//      five competing posters. It is one border, at a fifth of ink: the same stroke
//      the record already uses to rule its own pages.
//
//   2. THE NUMBER MOVED. It used to sit at the title's shoulder, 11px against 28px,
//      which is exactly how a notification badge sits — so "Actions 3" read as an
//      unread count rather than as a catalogue mark. It now sits at the far right end
//      of the rule, where a catalogue number belongs, and it is set to two digits:
//      07, not 7. A folio, not an alert.
//
// The name itself is set in capitals, which is the one part of this that could be
// mistaken for shouting. It is not: capitals in a serif are how a book titles a
// chapter, and this page already opens in capitals — so the sections now speak in the
// page's own voice instead of switching to a quieter second one halfway down. It is
// set at weight 700, which is a weight this face actually ships. It used to ask for
// 900, which the browser fakes on top of a 700 file, and a faked bold on a cut serif
// looks blurred. That was invisible and it was real.
//
// Colour still carries meaning and nothing here spends it: the number keeps whatever
// tone its section has always had — green for what is being done, red for what is at
// risk, signal for everything else — so the rule stays ink and the meaning stays in
// the only place it has ever lived.

export default function RecordSectionHeading({ title, count, tone = 'text-[#6b6258]' }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-[#141210]/25 pt-2.5 mb-4">
      <h2
        className="text-[#141210] uppercase"
        style={{
          fontFamily: 'var(--font-reading)',
          fontSize: 'clamp(21px, 5.6vw, 27px)',
          lineHeight: 1.06,
          letterSpacing: '0.015em',
          fontWeight: 700,
        }}
      >
        {title}
      </h2>
      {count != null && (
        <span className={`font-mono text-[11px] tracking-widest flex-shrink-0 ${tone}`}>
          {String(count).padStart(2, '0')}
        </span>
      )}
    </div>
  );
}