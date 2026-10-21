import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { buildWireShareCard } from './shareCardImage';

// ── PASS IT ON ──
// One tap: the entry leaves as a card that already carries its source, its date and
// how well it is known. Where the device has a share sheet, the picture goes straight
// into it; where it has none, the card is saved to the device and the link is copied.

async function saveCard(file) {
  const href = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = href;
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(href), 4000);
  try { await navigator.clipboard.writeText(window.location.href); } catch { /* selectable in the citation box below */ }
}

export default function ShareCardButton({ entry }) {
  const [state, setState] = useState('idle');

  const share = async () => {
    if (state === 'building') return;
    setState('building');

    try {
      const blob = await buildWireShareCard(entry, { origin: window.location.origin });
      if (!blob) throw new Error('The card could not be drawn.');
      const file = new File([blob], `record-of-the-time-${entry.id}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: entry.headline,
            text: `${entry.headline} — ${window.location.href}`,
          });
          setState('shared');
        } catch (err) {
          // Dismissing the share sheet is not a failure. A device that will not take
          // the picture straight from here still gets the card, saved, with the link.
          if (err?.name === 'AbortError') { setState('idle'); return; }
          await saveCard(file);
          setState('saved');
        }
      } else {
        await saveCard(file);
        setState('saved');
      }
      setTimeout(() => setState('idle'), 3500);
    } catch (err) {
      setState('idle');
      throw err;
    }
  };

  const label = state === 'building' ? 'Drawing the card…'
    : state === 'shared' ? 'Shared'
    : state === 'saved' ? 'Card saved · link copied'
    : 'Share this entry as a card';

  return (
    <button
      onClick={share}
      disabled={state === 'building'}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-70"
    >
      {state === 'shared' || state === 'saved' ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      {label}
    </button>
  );
}