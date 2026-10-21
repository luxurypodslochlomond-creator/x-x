import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import AmountPicker from './AmountPicker';
import NameChoice from './NameChoice';

export default function DonationForm() {
  const [amount, setAmount] = useState(500);
  const [frequency, setFrequency] = useState('one_time');
  const [visibility, setVisibility] = useState('anonymous');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pounds = (amount / 100).toFixed(amount % 100 === 0 ? 0 : 2);

  const handleGive = async () => {
    setError('');
    if (!amount || amount < 100) { setError('The smallest gift is £1.'); return; }
    if (amount > 500000) { setError('Please give below £5,000 for now, or ask the keepers for another way.'); return; }
    if (visibility !== 'anonymous' && name.trim().length < 2) {
      setError('Please add the name you would like shown, or choose no name.');
      return;
    }

    // Stripe needs a top-level page. Inside the preview frame the tab is opened
    // straight from the tap, so the browser still counts it as your own doing.
    const framed = window.self !== window.top;
    const tab = framed ? window.open('', '_blank') : null;
    if (framed && !tab) { setError('Please allow pop-ups to continue to payment.'); return; }
    if (tab) tab.opener = null;

    setBusy(true);
    try {
      const res = await base44.functions.invoke('createClimateDonationCheckout', {
        amount,
        frequency,
        visibility,
        display_name: name.trim(),
      });
      const url = res.data?.url;
      if (!url) throw new Error(res.data?.error || 'Could not open the payment page.');
      if (tab) tab.location.replace(url); else window.location.assign(url);
    } catch (err) {
      tab?.close();
      setError(err?.response?.data?.error || err.message || 'Could not open the payment page.');
      setBusy(false);
    }
  };

  return (
    <section className="border-2 border-record-ink bg-record-bone p-4 sm:p-5">
      <h2 className="font-display text-xl font-bold uppercase leading-tight text-record-ink">Keep the record running</h2>
      <p className="mt-1 text-[12px] leading-relaxed text-record-muted">
        Servers, the human check on every submission, and the translation. Payment is handled by Stripe — we never see your card.
      </p>

      <div className="mt-4 flex gap-2">
        {[['one_time', 'One gift'], ['monthly', 'Each month']].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFrequency(value)}
            aria-pressed={frequency === value}
            className={`flex-1 px-3 py-2.5 min-h-[44px] text-[11px] font-black uppercase tracking-wider border-2 transition-colors ${frequency === value ? 'bg-record-ink text-record-bone border-record-ink' : 'border-record-ink/25 text-record-ink active:border-record-ink'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        <AmountPicker amount={amount} onChange={setAmount} />
        <NameChoice visibility={visibility} onVisibility={setVisibility} name={name} onName={setName} />
      </div>

      {error && <p className="mt-4 text-[12px] leading-snug text-record-red">{error}</p>}

      <button
        type="button"
        onClick={handleGive}
        disabled={busy}
        className="mt-4 w-full min-h-[52px] px-4 py-3.5 bg-record-signal text-record-ink text-[13px] font-black uppercase tracking-wider border-2 border-record-ink disabled:opacity-50 active:bg-record-ink active:text-record-bone transition-colors"
      >
        {busy ? 'Opening payment…' : `Give £${pounds}${frequency === 'monthly' ? ' each month' : ''}`}
      </button>
      <p className="mt-2 text-[10px] leading-snug text-record-muted">
        No advertising, no sponsorship, and no place on this record is for sale.
      </p>
    </section>
  );
}