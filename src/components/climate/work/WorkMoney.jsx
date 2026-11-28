import React from 'react';
import { Link } from 'react-router-dom';

// ── 06 · THE MONEY, IN THE OPEN ───────────────────────────────────────────────
// Every fact in this table is on the public register or in the company's own records: the
// certificate of incorporation, the memorandum of association, and the register entry for
// SC870603. It is printed here because a record that hides its own balance is not a record,
// and because anybody thinking of putting money behind this would find it out in the first
// conversation anyway.
const LEDGER = [
  ['Registered as', 'Community Interest Company, private limited by guarantee'],
  ['Company number', 'SC870603'],
  ['Incorporated', '19 November 2025'],
  ['Registered office', 'Upper Stoneymollan Cottage, Alexandria, Scotland'],
  ['Directors, and the only two subscribers', 'Brian Hughes · Gillian Barbara Brown'],
  ['Share capital', 'None. A company limited by guarantee has no shares to sell, so there is nothing for an investor to buy'],
  ['Asset lock', 'Yes. The regulator’s lock applies: the assets cannot be distributed to the people who run it'],
  ['Investors', 'None'],
  ['Grants', 'None'],
  ['Paid to anybody so far', 'Nothing. Not a salary, not a fee, not a dividend'],
  ['Paid by anybody so far', 'Nothing. The ledger is built and standing empty, in public'],
  ['Filing', 'The company’s first confirmation statement is due now, and is being filed'],
];

export default function WorkMoney() {
  return (
    <>
      <section className="work-band">
        <p className="work-band-head"><span>06</span>The money, in the open</p>
        <p className="work-band-note">
          Read off the register and the company’s own papers. If a line here is wrong, it is wrong in public.
        </p>
        <dl className="work-ledger">
          {LEDGER.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p>
          What this means in plain terms: there is a real legal body, one year old, locked so
          that nobody can take value out of it, holding a record that refuses to sell anything.
          There is no runway, no backer and no plan to be acquired. The <Link to="/ClimateLedger">ledger
          that will print every payment as it moves</Link> is built, published, and waiting.
        </p>
      </section>

      <section className="work-band">
        <p className="work-band-head"><span>07</span>What it refuses, in writing</p>
        <ul className="work-refusals">
          <li><b>Nothing is sold on the record.</b> No advertising, no sponsored entries, no paywall on a solution or a crisis.</li>
          <li><b>Nobody is ranked.</b> No likes, no followers, no score for a person, an artist or an organisation.</li>
          <li><b>No reader is tracked and sold.</b> What is counted is a reading by country, never a person, and the arithmetic of that is published.</li>
          <li><b>No child is asked for an account.</b> The learning tools and the studio work without one, and keep nothing about a child.</li>
          <li><b>No extractor gets a seat.</b> The covenant is a licence, not a promise: it says what this can never be turned into, and it is published so that turning it into one of those things would be visible.</li>
        </ul>
      </section>
    </>
  );
}