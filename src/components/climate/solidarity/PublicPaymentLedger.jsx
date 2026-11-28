import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PaymentLine from '@/components/climate/solidarity/PaymentLine';

export default function PublicPaymentLedger() {
  const ledger = useInfiniteQuery({
    queryKey: ['public-record-payments'], initialPageParam: null,
    queryFn: ({ pageParam }) => base44.entities.RecordPayment.filter({}, { sort: '-paid_on', limit: 50, ...(pageParam ? { cursor: pageParam } : {}) }),
    getNextPageParam: page => page.has_more ? page.next_cursor : undefined,
  });
  const lines = ledger.data?.pages.flatMap(page => page.items || []) || [];
  return <section className="my-12 border-t-2 border-record-ink pt-6" id="ledger-lines" aria-labelledby="ledger-lines-title">
    <p className="stand-kicker">Money that is recorded, not money imagined</p>
    <h2 className="stand-section-title mt-2" id="ledger-lines-title">The open ledger.</h2>
    <p className="mt-3 mb-5 text-base leading-relaxed max-w-prose">The payer, the purpose, the fee and the recipient. These are the record’s entries, not independent verification of a bank payment.</p>
    {ledger.isPending && <p role="status">Reading the ledger…</p>}
    {ledger.isError && <p role="alert">The ledger could not be read. <button className="underline font-bold" onClick={() => ledger.refetch()}>Try again</button></p>}
    {!ledger.isPending && !ledger.isError && !lines.length && <div className="border-l-4 border-record-red px-5 py-4 bg-record-bone"><p className="font-bold text-lg">No payments recorded yet.</p><p className="mt-2">No amount is presented here as received, promised or paid.</p></div>}
    {lines.length > 0 && <ol>{lines.map(line => <PaymentLine key={line.id} line={line} />)}</ol>}
    {ledger.hasNextPage && <button className="mt-4 min-h-12 border border-record-ink px-5 font-bold" disabled={ledger.isFetchingNextPage} onClick={() => ledger.fetchNextPage()}>{ledger.isFetchingNextPage ? 'Reading more…' : 'More ledger entries'}</button>}
    {ledger.isFetchNextPageError && <p role="alert" className="mt-3 text-record-red">More entries could not be read. Use “More ledger entries” to try again.</p>}
  </section>;
}