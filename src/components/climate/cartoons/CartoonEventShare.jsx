import React from 'react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { recordOrigin } from '@/components/climate/recordAddress';
import { buildCartoonShareCard, CARTOON_CARD } from '@/components/climate/cartoons/cartoonCard';
import { CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import { InkArrow } from '@/components/climate/cartoons/CartoonInkIcons';

// ── THE MARK ON THIS BUTTON, AND WHY IT IS NOT THE SHARE GLYPH ─────────────────
// It wore the three-dots-and-two-lines glyph, which is the sign for broadcasting to a
// network. This room does not broadcast: it hands a drawing to one person who hands it to
// another, which is the whole reason a card is made at all. So the mark is the room's own
// drawn arrow — a line pressed into the paper rather than a piece of interface — and it
// points the same way as the words on this page: pass it on.
//
// The words travelling with the card are the other half of that. See shareLine in
// cartoonEvent.js: the message under a forwarded picture now says what this is, where, and
// which hour is the online one.
export default function CartoonEventShare() {
  return (
    <div className="comic-event-share">
      <ShareCardButton
        entry={CARTOON_CARD}
        build={buildCartoonShareCard}
        label="Pass it on"
        link={`${recordOrigin()}/ClimateCartoons`}
        description={CARTOON_EVENT.shareLine}
        icon={InkArrow}
        previewFirst
      />
      {/* The dates and the place, under the plate, in the record's small voice: whoever
          passes this on should know what they are passing on before they pass it. */}
      <p className="comic-event-share-when">{CARTOON_EVENT.when} · {CARTOON_EVENT.where}</p>
    </div>
  );
}