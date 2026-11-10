import React from 'react';

export default function XEqualsXThanks() {
  return (
    <section id="what-is-owed" aria-label="Artistic context and acknowledgements" className="space-y-5 pb-5 pt-6">
      <figure>
        <blockquote className="text-record-ink">
          “This is the time. And this is the record of the time.”
        </blockquote>
        <figcaption className="mt-3 text-[13px] leading-relaxed text-record-muted">
          Laurie Anderson · <em>From the Air</em> · <em>Big Science</em>, 1982
        </figcaption>
      </figure>
      <p>
        The title comes from those words. The red is a reference to the sleeve of{' '}
        <em>O Superman</em> (1981). These are artistic debts, not endorsements. If the artist
        asks, both will be removed and the change noted here.
      </p>
      <p className="text-record-muted">
        Janine Selendy asked for this acknowledgement to appear once. It is kept together here.
      </p>
      <p>
        Lou Reed is acknowledged for the influence of his plain-speaking voice. None of his
        work is quoted here.
      </p>
    </section>
  );
}