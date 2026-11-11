import { useState } from 'react';
import { recordAddress } from '@/components/climate/recordAddress';
import { buildStoneymollanCard } from './stoneymollanCard';

/* ── PASS THE ROAD ON, FROM ONE PLACE ─────────────────────────────────────────
   The share was written inside the one button at the foot of the stay, which was fine
   while there was only one button. There are two now — the big one under the stay, and
   the small one in the bar a phone keeps at the bottom of the screen — and two copies of
   a share is how two buttons end up behaving differently. So the doing of it lives here
   and both buttons only ask.

   Where the device gives the page its share sheet the card goes straight into it; where
   it refuses the sheet — a browser inside another app, a desktop with no share at all —
   the card is put on screen to keep, never a silent download. The link is the page's own
   address, so what a friend opens is this page and not the record's front door. */
export default function useStoneymollanShare({ imageUrl, imageCredit } = {}) {
  const [state, setState] = useState('idle');
  const [card, setCard] = useState(null);
  const [copied, setCopied] = useState(false);

  const link = recordAddress('/Stoneymollan');

  const share = async () => {
    if (state === 'building') return;
    setState('building');

    try {
      const blob = await buildStoneymollanCard({ image_url: imageUrl, image_credit: imageCredit, link });
      if (!blob) throw new Error('The card could not be drawn.');
      const file = new File([blob], 'stoneymollan.png', { type: 'image/png' });
      const title = 'Stoneymollan';
      const line = `Mist, beeches, hillside cabins and the whole loch beneath you, on the John Muir Way over Loch Lomond — ${link}`;

      const carriesFile = !!(navigator.canShare && navigator.canShare({ files: [file] }));
      const hasSheet = carriesFile || !!navigator.share;

      if (hasSheet) {
        try {
          await navigator.share(carriesFile ? { files: [file], title, text: line } : { title, text: line });
          setState('shared');
          setTimeout(() => setState('idle'), 3500);
          return;
        } catch (err) {
          // Dismissing the sheet is a change of mind, not a failure.
          if (err?.name === 'AbortError') { setState('idle'); return; }
        }
      }

      setCard({ blob, fileName: file.name });
      setState('idle');
    } catch (err) {
      setState('idle');
      throw err;
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const field = document.createElement('textarea');
      field.value = link;
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return {
    state,
    card,
    copied,
    link,
    share,
    copyLink,
    closeCard: () => setCard(null),
  };
}