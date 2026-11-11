import React from 'react';
import ShareCardPreview from '@/components/climate/ShareCardPreview';
import useStoneymollanShare from './useStoneymollanShare';
import { BOOK_DIRECT, EMAIL, CALL_TEL } from './links';
import { CallMark, EnvelopeMark, ShareMark } from './StoneymollanIcons';

/* A phone has four jobs on this page, and they are in the order somebody needs them:
   book it, ring us, write to us — and now, pass it on.

   The call is here as well as in the doors at the top because the two do different
   work. The door at the top is for a person planning — they read the page, decide,
   then go back up to the marks. This bar is for the person already on the train,
   thumb out, bag between their feet: they need the number without travelling up the
   sheet to find it. The share is here for the same reason, moved down from the foot of
   the stay: somebody halfway down the page has already decided they like it, and having
   to scroll to the end to tell a friend about it is a long way to go to be generous.
   On a laptop it does not appear at all; a mouse has the room.

   Nothing here moves, wraps or shifts. Four fixed shapes on one line, the booking the
   only one in the record's red, so the row reads the same on every phone from a
   five-year-old Android to the newest iPhone, with the home-bar inset respected. */
export default function StayBar({ shareImage, shareCredit }) {
  const { card, link, share, closeCard } = useStoneymollanShare({ imageUrl: shareImage, imageCredit: shareCredit });

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-record-ink/25 bg-record-bone/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center gap-2 px-3 py-2.5">
          <a
            href={BOOK_DIRECT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] flex-1 items-center justify-center border-2 border-record-signal bg-record-signal px-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-record-paper active:bg-record-ink"
          >
            Book direct
          </a>
          <a
            href={CALL_TEL}
            aria-label="Call Brian and Gillian at the top of the hill"
            className="flex min-h-[44px] items-center justify-center gap-1.5 border-2 border-record-ink px-2.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-record-ink active:bg-record-ink active:text-record-paper"
          >
            <CallMark className="h-4 w-4" />
            Call
          </a>
          <button
            type="button"
            onClick={share}
            aria-label="Pass this page on to somebody"
            className="flex h-11 w-11 items-center justify-center border-2 border-record-ink/30 text-record-ink active:bg-record-ink/10"
          >
            <ShareMark className="h-5 w-5" />
          </button>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email Brian and Gillian"
            className="flex h-11 w-11 items-center justify-center border-2 border-record-ink/30 text-record-ink active:bg-record-ink/10"
          >
            <EnvelopeMark className="h-5 w-5" />
          </a>
        </div>
      </div>

      <ShareCardPreview
        open={!!card}
        onClose={closeCard}
        blob={card?.blob}
        fileName={card?.fileName}
        link={link}
        headline="Stoneymollan"
      />
    </>
  );
}