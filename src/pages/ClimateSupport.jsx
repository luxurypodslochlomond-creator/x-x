import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import ClimateLanguagePicker from '@/components/climate/ClimateLanguagePicker';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import { SUPPORT_STRINGS } from '@/components/climate/support/supportStrings';
import DonationForm from '@/components/climate/support/DonationForm';
import SupportWall from '@/components/climate/support/SupportWall';
import SupportThanks from '@/components/climate/support/SupportThanks';

// ── KEEPING THE RECORD ──
// Not a begging page. The record says no advertising, no sponsorship, nothing for
// sale — this is the page that has to keep that true, so a gift buys nothing here:
// no place, no position, no mention. Names stand in the order they arrived.
//
// Every tongue on Earth: the page carries the same language control as the record, reads the
// same remembered tongue, and is translated by the one engine the whole record uses — the
// same ask and the same memory as every other page, so nothing is ever translated twice.
// It wears the same cold bands as the Founder page, so the record reads as one place.

export default function ClimateSupport() {
  const { lang, setLanguage, isRTL, translating } = useSiteLanguage();
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
      eyebrow={(t.eyebrow || '').replace(/^●\s*/, '')}
      marker={t.pledge_1}
      title={t.heading}
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel={t.back}
      footer={`${t.pledge_2} ${t.pledge_3}`}
    >
      <div className="border border-[#141210] bg-[#f7f1e5] px-3 py-2.5">
        <ClimateLanguagePicker lang={lang} onChange={setLanguage} translating={translating} t={t} />
      </div>

      <p className="mt-6 text-[12px] font-mono leading-relaxed text-[#141210]">{t.intro}</p>

      <div className="mt-6 space-y-6">
        {result && <SupportThanks result={result} t={t} />}

        {loadingWall ? (
          <p className="border border-[#141210] bg-[#f7f1e5] p-5 text-[11px] font-mono text-[#5a5246]">{t.wall_loading}</p>
        ) : (
          <>
            <DonationForm t={t} open={givingOpen} />
            <SupportWall names={wall.names} supporters={wall.supporters} t={t} />
          </>
        )}

        <section className="border-t-2 border-[#141210] pt-6">
          <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            {t.pledge_heading}
          </h2>
          <ul className="mt-3 space-y-2">
            {pledge.map(line => (
              <li key={line} className="text-[12px] font-mono leading-relaxed text-[#141210]">· {line}</li>
            ))}
          </ul>
        </section>
      </div>
    </ClimateRecordShell>
  );
}