import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Check, Copy, Download, Share2 } from 'lucide-react';

// ── THE CARD, ON SCREEN ──
// Reached only when the device refuses the page its share sheet: the editor's own
// frame, or a browser inside another app. Nothing is taken away — the card is here to
// look at, keep and pass on — and the full sheet, with WhatsApp and email in it, is
// one tap away on the record's real page in a phone's browser.

export default function ShareCardPreview({ open, onClose, blob, fileName, link, headline }) {
  const [card, setCard] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open || !blob) { setCard(null); return; }
    const href = URL.createObjectURL(blob);
    setCard(href);
    setCopied(false);
    return () => URL.revokeObjectURL(href);
  }, [open, blob]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const field = document.createElement('textarea');
      field.value = link;
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
  };

  const save = () => {
    if (!card) return;
    const a = document.createElement('a');
    a.href = card;
    a.download = fileName;
    a.click();
  };

  const share = async () => {
    const file = new File([blob], fileName, { type: 'image/png' });
    try {
      await navigator.share(navigator.canShare?.({ files: [file] })
        ? { files: [file], title: headline, text: link }
        : { title: headline, text: link });
    } catch (error) {
      if (error.name !== 'AbortError') save();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="max-w-sm max-h-[90dvh] overflow-y-auto p-0 gap-0 bg-record-paper border-2 border-record-ink rounded-none">
        <DialogTitle className="px-4 pt-4 pb-2 text-[11px] font-black font-mono uppercase tracking-wider text-[#141210]">
          The card
        </DialogTitle>

        <div className="px-4 pb-3">
          {card ? (
            <img src={card} alt={headline} className="w-full border border-[#141210]/20" />
          ) : (
            <div className="py-10 text-center text-[11px] font-mono text-[#6b6258]">drawing…</div>
          )}
        </div>

        <p className="px-4 pb-3 text-xs leading-relaxed text-record-muted">Keep the image, or share it with the event link.</p>
        {navigator.share && <button type="button" onClick={share} className="mx-4 mb-3 flex min-h-11 items-center justify-center gap-2 border-2 border-record-ink bg-record-signal font-bold text-record-ink"><Share2 size={16} />Share card</button>}

        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <button
            onClick={copy}
            className="flex items-center justify-center gap-2 h-11 border-2 border-[#141210] text-[10px] font-black font-mono uppercase text-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy link'}
          </button>
          <button
            onClick={save}
            className="flex items-center justify-center gap-2 h-11 border-2 border-[#141210] text-[10px] font-black font-mono uppercase text-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Save image
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}