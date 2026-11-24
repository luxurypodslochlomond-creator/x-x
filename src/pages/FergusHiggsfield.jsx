import React, { useState } from 'react';
import FergusPageFrame from '@/components/fergus/FergusPageFrame';
import { Link } from 'react-router-dom';
import { Copy, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';
import { SUBJECT, PITCH, HIRE_VERDICT, TONE_CHECK, WHAT_THEY_WANT, ROBIN_LINES, STEPS, UGC_TIPS, BEFORE_SENDING } from '@/components/fergus/higgsfieldPitch';

// Fergus's way into the Higgsfield creator programme. Mobile first: one note, one button.
const FULL = `Subject: ${SUBJECT}\n\n${PITCH}`;
const WORDS = PITCH.trim().split(/\s+/).length;

export default function FergusHiggsfield({ embedded = false }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const ok = await copyText(FULL);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <FergusPageFrame embedded={embedded} section="Application">
    <div className="min-h-screen bg-record-paper text-record-ink">
      <div className="mx-auto max-w-2xl px-4 py-6 pb-24">
        <Link
          to="/FergusRoom"
          data-fergus-back
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Fergus
        </Link>

        <h1 className="mt-3 text-[26px] leading-tight">
          Fergus, for Higgsfield
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-record-ink/75">
          One short note, {WORDS} words. Copy it, fill in the two lines at the foot, send it.
        </p>

        <div className="mt-4 border-2 border-record-ink bg-record-ink p-3">
          <button
            type="button"
            onClick={copy}
            className="flex min-h-[54px] w-full items-center justify-center gap-2 bg-record-paper px-4 py-3 font-mono text-[12px] font-black uppercase tracking-wide"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied. Paste it into the email' : 'Copy the note'}
          </button>
        </div>

        {/* The form is the door. Higgsfield reserves its affiliate@ address for established
            creators, so a 17-year-old with a phone and three clips belongs in the form, not
            in that inbox. No invented contact address. */}
        <a
          href="https://higgsfield.ai/creator-partnership-program"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex min-h-[46px] items-center justify-center gap-2 border-2 border-record-ink px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
        >
          Open the application form <ExternalLink className="h-3.5 w-3.5" />
        </a>

        <Link
          to={embedded ? '/FergusRoom?view=film' : '/FergusHiggsfieldVideo'}
          className="mt-3 flex min-h-[46px] items-center justify-center gap-2 border-2 border-record-red bg-record-red/5 px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide text-record-red"
        >
          The 60-second video they asked for →
        </Link>

        {/* The question Brian asked straight out, answered straight out and put near the top,
            because it is the thing a father actually wants to know before reading a letter. */}
        <section className="mt-6 border-2 border-record-ink bg-record-bone/50 p-4">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            Would I hire him? {HIRE_VERDICT.answer}
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-record-ink/85">{HIRE_VERDICT.hire}</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-record-ink/85">
            <span className="font-black uppercase tracking-wide text-[10.5px] font-mono">The gap · </span>
            {HIRE_VERDICT.gap}
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-record-ink/85">{HIRE_VERDICT.why}</p>
        </section>

        <article className="mt-6 border-t-2 border-record-ink pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-muted">
            Subject: {SUBJECT}
          </p>
          {PITCH.split('\n\n').map((para, i) => (
            <p key={i} className="mt-3 whitespace-pre-line text-[14.5px] leading-relaxed">
              {para}
            </p>
          ))}
        </article>

        <section className="mt-8 border-t border-record-ink/20 pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            Does it read as a confident dobber?
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-record-ink/75">
            Checked line by line. One was cut for exactly that reason.
          </p>
          <ul className="mt-3 space-y-3">
            {TONE_CHECK.map((t) => (
              <li key={t.line} className="border-l-2 border-record-ink/30 pl-3">
                <p className={`font-mono text-[11.5px] font-black ${t.done ? 'line-through text-record-muted' : ''}`}>
                  {t.line}
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-record-ink/85">{t.verdict}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-record-muted">{t.why}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 border-t border-record-ink/20 pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            What Higgsfield actually says they want
          </h2>
          <dl className="mt-3 space-y-3">
            {WHAT_THEY_WANT.map((w) => (
              <div key={w.label} className="border-l-2 border-record-ink/30 pl-3">
                <dt className="font-mono text-[10.5px] font-black uppercase tracking-wide">{w.label}</dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-record-ink/80">{w.text}</dd>
                <dd className="mt-1">
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-2"
                  >
                    Their page <ExternalLink className="h-3 w-3" />
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-8 border-t border-record-ink/20 pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            What Robin's advice looks like on paper
          </h2>
          <dl className="mt-3 space-y-3">
            {ROBIN_LINES.map((r) => (
              <div key={r.said} className="border-l-2 border-record-ink/30 pl-3">
                <dt className="font-mono text-[10.5px] font-black uppercase tracking-wide">{r.said}</dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-record-ink/80">{r.looks}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-8 border-t border-record-ink/20 pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            Step by step, in order
          </h2>
          <ol className="mt-3 space-y-3">
            {STEPS.map((s) => (
              <li key={s.n} className="border-l-2 border-record-ink/30 pl-3">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-record-muted">{s.n}</p>
                <p className="mt-0.5 text-[13.5px] font-semibold leading-relaxed text-record-ink">{s.what}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-record-ink/70">{s.why}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 border-t border-record-ink/20 pt-5">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            Things that work, whoever he ends up working for
          </h2>
          <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-record-ink/85">
            {UGC_TIPS.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>

        <section className="mt-6 border-2 border-record-red bg-record-red/5 p-4">
          <h2 className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-red">
            Before he presses send
          </h2>
          <ul className="mt-2 space-y-2 text-[13.5px] leading-relaxed text-record-ink/85">
            {BEFORE_SENDING.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>
      </div>
    </div>
    </FergusPageFrame>
  );
}