import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import DonationForm from '@/components/climate/support/DonationForm';
import SupportWall from '@/components/climate/support/SupportWall';
import SupportThanks from '@/components/climate/support/SupportThanks';

// ── KEEPING THE RECORD ──
// Not a begging page. The record says no advertising, no sponsorship, nothing for
// sale — this is the page that has to keep that true, so a gift buys nothing here:
// no place, no position, no mention. Names stand in the order they arrived.

const PLEDGE = [
  'No advertising, ever.',
  'No sponsorship, ever.',
  'Money buys no place, no position, no mention.',
  'A name is shown only if the giver asked for it. Every gift is declared here, in the open.',
];

export default function ClimateSupport() {
  const [result, setResult] = useState(null);
  const [wall, setWall] = useState({ names: [], supporters: 0 });
  const [loadingWall, setLoadingWall] = useState(true);

  const loadWall = async () => {
    try {
      const res = await base44.functions.invoke('climateSupportWall', {});
      setWall(res.data || { names: [], supporters: 0 });
    } catch (error) {
      console.error('Could not load the wall', error);
    } finally {
      setLoadingWall(false);
    }
  };

  useEffect(() => {
    loadWall();

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (params.get('support') === 'thanks' && sessionId) {
      base44.functions
        .invoke('verifyClimateDonation', { session_id: sessionId })
        .then(res => {
          setResult(res.data || { recorded: false });
          if (res.data?.recorded) loadWall();
        })
        .catch(error => {
          console.error('Could not confirm the gift', error);
          setResult({ recorded: false });
        });
    }
  }, []);

  return (
    <main className="mx-auto w-full max-w-[680px] px-4 py-8 sm:py-10">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-record-signal">● Keeping the record</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase leading-[1.05] text-record-ink">
        The record is kept by people.
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-record-ink">
        Nothing on this record is for sale — not a place, not a position, not a mention in an entry.
        Gifts pay for the servers, the human check on every submission, and the translation into every language.
        They buy nothing else.
      </p>

      <div className="mt-6 space-y-6">
        {result && <SupportThanks result={result} />}

        <DonationForm />

        {loadingWall ? (
          <p className="border-2 border-record-ink/15 p-4 text-[11px] text-record-muted">Loading the wall…</p>
        ) : (
          <SupportWall names={wall.names} supporters={wall.supporters} />
        )}

        <section className="border-t border-record-ink/20 pt-5">
          <h2 className="font-display text-lg font-bold uppercase text-record-ink">What is promised</h2>
          <ul className="mt-3 space-y-2">
            {PLEDGE.map(line => (
              <li key={line} className="text-[12px] leading-relaxed text-record-muted">· {line}</li>
            ))}
          </ul>
          <Link
            to={createPageUrl('TogetherChangeClimate')}
            className="mt-4 inline-block text-[11px] font-black uppercase tracking-wider text-record-signal underline underline-offset-4"
          >
            Back to the record
          </Link>
        </section>
      </div>
    </main>
  );
}