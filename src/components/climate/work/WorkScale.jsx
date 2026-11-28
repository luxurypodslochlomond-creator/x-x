import React from 'react';
import { Link } from 'react-router-dom';

// ── 04 · WHAT IT COULD BECOME AT HER SCALE ────────────────────────────────────
// Three arguments, and they are arguments rather than claims. The figures are the ones
// already published on the record's own partner page, from the sources named under each
// block: the Legal Services Corporation's justice gap report, Citizens Advice's own impact
// figures, and the market research linked there. Nothing here is invented for this page,
// and nothing here is a projection of our revenue.
const ARGUMENTS = [
  {
    kicker: 'SORTED',
    head: 'Pressure is the one thing that is distributed perfectly evenly. Help is not.',
    body: [
      'A letter arrives with a deadline on it. The person who can afford a solicitor reads it in ten minutes. The person who cannot puts it in a drawer and it becomes a court date, an eviction, a debt that grows. The letter is the same letter.',
      'SORTED reads it, says what it means, says what to do next, and writes the reply, in any language, without an account, and the letter is never stored. Ten uses a day are free and reset daily with no wall. After that it is £9.99 a month, or £9.99 once for life. That is the honest price of it, and it is the price of a coffee rather than the hourly rate of a solicitor, which is £150 to £400.',
    ],
    figures: [
      { n: '5.1B', l: 'people worldwide with unmet justice needs, by the World Justice Project’s own count' },
      { n: '57%', l: 'fall in civil legal aid case volumes in England and Wales between 2012 and 2024' },
      { n: '90%', l: 'of social-welfare legal aid gone since 2012: the kind that covers benefits, housing and debt' },
    ],
    source: 'World Justice Project, measuring justice · Institute for Fiscal Studies, on legal aid volumes · both quoted with their sources on SORTED’s own FAQ',
    to: '/Sorted',
    door: 'Open SORTED',
  },
  {
    kicker: 'ALETHEIA',
    head: 'The thing machines are worst at is the thing a record is for: saying where a sentence came from.',
    body: [
      'Ask a model a question and it will answer with total confidence whether or not anything stands behind the answer. That is not a bug you patch, it is what the machine is. So we built the opposite shape: a question is asked, an answer is given, and every sentence carries the source it came from, in the reader’s own language.',
      'It runs on the same rule as the rest of the record, which is that an unsourced claim does not get to look like a sourced one. For an institution that publishes, this is the useful part: not a cleverer chatbot, a citation habit that holds at scale.',
    ],
    figures: [
      { n: '1', l: 'source beside every sentence, or the sentence does not stand' },
      { n: '225', l: 'tongues the record names in their own words, with the English name beside each' },
      { n: '0', l: 'answers the reader is asked to take on trust' },
    ],
    source: 'The record’s own search and answer pages, built on the same entry set as the wire',
    to: '/Aletheia',
    door: 'Ask it something',
  },
  {
    kicker: 'PHOTO51',
    head: 'A question worth her time: can value be minted by repair instead of by extraction?',
    body: [
      'A photograph of litter picked up becomes one token. The tokens are meant to become food, essentials and kit for the people doing the picking, and every payment is printed in the open like every other payment on the record.',
      'It is an experiment and it is described as one. It is not a coin sale, there is nothing to speculate on, and no reader is ever asked to buy a position. But the question underneath it is serious, and it is the question her whole field is circling: the money that moves for the planet currently moves through instruments and intermediaries, and almost none of it reaches the hand that did the work. This asks whether it can.',
    ],
    figures: [
      { n: '$650B', l: 'of green bonds issued in 2025, every one of them needing an intermediary to verify it' },
      { n: '1kg', l: 'of litter = 1 token, with the photograph, the place and the time kept as evidence' },
      { n: '£0', l: 'taken from anybody to date. The ledger is built and standing empty, in public' },
    ],
    source: 'Climate Bonds Initiative market reporting · the record’s own ledger, which prints every payment as it moves',
    to: '/NewCleanup',
    door: 'See how it works',
  },
];

export default function WorkScale() {
  return (
    <>
      <section className="work-band">
        <p className="work-band-head"><span>05</span>Three things that could matter at your scale</p>
        <p className="work-band-note">
          Each of these is an argument, not a claim, and the figures under each are already
          published on the record with their sources named. Read them the way you read anything
          else: if a number does not survive being checked, the argument under it does not either.
        </p>
      </section>
      {ARGUMENTS.map((a) => (
        <section className="work-band work-scale" key={a.kicker}>
          <p className="work-scale-kicker">{a.kicker}</p>
          <p className="work-scale-head">{a.head}</p>
          {a.body.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
          <div className="work-figures">
            {a.figures.map((f) => (
              <div className="work-figure" key={f.l}>
                <b>{f.n}</b>
                <span>{f.l}</span>
              </div>
            ))}
          </div>
          <p className="work-source">Figures: {a.source}</p>
          <p className="work-band-door"><Link to={a.to}>{a.door} →</Link></p>
        </section>
      ))}
    </>
  );
}