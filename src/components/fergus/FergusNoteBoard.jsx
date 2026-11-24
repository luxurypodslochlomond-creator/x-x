import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';
import { SUBJECT, PITCH, STEPS } from '@/components/fergus/higgsfieldPitch';
import BoardHead from '@/components/fergus/BoardHead';

const OPENING = PITCH.split('\n\n').slice(0, 3).join('\n\n');

export default function FergusNoteBoard() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const ok = await copyText(`Subject: ${SUBJECT}\n\n${PITCH}`);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };
  return <section className="fergus-board">
    <BoardHead kicker="Higgsfield · creator programme" title="The letter." line="Written. Check the two lines at the foot, then send." fullTo="/FergusHiggsfield" fullLabel="Read it all" />
    <button type="button" className="fergus-big-action" onClick={copy}>
      {copied ? <Check size={22} /> : <Copy size={22} />}
      <span>{copied ? 'Copied — paste it in the email' : 'Copy the letter'}</span>
    </button>
    <article className="fergus-sheet">
      <p className="fergus-sheet-subject">{SUBJECT}</p>
      <p className="fergus-sheet-body">{OPENING}</p>
    </article>
    <h2 className="fergus-board-sub">Three steps first</h2>
    <ol className="fergus-steps">
      {STEPS.slice(0, 3).map(step => <li key={step.n}>
        <span className="fergus-step-n" aria-hidden="true">{step.n}</span>
        <span><strong>{step.what}</strong></span>
      </li>)}
    </ol>
  </section>;
}