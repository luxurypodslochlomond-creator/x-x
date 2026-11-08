import React from 'react';

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-covenant" className="pb-2 pt-6 sm:pt-10">
      <div className="mb-7 flex items-baseline justify-between gap-4">
        <span className="font-body text-3xl tracking-tight text-record-mark" aria-label="x equals x">x = x</span>
        <span className="record-meta text-record-muted">The covenant</span>
      </div>
      <h1 id="the-covenant" className="font-body text-5xl sm:text-7xl text-record-ink">
        Nobody above<br />anybody.
      </h1>
      <div className="mt-7 max-w-[48ch] space-y-4">
        <p>Good work happens far from the loudest microphone. So do disasters. This record gives both somewhere to stay.</p>
        <p>An entry needs a source, not a following. A correction needs to be seen, not quietly written over.</p>
      </div>
      <p className="record-meta mt-6 border-l-2 border-record-mark pl-4 text-record-muted">
        Equal human worth. Not equal evidence, and not equal scale.
      </p>
    </section>
  );
}