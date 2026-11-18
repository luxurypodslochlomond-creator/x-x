import React from 'react';
import ShareCardButton from './ShareCardButton';
import { buildRecordShareCard } from './shareCardImage';
import { RECORD_LINK, RECORD_SHARE_TITLE } from './shareRecordCard';

// ── THE SHARE BOX ─────────────────────────────────────────────────────────────
// The cartoon room's share box, on the record's own front page. It was the right shape
// there and it is the right shape here: one box that shows the card before it leaves,
// so a person can look at what they are about to send, keep it, or send it — instead of
// a button that either fires the phone's sheet or quietly copies an address and says
// nothing. The card is the record's own: its name, its promise, and x = x in the red
// borrowed from the O Superman sleeve. Nothing new is claimed on it.
const RECORD_CARD = { id: 'record-of-the-time', title: RECORD_SHARE_TITLE };

export default function RecordShareBox() {
  return (
    <div className="border-2 border-record-ink bg-record-paper p-3 lg:p-4">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-record-muted">
        Pass it on
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-record-ink">
        One card with the record’s name, its promise and <span className="font-black text-record-mark">x = x</span>.
        Look at it first, keep it, or send it on.
      </p>
      <div className="mt-2.5">
        <ShareCardButton
          entry={RECORD_CARD}
          build={buildRecordShareCard}
          label="Share the record"
          link={RECORD_LINK}
          previewFirst
        />
      </div>
    </div>
  );
}