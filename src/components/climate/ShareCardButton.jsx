import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { buildWireShareCard } from './shareCardImage';
import { recordAddress, recordOrigin } from './recordAddress';

// The preview and its dialog tools are only needed after a card has been made.
const ShareCardPreview = lazy(() => import('@/components/climate/ShareCardPreview'));

// ── ONE TAP, AND THE PLATE IS ALREADY IN THE PHONE'S HAND ────────────────────
// Brian, 27 November: "one coolasfuck share… instant". The card used to be drawn after
// the tap and then a window opened to show it — so passing the record on meant reading a
// second screen first, which is the opposite of passing something on.
//
// With `instant` the plate is drawn while the page is standing still, so by the time a
// thumb reaches the mark there is a finished picture waiting. The tap then opens the
// phone's own share sheet inside the gesture — no await before it, which is what a browser
// requires — and the picture goes wherever that person already sends things. The window is
// not gone: it opens when the device will not take a file, which is a desk, or an app's own
// browser, and there the words, the named doors and the code are all still one tap away.

export default function ShareCardButton({ entry, compact = false, build = buildWireShareCard, label: givenLabel, link: givenLink, description: givenDescription, icon: GivenIcon, previewFirst = false, instant = false, inline = false, includeMessage = false }) {
  const [state, setState] = useState('idle');
  const [card, setCard] = useState(null);
  const [warm, setWarm] = useState(null);
  const link = givenLink || (build === buildWireShareCard && entry.id ? recordAddress(`/ClimateWireEntry/${entry.id}`) : recordAddress());
  // A drawing is known by the hand that made it, so a card carrying one is introduced by the
  // artist's name rather than by the record's own title.
  const title = entry.headline || entry.title || entry.artist_name || 'Record of the time';
  const description = givenDescription || entry.summary || entry.description || entry.what_changed || '';
  const text = [title, description, entry.image_credit, link].filter(Boolean).join('\n');

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

  const canTakeFile = (file) => !!(file && navigator.share && navigator.canShare?.({ files: [file] }));

  const share = async () => {
    if (state === 'building') return;
    // The sheet opens inside the tap, with a plate that is already finished.
    if (instant && canTakeFile(warm?.file)) {
      try {
        await navigator.share({ files: [warm.file], title, text });
        setState('shared');
        return;
      } catch (error) {
        if (error?.name === 'AbortError') { setState('idle'); return; }
      }
    }
    setState('building');
    try {
      const ready = warm || await prepare();
      const wantsSheet = instant || !previewFirst;
      if (wantsSheet && canTakeFile(ready.file)) {
        try {
          await navigator.share({ files: [ready.file], title, text });
          setState('shared');
          return;
        } catch (error) { if (error?.name === 'AbortError') { setState('idle'); return; } }
      }
      setCard({ blob: ready.blob, fileName: ready.fileName });
      setState('idle');
    } catch { setState('error'); }
  };
  // A room may hand in its own mark for this button: the cartoon room draws its own arrow,
  // because the network glyph is the sign for broadcasting and this record passes things on
  // by hand. Everything else keeps the standard one.
  const Icon = state === 'shared' ? Check : (GivenIcon || Share2);
  const label = state === 'building' ? 'Preparing image…' : state === 'shared' ? 'Shared' : state === 'error' ? 'Try sharing again' : givenLabel || (compact ? 'Share' : 'Share this entry as a card');
  return <>
    <button type="button" onClick={share} disabled={state === 'building'} aria-busy={state === 'building'} className={inline ? 'record-share-inline' : compact ? 'record-share-compact' : 'record-share-button'}>
      <Icon size={17} aria-hidden="true" />{label}
    </button>
    {state === 'error' && <span className="record-share-error" role="alert">The image could not be prepared. Please try again.</span>}
    {card && <Suspense fallback={<span role="status" className="text-sm text-record-muted">Preparing image…</span>}>
      <ShareCardPreview open onClose={() => setCard(null)} blob={card.blob} fileName={card.fileName} link={link} headline={title} text={text} credit={entry.image_credit} includeMessage={includeMessage} />
    </Suspense>}
  </>;
}