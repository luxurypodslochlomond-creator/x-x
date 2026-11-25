import React from 'react';

// ── HER NAME SITS ON THE PAINTING, NOT ON A CARD ────────────────────────────────
// The plate was paper at seventy-five per cent over ink, which is neither paper nor
// painting: a pale grey slab with the whole picture shut out behind it. It is the record's
// photographic plate now — the one painting, held back by ink rather than replaced by paper
// — and her name is lit in the record's signal yellow, the same lettering as the line she
// is quoted under. The plate's ground lives in founder-page.css, one place, for every plate
// on this page.
export default function FounderName() {
  return (
    <section aria-labelledby="founder-name" className="record-founder-plate mx-auto my-10 w-full max-w-4xl border-t-4 border-record-red px-5 py-10 text-center lg:my-16 lg:px-10 lg:py-16">
      {/* Her name is set, not stamped. Upper-cased and wide-tracked it read like a form
          field; in the record's display face at size, with the tracking pulled in, it reads
          like the name over the door of the whole thing. */}
      <h1 id="founder-name" className="font-display text-4xl font-bold leading-[1.02] text-record-ink lg:text-6xl" style={{ letterSpacing: '-0.02em' }}>Janine M. H. Selendy</h1>
      <p className="record-header-type mx-auto mt-5 text-sm text-record-ink">Founder</p>
      <p className="mx-auto mt-4 max-w-2xl text-record-muted">Four decades of finding and advancing solutions to the interrelated concerns of global health, environment, and poverty.</p>
      {/* ── THE CIC UNDER HER NAME, IN THE FOOT'S OWN GRAMMAR ─────────────────────
          Brian, 25 November: "we have our details coolasfuck on footer, think we need the
          contact UF51 CIC under Janine — that's a bit rude, no class." The page named her
          two institutions and the company holding it not at all, so the one line that
          answers "who is answerable for this page" was missing. It is the footer's red
          plate, brought up under her name: the company, where it is made, and the way to
          write to it. Her page, held by us, said plainly. */}
      <div id="founder-contact" className="record-founder-cic mx-auto mt-8 max-w-md">
        <p className="record-founder-cic-role">Held and published by</p>
        <p className="record-founder-cic-name">Universal Frequency 51 CIC</p>
        <p className="record-founder-cic-note">Made in Scotland from photons</p>
        <a href="mailto:family@uf51.love" aria-label="Contact UF51 CIC about this record" className="record-header-type mt-4 inline-block min-h-11 text-xs text-record-ink underline decoration-record-red underline-offset-4 hover:text-record-red">Contact UF51 CIC</a>
      </div>
    </section>
  );
}