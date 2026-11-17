import React from 'react';

export default function FounderName() {
  return (
    <section aria-labelledby="founder-name" className="record-founder-plate mx-auto my-6 w-full max-w-4xl border-t-4 border-record-red bg-record-paper px-5 py-8 text-center lg:my-8 lg:px-10 lg:py-10">
      <h1 id="founder-name" className="font-display text-3xl font-bold uppercase text-record-ink lg:text-5xl">Janine M. H. Selendy</h1>
      <p className="record-header-type mx-auto mt-5 text-sm text-record-ink">Founder</p>
      <p className="mx-auto mt-4 max-w-2xl text-record-muted">Four decades of finding and advancing solutions to the interrelated concerns of global health, environment, and poverty.</p>
      <div className="mx-auto mt-6 max-w-md border-t border-record-ink/20 pt-5">
        <p className="record-header-type text-xs text-record-red">Made in Scotland from photons</p>
        <a href="mailto:family@uf51.love" aria-label="Contact UF51 CIC about this record" className="record-header-type mt-4 inline-block min-h-11 text-xs text-record-ink underline decoration-record-red underline-offset-4 hover:text-record-red">Contact UF51 CIC</a>
      </div>
    </section>
  );
}