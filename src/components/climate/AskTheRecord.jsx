import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Mic, Square, Volume2 } from 'lucide-react';
import { useClimateLanguage } from '@/components/climate/useClimateLanguage';
import { useVoiceIn, useVoiceOut } from '@/components/climate/useRecordVoice';

// ── ASK THE RECORD, INSTEAD OF ASKING A PERSON ──────────────────────────────
// Brian, 15 November: "why never do nothing or have to send email to ask question on how best
// to use… only truth… avoiding the noise", then: keeper, checker, potential checker, and
// "speech to back and forth zero friction… every tongue."
//
// So this stands in the rooms where the work actually happens, not on the poster. A checker
// halfway down an entry, or someone deciding whether to volunteer at all, gets an answer in
// seconds by typing it or saying it out loud — and the answer can be read back to them.
//
// Three things stay strict, because they are the whole value:
//   · it answers from the record's own manual and says "not in the manual" rather than
//     inventing something plausible. In front of a research panel that refusal is worth more
//     than any answer this box will ever give.
//   · it never names a person, so it cannot gossip about a volunteer or a funder.
//   · the links are the record's own doors, checked on the server before they reach the screen.
//
// And it answers in the tongue the question is written in — including a historical or
// indigenous tongue — which is the model's own ear rather than a dictionary we would have to
// keep. The voice is the device's, and only as wide as the device: a phone can speak Gaelic,
// none can speak Rongorongo, and the line under the answer says which one you are hearing.
const SUGGESTIONS = [
  'What does a checker actually do?',
  'What happens after I send something in?',
  'Does a keeper publish on their own?',
];

export default function AskTheRecord({ suggestions = SUGGESTIONS }) {
  const [question, setQuestion] = useState('');
  const [asked, setAsked] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // The tongue the whole record is already set to, so a reader who has chosen Lakota is not
  // silently answered in English.
  const { chosen } = useClimateLanguage({});
  const out = useVoiceOut();

  const send = async (text) => {
    const value = String(text || question).trim();
    if (value.length < 3 || busy) return;
    setBusy(true);
    setError('');
    setResult(null);
    setAsked(value);
    try {
      const res = await base44.functions.invoke('climateHelp', { question: value, lang: chosen });
      if (res?.data?.error) throw new Error(res.data.error);
      setResult(res.data);
    } catch (e) {
      setError('That did not answer just now. Ask again, or open the guide below.');
    } finally {
      setBusy(false);
    }
  };

  const mic = useVoiceIn({ onHeard: (text) => { setQuestion(text); send(text); }, tongue: chosen });

  const reading = { fontFamily: 'var(--font-reading)' };
  const spokenVoice = out.voiceFor(chosen);

  return (
    <section className="mb-6 border border-record-ink/25 bg-record-bone/60 p-4 sm:p-5">
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-record-muted mb-1.5">
        Ask the record · answered from its own manual
      </p>
      <h2 className="text-lg sm:text-xl text-record-ink mb-1" style={reading}>
        How do I use this?
      </h2>
      <p className="text-[12.5px] leading-[1.6] text-record-muted mb-3" style={reading}>
        Type it or say it, in any tongue. No email, no waiting — and if the manual does not cover it, it says so rather than guessing.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <div className="flex-1 min-w-0 flex">
          <input
            value={mic.listening ? mic.heard || question : question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={400}
            placeholder={mic.listening ? 'Listening…' : 'Type or speak a question about the record…'}
            aria-label="Your question about the record"
            className="flex-1 min-w-0 border border-record-ink/30 bg-record-paper px-3 py-2.5 text-[13.5px] text-record-ink placeholder:text-record-muted focus:outline-none focus:border-record-ink"
            style={reading}
          />
          <button
            type="button"
            onClick={mic.start}
            aria-label={mic.listening ? 'Stop listening' : 'Ask by voice'}
            title={mic.listening ? 'Stop listening' : 'Ask by voice'}
            className={`shrink-0 min-w-[44px] border border-l-0 border-record-ink/30 inline-grid place-items-center ${mic.listening ? 'bg-record-red text-record-paper' : 'bg-record-paper text-record-ink/70 hover:text-record-ink'}`}
          >
            {mic.listening ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
        <button
          type="submit"
          disabled={busy || question.trim().length < 3}
          className="min-h-[44px] px-4 bg-record-ink text-record-paper text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 disabled:opacity-40"
          style={reading}
        >
          {busy ? 'Reading…' : 'Ask'} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {mic.problem && (
        <p className="mt-2 text-[11.5px] text-record-muted" style={reading}>{mic.problem}</p>
      )}

      {!asked && suggestions?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => { setQuestion(s); send(s); }}
              className="border border-record-ink/25 px-2.5 py-1 text-[11.5px] text-record-ink/80 hover:border-record-ink/60 text-left"
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

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            {out.canSpeak ? (
              <button
                onClick={() => out.speak(result.answer, chosen)}
                className="inline-flex items-center gap-1.5 text-[11.5px] text-record-ink/75 hover:text-record-ink underline"
                style={reading}
              >
                <Volume2 className="w-3.5 h-3.5" />
                {out.speaking ? 'Stop reading' : 'Read it to me'}
              </button>
            ) : null}
            {/* The truth about the voice, kept small and said once: the words are every
                tongue, the sounds are only the ones this device happens to carry. */}
            {out.canSpeak && (
              <span className="text-[10.5px] font-mono uppercase tracking-[0.12em] text-record-muted">
                {spokenVoice ? `read in ${spokenVoice.name}` : 'read in the device’s own voice'}
              </span>
            )}
          </div>

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