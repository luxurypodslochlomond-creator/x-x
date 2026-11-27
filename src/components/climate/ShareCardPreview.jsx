import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import SharePreviewActions from '@/components/climate/SharePreviewActions';

// ── THE PAINTING IS NOT A THUMBNAIL ─────────────────────────────────────────
// Brian, 27 November: "do we do the painting justice? does it feel like us?"
//
// It did not, and the reason was a corner. The painting sat inside the window as a rounded
// picture with margins round it — a thumbnail in a card, which is how every app shows every
// image. This record has no rounded corners anywhere: it is paper, ink and a sharp edge. So
// the painting now runs the full width of the window, edge to edge, with the record's own
// hairline above and below it, and the words sit on the paper beneath it like a caption.
//
// The whole thing is also built to be seen without scrolling on a phone: the picture takes
// about a third of the screen, and the three things a person actually does are the next
// three things down. Everything else is one line away.
//
// ── AND IT IS NOT ONLY THE RECORD'S WINDOW ──────────────────────────────────
// Brian, 27 November: "cartoons should work the same way". They do now — one window for the
// record, a drawing, a wire entry — so the title and the picture's own description are given
// by whoever opened it rather than assumed to be the painting. A drawing that opened this
// window used to be labelled "Share the record" and described as "the living Earth beneath a
// star-filled sky", which is the sort of wrong that makes a person distrust everything else
// on the page.
export default function ShareCardPreview({ open, onClose, blob, fileName, link, headline, text, credit, includeMessage = false, windowTitle = null, alt = null }) {
  const [card, setCard] = useState(null);
  useEffect(() => {
    if (!open || !blob) { setCard(null); return; }
    const href = URL.createObjectURL(blob);
    setCard(href);
    return () => URL.revokeObjectURL(href);
  }, [open, blob]);
  return <Dialog open={open} onOpenChange={next => { if (!next) onClose(); }}>
    <DialogContent aria-describedby={undefined} className="max-w-md max-h-[96dvh] gap-0 overflow-y-auto rounded-none border border-record-ink/20 bg-record-paper p-0 text-record-ink">
      <div className="flex items-baseline justify-between gap-3 px-4 pb-2 pr-10 pt-3">
        <DialogTitle className="text-[11px] font-bold uppercase tracking-[0.16em]">{windowTitle || (includeMessage ? 'Share the record' : 'Ready to share')}</DialogTitle>
        {credit && <p className="text-[10px] text-record-muted">{credit}</p>}
      </div>
      {card ? <img src={card} alt={alt || headline} className="max-h-[32dvh] w-full border-y border-record-ink/15 object-contain" /> : <p role="status" className="px-4 py-6 text-sm">Preparing image…</p>}
      {card && <div className="px-4 py-3"><SharePreviewActions key={card} blob={blob} fileName={fileName} link={link} headline={headline} text={text} imageUrl={card} includeMessage={includeMessage} /></div>}
    </DialogContent>
  </Dialog>;
}