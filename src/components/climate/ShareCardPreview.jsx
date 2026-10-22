import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Check, Copy, Download } from 'lucide-react';

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

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="max-w-sm p-0 gap-0 bg-[#f4efe4] border-2 border-[#141210] rounded-none">
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

        <p className="px-4 pb-3 text-[11px] font-mono leading-relaxed text-[#6b6258]">
          This card is yours to keep. The full share sheet — WhatsApp, email and the rest — appears
          when the record is opened in a phone's browser.
        </p>

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