import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { useClimateLanguage } from '@/components/climate/useClimateLanguage';
import ClimateLanguagePicker from '@/components/climate/ClimateLanguagePicker';
import { SUPPORT_STRINGS } from '@/components/climate/support/supportStrings';
import DonationForm from '@/components/climate/support/DonationForm';
import SupportWall from '@/components/climate/support/SupportWall';
import SupportThanks from '@/components/climate/support/SupportThanks';

// ── KEEPING THE RECORD ──
// Not a begging page. The record says no advertising, no sponsorship, nothing for
// sale — this is the page that has to keep that true, so a gift buys nothing here:
// no place, no position, no mention. Names stand in the order they arrived.
//
// Every tongue on Earth: the page carries the same language control as the record,
// reads the same remembered tongue, and translates its own words live.

export default function ClimateSupport() {
  const { lang, setLanguage, isRTL, translating, liveStrings } = useClimateLanguage(SUPPORT_STRINGS.en);
  const [result, setResult] = useState(null);
  const [wall, setWall] = useState({ names: [], supporters: 0 });
  const [loadingWall, setLoadingWall] = useState(true);
  const [givingOpen, setGivingOpen] = useState(false);

  const t = { ...SUPPORT_STRINGS.en, ...(liveStrings || {}) };

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
    <main dir={isRTL ? 'rtl' : 'ltr'} className="mx-auto w-full max-w-[680px] px-4 py-6 sm:py-10">
      <div className="border-2 border-record-ink/20 bg-record-bone px-3 py-2.5">
        <ClimateLanguagePicker lang={lang} onChange={setLanguage} translating={translating} t={t} />
      </div>

      <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-record-signal">{t.eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase leading-[1.05] text-record-ink">
        {t.heading}
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-record-ink">{t.intro}</p>

      <div className="mt-6 space-y-6">
        {result && <SupportThanks result={result} t={t} />}

        {loadingWall ? (
          <p className="border-2 border-record-ink/15 p-4 text-[11px] text-record-muted">{t.wall_loading}</p>
        ) : (
          <>
            <DonationForm t={t} open={givingOpen} />
            <SupportWall names={wall.names} supporters={wall.supporters} t={t} />
          </>
        )}

        <section className="border-t border-record-ink/20 pt-5">
          <h2 className="font-display text-lg font-bold uppercase text-record-ink">{t.pledge_heading}</h2>
          <ul className="mt-3 space-y-2">
            {pledge.map(line => (
              <li key={line} className="text-[12px] leading-relaxed text-record-muted">· {line}</li>
            ))}
          </ul>
          <Link
            to={createPageUrl('TogetherChangeClimate')}
            className="mt-4 inline-block text-[11px] font-black uppercase tracking-wider text-record-signal underline underline-offset-4"
          >
            {t.back}
          </Link>
        </section>
      </div>
    </main>
  );
}