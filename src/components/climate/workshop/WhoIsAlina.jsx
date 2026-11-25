import React from 'react';

// ── INTRODUCING ALINA, IN HER OWN WORDS ─────────────────────────────────────────
// Janine asked her for "a couple lines to introduce you". Alina wrote them herself and sent
// them on 16 November, and Janine copied Francis and Brian so the record would have them.
//
// They are printed here as she wrote them. Not summarised, not improved, not shortened to a
// job title: a person introducing herself is the one introduction a record should never
// rewrite, and the record's whole argument is that somebody's own words are the evidence.
//
// The one thing her introduction does not contain is the names of the cartoonists she works
// with — she says "her team" and "cartoonists", and a series is not a hand. That gap is
// named below rather than filled in, because filling it in would mean inventing a credit.
const HER_WORDS = 'Alina Sen is a proud dog mom. And the founder of the sustainability cartoon series What On Earth! from the Council on Energy, Environment and Water (CEEW). CEEW is one of Asia’s leading climate and sustainability think tanks. Since 2021, Alina and her team have been working with cartoonists to deliver a new cartoon on sustainability every fortnight. She is a Communications Fellow at CEEW, publishing its research studies and also using cartoons, songs, films and public workshops to translate climate research findings into more fun and shareable cultural and art products for the wider public to engage with.';

export default function WhoIsAlina() {
  return (
    <section className="mt-6 border border-record-ink/20 bg-record-bone/50 px-4 py-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-red">05 · Introducing Alina Sen</p>
      <p className="mt-1.5 font-mono text-[10.5px] leading-relaxed text-record-muted">
        Janine asked for a couple of lines to introduce her. Alina wrote these herself, on 16 November. Printed as she
        wrote them.
      </p>
      <blockquote
        className="mt-3 border-l-2 border-record-red pl-3 text-[13.5px] leading-relaxed lg:text-[15px]"
        style={{ fontFamily: 'var(--font-reading)' }}
      >
        {HER_WORDS}
      </blockquote>
      <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-record-muted">
        The names of the cartoonists are not in it — she says “her team”, and a series is not a hand. When CEEW sends
        them, each drawing on the wall carries the name of whoever drew it, and this line says so.
      </p>
    </section>
  );
}