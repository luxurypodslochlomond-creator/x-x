import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';
import BoardHead from '@/components/fergus/BoardHead';
import { FERGUS_CARD_BIO, FERGUS_CARD_FACTS } from '@/components/fergus/fergusFacts';

export default function FergusCardBoard() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const ok = await copyText(FERGUS_CARD_BIO);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };
  return <section className="fergus-board">
    <BoardHead kicker="Your card" title="One name. Four facts." line="Screenshot it, or send the line." fullTo="/FergusCard" fullLabel="Open on its own" />
    <div className="fergus-card">
      <span className="fergus-card-meta">17 · Glasgow</span>
      <strong className="fergus-card-name">Fergus<br />Hughes</strong>
      <ul>{FERGUS_CARD_FACTS.map(fact => <li key={fact}>{fact}</li>)}</ul>
      <p>I make things. Give me a product and a week — you’ll get the videos and the numbers.</p>
    </div>
    <button type="button" className="fergus-big-action" onClick={copy}>{copied ? <Check size={22} /> : <Copy size={22} />}<span>{copied ? 'Copied' : 'Copy the one-liner'}</span></button>
  </section>;
}