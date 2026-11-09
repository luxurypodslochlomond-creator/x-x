import React from 'react';

// ── WHAT IS OWED ───────────────────────────────────────────────────────────────
// Two debts, each said once. It had grown to two long paragraphs per name plus an
// introduction explaining why debts are written down — which is a paragraph explaining a
// paragraph. The taking, the limit and the removal terms fit in a breath; a name dropped
// in gratitude is still a name dropped, so shorter is also more honest here.

function Debt({ name, reason, children }) {
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span
          className="text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: '17px', lineHeight: 1.3 }}
        >
          {name}
        </span>
        <span className="font-mono text-[12.5px] text-[#5a5246]">{reason}</span>
      </p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

export default function XEqualsXThanks() {
  return (
    <section aria-labelledby="what-is-owed" className="py-8 border-b border-[#141210]/15">
      <h2 id="what-is-owed" className="font-mono text-[12.5px] tracking-[0.06em] text-[#5a5246]">
        What is owed
      </h2>

      <div className="mt-4 space-y-5">
        <Debt name="Laurie Anderson" reason="for the red, and for the name">
          The red on this record is taken from her sleeve for O Superman, and “the record of the
          time” is her phrase. She has not read this and has not agreed to it. If she asks, both
          come off the same day, and the removal is printed here rather than done quietly.
        </Debt>

        <Debt name="Lou Reed" reason="for saying it once">
          He is the reason this page says a thing in ordinary words and then stops. Nothing of his
          is quoted, borrowed or imitated here.
        </Debt>
      </div>

      <p className="mt-5 border-t border-[#141210]/20 pt-3 text-[#5a5246]">
        Thanks are not a claim of connection. Neither of them made this record, was asked to, or
        agrees with a word of it.
      </p>

      {/* Morse has moved up the page, out of a thank-you and into the argument. He is not a
          debt: he is the case that makes the case. A name dropped in gratitude here would
          only have been a second, weaker telling of the same point. */}
    </section>
  );
}