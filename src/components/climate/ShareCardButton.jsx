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

export default function ShareCardButton({ entry, compact = false, build = buildWireShareCard, label: givenLabel, link: givenLink, previewFirst = false }) {
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
      const line = `${title} — ${link}`;
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
      setState('idle');
      throw err;
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