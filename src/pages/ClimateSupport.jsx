import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import { SUPPORT_STRINGS } from '@/components/climate/support/supportStrings';
import DonationForm from '@/components/climate/support/DonationForm';
import SupportWall from '@/components/climate/support/SupportWall';
import SupportThanks from '@/components/climate/support/SupportThanks';
import SupportDoors from '@/components/climate/support/SupportDoors';
import '@/components/climate/support/support-page.css';

// ── KEEPING THE RECORD ──
// Not a begging page. The record says no advertising, no sponsorship, nothing for
// sale — this is the page that has to keep that true, so a gift buys nothing here:
// no place, no position, no mention. Names stand in the order they arrived.
//
// Every tongue on Earth: the record's own bar in the header carries the language on this page,
// exactly as it does on every other page — one control, one remembered tongue, one engine, so
// nothing is ever translated twice. This page adds no second picker of its own.
// It wears the same cold bands as the Founder page, so the record reads as one place.

export default function ClimateSupport() {
  const { isRTL } = useSiteLanguage();
  const [result, setResult] = useState(null);
  const [wall, setWall] = useState({ names: [], supporters: 0 });
  const [loadingWall, setLoadingWall] = useState(true);
  const [givingOpen, setGivingOpen] = useState(false);

  const t = SUPPORT_STRINGS.en;

  const loadWall = async () => {
    try {
      const res = await base44.functions.invoke('climateSupportWall', {});
      setWall(res.data || { names: [], supporters: 0 });
      setGivingOpen(Boolean(res.data?.giving_open));
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

  const pledge = [t.pledge_1, t.pledge_2, t.pledge_3, t.pledge_4];

  return (
    <ClimateRecordShell
      dir={isRTL ? 'rtl' : 'ltr'}
      painted
      eyebrow={(t.eyebrow || '').replace(/^●\s*/, '')}
      marker={t.pledge_1}
      title={t.heading}
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel={t.back}
      footer={`${t.pledge_2} ${t.pledge_3}`}
      className="support-page"
    >
      <p className="support-claim">Free to see. <span>Not free to make.</span></p>
      <p className="support-intro">{t.intro}</p>

      <SupportDoors />

      <div className="support-give" id="give">
        <h2 className="support-give-head">Keep the record.</h2>
        {result && <SupportThanks result={result} t={t} />}
        {loadingWall ? (
          <p className="mt-3 text-[13px] leading-relaxed text-record-muted">{t.wall_loading}</p>
        ) : (
          <div className="mt-3"><DonationForm t={t} open={givingOpen} /></div>
        )}
      </div>

      {!loadingWall && (
        <>
          <h2 className="support-section-head">{t.wall_heading}</h2>
          <SupportWall names={wall.names} supporters={wall.supporters} t={t} />
        </>
      )}

      <section className="support-promise">
        <h2 className="support-section-head mt-0">{t.pledge_heading}</h2>
        <ul>
          {pledge.map(line => <li key={line}>{line}</li>)}
        </ul>
      </section>
    </ClimateRecordShell>
  );
}