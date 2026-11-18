import React, { useEffect, useState } from 'react';
import { cardWords, cardTongue } from '@/components/climate/cardTongue';
import { CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';

// ── THE COVER'S OWN WORDS, SET AGAIN ─────────────────────────────────────────
// Francis's cover is a printed picture: its lettering is ink inside the file, and no
// switch on this page can re-letter it. That is the whole answer to "why do the other
// cartoons turn over and this one does not" — every other drawing's words live as text
// on the page, and text can be read out in any tongue; the cover's words live in pixels.
//
// So the record does the honest thing rather than doctoring somebody else's artwork: the
// picture stays exactly as it was sent — never cropped, tinted or redrawn — and the words
// it carries are set again underneath it, in the tongue the reader chose. The cover is not
// translated; it is read out. The same words are what the share card carries, so the
// picture and the card say the same thing in the same tongue.
const COVER_WORDS = [
  CARTOON_EVENT.title,
  CARTOON_EVENT.biennial,
  CARTOON_EVENT.when,
  CARTOON_EVENT.where,
  CARTOON_EVENT.coverArt,
];

const RTL = new Set(['ar', 'he', 'fa', 'ur']);

export default function CartoonCoverWords() {
  const [tongue, setTongue] = useState(cardTongue);
  const [words, setWords] = useState(null);

  // A tongue picked anywhere on the platform is the tongue here too, at once.
  useEffect(() => {
    const onChange = () => setTongue(cardTongue());
    window.addEventListener('uf51:lang', onChange);
    return () => window.removeEventListener('uf51:lang', onChange);
  }, []);

  useEffect(() => {
    let live = true;
    setWords(null);
    cardWords(COVER_WORDS)
      .then((out) => { if (live) setWords(out); })
      .catch(() => { /* the cover's own English stands */ });
    return () => { live = false; };
  }, [tongue]);

  if (!tongue || tongue === 'en') return null;
  const t = (line) => (words && words[line]) || line;

  return (
    <div className="comic-cover-words" lang={tongue} dir={RTL.has(tongue) ? 'rtl' : 'ltr'}>
      <p className="comic-cover-words-eyebrow record-meta">What the cover says</p>
      <p className="comic-cover-words-title">{t(CARTOON_EVENT.title)}</p>
      <p className="comic-cover-words-line record-meta">{t(CARTOON_EVENT.biennial)}</p>
      <p className="comic-cover-words-line record-meta">{t(CARTOON_EVENT.when)} · {t(CARTOON_EVENT.where)}</p>
      <p className="comic-cover-words-credit record-meta">{t(CARTOON_EVENT.coverArt)}</p>
    </div>
  );
}