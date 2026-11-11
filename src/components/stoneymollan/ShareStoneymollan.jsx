import React, { useState } from 'react';
import { Share2, Check, Link2 } from 'lucide-react';
import ShareCardPreview from '@/components/climate/ShareCardPreview';
import { recordAddress } from '@/components/climate/recordAddress';
import { buildStoneymollanCard } from './stoneymollanCard';

// ── PASS THE ROAD ON ──
// One tap, the same way a record page leaves a phone: where the device gives the page
// its share sheet, the card goes straight into it; where it refuses the sheet — the
// editor's own frame, a browser inside another app — the card is put on screen to keep
// and pass on, never a silent download. The link is the page's own address, so what a
// friend opens is this page and not the record's front door.
export default function ShareStoneymollan({ imageUrl, imageCredit }) {
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
      const line = `Mist, beeches and the whole loch beneath you, on the John Muir Way over Loch Lomond — ${link}`;

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

  const Icon = state === 'shared' ? Check : Share2;
  const label = state === 'building' ? 'Drawing the card…' : state === 'shared' ? 'Shared' : 'Share this page';

  return (
    <div className="mx-auto mt-6 w-full max-w-[20rem]">
      <button
        onClick={share}
        disabled={state === 'building'}
        className="flex min-h-[46px] w-full items-center justify-center gap-2 border-2 border-record-ink bg-record-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-record-paper transition-colors active:bg-record-signal disabled:opacity-70"
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>

      <button
        onClick={copyLink}
        className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 border border-record-ink/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-record-muted transition-colors active:bg-record-bone"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? 'Link copied' : 'Copy the link'}
      </button>

      <ShareCardPreview
        open={!!card}
        onClose={() => setCard(null)}
        blob={card?.blob}
        fileName={card?.fileName}
        link={link}
        headline="Stoneymollan"
      />
    </div>
  );
}