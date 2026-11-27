import React, { useState } from 'react';
import { Check, Copy, Download, Share2 } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';
import ShareDestinations from '@/components/climate/ShareDestinations';
import ShareQr from '@/components/climate/ShareQr';

// ── ONE TAP, THEN EVERY DOOR ──────────────────────────────────────────────────
// The order is the whole design, and it is right: the share sheet first, because it is the
// only thing that reaches every app installed on the device — Signal, Discord, WeChat,
// KakaoTalk, TikTok, Nextdoor — without this record having to know they exist. Then the
// written doors, for a laptop where no sheet appears. Then the picture on its own, for
// Instagram, which will not take a link at all. Then the QR, which is the one door that
// opens where a link is blocked.
//
// Nothing below the picture competes with it: no logo wall, no colour, no icon per app.
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

  return <>
    {includeMessage && <textarea aria-label="Words and link to share" readOnly rows={4} value={text} onFocus={(event) => event.target.select()} className="w-full resize-none rounded border border-record-ink/20 bg-record-bone p-3 text-sm leading-relaxed text-record-ink" />}

    {(canShareImage || canShareText) && <button type="button" onClick={share} className="flex min-h-12 items-center justify-center gap-2 rounded bg-record-ink px-4 text-sm font-bold text-record-paper"><Share2 size={18} />{canShareImage ? (includeMessage ? 'Share painting + words' : 'Share image') : 'Share words + link'}</button>}

    <div className="grid grid-cols-2 gap-2">
      <a href={imageUrl || undefined} download={fileName} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded border border-record-ink/20 px-2 text-center text-xs font-bold"><Download size={17} className="shrink-0" />Save image</a>
      <button type="button" onClick={copy} className="flex min-h-12 items-center justify-center gap-2 rounded border border-record-ink/20 px-2 text-xs font-bold">{copied ? <Check size={17} className="shrink-0" /> : <Copy size={17} className="shrink-0" />}{copied ? 'Copied' : includeMessage ? 'Copy words + link' : 'Copy link'}</button>
    </div>

    {/* ── THE DOORS, ONE TAP AWAY ──
        The three things a person actually does — share it, save it, copy it — now sit
        together at the top, so nothing has to be scrolled for or hunted for on a phone.
        Every door is still here, in full, and so is the code; they simply wait behind one
        line instead of pushing the share button off the screen. */}
    <details className="border-t border-record-ink/15 pt-3">
      <summary className="cursor-pointer text-xs font-bold text-record-ink">Everywhere else it can go — and the QR</summary>
      <div className="mt-3 space-y-3">
        <ShareDestinations link={link} title={headline} message={message} />
        <ShareQr link={link} />
      </div>
    </details>

    {error && <><p className="text-sm text-record-red" role="alert">{error}</p><textarea aria-label="Message to copy manually" readOnly value={message} onFocus={(event) => event.target.select()} className="w-full rounded border border-record-ink/20 bg-record-paper p-3 text-xs" /></>}
  </>;
}