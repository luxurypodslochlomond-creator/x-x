import React, { lazy, Suspense, useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { buildWireShareCard } from './shareCardImage';
import { recordAddress, recordOrigin } from './recordAddress';

// The preview and its dialog tools are only needed after a card has been made.
const ShareCardPreview = lazy(() => import('@/components/climate/ShareCardPreview'));

// ── PASS IT ON ──
// One tap: the entry leaves as a card that already carries its source, its date and
// how well it is known. Where the device gives the page its share sheet, the picture
// goes straight into it; the link goes in on its own where the device will not take a
// file (an app's own browser). Where the sheet is refused altogether — the editor's
// own frame — the card is put on screen to keep and pass on, never a silent download.

export default function ShareCardButton({ entry, compact = false, build = buildWireShareCard, label: givenLabel, link: givenLink, description: givenDescription, previewFirst = false, inline = false, includeMessage = false }) {
  const [state, setState] = useState('idle');
  const [card, setCard] = useState(null);
  const link = givenLink || (build === buildWireShareCard && entry.id ? recordAddress(`/ClimateWireEntry/${entry.id}`) : recordAddress());
  const title = entry.headline || entry.title || 'Record of the time';
  const description = givenDescription || entry.summary || entry.description || entry.what_changed || '';
  const text = [title, description, entry.image_credit, link].filter(Boolean).join('\n');
  const share = async () => {
    if (state === 'building') return;
    setState('building');
    try {
      const blob = await build(entry, { origin: recordOrigin() });
      if (!blob) throw new Error('The picture could not be prepared.');
      const extension = blob.type === 'image/jpeg' ? 'jpg' : blob.type === 'image/svg+xml' ? 'svg' : blob.type.split('/')[1] || 'png';
      const fileName = `record-of-the-time-${entry.id || 'image'}.${extension}`;
      const file = typeof File === 'function' ? new File([blob], fileName, { type: blob.type || 'image/png' }) : null;
      if (!previewFirst && file && navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title, text });
          setState('shared');
          return;
        } catch (error) { if (error?.name === 'AbortError') { setState('idle'); return; } }
      }
      setCard({ blob, fileName });
      setState('idle');
    } catch { setState('error'); }
  };
  const Icon = state === 'shared' ? Check : Share2;
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