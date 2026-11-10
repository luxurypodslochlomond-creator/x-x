import React from 'react';

export default function XEqualsXOpening() {
  return (
    <section aria-labelledby="the-terms" className="pb-6 pt-4 lg:pt-7">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span aria-label="x equals x" className="font-mono text-[27px] leading-normal text-record-mark">x = x</span>
        <span className="text-[13px] text-record-muted">The covenant</span>
      </div>
      <h1 id="the-terms" className="mt-6 max-w-[18ch] font-display text-[34px] leading-tight text-record-ink lg:text-[44px]">
        Nobody above anybody.
      </h1>
      <p className="mt-5 text-record-ink">
        Every person has equal worth. A claim still has to stand up to evidence.
      </p>
      <p className="mt-3 text-record-muted">
        That is what x = x means here. A principle we choose, not a scientific finding.
      </p>
    </section>
  );
}