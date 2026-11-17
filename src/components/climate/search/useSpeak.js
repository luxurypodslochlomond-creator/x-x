import { useCallback, useEffect, useState } from 'react';

// ── HEARING IT, IN THE TONGUE YOU ASKED IN ───────────────────────────────────────
// A telephone reading the record aloud costs nothing and asks nothing of anybody: the
// device already owns a voice, so the record uses that one rather than renting another.
// It stops the moment the page is left, so nobody is talked at from a pocket.
export default function useSpeak(text, lang = 'en') {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speaking, setSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  useEffect(() => stop, [stop]);

  const speak = useCallback(() => {
    if (!supported || !text) return;
    if (speaking) { stop(); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'en';
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }, [supported, text, lang, speaking, stop]);

  return { speak, speaking, supported };
}