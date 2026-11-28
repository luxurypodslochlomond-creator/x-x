import React from 'react';

function money(amount, currency = 'GBP') {
  const number = Number(amount || 0).toLocaleString('en-GB', { maximumFractionDigits: 2 });
  return currency === 'GBP' ? `£${number}` : `${number} ${currency}`;
}
export default function PaymentLine({ line }) {
  return <li className="border-t border-record-ink/30 py-5">
    <div className="flex flex-wrap justify-between gap-2 font-semibold">
      <p><time dateTime={line.paid_on}>{line.paid_on}</time> · {line.status === 'owed' ? 'Owed, not yet paid' : 'Recorded as paid'}</p>
      <p className="text-xl tabular-nums">{money(line.amount, line.currency)}</p>
    </div>
    <p className="mt-2 text-base leading-relaxed"><strong>{line.from_name}</strong> → <strong>{line.to_hand || 'the wall'}</strong> · {line.for_what}</p>
    <p className="mt-2 text-sm text-record-muted">Processor fee: {money(line.fee, line.currency)}{line.receipt_ref && ` · Receipt: ${line.receipt_ref}`}</p>
    {line.note && <p className="mt-2 text-base text-record-muted">{line.note}</p>}
  </li>;
}