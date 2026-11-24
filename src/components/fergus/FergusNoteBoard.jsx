import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';
import { SUBJECT, PITCH, STEPS } from '@/components/fergus/higgsfieldPitch';
import BoardHead from '@/components/fergus/BoardHead';

const SHORT_STEPS = ['Try Higgsfield free.', 'Post three clips.', 'Film your 60 seconds.', 'Fill in the form.', 'Paste your letter.', 'Ask about Earn.', 'Wait two weeks. Follow up once.', 'Keep posting your work.'];

export default function FergusNoteBoard() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const ok = await copyText(`Subject: ${SUBJECT}\n\n${PITCH}`);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };
  return <section className="fergus-board">
    <BoardHead kicker="Higgsfield · creator programme" title="The letter." line="Add your handle and number. Then apply." fullTo="/FergusHiggsfield" fullLabel="All the advice" />
    <button type="button" className="fergus-big-action" onClick={copy}>
      {copied ? <Check size={22} /> : <Copy size={22} />}
      <span>{copied ? 'Copied — paste it in the email' : 'Copy the letter'}</span>
    </button>
    <a className="fergus-big-action" href="https://higgsfield.ai/creator-partnership-program" target="_blank" rel="noopener noreferrer">Open the application form</a>
    <details className="fergus-sheet fergus-more">
      <summary>Read the whole letter</summary>
      <p className="fergus-sheet-subject">{SUBJECT}</p>
      <p className="fergus-sheet-body">{PITCH}</p>
    </details>
    <h2 className="fergus-board-sub">One step at a time</h2>
    <ol className="fergus-steps">
      {STEPS.map((step, index) => <li key={step.n}>
        <span className="fergus-step-n" aria-hidden="true">{step.n}</span>
        <div><strong>{SHORT_STEPS[index]}</strong><details className="fergus-more"><summary>How</summary><p>{step.what}</p><p>{step.why}</p></details></div>
      </li>)}
    </ol>
  </section>;
}