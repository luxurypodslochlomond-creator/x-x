import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Share2, Check, Loader2 } from 'lucide-react';
import { buildWireShareCard } from './shareCardImage';
import { recordAddress, recordOrigin } from './recordAddress';
import { wireAddress } from './recordSlug';

// The preview and its dialog tools are only needed after a card has been made.
const ShareCardPreview = lazy(() => import('@/components/climate/ShareCardPreview'));

// ── ONE DOOR, THE SAME ON EVERY SCREEN ───────────────────────────────────────
// Brian, 27 November, looking at the live app: "sharing coolasfuck not working right on
// live… we don't get this… to all the destinations you mentioned."
//
// He had found a real fault, and it was ours. This button used to hand the phone's own
// share sheet the picture straight from the tap, and open the window only when the device
// refused a file. That is lovely on a handset and it quietly deleted everything else: the
// named doors, the code, the words — all of it lived in the window, and on live the window
// never opened. Two different experiences from one button, and the richer one was the one
// nobody saw.
//
// So the window is the share now, everywhere, on preview and on live. `instant` still does
// its work — the plate is drawn while the page is standing still, so the window opens on a
// finished picture rather than a spinner — and the sheet still opens from inside it, one tap
// further, with every app on the phone in it. Nothing is lost; the doors are no longer
// hidden behind a device that happens to accept a file.

export default function ShareCardButton({ entry, compact = false, build = buildWireShareCard, label: givenLabel, link: givenLink, description: givenDescription, icon: GivenIcon, previewFirst = false, instant = false, inline = false, includeMessage = false, windowTitle, alt }) {
  const [state, setState] = useState('idle');
  const [card, setCard] = useState(null);
  const [warm, setWarm] = useState(null);
  // The card carries the entry's own name, not its id: a card is the thing that gets sent
  // on, so the address printed on it has to be one a person can read and type back.
  const link = givenLink || (build === buildWireShareCard && entry.id ? recordAddress(wireAddress(entry)) : recordAddress());
  // A drawing is known by the hand that made it, so a card carrying one is introduced by the
  // artist's name rather than by the record's own title.
  const title = entry.headline || entry.title || entry.artist_name || 'Record of the time';
  const description = givenDescription || entry.summary || entry.description || entry.what_changed || '';
  // The credit travels with the words, whichever field it is kept in: a photograph's credit
  // lives in image_credit, a drawing's in credit, and a drawing sent out with its holder's
  // line stripped off is the one thing this record must never do.
  const credit = entry.image_credit || entry.credit;
  // And who says so travels too, wherever the entry names a source. A headline pasted on its
  // own asks the reader to take it on trust, which is the one thing this record never asks of
  // anybody; the card already carries the name, so the words must not arrive without it.
  const source = entry.source_name
    ? `Source: ${entry.source_name}${entry.corroborating_source ? ` · also ${entry.corroborating_source}` : ''}`
    : entry.corroborating_source ? `Also reported: ${entry.corroborating_source}` : '';
  // And when it happened, where the entry carries a date. A news account pasted on without
  // its date reads as though it happened this morning, which on a record about time is the
  // quietest kind of wrong thing to pass on.
  const when = entry.when_label || entry.when_date || '';
  const text = [title, description, when, source, credit, link].filter(Boolean).join('\n');

  const prepare = async () => {
    const blob = await build(entry, { origin: recordOrigin() });
    if (!blob) throw new Error('The picture could not be prepared.');
    const extension = blob.type === 'image/jpeg' ? 'jpg' : blob.type === 'image/svg+xml' ? 'svg' : blob.type.split('/')[1] || 'png';
    const fileName = `record-of-the-time-${entry.id || 'image'}.${extension}`;
    const file = typeof File === 'function' ? new File([blob], fileName, { type: blob.type || 'image/png' }) : null;
    return { blob, fileName, file };
  };

  // Draw it once, quietly, while the reader is still reading.
  useEffect(() => {
    if (!instant || warm) return undefined;
    let alive = true;
    prepare().then((ready) => { if (alive) setWarm(ready); }).catch(() => {});
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instant]);

  // One path, on every device: the plate, then the window that holds every door.
  const share = async () => {
    if (state === 'building') return;
    setState('building');
    try {
      const ready = warm || await prepare();
      setCard({ blob: ready.blob, fileName: ready.fileName });
      setState('idle');
    } catch { setState('error'); }
  };
  // A room may hand in its own mark for this button: the cartoon room draws its own arrow,
  // because the network glyph is the sign for broadcasting and this record passes things on
  // by hand. Everything else keeps the standard one.
  const Icon = state === 'building' ? Loader2 : state === 'shared' ? Check : (GivenIcon || Share2);
  // ── THE LABEL NEVER CHANGES LENGTH ───────────────────────────────────────────
  // It used to say "Preparing image…" and then "Shared", so the button grew and shrank
  // under the reader's thumb and everything standing beside it jumped with it — the small
  // shudder Brian kept seeing, worst on the wire where Share sits in a row next to Read.
  // The work is now said by the icon turning, and by a line only a screen reader hears, so
  // the button is one size from the tap to the finished card.
  const label = givenLabel || (compact ? 'Share' : 'Share this entry as a card');
  const doing = state === 'building' ? 'Preparing the image' : state === 'shared' ? 'Shared' : '';
  return <>
    <button type="button" onClick={share} disabled={state === 'building'} aria-busy={state === 'building'} className={inline ? 'record-share-inline' : compact ? 'record-share-compact' : 'record-share-button'}>
      <Icon size={17} aria-hidden="true" className={state === 'building' ? 'animate-spin' : undefined} />{label}
      <span className="sr-only" role="status">{doing}</span>
    </button>
    {state === 'error' && <span className="record-share-error" role="alert">The image could not be prepared. Please try again.</span>}
    {card && <Suspense fallback={<span role="status" className="sr-only">Preparing the image</span>}>
      <ShareCardPreview open onClose={() => setCard(null)} blob={card.blob} fileName={card.fileName} link={link} headline={title} text={text} credit={credit} includeMessage={includeMessage} windowTitle={windowTitle} alt={alt} />
    </Suspense>}
  </>;
}