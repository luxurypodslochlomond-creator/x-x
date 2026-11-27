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

// ── THE STATEMENT IS JANINE'S, WHOLE ──────────────────────────────────────────
// It travelled short — "Together We Can Change Climate" — and because the line underneath it
// opens "Climate crises", the two ran together in a chat window as "climate climate". Francis
// Odupute caught it in a WhatsApp message on 27 November and said so plainly: it's climate
// change, not climate climate.
//
// He is right, and the missing words are the whole sentence. The object was never "climate" —
// it is the course of climate change, which is what Janine wrote and what the record's own
// front page says at the top. A share that shortens a host's sentence until it stops being
// true is the one thing a card must never do, so it goes out whole.
export const RECORD_SHARE_TITLE = 'Together we can change the course of climate change';
// ── THE LINE THAT TRAVELS IS A PROMISE, NOT A SLOGAN ─────────────────────────
// Brian, 27 November: "maximum impact across the world… will motivate and encourage people to
// share… but don't want to be cheesy… I remember 'sharing is caring' and it drove a lot of
// people insane… we need to be coolasfuck for all the right reasons."
//
// He is right about why that one curdled. "Sharing is caring" asked the reader to feel good
// about themselves for pressing a button, and the people who chanted it loudest were selling
// something. An ask is the one thing this record can never make: the moment it says "share
// this", it is advertising, and a stranger is right to ignore it.
//
// So the line does no asking. It states four things that can be checked — dated, sourced,
// signed, and the two refusals — and then stops. A record that promises nothing is sold and
// nothing ranked is worth passing on because of what it is, not because it begged. That is
// the only kind of sharing that does not turn into the thing it was warning about.
export const RECORD_SHARE_LINE =
  'A public record of the climate. Solutions, Crises and Actions: each one dated, sourced and signed. Nothing sold, nothing ranked.';

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