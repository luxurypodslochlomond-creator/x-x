import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AletheiaEye from '@/components/aletheia/AletheiaEye';
import { Volume2, Mic, Square, ExternalLink, ArrowRight, Globe } from 'lucide-react';

const SAMPLE_QUESTIONS = [
  "What's most pressing on climate right now?",
  "What is happening to seagrass meadows?",
  "Is the Amazon rainforest getting better or worse?",
  "Who built this record, and who is it for?",
  "What can I actually do about climate change?",
];

const CONFIDENCE_STYLES = {
  high: { label: 'HIGH', color: 'text-[#1e3a2b]', border: 'border-[#1e3a2b]', bg: 'bg-[#1e3a2b]/5' },
  medium: { label: 'MED', color: 'text-[#b8860b]', border: 'border-[#b8860b]', bg: 'bg-[#b8860b]/5' },
  low: { label: 'LOW', color: 'text-[#b3261e]', border: 'border-[#b3261e]', bg: 'bg-[#b3261e]/5' },
};

export default function AletheiaPage() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);
  // The record's own pages on itself — kept apart from the sourced entries.
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  // Zero friction — focus the input on load
  useEffect(() => { inputRef.current?.focus(); }, []);

  const ask = async (q) => {
    const query = (q ?? question).trim();
    if (!query || loading) return;
    setQuestion(query);
    setLoading(true);
    setError(null);
    setResult(null);
    setPages([]);
    try {
      const res = await base44.functions.invoke('aletheiaQuery', { question: query });
      const data = res?.data ?? res;
      if (data?.error) throw new Error(data.error);
      setResult(data?.result ?? data);
      setPages(data?.pages || []);
    } catch (e) {
      setError(e.message || 'The record could not be read just now. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Voice input — Web Speech API
  const toggleListen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setError('Voice input not supported on this browser. Type your question.'); return; }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    rec.interimResults = false;
    rec.onresult = (e) => { const t = e.results[0][0].transcript; setQuestion(t); ask(t); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  };

  // Read answer aloud — browser SpeechSynthesis (free, offline)
  const speak = () => {
    if (!result) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const text = result.summary + '. ' + (result.claims || []).map(c => c.text).join('. ');
    const u = new SpeechSynthesisUtterance(text);
    u.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const eyeState = loading ? 'thinking' : result ? 'answered' : 'idle';

  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative flex flex-col">
      {/* Epigraph — her words, and her name under them */}
      <div className="bg-[#1a1612] py-2 px-4 text-center">
        <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#efe7d6] opacity-60">
          THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.
        </p>
        <p className="font-mono text-[8px] tracking-[0.2em] text-[#efe7d6]/35 mt-1">
          Laurie Anderson · O Superman, 1981
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-8 pb-6 max-w-2xl mx-auto w-full relative z-10">
        {/* Title */}
        <h1 className="text-3xl font-black tracking-tight text-center mb-1">
          ALETHE<span className="text-[#b3261e]">I</span>A
        </h1>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#b3261e] mb-2">TRUTH ENGINE · THE RECORD ONLY</p>
        <p className="font-mono text-[9px] tracking-widest text-[#6b6258] text-center mb-6 max-w-md">
          IT ANSWERS ONLY FROM WHAT IS ON THIS RECORD. NOTHING IS FETCHED FROM THE OPEN WEB, AND NOTHING OUTSIDE IT IS EVER PRESENTED AS A FINDING.
        </p>

        {/* The eye */}
        <AletheiaEye state={eyeState} size={240} />

        {/* Five principles line */}
        <p className="font-mono text-[9px] tracking-widest text-[#6b6258] text-center mt-4 mb-6">
          ASK · RECEIVE · ONLY WHAT THE RECORD HOLDS · OPEN EVERY SOURCE · HEAR "I DON'T KNOW"
        </p>

        {/* Question input */}
        <div className="w-full flex gap-2 mb-3">
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ask()}
            placeholder="Ask about climate — in any language…"
            disabled={loading}
            className="flex-1 bg-[#efe7d6] border-2 border-[#1a1612]/20 focus:border-[#b3261e] px-4 py-3 text-sm outline-none font-mono disabled:opacity-50"
          />
          <button
            onClick={toggleListen}
            disabled={loading}
            className="border-2 border-[#1a1612]/30 hover:border-[#1a1612] px-3 py-3 transition-all disabled:opacity-50"
            title="Speak your question"
          >
            {listening ? <Square className="w-4 h-4 text-[#b3261e]" /> : <Mic className="w-4 h-4" />}
          </button>
          <button
            onClick={() => ask()}
            disabled={loading || !question.trim()}
            className="bg-[#b3261e] hover:bg-[#1a1612] text-[#f4efe4] px-5 py-3 font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-1"
          >
            {loading ? '...' : <>ASK <ArrowRight className="w-3 h-3" /></>}
          </button>
        </div>

        {/* Zero friction — auto-detects every language on Earth */}
        <div className="w-full flex items-center justify-center gap-2 mb-6">
          <Globe className="w-3 h-3 text-[#6b6258]" />
          <p className="font-mono text-[9px] tracking-widest text-[#6b6258]">ANY LANGUAGE · AUTO-DETECTED · NO ONE LEFT OUT</p>
        </div>

        {/* Sample questions */}
        {!result && !loading && (
          <div className="w-full space-y-2">
            <p className="font-mono text-[9px] tracking-widest text-[#6b6258] mb-2">MOST PRESSING — TAP TO ASK</p>
            {SAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="w-full text-left bg-[#efe7d6] border border-[#1a1612]/15 hover:border-[#b3261e] px-4 py-3 text-sm transition-all flex items-center justify-between group"
              >
                <span>{q}</span>
                <ArrowRight className="w-3 h-3 text-[#b3261e] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="w-full mt-4 border-2 border-[#b3261e] bg-[#b3261e]/5 px-4 py-3 text-sm text-[#b3261e] font-mono">
            {error}
          </div>
        )}

        {/* Answer */}
        {result && (
          <div className="w-full mt-2 space-y-4" style={{ animation: 'sorted-enter 0.3s ease' }}>
            {/* Summary */}
            <div className="bg-[#efe7d6] border-2 border-[#1a1612]/20 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] tracking-widest text-[#6b6258]">SUMMARY</span>
                <span className={`font-mono text-[9px] tracking-widest px-2 py-0.5 border ${CONFIDENCE_STYLES[result.confidence_overall]?.border || ''} ${CONFIDENCE_STYLES[result.confidence_overall]?.color || ''}`}>
                  {CONFIDENCE_STYLES[result.confidence_overall]?.label || '—'} CONFIDENCE
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#1a1612]">{result.summary}</p>
              <button onClick={speak} className="mt-3 flex items-center gap-1.5 text-xs font-mono text-[#b3261e] hover:text-[#1a1612] transition-colors">
                <Volume2 className="w-3 h-3" /> {speaking ? 'Stop' : 'Listen'}
              </button>
            </div>

            {/* The record's own pages — its own account of itself, in its own words. Kept
                apart from the sourced claims, because a page about the record is not
                evidence of anything on it. */}
            {pages.length > 0 && (
              <div className="space-y-2">
                <p className="font-mono text-[9px] tracking-widest text-[#6b6258]">FROM THE RECORD'S OWN PAGES</p>
                {pages.map((p) => (
                  <a
                    key={`${p.path}-${p.label}`}
                    href={p.path}
                    className="block border-2 border-[#1a1612]/25 bg-[#efe7d6] p-4 hover:border-[#b3261e] transition-colors"
                  >
                    <span className="font-mono text-[8px] tracking-widest px-1.5 py-0.5 border border-[#e2602a] text-[#e2602a]">
                      {p.label.toUpperCase()}
                    </span>
                    <p className="text-sm font-bold text-[#1a1612] mt-2">{p.title}</p>
                    <p className="text-[12px] text-[#6b6258] leading-relaxed mt-1">{p.line}</p>
                  </a>
                ))}
              </div>
            )}

            {/* Claims */}
            {result.claims && result.claims.length > 0 && (
              <div className="space-y-2">
                <p className="font-mono text-[9px] tracking-widest text-[#6b6258]">ENTRIES ON THE RECORD — OPEN THE SOURCE</p>
                {result.claims.map((c, i) => {
                  const conf = CONFIDENCE_STYLES[c.confidence] || CONFIDENCE_STYLES.medium;
                  return (
                    <div key={i} className={`border ${conf.border} ${conf.bg} p-4`}>
                      <div className="flex items-start gap-2 mb-2">
                        <span className={`font-mono text-[8px] tracking-widest px-1.5 py-0.5 border ${conf.border} ${conf.color} flex-shrink-0 mt-0.5`}>
                          {conf.label}
                        </span>
                        <p className="text-sm leading-relaxed text-[#1a1612] flex-1">{c.text}</p>
                      </div>
                      <a
                        href={c.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#b3261e] hover:text-[#1a1612] transition-colors underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {c.source_name}{c.source_date ? ` · ${c.source_date}` : ''}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Gaps — the most important field for trust */}
            {result.gaps && (
              <div className="border-2 border-dashed border-[#1a1612]/30 p-4">
                <p className="font-mono text-[9px] tracking-widest text-[#6b6258] mb-1">WHAT THE RECORD DOES NOT COVER</p>
                <p className="text-sm text-[#6b6258] italic leading-relaxed">{result.gaps}</p>
              </div>
            )}

            {/* Ask again */}
            <button
              onClick={() => { setResult(null); setPages([]); setQuestion(''); }}
              className="w-full border-2 border-[#1a1612]/30 hover:border-[#1a1612] py-3 text-sm font-mono font-bold transition-all"
            >
              ASK ANOTHER
            </button>
          </div>
        )}
      </div>

      {/* Footer covenant */}
      <div className="text-center pb-4">
        <p className="font-mono font-black tracking-[0.3em] text-[10px] text-[#b3261e]">x = x</p>
        <p className="font-mono text-[9px] text-[#6b6258] mt-1">Every claim is an entry on the record, with the origin that entry carries. Not on the record? It says so.</p>
      </div>
    </div>
  );
}