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
  // A mic that fails silently is worse than no mic: it looks broken and the reader
  // blames themselves. These two remember what actually happened, so the button can
  // say plainly whether nothing was heard, or whether the browser refused to listen.
  const caught = useRef(false);
  const refused = useRef(false);

  // Inside another page's frame (a preview, a panel's embed) browsers usually refuse the
  // mic outright. Knowing that lets us answer honestly instead of just "try again".
  const isFramed = typeof window !== 'undefined' && window.self !== window.top;

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
      if (heard) caught.current = true;
      onTranscript(heard, Boolean(finalText) && !interim);
    };

    rec.onerror = (e) => {
      setListening(false);
      refused.current = true;
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setError(
          isFramed
            ? 'This page is showing inside another page, and your browser blocks the mic there. Open the record in its own tab — or type your words, which always works.'
            : 'The mic is blocked — allow it for this site in your browser settings, or simply type your words.'
        );
      } else if (e.error === 'audio-capture') {
        setError('No microphone found on this device — type your words instead.');
      } else if (e.error === 'no-speech') {
        setError('I heard nothing — try again a little closer to the mic, or type your words.');
      } else {
        setError('The mic could not be used here — type your words instead.');
      }
    };

    rec.onend = () => {
      setListening(false);
      // Ended with nothing heard and no error reported: say so rather than going quiet,
      // which is what made it feel dead.
      if (!caught.current && !refused.current) {
        setError('I heard nothing — try again, or type your words.');
      }
    };

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
    caught.current = false;
    refused.current = false;
    try {
      recRef.current.start();
      setListening(true);
    } catch {
      setError('Could not start the mic here — type your words instead.');
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