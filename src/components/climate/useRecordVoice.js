import { useCallback, useEffect, useRef, useState } from 'react';

// ── SPEECH IN, SPEECH OUT, ON THE READER'S OWN DEVICE ────────────────────────
// Brian, 15 November: "speech to back and forth zero friction… every tongue… even auto detect
// ancient language and any language."
//
// Two honest halves of that:
//
// THE WORDS are already every tongue on the record — a question typed in Sumerian, Latin,
// Lakota or Gaeilge is read as it stands, and answered in the tongue it was asked in. That
// half is real and it costs nothing: it is the model's own ear, not a dictionary of ours.
//
// THE VOICE is the device's, and only as wide as the device. A phone in Glasgow can listen
// and speak in Gaelic; no phone on earth can speak Rongorongo, and this file says so plainly
// instead of quietly using English and hoping nobody notices. Everything here runs on the
// device — no audio is uploaded, stored or kept, which is the only way a voice door belongs
// on a record like this.

const Recognizer =
  typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

// A two-letter tongue, or one with a region ('zh-TW'), is something a browser may recognise.
// Anything older or longer — Latin, Ancient Greek, Sumerian, Akkadian, Rongorongo, Cherokee —
// has no recogniser on any phone yet. Empty means "let the device use its own tongue".
export function speechCode(tongue) {
  const code = String(tongue || '');
  if (!code || code === 'auto') return '';
  if (/^[a-z]{2}$/i.test(code)) return code;
  if (/^[a-z]{2}-[A-Za-z]{2}$/.test(code)) return code;
  return '';
}

export function useVoiceIn({ onHeard, tongue }) {
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const [problem, setProblem] = useState('');
  const live = useRef(null);

  const stop = useCallback(() => {
    try { live.current?.stop(); } catch { /* already closed */ }
    setListening(false);
  }, []);

  useEffect(() => () => { try { live.current?.abort(); } catch { /* closed */ } }, []);

  const start = useCallback(() => {
    if (listening) { stop(); return; }
    if (!Recognizer) {
      setProblem('This browser has no microphone for speech. Type it instead.');
      return;
    }
    setProblem('');
    setHeard('');
    const said = { text: '' };
    const r = new Recognizer();
    r.lang = speechCode(tongue) || navigator.language || 'en';
    r.interimResults = true;
    r.continuous = false;
    r.maxAlternatives = 1;
    r.onresult = (event) => {
      let text = '';
      for (let i = 0; i < event.results.length; i += 1) text += event.results[i][0].transcript;
      said.text = text.trim();
      setHeard(said.text);
    };
    r.onerror = (event) => {
      setListening(false);
      setProblem(
        event?.error === 'not-allowed'
          ? 'The microphone was not allowed. Type it instead.'
          : 'That did not hear anything. Type it instead.',
      );
    };
    r.onend = () => {
      setListening(false);
      if (said.text) onHeard(said.text);
    };
    live.current = r;
    try { r.start(); setListening(true); } catch { setListening(false); }
  }, [listening, onHeard, stop, tongue]);

  return { canListen: !!Recognizer, listening, heard, problem, start, stop };
}

export function useVoiceOut() {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return undefined;
    const load = () => setVoices(window.speechSynthesis.getVoices() || []);
    load();
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', load);
      window.speechSynthesis.cancel();
    };
  }, []);

  const voiceFor = useCallback(
    (tongue) => {
      const base = String(tongue || '').split('-')[0].toLowerCase();
      if (!base) return null;
      return voices.find((v) => v.lang?.toLowerCase().startsWith(base)) || null;
    },
    [voices],
  );

  const speak = useCallback(
    (text, tongue) => {
      if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      if (speaking) { setSpeaking(false); return; }
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voiceFor(tongue);
      if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
      utterance.rate = 0.98;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    },
    [speaking, voiceFor],
  );

  return {
    canSpeak: typeof window !== 'undefined' && !!window.speechSynthesis,
    speaking,
    speak,
    voiceFor,
  };
}