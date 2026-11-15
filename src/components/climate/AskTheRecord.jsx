import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

// ── ASK THE RECORD, INSTEAD OF ASKING A PERSON ──────────────────────────────
// Brian, 15 November: "why never do nothing or have to send email to ask question on how best
// to use when you can deliver best experience… only truth… avoiding the noise."
//
// He is right and the fix is small: a question about how this record works should be answered
// where it is asked, in seconds, by the record itself — and the answer must be allowed to stop
// short rather than fill the gap with something plausible.
//
// Three deliberate choices, all of them about trust rather than polish:
//   · it says "I don't know" out loud when the manual does not cover it. A confident wrong
//     answer in front of a research panel costs more than every answer this box will ever give.
//   · it never names a person, so it cannot gossip about a volunteer or a funder to a stranger.
//   · the links are the record's own doors, checked on the server before they reach the screen.
const SUGGESTIONS = [
  'Can I read it without an account?',
  'What happens after I send something in?',
  'What does a checker actually do?',
];

export default function AskTheRecord() {
  const [question, setQuestion] = useState('');
  const [asked, setAsked] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const send = async (text) => {
    const value = String(text || question).trim();
    if (value.length < 3 || busy) return;
    setBusy(true);
    setError('');
    setResult(null);
    setAsked(value);
    try {
      const res = await base44.functions.invoke('climateHelp', { question: value });
      if (res?.data?.error) throw new Error(res.data.error);
      setResult(res.data);
    } catch (e) {
      setError('That did not answer just now. Ask again, or open the guide below.');
    } finally {
      setBusy(false);
    }
  };

  const reading = { fontFamily: 'var(--font-reading)' };

  return (
    <section className="mb-8 border border-record-ink/25 bg-record-bone/60 p-4 sm:p-5">
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-record-muted mb-1.5">
        Ask the record · answered from its own manual
      </p>
      <h2 className="text-xl sm:text-2xl text-record-ink mb-1" style={reading}>
        How do I use this?
      </h2>
      <p className="text-[12.5px] leading-[1.6] text-record-muted mb-3" style={reading}>
        No email, no waiting. If the manual does not cover it, it will say so rather than guess.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={400}
          placeholder="Type a question about the record…"
          aria-label="Your question about the record"
          className="flex-1 min-w-0 border border-record-ink/30 bg-record-paper px-3 py-2.5 text-[13.5px] text-record-ink placeholder:text-record-muted focus:outline-none focus:border-record-ink"
          style={reading}
        />
        <button
          type="submit"
          disabled={busy || question.trim().length < 3}
          className="min-h-[44px] px-4 bg-record-ink text-record-paper text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 disabled:opacity-40"
          style={reading}
        >
          {busy ? 'Reading…' : 'Ask'} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {!asked && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setQuestion(s); send(s); }}
              className="border border-record-ink/25 px-2.5 py-1 text-[11.5px] text-record-ink/80 hover:border-record-ink/60"
              style={reading}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-3 text-[12.5px] text-record-red" style={reading}>{error}</p>
      )}

      {result && (
        <div className="mt-3 border-t border-record-ink/20 pt-3">
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-record-muted mb-1.5">
            You asked · {asked}
          </p>
          <p className="text-[14px] leading-[1.65] text-record-ink" style={reading}>{result.answer}</p>
          {result.not_covered && (
            <p className="mt-2 text-[12px] leading-[1.6] text-record-muted" style={reading}>
              Not in the record’s manual: {result.not_covered}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {(result.doors || []).map((door) => (
              <Link
                key={door.path}
                to={door.path}
                className="inline-flex items-center gap-1 border border-record-ink/35 px-3 py-1.5 text-[12.5px] text-record-ink hover:border-record-ink"
                style={reading}
              >
                {door.label} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
            <button
              onClick={() => { setResult(null); setAsked(''); setQuestion(''); }}
              className="px-2 text-[11.5px] text-record-muted underline"
              style={reading}
            >
              ask something else
            </button>
          </div>
        </div>
      )}
    </section>
  );
}