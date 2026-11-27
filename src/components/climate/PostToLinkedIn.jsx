import React, { useState } from 'react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';
import { RECORD_LINK, RECORD_SHARE_TITLE, RECORD_SHARE_LINE } from '@/components/climate/shareRecordCard';

// ── THE DOOR THAT WAS A WALL ─────────────────────────────────────────────────────
// Brian, 27 November: "Janine loves LinkedIn, that is where her peers are… when she copies
// and pastes the link the coolasfuck record image is gone… LinkedIn is a barrier."
//
// He is describing a fault with two halves, and neither of them was LinkedIn being difficult.
//
// The first half: the record's share button hands the phone a finished PICTURE. WhatsApp and
// Messages take a picture, so the card arrives whole and looks right. LinkedIn's app does not
// accept a picture from a web page's share sheet at all — so it simply does not appear in the
// list of apps, and the one place Janine's peers actually are is the one place the record
// could not go. That is why the sheet on her phone offers AirDrop, Messages, Mail and
// WhatsApp and then stops.
//
// The second half: LinkedIn builds a post's preview from the PAGE, not from the picture. Give
// it only a link and it fetches the page's own tags and shows whatever image they name — and
// those tags named a drawn mark rather than the painting. So even when the link did travel,
// the painting did not. That is fixed where it belongs, in the page's own head (index.html),
// which is the only place a scraper that never runs JavaScript will ever look.
//
// What is left is a door a person can see. This is it: one named line beside the share mark.
// It opens LinkedIn's own composer on the record's address — where the painting, the sentence
// and the four promises are already waiting as the preview — and it puts the words on the
// clipboard first, because LinkedIn's composer will not carry them in the address.
export default function PostToLinkedIn() {
  const [state, setState] = useState('idle');

  const go = async () => {
    // The window must be opened inside the tap itself: an await before this line and the
    // browser treats it as a pop-up and stops it.
    const tab = window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(RECORD_LINK)}`,
      '_blank',
      'noopener,noreferrer',
    );
    const copied = await copyText(`${RECORD_SHARE_TITLE}\n\n${RECORD_SHARE_LINE}`);
    setState(!tab ? 'blocked' : copied ? 'ready' : 'opened');
  };

  return (
    <span className="inline-flex flex-col items-center gap-1">
      <button type="button" onClick={go} className="record-share-inline">
        Post to LinkedIn
      </button>
      {state === 'ready' && (
        <span className="record-header-type text-[10px] uppercase tracking-[0.1em] text-record-bone/70">
          Words copied — paste them into the post
        </span>
      )}
      {state === 'opened' && (
        <span className="record-header-type text-[10px] uppercase tracking-[0.1em] text-record-bone/70">
          LinkedIn is open — the record’s preview is in it
        </span>
      )}
      {state === 'blocked' && (
        <span className="record-header-type text-[10px] uppercase tracking-[0.1em] text-record-bone/70">
          Allow pop-ups, or paste the address into a post
        </span>
      )}
    </span>
  );
}