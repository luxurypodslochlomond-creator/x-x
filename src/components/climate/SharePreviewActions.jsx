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
  const [pasted, setPasted] = useState(false);
  const [error, setError] = useState('');
  const file = blob && typeof File === 'function' ? new File([blob], fileName, { type: blob.type || 'image/png' }) : null;
  // canShare throws in some browsers when it is handed files, and a throw here used to
  // take the whole window down with it — so the picture was unreachable, not just unshareable.
  const canShareImage = (() => {
    if (!file || !navigator.share || typeof navigator.canShare !== 'function') return false;
    try { return !!navigator.canShare({ files: [file] }); } catch { return false; }
  })();

  // ── THE PICTURE HAS TO BE OBTAINABLE EVERYWHERE ─────────────────────────────
  // In the preview frame a download is blocked silently, and a plain <a download> on a
  // phone that does not support it opens nothing at all. So the save is done by hand:
  // the file is downloaded where that works, and where it cannot be, the card opens as
  // a picture in its own tab, where a long press saves it to the camera roll.
  const save = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const framed = window.self !== window.top;
    const downloadWorks = 'download' in document.createElement('a');
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    if (framed || !downloadWorks) window.open(url, '_blank', 'noopener');
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  };
  // Words can still go to any app on the phone even when the picture cannot — which is the
  // normal case on a desk, and inside a preview frame that is not allowed to share files.
  const canShareText = !!navigator.share;
  const message = includeMessage ? text : link;

  const copy = async () => {
    const ok = await copyText(message);
    setCopied(ok); setError(ok ? '' : 'Select and copy the words below.');
  };
  const share = async () => {
    // ── WHATSAPP KEEPS THE PICTURE AND DROPS THE WORDS ────────────────────────
    // Brian, 27 November, from a real chat: the card arrived in WhatsApp with no bio under
    // it. Nothing here is broken — a phone cannot hand a file and a message over as one
    // bubble, so iOS and Android send the picture and quietly leave the text behind. The
    // facts are printed on the card for exactly that reason, and this puts the words on the
    // clipboard at the same moment, so pasting them under the picture is one tap rather than
    // a hunt through the page. It is started BEFORE the sheet opens and not awaited, so the
    // clipboard write and the sheet both belong to the same tap — awaiting one would cost
    // the other its permission.
    const words = canShareImage && includeMessage ? copyText(text).catch(() => false) : Promise.resolve(false);
    try {
      await navigator.share(canShareImage ? { files: [file], title: headline, text: text || link } : { title: headline, text: text || link });
      setError('');
      setPasted(await words);
    } catch (err) {
      if (err.name !== 'AbortError') setError('This browser could not open the share sheet. Save the image and copy the words instead.');
    }
  };

  return <div className="space-y-3">
    {/* ── THE STAMP COMES FIRST ──────────────────────────────────────────────
        "Get this is too much bro, need to scroll to see QR code." He was right, and the
        reason was an inversion: the code sat last, under the longest list, when it is the
        only door that needs no list at all — no app, no account, and the one way in where
        a foreign link is stopped at the wall. So it stands at the top beside the address,
        at the size of a stamp. Nothing below it has been removed. */}
    <div className="flex items-center gap-3 border-y border-record-ink/15 py-2.5">
      <ShareQr link={link} compact />
      <div className="min-w-0">
        <p className="break-all font-mono text-[11px] font-bold leading-snug text-record-ink/80">{link.replace(/^https?:\/\//, '')}</p>
        <p className="mt-1 text-[11px] leading-snug text-record-muted">Point a camera at it. No app, no account.</p>
      </div>
    </div>

    {/* The black slab is kept for the one case it is honest in: when the phone really can
        carry the picture into another app. When it cannot — a desktop, or a preview frame
        that is not allowed to open the share sheet — the words are offered as a quiet line
        instead of the heaviest object in the window, because a button that offers words
        under a painting is the thing that made it feel wrong. */}
    {canShareImage && <button type="button" onClick={share} className="flex min-h-12 items-center justify-center gap-2 rounded bg-record-ink px-4 text-sm font-bold text-record-paper"><Share2 size={18} />{includeMessage ? 'Share picture + words' : 'Share image'}</button>}

    {/* Said only once it has happened, and in the record's own voice: a phone cannot hand a
        picture and a message over as one bubble, so the words are already on the clipboard
        and one paste puts them under the picture. No blame, no apology, just the next move. */}
    {pasted && <p className="border-l-2 border-record-signal pl-3 text-[12px] leading-snug text-record-ink" role="status">Picture sent. The words are on your clipboard — paste them under it, because a chat drops the message when a picture travels with it.</p>}

    <div className="flex flex-wrap items-center justify-center gap-x-5">
      <button type="button" onClick={save} className="flex items-center gap-1.5 py-2 text-xs font-bold text-record-ink underline decoration-record-ink/25 underline-offset-4"><Download size={15} className="shrink-0" />Save image</button>
      <button type="button" onClick={copy} className="flex items-center gap-1.5 py-2 text-xs font-bold text-record-ink underline decoration-record-ink/25 underline-offset-4">{copied ? <Check size={15} className="shrink-0" /> : <Copy size={15} className="shrink-0" />}{copied ? 'Copied' : includeMessage ? 'Copy words + link' : 'Copy link'}</button>
      {!canShareImage && canShareText && <button type="button" onClick={share} className="flex items-center gap-1.5 py-2 text-xs font-bold text-record-ink underline decoration-record-ink/25 underline-offset-4"><Share2 size={15} className="shrink-0" />Send words + link</button>}
    </div>

    {/* ── EVERY DOOR, WITHOUT HUNTING ─────────────────────────────────────────
        Brian, 27 November, on a phone: "need to scroll down to see who can share too — sms,
        whats, linkedin… on desktop looks fine but mobile it's hard to get to everywhere
        else." He was right, and it was two faults at once: the doors were folded behind a
        line, and the longest thing in the window — the words themselves — stood above them,
        so the thing a person came for was the last thing on the screen.
        The words now sit at the foot, where reading them is a choice; the doors stand open
        directly under the one black button. Nothing has been removed from this window. */}
    <div className="border-t border-record-ink/15 pt-3">
      <ShareDestinations link={link} title={headline} message={message} />
    </div>

    {includeMessage && (
      <div className="border-t border-record-ink/15 pt-3">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-record-signal">The words that travel with it</p>
        <p className="whitespace-pre-line text-sm leading-relaxed text-record-ink">{text}</p>
      </div>
    )}

    {error && <><p className="text-sm text-record-red" role="alert">{error}</p><p className="whitespace-pre-line rounded border border-record-ink/20 p-3 text-xs">{message}</p></>}
  </div>;
}