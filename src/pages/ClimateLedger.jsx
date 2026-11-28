import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import RecordBand from '@/components/climate/RecordBand';

// ── THE LEDGER ──────────────────────────────────────────────────────────────────
// Francis, 28 November, to Janine and to us: "some of the cartoonists are asking me
// about compensation for their creative input… I have not been able to secure any
// monetary support yet… please advise me on what I can do to make the CAIB programme
// financially sustainable." Janine answered within the hour with the usual good instinct:
// a discreet donation request at the end of the Zoom, and a place on CAIB to accept it.
//
// A donate button is not wrong. It is just the end of the sentence, and it leaves three
// things unsaid: who decides where the money goes, what the platform takes on the way,
// and what happens to the maker who is waiting. Every platform that ever started as a
// community and ended as an extractor started exactly there — with a button, then a
// percentage, then a ranking, then an advert, then an audience for sale.
//
// So this page says the three things before a penny arrives, and then prints the money
// as it actually moves. It is deliberately not clever: five things that are never for
// sale, three ways money may arrive, one rule for dividing a gift nobody earmarked, and
// the lines themselves. A reader can total it. That is the whole idea — a promise you can
// check is worth more than a promise you can admire.
//
// It is also the answer to the question underneath Brian's: can a thing be paid for
// without the payer ending up owning the person who made it? Yes, if the money attaches
// to the making rather than to the looking. Every extractor pays per view, which is why
// the extractor ends up owning the audience and the maker waits on a number they cannot
// see. Nothing here is paid per view. The arithmetic is on this page instead.

function money(amount, currency) {
  const value = Number(amount || 0);
  const shown = value.toLocaleString('en-GB', { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 });
  return currency && currency !== 'GBP' ? `${shown} ${currency}` : `£${shown}`;
}

const NEVER_FOR_SALE = [
  ['Not the work.', 'No drawing, track or entry is sold, gated, licensed or ranked. If it is on the record it is open to everyone, for nothing, for good.'],
  ['Not the attention.', 'No advertising and no advertorial. A catalogue’s credibility is not a space to rent, and nothing inside the work is paid for by somebody who wants to sell something beside it.'],
  ['Not the reader.', 'No reader is profiled. Nothing about a reader is sold, shared or handed to anyone — not a name, not an address, not a place.'],
  ['Not the order.', 'Nobody’s work moves down the wall because somebody else paid. There is no paid place on this record and there will not be one.'],
  ['Not the future.', 'No subscription that gates other people’s work, and no promise about money that is not printed on this page.'],
];

const WAYS_IN = [
  ['A commission', 'One payer, one drawing, one hand. The cartoonist sets the price and keeps the rights. The drawing then goes on the wall free, like every other one. What is bought is the making of it, never the future of it.'],
  ['A custody gift', 'Money to keep and catalogue the archive — not to own it. The funder’s name goes on the ledger below. It never goes on the drawing.'],
  ['A door', 'An unearmarked gift, split by the rule in the next band. This is what a donation at the end of a Zoom becomes here: not a fund nobody can see into, but named shares with a name beside each one.'],
];

const THE_RULE = [
  ['Equal shares, worked out by hand.', 'Every hand that has given a drawing to this record in the last twelve months takes an equal share of an unearmarked gift. No vote, no ranking, no algorithm, and nobody choosing favourites.'],
  ['A share is never taken from a hand that cannot be paid yet.', 'If somebody has no way to receive money, their share stays on the ledger marked owed until they do. It does not go to anybody else, and it does not quietly expire.'],
  ['The record takes nothing.', 'The payment processor takes a fee, and that fee is printed on every line, because a cost that is not shown is a cut.'],
  ['Everything is addable.', 'Date, who paid, how much, what it bought, the fee, and the hand it reached. Anyone can total this page and check it against the bank it came from.'],
];

export default function ClimateLedger() {
  const [lines, setLines] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    base44.entities.RecordPayment
      .filter({}, { sort: '-paid_on', limit: 100 })
      .then((page) => { if (live) setLines(page?.items || []); })
      .catch(() => { if (live) { setLines([]); setError('That list could not be read just now. The rule above still stands.'); } });
    return () => { live = false; };
  }, []);

  return (
    <ClimateRecordShell
      eyebrow="The ledger"
      marker="THE LEDGER · x = x"
      title="What money does here"
      statement="The work is free and stays free. The making can be paid for. Every payment is printed with the hand it reached and the fee taken on the way."
      returnTo="/ClimateCartoons"
      returnLabel="The room of cartoons"
      footer="Nothing on this page is a promise about the future. It is the rule as it stands today, and the ledger below shows what has actually moved."
    >
      <RecordBand id="ledger-promise" label="The promise" title="Nothing on this record is for sale.">
        <ul className="space-y-3">
          {NEVER_FOR_SALE.map(([lead, body]) => (
            <li key={lead} className="text-[15.5px] leading-[1.6] text-record-ink">
              <strong className="font-semibold">{lead}</strong> {body}
            </li>
          ))}
        </ul>
      </RecordBand>

      <RecordBand id="ledger-ways" label="How money can arrive" title="Three ways, and nothing else.">
        <div className="space-y-5">
          {WAYS_IN.map(([lead, body], i) => (
            <div key={lead} className="border-l-2 border-record-ink/20 pl-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-record-muted">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-1 text-[19px] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{lead}</h3>
              <p className="mt-1.5 text-[15.5px] leading-[1.6] text-record-ink">{body}</p>
            </div>
          ))}
        </div>
      </RecordBand>

      <RecordBand id="ledger-rule" label="The rule" title="Written down before a penny arrives.">
        <ul className="space-y-3.5">
          {THE_RULE.map(([lead, body]) => (
            <li key={lead} className="text-[15.5px] leading-[1.6] text-record-ink">
              <strong className="font-semibold">{lead}</strong> {body}
            </li>
          ))}
        </ul>
      </RecordBand>

      <RecordBand id="ledger-lines" label="The ledger" title="Every line, as it happens.">
        {lines === null && (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-record-muted">Reading the ledger…</p>
        )}

        {lines && lines.length === 0 && (
          <div className="border border-record-ink/20 px-4 py-5">
            <p className="text-[15.5px] leading-[1.6] text-record-ink">
              No lines yet. Nothing has arrived, so there is nothing to print.
            </p>
            <p className="mt-2 text-[14px] leading-[1.6] text-record-muted">
              The first line will appear here on the day it does — with who paid, how much, what it bought, the fee
              taken on the way, and the hand it reached. An empty page is the honest version of a page that would
              otherwise be a promise.
            </p>
          </div>
        )}

        {error && <p className="mt-3 text-[14px] text-record-signal">{error}</p>}

        {lines && lines.length > 0 && (
          <ol className="border-b border-record-ink/15">
            {lines.map((line) => (
              <li key={line.id} className="border-t border-record-ink/15 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-record-muted">
                    {line.paid_on}{line.status === 'owed' ? ' · held as owed' : ''}
                  </p>
                  <p className="font-display text-[17px] tabular-nums text-record-ink">{money(line.amount, line.currency)}</p>
                </div>
                <p className="mt-1.5 text-[15.5px] leading-[1.55] text-record-ink">
                  <strong className="font-semibold">{line.from_name}</strong>
                  {' → '}
                  <strong className="font-semibold">{line.to_hand || 'the wall'}</strong>
                  {line.for_what ? ` · ${line.for_what}` : ''}
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">
                  fee {money(line.fee, line.currency)}
                  {line.receipt_ref ? ` · receipt ${line.receipt_ref}` : ''}
                </p>
                {line.note && <p className="mt-1.5 text-[14px] leading-[1.55] text-record-muted">{line.note}</p>}
              </li>
            ))}
          </ol>
        )}
      </RecordBand>

      <RecordBand id="ledger-why" label="Why this is the other way round" title="Money on the making, never on the looking.">
        <p className="text-[15.5px] leading-[1.6] text-record-ink">
          Every platform that pays creators pays them per view. That is what makes the platform the landlord: it owns
          the audience, the maker waits on a number they cannot see, and the share is set by the party that benefits
          from it being small. Here the money attaches to a work being made or kept, never to how many people looked
          at it. That is the whole difference, and it is why the arithmetic is on this page. A model that can be
          checked cannot quietly turn into the other one.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.6] text-record-ink">
          If any of this stops being true, the change would have to be a line on this page first — in the open, where
          the people it costs something can read it before it happens.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-record-muted">
          <Link to="/ClimateCartoons" className="underline underline-offset-4 hover:text-record-signal">The wall it is for</Link>
          {' · '}
          <Link to="/ExtractionProofCovenant" className="underline underline-offset-4 hover:text-record-signal">The covenant</Link>
        </p>
      </RecordBand>
    </ClimateRecordShell>
  );
}