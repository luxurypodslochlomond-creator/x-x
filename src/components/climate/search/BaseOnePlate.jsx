import React from 'react';
import '@/components/climate/search/base-one.css';

const HOLDS = ['Solutions', 'Emergencies', 'Actions', 'Groups', 'The wire', 'Pictures', 'Readers’ words', 'The roll', 'Music', 'Drawings'];

// The footer is the reference: red lettering on paper, one yellow band, quiet labels.
export default function BaseOnePlate({ statement }) {
  return (
    <section className="base-one border-t-4 border-cartoon-sun text-center text-record-ink">
      <div className="px-4 pb-7 pt-8 sm:px-6">
        <p className="base-one-label font-mono uppercase text-record-mark">Index · the record’s own</p>
        <h1 className="base-one-title mt-4 text-record-mark">BASE 1</h1>
        {statement && <p className="base-one-copy mx-auto mt-5 font-mono text-record-ink">{statement}</p>}
      </div>
      <div className="bg-cartoon-sun px-4 py-5 sm:px-6">
        <p className="base-one-label font-mono uppercase text-record-mark">One question · every room · every tongue</p>
        <span aria-hidden="true" className="mx-auto my-4 block h-px w-10 bg-record-ink/30" />
        <ul className="base-one-holds flex flex-wrap justify-center gap-x-5 gap-y-2">
          {HOLDS.map((label) => <li key={label} className="base-one-label font-mono uppercase text-record-ink">{label}</li>)}
        </ul>
        <p className="base-one-label font-mono uppercase mt-4 text-record-ink">Nothing guessed · nothing ranked · nothing sold</p>
      </div>
    </section>
  );
}