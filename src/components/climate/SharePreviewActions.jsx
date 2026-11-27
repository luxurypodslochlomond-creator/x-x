import React, { useState } from 'react';
import { Check, Copy, Download, Share2 } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';

export default function SharePreviewActions({ blob, fileName, link, headline, text, imageUrl, includeMessage }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const file = blob && typeof File === 'function' ? new File([blob], fileName, { type: blob.type || 'image/png' }) : null;
  const canShareImage = !!(file && navigator.share && navigator.canShare?.({ files: [file] }));
  const canShareText = includeMessage && !!navigator.share;
  const message = includeMessage ? text : link;
  // The four doors the record is actually passed through, with the words already written.
  // See the note beside them below.
  const targets = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(message)}` },
    { name: 'Telegram', href: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(headline || '')}` },
    { name: 'Email', href: `mailto:?subject=${encodeURIComponent(headline || '')}&body=${encodeURIComponent(message)}` },
    { name: 'Text message', href: `sms:?&body=${encodeURIComponent(message)}` },
  ];
  const copy = async () => {
    const ok = await copyText(message);
    setCopied(ok); setError(ok ? '' : 'Select and copy the words below.');
  };
  const share = async () => {
    try {
      await navigator.share(canShareImage ? { files: [file], title: headline, text: text || link } : { title: headline, text: text || link });
      setError('');
    } catch (err) {
      if (err.name !== 'AbortError') setError('This browser could not share it. Save the image and copy the words below instead.');
    }
  };
  return <>
    {includeMessage ? <textarea aria-label="Words and link to share" readOnly rows={6} value={text} onFocus={event => event.target.select()} className="w-full resize-none rounded border border-record-ink/20 bg-record-bone p-3 text-sm leading-relaxed text-record-ink" /> :
      <p className="text-sm leading-relaxed text-record-muted">{canShareImage ? 'Share the image with its words and link, or save it to send later.' : 'Save the image, then attach it in WhatsApp, a message or a post. Copy its link alongside it.'}</p>}
    {(canShareImage || canShareText) && <button type="button" onClick={share} className="flex min-h-12 items-center justify-center gap-2 rounded bg-record-ink px-4 text-sm font-bold text-record-paper"><Share2 size={18} />{canShareImage ? (includeMessage ? 'Share painting + words' : 'Share image') : 'Share words + link'}</button>}
    <div className="grid grid-cols-2 gap-2">
      <a href={imageUrl || undefined} download={fileName} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded border border-record-ink/20 px-2 text-center text-xs font-bold"><Download size={17} className="shrink-0" />Save image</a>
      <button type="button" onClick={copy} className="flex min-h-12 items-center justify-center gap-2 rounded border border-record-ink/20 px-2 text-xs font-bold">{copied ? <Check size={17} className="shrink-0" /> : <Copy size={17} className="shrink-0" />}{copied ? 'Copied' : includeMessage ? 'Copy words + link' : 'Copy link'}</button>
    </div>
    {/* ── STRAIGHT INTO THE APP THEY ALREADY HAVE ──
        The share sheet is the good path on a phone, but it is not there on a laptop, and an
        activist passing the record on from a kitchen table should not have to copy a link,
        open WhatsApp and paste it. These are the four channels the record actually travels
        on, one tap each, with the words already in them. The picture is not attached — it
        cannot be, through a link — and it does not need to be: WhatsApp and Telegram fetch
        the record's own card from the address, so the painting arrives anyway. */}
    <div className="grid grid-cols-2 gap-2">
      {targets.map(({ name, href }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded border border-record-ink/20 px-2 text-xs font-bold">{name}</a>
      ))}
    </div>
    {includeMessage && <p className="text-xs leading-relaxed text-record-muted">Some apps send only the image. Copy the words and link alongside it if needed.</p>}
    {error && <><p className="text-sm text-record-red" role="alert">{error}</p><textarea aria-label="Message to copy manually" readOnly value={message} onFocus={event => event.target.select()} className="w-full rounded border border-record-ink/20 bg-record-paper p-3 text-xs" /></>}
  </>;
}