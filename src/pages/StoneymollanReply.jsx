import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Printer, ArrowLeft, ExternalLink } from 'lucide-react';
import { TO, SUBJECT, BODY } from '@/components/stoneymollan/barryReply/replyText';
import { copyText } from '@/components/stoneymollan/barryReply/copyText';
import ReplyLetter from '@/components/stoneymollan/barryReply/ReplyLetter';
import ReplyFactsPanel from '@/components/stoneymollan/barryReply/ReplyFactsPanel';

// The reply to Barry Harper, on an open address with no layout: on a phone it is the letter and
// the copy button. The text lives in barryReply/replyText.js.
const FULL = `To: ${TO}\nSubject: ${SUBJECT}\n\n${BODY}`;
const MAILTO = `mailto:${TO}?subject=${encodeURIComponent(SUBJECT)}`;

const WORD_COUNT = BODY.trim().split(/\s+/).length;
const CHECKS = [
  'Reply in the existing email thread. Copy only the letter; do not forward this page or attach the private case file.',
  'Keep original correspondence, plans and photographs. The saved research is AI-assisted, not a solicitor’s opinion; no letter guarantees an outcome.',
  'The 14 days is a requested response time, not an automatic pause on works or an admission if unanswered. Regulatory and court deadlines run separately.',
  'For threatened interference, obtain prompt advice from a Scottish property solicitor; ERCS offers free environmental-law advice, subject to assessment.',
];

export default function StoneymollanReply() {
  const [copied, setCopied] = useState(false);
  const [showText, setShowText] = useState(false);
  const areaRef = useRef(null);

  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  useEffect(() => {
    if (showText && areaRef.current) {
      areaRef.current.focus();
      areaRef.current.select();
    }
  }, [showText]);

  const copy = async () => {
    const ok = await copyText(FULL);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      setShowText(true);
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

        <h1 className="mt-3 text-[25px] leading-tight lg:text-[33px]" style={{ fontFamily: 'var(--font-display)' }}>
          The reply to Barry Harper
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
          Version 12 · {WORD_COUNT} words in the letter. Six grouped requests, with the earlier
          objection kept in the thread rather than repeated.
        </p>

        <div className="mt-4 border-2 border-record-ink bg-record-ink p-4 text-record-paper">
          <button
            type="button"
            onClick={copy}
            className="flex min-h-[54px] w-full items-center justify-center gap-2 bg-record-paper px-4 py-3 font-mono text-[12.5px] font-black uppercase tracking-wide text-record-ink"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied. Paste it into the email' : 'Copy the whole email'}
          </button>
          <button
            type="button"
            onClick={() => setShowText((v) => !v)}
            className="mt-2 w-full px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-record-paper/70 underline decoration-dotted underline-offset-2"
          >
            {showText ? 'Hide the plain text' : 'Or show the plain text and copy it by hand'}
          </button>
        </div>

        {showText && (
          <textarea
            ref={areaRef}
            readOnly
            value={FULL}
            rows={12}
            onFocus={(e) => e.target.select()}
            className="mt-2 w-full border-2 border-record-ink bg-record-bone/50 p-3 font-mono text-[11px] leading-relaxed"
          />
        )}

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <a
            href={MAILTO}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 border-2 border-record-ink px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
          >
            Open a new mail to Barry
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex min-h-[44px] items-center justify-center gap-2 border-2 border-record-ink px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
        </div>
        <p className="mt-2 break-all font-mono text-[10px] uppercase tracking-wide text-record-muted">
          This page opens without sign-in. Private evidence and case-specific advice are not included.
        </p>

        <div className="mt-4 border-2 border-record-ink bg-record-signal/40 p-3">
          <p className="font-mono text-[10.5px] font-black uppercase tracking-[0.16em]">
            The deadline that is not his to set
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            Check the case’s actual consultation closing date now. Scottish Forestry normally
            allows <strong>28 days for relevant woodland-creation applications</strong>; do not
            wait for Barry’s reply. New consultations moved to a new register on 3 November 2026;
            the official page links to both registers.
          </p>
          <a
            href="https://www.forestry.gov.scot/scottish-forestry-public-register"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-[44px] items-center justify-center gap-2 bg-record-ink px-4 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide text-record-paper"
          >
            Open the public register <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <ReplyLetter text={BODY} />
        <ReplyFactsPanel />

        <details className="mt-4 border-2 border-record-red bg-record-red/5 p-4">
          <summary className="cursor-pointer font-mono text-[10.5px] font-black uppercase tracking-[0.16em] text-record-red">
            Before you press send
          </summary>
          <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-record-ink/85 font-body">
            {CHECKS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </details>
      </div>
    </div>
  );
}