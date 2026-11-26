import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { LETTERS } from '@/components/stoneymollan/barryReply/escalationLetters';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';

// ── THREE LETTERS, ONE TUNE ────────────────────────────────────────────────────
// Open address, no layout, no sign-in: on a phone it is three letters and three copy
// buttons, because this gets done at a kitchen table and not at a desk. It asks search
// engines to leave it alone for the same reason the reply to Barry does — it is one
// person's correspondence about their own property, not a page for the world.
export default function StoneymollanEscalation() {
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => {
      document.head.removeChild(m);
    };
  }, []);

  const copy = async (letter) => {
    const ok = await copyText(`Subject: ${letter.subject}\n\n${letter.body}`);
    if (ok) {
      setCopied(letter.id);
      setTimeout(() => setCopied(''), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-record-paper text-record-ink">
      <div className="mx-auto max-w-3xl px-4 py-6 pb-24 lg:px-8">
        <Link
          to="/Stoneymollan"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Stoneymollan
        </Link>

        <h1 className="mt-4 text-[26px] leading-tight lg:text-[34px]" style={{ fontFamily: 'var(--font-heading)' }}>
          Three letters, one tune
        </h1>
        <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
          One email cannot go to all three. Each body answers a different question, and a letter
          addressed to all of them lets each one reply “not us” and pass it along. So these are
          three, in the same voice and the same shape: the numbered ask, the plain request to say
          so if it does not exist, the stated timescale, the rights reserved.
        </p>
        <p className="mt-2 max-w-[62ch] text-[13px] leading-relaxed text-record-muted">
          Every claim you were given verbally is written here as “I have been told”, so the letter
          pins it on the person who said it without this record asserting it as true. Send each one
          from your own address, keep the replies, and note the date you sent it.
        </p>

        {LETTERS.map((letter, i) => (
          <section key={letter.id} className="mt-9 border-t-2 border-record-ink pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-red">
              Letter {i + 1} of {LETTERS.length}
            </p>
            <h2 className="mt-1 text-[19px] leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
              {letter.title}
            </h2>
            <p className="mt-2 text-[12.5px] leading-relaxed text-record-ink/80">
              <strong className="font-semibold">Send to:</strong> {letter.sendTo}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-record-muted">
              <strong className="font-semibold text-record-ink/80">Why:</strong> {letter.why}
            </p>

            <div className="mt-4 border border-record-ink/20 bg-record-bone/40 p-3 lg:p-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-record-muted">Subject</p>
              <p className="mt-1 text-[13px] leading-snug">{letter.subject}</p>
              <div className="mt-3 border-t border-record-ink/15 pt-3">
                {letter.body.split('\n\n').map((para, j) => (
                  <p
                    key={j}
                    className="mt-2.5 whitespace-pre-line text-[14px] leading-relaxed first:mt-0"
                    style={{ fontFamily: 'var(--font-reading)' }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => copy(letter)}
              className="mt-3 inline-flex items-center gap-2 border-2 border-record-ink px-4 py-2.5 font-mono text-[11px] font-black uppercase tracking-[0.1em]"
            >
              {copied === letter.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied === letter.id ? 'Copied' : 'Copy this letter'}
            </button>
          </section>
        ))}

        <p className="mt-9 border-t border-record-ink/20 pt-4 text-[12px] leading-relaxed text-record-muted">
          Not legal advice. A letter does not pause works and does not guarantee an answer. If works
          are threatened or begin, that is the point to take the file to a Scottish property
          solicitor — an interdict is the only thing that stops work, and a reply is not.
        </p>
      </div>
    </div>
  );
}