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

export default function ShareCardButton({ entry, compact = false, build = buildWireShareCard }) {
  const [state, setState] = useState('idle');

  const share = async () => {
    if (state === 'building') return;
    setState('building');

    try {
      const blob = await build(entry, { origin: window.location.origin });
      if (!blob) throw new Error('The card could not be drawn.');
      const file = new File([blob], `record-of-the-time-${entry.id}.png`, { type: 'image/png' });
      const title = entry.headline || entry.title || 'Record of the time';
      const line = `${title} — ${window.location.href}`;

      // 1. The picture, when this device will carry a file into its share sheet.
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title, text: line });
          setState('shared');
          setTimeout(() => setState('idle'), 3500);
          return;
        } catch (err) {
          // Dismissing the sheet is not a failure — it is a change of mind.
          if (err?.name === 'AbortError') { setState('idle'); return; }
        }
      }

      // 2. The link on its own. A browser inside another app (WhatsApp, Instagram) will
      // not take a file through the sheet, but it does open the sheet — and that is where
      // the email and WhatsApp options are. Never let a reader end up with a download
      // when a sheet was there to be had.
      if (navigator.share) {
        try {
          await navigator.share({ title, text: line });
          setState('shared');
          setTimeout(() => setState('idle'), 3500);
          return;
        } catch (err) {
          if (err?.name === 'AbortError') { setState('idle'); return; }
        }
      }

      // 3. No sheet anywhere: the card is saved to the device and the link copied.
      await saveCard(file);
      setState('saved');
      setTimeout(() => setState('idle'), 3500);
    } catch (err) {
      setState('idle');
      throw err;
    }
  };

  const done = state === 'shared' || state === 'saved';
  const Icon = done ? Check : Share2;

  if (compact) {
    const short = state === 'building' ? 'Drawing…' : state === 'shared' ? 'Shared' : state === 'saved' ? 'Saved' : 'Share';
    return (
      <button
        onClick={share}
        disabled={state === 'building'}
        className="shrink-0 flex items-center gap-2 h-11 px-3 bg-[#f7f1e5] text-[#141210] text-[10px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors disabled:opacity-70"
      >
        <Icon className="w-3.5 h-3.5" />
        {short}
      </button>
    );
  }

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
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}