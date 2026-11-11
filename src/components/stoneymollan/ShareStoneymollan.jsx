import React from 'react';
import { Share2, Check, Link2 } from 'lucide-react';
import ShareCardPreview from '@/components/climate/ShareCardPreview';
import useStoneymollanShare from './useStoneymollanShare';

/* The big way off the page: the card, the sheet, or the link. The doing of it lives in
   useStoneymollanShare, because the bar at the foot of a phone needs the same thing. */
export default function ShareStoneymollan({ imageUrl, imageCredit }) {
  const { state, card, copied, link, share, copyLink, closeCard } = useStoneymollanShare({ imageUrl, imageCredit });

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
        className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 border border-record-ink/30 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-record-ink transition-colors active:bg-record-bone"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? 'Link copied' : 'Copy the link'}
      </button>

      <ShareCardPreview
        open={!!card}
        onClose={closeCard}
        blob={card?.blob}
        fileName={card?.fileName}
        link={link}
        headline="Stoneymollan"
      />
    </div>
  );
}