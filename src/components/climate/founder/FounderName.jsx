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
      {/* ── WHO KEEPS THIS PAGE, SAID ONCE AND QUIETLY ────────────────────────────
          It was the footer's red plate, brought up under her name, in wide-tracked capitals.
          Brian, 25 November: "big red bit under her name… you sure we should be shouting like
          this, we have already in footer… sitting not quite right." He was right twice over.

          The first fault was volume. A full signal-red slab is the loudest furniture on this
          record, and it was standing directly under her name — so the second loudest thing
          on the founder's page said who holds the copyright. That is a warning label, and a
          page written in honour of somebody's life's work should not open with one.

          The second fault was that it said it three times: here, again in the imprint the
          page closes on, and again in the foot of the record. A credit repeated three times
          stops reading as a credit and starts reading as a claim being pressed.

          So what is left is the one thing the foot does not do: a way to write to the
          company, small and in the record's muted ink, on the painting rather than on a red
          slab. The full statement stays where it belongs — the imprint at the close. */}
      <div id="founder-contact" className="record-founder-cic mx-auto mt-8 max-w-md">
        <p className="record-founder-cic-line">Kept by Universal Frequency 51 CIC</p>
        <a href="mailto:family@uf51.love" aria-label="Contact UF51 CIC about this record" className="record-header-type mt-4 inline-block min-h-11 text-xs text-record-ink underline decoration-record-red underline-offset-4 hover:text-record-red">Contact UF51 CIC</a>
      </div>
    </section>
  );
}