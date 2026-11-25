import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import SharePreviewActions from '@/components/climate/SharePreviewActions';

export default function ShareCardPreview({ open, onClose, blob, fileName, link, headline, text, credit, includeMessage = false }) {
  const [card, setCard] = useState(null);
  useEffect(() => {
    if (!open || !blob) { setCard(null); return; }
    const href = URL.createObjectURL(blob);
    setCard(href);
    return () => URL.revokeObjectURL(href);
  }, [open, blob]);
  return <Dialog open={open} onOpenChange={next => { if (!next) onClose(); }}>
    <DialogContent aria-describedby={undefined} className="max-w-md max-h-[92dvh] overflow-y-auto gap-4 rounded-xl border border-record-ink/15 bg-record-paper p-5 text-record-ink">
      <DialogTitle className="pr-6 text-lg font-bold">{includeMessage ? 'Share the record' : 'Ready to share'}</DialogTitle>
      {card ? <img src={card} alt={includeMessage ? 'The record’s painting: the living Earth beneath a star-filled sky' : headline} className="max-h-[45dvh] w-full rounded object-contain" /> : <p role="status">Preparing image…</p>}
      {credit && <p className="text-xs leading-relaxed text-record-muted">{credit}</p>}
      {card && <SharePreviewActions key={card} blob={blob} fileName={fileName} link={link} headline={headline} text={text} imageUrl={card} includeMessage={includeMessage} />}
    </DialogContent>
  </Dialog>;
}