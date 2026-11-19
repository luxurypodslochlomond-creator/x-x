import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { buildWireShareCard } from './shareCardImage';
import ShareCardPreview from './ShareCardPreview';
import { recordAddress, recordOrigin } from './recordAddress';

// ── PASS IT ON ──
// One tap: the entry leaves as a card that already carries its source, its date and
// how well it is known. Where the device gives the page its share sheet, the picture
// goes straight into it; the link goes in on its own where the device will not take a
// file (an app's own browser). Where the sheet is refused altogether — the editor's
// own frame — the card is put on screen to keep and pass on, never a silent download.

export default function ShareCardButton({ entry, compact = false, build = buildWireShareCard, label: givenLabel, link: givenLink, description: givenDescription, previewFirst = false, inline = false }) {
  const [state, setState] = useState('idle');
  const [card, setCard] = useState(null);
  const link = givenLink || recordAddress();

  const share = async () => {
    if (state === 'building') return;
    setState('building');

    try {
      const blob = await build(entry, { origin: recordOrigin() });
      if (!blob) throw new Error('The card could not be drawn.');
      const file = new File([blob], `record-of-the-time-${entry.id}.png`, { type: 'image/png' });
      const title = entry.headline || entry.title || 'Record of the time';
      // ── WHAT TRAVELS WITH THE CARD ────────────────────────────────────────────
      // A message that arrives as a bare address reads like something has gone wrong. So
      // the words go with it: the line the caller gave, or the entry's own summary, so a
      // reader in a chat is told what this is before they open it. Whatever the page is
      // written in is what leaves — a reader who reads the record in their own tongue
      // passes it on in their own tongue.
      const description = givenDescription || entry.summary || entry.description || entry.what_changed || '';
      const line = description ? `${title} — ${description}\n${link}` : `${title} — ${link}`;
      if (previewFirst) {
        setCard({ blob, fileName: file.name });
        setState('idle');
        return;
      }

      const carriesFile = !!(navigator.canShare && navigator.canShare({ files: [file] }));
      const hasSheet = carriesFile || !!navigator.share;

      if (hasSheet) {
        try {
          await navigator.share(carriesFile ? { files: [file], title, text: line } : { title, text: line });
          setState('shared');
          setTimeout(() => setState('idle'), 3500);
          return;
        } catch (err) {
          // Dismissing the sheet is a change of mind, not a failure.
          if (err?.name === 'AbortError') { setState('idle'); return; }
        }
      }

      // No sheet here: the card goes on screen, not quietly into Downloads.
      setCard({ blob, fileName: file.name });
      setState('idle');
    } catch (err) {
      setState('error');
    }
  };

  const preview = (
    <ShareCardPreview
      open={!!card}
      onClose={() => setCard(null)}
      blob={card?.blob}
      fileName={card?.fileName}
      link={link}
      headline={entry.headline || entry.title || 'Record of the time'}
    />
  );

  const Icon = state === 'shared' ? Check : Share2;

  // ── PASS IT ON, AS A WORD RATHER THAN A BAND ──────────────────────────────────
  // The band went: a yellow strip with a framed thumbnail, a second line and an arrow,
  // sitting between the masthead and the title. Brian, 19 November: "the pass it on bar
  // doesn't feel right bro can you remove and put pass it on in same font after for a
  // public service for the world." He is right — the band was a poster in the middle of a
  // printed page, and the ask had been answered the moment the strip above said who the
  // record is for. So it is two words on the same line as that sentence, in the same
  // tracked capitals, in the record's signal yellow: the quietest way to ask a reader to
  // do the thing the record exists for. Everything behind it is unchanged — the card, the
  // sheet, the fallback.
  if (inline) {
    const word = state === 'building' ? 'Drawing the card…' : state === 'shared' ? 'Passed on' : givenLabel || 'Pass it on';
    return (
      <>
        <button
          type="button"
          onClick={share}
          disabled={state === 'building'}
          aria-label="Pass this record on — the card and the address, ready to send"
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-record-red underline decoration-record-red/50 decoration-1 underline-offset-[5px] transition-colors hover:text-record-ink hover:decoration-record-ink active:text-record-ink disabled:opacity-70"
        >
          {word}
        </button>
        {preview}
      </>
    );
  }

  if (compact) {
    const short = state === 'building' ? 'Drawing…' : state === 'shared' ? 'Shared' : 'Share';
    return (
      <>
        <button
          onClick={share}
          disabled={state === 'building'}
          className="shrink-0 flex items-center gap-2 h-11 px-3 bg-[#f7f1e5] text-[#141210] text-[10px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors disabled:opacity-70"
        >
          <Icon className="w-3.5 h-3.5" />
          {short}
        </button>
        {preview}
      </>
    );
  }

  const label = state === 'building' ? 'Drawing the card…'
    : state === 'shared' ? 'Shared'
    : state === 'error' ? 'Couldn’t make the card — try again'
    : givenLabel || 'Share this entry as a card';

  return (
    <>
      <button
        onClick={share}
        disabled={state === 'building'}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-70"
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
      {preview}
    </>
  );
}