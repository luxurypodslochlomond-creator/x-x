import { buildRecordShareCard } from './shareCardImage';
import { recordAddress, recordOrigin } from './recordAddress';

// ── PASSING THE RECORD ON ─────────────────────────────────────────────────────
// The share used to hand people a link to the preview service, with no picture on it —
// so a message arrived as a bare address that read like something had gone wrong. The
// card is drawn here instead, and the address underneath it is the record's own.
//
// The words are deliberately plain and deliberately short. "Living or long dead" was
// about languages, and on the page it still is; in a chat it read as death, which is
// the one thing this record must never sound like. So the share says what the record
// is and asks nothing of anybody.

export const RECORD_SHARE_TITLE = 'Together We Can Change Climate';
export const RECORD_SHARE_LINE =
  'Climate emergencies. Solutions that work. People taking action. A free public record, with sources you can follow, in any language a reader names. Read it. Take what works. Use it.';

export const RECORD_LINK = recordAddress('/TogetherChangeClimate');

// Returns 'shared' when it left the device, 'copied' when only the address could be
// handed over, 'cancelled' when the person changed their mind — never a silent nothing.
export async function shareRecord() {
  const text = `${RECORD_SHARE_LINE}\n${RECORD_LINK}`;

  let blob = null;
  try {
    blob = await buildRecordShareCard({ origin: recordOrigin() });
  } catch { /* a card that will not draw must not stop the address being shared */ }

  if (blob) {
    const file = new File([blob], 'record-of-the-time.png', { type: 'image/png' });
    const carriesFile = !!(navigator.canShare && navigator.canShare({ files: [file] }));

    if (carriesFile) {
      try {
        await navigator.share({ files: [file], title: RECORD_SHARE_TITLE, text });
        return 'shared';
      } catch (err) {
        if (err?.name === 'AbortError') return 'cancelled';
      }
    } else if (navigator.share) {
      try {
        await navigator.share({ title: RECORD_SHARE_TITLE, text });
        return 'shared';
      } catch (err) {
        if (err?.name === 'AbortError') return 'cancelled';
      }
    }
  }

  try { await navigator.clipboard.writeText(RECORD_LINK); } catch { /* nothing else to try */ }
  return 'copied';
}