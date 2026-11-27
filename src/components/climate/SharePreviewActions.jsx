import React, { useState } from 'react';
import { Check, Copy, Download, Share2 } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';
import ShareDestinations from '@/components/climate/ShareDestinations';
import ShareQr from '@/components/climate/ShareQr';

// ── WHAT IS ACTUALLY COOL ────────────────────────────────────────────────────
// Brian, 27 November: "hard to look at on mobile… feels lifeless and soulless… what is
// absolutely coolasfuck for you?"
//
// Subtraction, and one accent. The window had three heavy objects stacked — a grey box of
// text, a black button, two bordered buttons — and then a list, and then a code. Nothing in
// it was wrong and all of it was the same weight, which is what lifeless means.
//
// So the words are no longer a form field. They are set as the record sets words: on the
// paper, in the record's own type, with the address underneath in mono. You can still
// select them; you are no longer being asked to fill something in. One black button stays,
// because one decision deserves one button. The two quiet things under it are text, not
// boxes. And the only colour in the whole window is the record's own red, on the three
// small labels and on x = x — so the eye finds the structure without being shouted at.
export default function SharePreviewActions({ blob, fileName, link, headline, text, imageUrl, includeMessage }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const file = blob && typeof File === 'function' ? new File([blob], fileName, { type: blob.type || 'image/png' }) : null;
  const canShareImage = !!(file && navigator.share && navigator.canShare?.({ files: [file] }));
  const canShareText = includeMessage && !!navigator.share;
  const message = includeMessage ? text : link;

  const copy = async () => {
    const ok = await copyText(message);
    setCopied(ok); setError(ok ? '' : 'Select and copy the words below.');
  };
  const share = async () => {
    try {
      await navigator.share(canShareImage ? { files: [file], title: headline, text: text || link } : { title: headline, text: text || link });
      setError('');
    } catch (err) {
      if (err.name !== 'AbortError') setError('This browser could not open the share sheet. Save the image and copy the words instead.');
    }
  };

  return <div className="space-y-2.5">
    {includeMessage && (
      <p className="whitespace-pre-line border-l-2 border-record-signal pl-3 text-sm leading-relaxed text-record-ink">{text}</p>
    )}

    {(canShareImage || canShareText) && <button type="button" onClick={share} className="flex min-h-12 items-center justify-center gap-2 rounded bg-record-ink px-4 text-sm font-bold text-record-paper"><Share2 size={18} />{canShareImage ? (includeMessage ? 'Share painting + words' : 'Share image') : 'Share words + link'}</button>}

    <div className="flex items-center justify-center gap-5">
      <a href={imageUrl || undefined} download={fileName} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 py-2 text-xs font-bold text-record-ink underline decoration-record-ink/25 underline-offset-4"><Download size={15} className="shrink-0" />Save image</a>
      <button type="button" onClick={copy} className="flex items-center gap-1.5 py-2 text-xs font-bold text-record-ink underline decoration-record-ink/25 underline-offset-4">{copied ? <Check size={15} className="shrink-0" /> : <Copy size={15} className="shrink-0" />}{copied ? 'Copied' : includeMessage ? 'Copy words + link' : 'Copy link'}</button>
    </div>

    {/* Everything else waits behind one line, so the three things a person actually does
        are all above the fold on a phone. Nothing is removed; nothing is hunted for. */}
    <details className="border-t border-record-ink/15 pt-3">
      <summary className="cursor-pointer text-xs font-bold text-record-ink">Everywhere else it can go — and the QR</summary>
      <div className="mt-3 space-y-3">
        <ShareDestinations link={link} title={headline} message={message} />
        <ShareQr link={link} />
      </div>
    </details>

    {error && <><p className="text-sm text-record-red" role="alert">{error}</p><p className="whitespace-pre-line rounded border border-record-ink/20 p-3 text-xs">{message}</p></>}
  </div>;
}