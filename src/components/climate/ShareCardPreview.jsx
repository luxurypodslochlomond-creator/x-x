import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Check, Copy, Download, Share2 } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';

// ── THE CARD, ON SCREEN ──
// Reached only when the device refuses the page its share sheet: the editor's own
// frame, or a browser inside another app. Nothing is taken away — the card is here to
// look at, keep and pass on — and the full sheet, with WhatsApp and email in it, is
// one tap away on the record's real page in a phone's browser.

export default function ShareCardPreview({ open, onClose, blob, fileName, link, headline, text, credit }) {
  const [card, setCard] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!open || !blob) { setCard(null); return; }
    const href = URL.createObjectURL(blob);
    setCard(href); setCopied(false); setError('');
    return () => URL.revokeObjectURL(href);
  }, [open, blob]);
  const file = blob ? new File([blob], fileName, { type: blob.type || 'image/png' }) : null;
  const canShareImage = !!(file && navigator.canShare?.({ files: [file] }));
  const copy = async () => {
    const ok = await copyText(link);
    setCopied(ok); setError(ok ? '' : 'Copy the address from the field below.');
  };
  const share = async () => {
    try { await navigator.share({ files: [file], title: headline, text: text || link }); }
    catch (err) { if (err.name !== 'AbortError') setError('This browser could not share the image. Save it below and attach it to your message.'); }
  };
  return <Dialog open={open} onOpenChange={next => { if (!next) onClose(); }}>
    <DialogContent className="max-w-md max-h-[92dvh] overflow-y-auto gap-4 rounded-2xl border border-record-ink/15 bg-record-paper p-5 text-record-ink">
      <DialogTitle className="pr-6 text-lg font-bold">Ready to pass on</DialogTitle>
      {card ? <img src={card} alt={headline} className="max-h-[55dvh] w-full rounded-lg object-contain" /> : <p role="status">Preparing image…</p>}
      {credit && <p className="text-xs leading-relaxed text-record-muted">{credit}</p>}
      <p className="text-sm leading-relaxed text-record-muted">{canShareImage ? 'Share the image with its words and link, or save it to send later.' : 'Save the image, then attach it in WhatsApp, a message or a post. Copy its link alongside it.'}</p>
      {canShareImage && <button type="button" onClick={share} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-record-ink px-4 font-bold text-record-paper"><Share2 size={18} /> Share image</button>}
      <div className="grid grid-cols-2 gap-2">
        <a href={card || undefined} download={fileName} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-record-ink/20 text-sm font-bold"><Download size={17} /> Save image</a>
        <button type="button" onClick={copy} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-record-ink/20 text-sm font-bold">{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Copied' : 'Copy link'}</button>
      </div>
      {error && <><p className="text-sm text-record-red" role="alert">{error}</p><input aria-label="Address to copy" readOnly value={link} onFocus={event => event.target.select()} className="w-full rounded-lg border border-record-ink/20 bg-record-paper p-3 text-xs" /></>}
    </DialogContent>
  </Dialog>;
}