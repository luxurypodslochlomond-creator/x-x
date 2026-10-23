import React, { useEffect, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';

// Browser-native speech — free, instant, no backend, no account, nothing stored.
// Where a browser has no speech engine the button simply is not shown: typing is
// always the door, so nobody is left outside because of their device.
const getRecognition = () =>
  typeof window === 'undefined' ? null : window.SpeechRecognition || window.webkitSpeechRecognition || null;

export default function RecordVoiceSearch({ onTranscript, disabled }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState(null);
  const recRef = useRef(null);
  const said = useRef('');

  useEffect(() => {
    const SR = getRecognition();
    if (!SR) {
      setSupported(false);
      return;
    }

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = (typeof navigator !== 'undefined' && navigator.language) || 'en-GB';

    rec.onresult = (e) => {
      let interim = '';
      let finalText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      if (finalText) said.current += finalText;
      const heard = (said.current + interim).trim();
      onTranscript(heard, Boolean(finalText) && !interim);
    };

    rec.onerror = (e) => {
      setListening(false);
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setError('Mic blocked — allow it in your browser settings, or just type your words.');
      } else if (e.error !== 'no-speech') {
        setError('Could not hear you — try again, or just type your words.');
      }
    };

    rec.onend = () => setListening(false);

    recRef.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {}
    };
  }, [onTranscript]);

  const toggle = () => {
    if (!supported || disabled) return;
    if (listening) {
      try {
        recRef.current?.stop();
      } catch {}
      setListening(false);
      return;
    }
    setError(null);
    said.current = '';
    try {
      recRef.current.start();
      setListening(true);
    } catch {
      setError('Could not start the mic — try again.');
    }
  };

  if (!supported) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-label={listening ? 'Stop listening' : 'Say your search'}
        className={`flex items-center justify-center gap-2 min-h-[48px] px-4 border-2 font-black font-mono uppercase text-[11px] tracking-wider transition-colors ${
          listening
            ? 'bg-[#b3261e] text-[#efe7d6] border-[#141210]'
            : 'bg-[#efe7d6] text-[#141210] border-[#141210] active:bg-[#e2602a]'
        }`}
      >
        {listening ? <Square className="w-4 h-4" fill="currentColor" /> : <Mic className="w-4 h-4" />}
        {listening ? 'Listening' : 'Say it'}
      </button>
      {listening && (
        <p className="text-[10px] font-mono uppercase tracking-wide text-[#b3261e] text-center">
          Say a place, a topic, a creature, a word
        </p>
      )}
      {error && <p className="text-[10px] font-mono text-[#b3261e] leading-relaxed">{error}</p>}
    </div>
  );
}