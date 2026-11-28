import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildWorkShareCard, workCardLine, WORK_CARD_ADDRESS, WORK_CARD_LINK, WORK_CARD_TITLE } from '@/components/climate/work/workCard';

// ── 10 · SENDING IT ON ────────────────────────────────────────────────────────
// The page can be read, printed and passed on as a card, so it arrives as a picture with
// the address printed on it rather than as a blue line somebody has to trust. The figures
// on the card are the same figures as the page, read from the record a moment ago.
export default function WorkShare() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const cartoons = await base44.entities.ClimateCartoon.filter({ status: 'published' });
        const hands = new Set(cartoons.map((c) => c.artist_name).filter(Boolean)).size;
        if (live) setCounts({ cartoons: cartoons.length, hands });
      } catch { /* the card still draws, without the figures */ }
    })();
    return () => { live = false; };
  }, []);

  const entry = { title: WORK_CARD_TITLE, description: workCardLine(counts) };

  return (
    <section className="work-band work-band--send">
      <p className="work-band-head"><span>10</span>If it is easier to send it on</p>
      <p className="work-band-note">
        The page as one picture: the painting, the promise and the figures, with the address
        printed on it so it can be read and typed with no signal at all.
      </p>
      <div className="work-send-row">
        <ShareCardButton
          entry={entry}
          build={buildWorkShareCard}
          link={WORK_CARD_LINK}
          label="Make the card"
        />
        <p className="work-send-address">{WORK_CARD_ADDRESS}</p>
      </div>
    </section>
  );
}