import React from 'react';

// ── HER NAME SITS ON THE PAINTING, NOT ON A CARD ────────────────────────────────
// The plate was solid paper, so the one page about a person who spent forty years on the
// living world sat on a blank sheet while the whole painting was held back behind it. The
// sheet is thin now — most of the paper still there, so the name stays plainly readable,
// and the ground coming up through the rest of it — so the earth reads underneath the
// letters instead of behind a wall. It also gets the air a name like hers should have.
export default function FounderName() {
  return (
    <section aria-labelledby="founder-name" className="record-founder-plate mx-auto my-10 w-full max-w-4xl border-t-4 border-record-red bg-record-paper/75 px-5 py-10 text-center backdrop-blur-[2px] lg:my-16 lg:px-10 lg:py-16">
      {/* Her name is set, not stamped. Upper-cased and wide-tracked it read like a form
          field; in the record's display face at size, with the tracking pulled in, it reads
          like the name over the door of the whole thing. */}
      <h1 id="founder-name" className="font-display text-4xl font-bold leading-[1.02] text-record-ink lg:text-6xl" style={{ letterSpacing: '-0.02em' }}>Janine M. H. Selendy</h1>
      <p className="record-header-type mx-auto mt-5 text-sm text-record-ink">Founder</p>
      <p className="mx-auto mt-4 max-w-2xl text-record-muted">Four decades of finding and advancing solutions to the interrelated concerns of global health, environment, and poverty.</p>
      <div className="mx-auto mt-6 max-w-md border-t border-record-ink/20 pt-5">
        <p className="record-header-type text-xs text-record-red">Made in Scotland from photons</p>
        <a href="mailto:family@uf51.love" aria-label="Contact UF51 CIC about this record" className="record-header-type mt-4 inline-block min-h-11 text-xs text-record-ink underline decoration-record-red underline-offset-4 hover:text-record-red">Contact UF51 CIC</a>
      </div>
    </section>
  );
}