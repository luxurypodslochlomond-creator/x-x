import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Square } from 'lucide-react';
import { COLOR, haptic } from './sortedDesignSystem';

const { gold: GOLD, ink: INK, muted: MUTED } = COLOR;
const { tap, strong: tapStrong } = haptic;

// Browser-native speech recognition — free, instant, no backend.
// Works on Safari iOS 14.5+, Chrome Android, Edge, Safari macOS.
const getRecognition = () => {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

export default function SortedVoiceInput({ onTranscript, disabled }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState(null);
  const recRef = useRef(null);
  const finalTextRef = useRef('');

  useEffect(() => {
    const SR = getRecognition();
    if (!SR) { setSupported(false); return; }

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-GB';

    rec.onresult = (e) => {
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      if (final) finalTextRef.current += final;
      onTranscript(finalTextRef.current + interim, true);
    };

    rec.onerror = (e) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setError('Mic blocked — allow it in your browser settings.');
      } else if (e.error === 'no-speech') {
        // silent — just ended
      } else {
        setError('Could not hear you — try again.');
      }
      setListening(false);
    };

    rec.onend = () => {
      setListening(false);
      // Flush final text on stop
      if (finalTextRef.current) onTranscript(finalTextRef.current, false);
    };

    recRef.current = rec;
    return () => { try { rec.abort(); } catch {} };
  }, [onTranscript]);

  const toggle = () => {
    if (!supported || disabled) return;
    if (listening) {
      tap();
      recRef.current?.stop();
      setListening(false);
      return;
    }
    tapStrong();
    setError(null);
    finalTextRef.current = '';
    try {
      recRef.current.start();
      setListening(true);
    } catch {
      setError('Could not start mic — try again.');
    }
  };

  if (!supported) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={toggle}
        disabled={disabled}
        style={{
          padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: 500,
          cursor: disabled ? 'default' : 'pointer',
          border: listening ? '1px solid #dc262640' : 'none',
          background: listening ? 'rgba(220,38,38,0.06)' : 'transparent',
          color: listening ? '#dc2626' : MUTED,
          display: 'flex', alignItems: 'center', gap: 6,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {listening ? (
          <>
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ display: 'flex' }}
            >
              <Square size={14} fill="#dc2626" color="#dc2626" />
            </motion.span>
            Stop
          </>
        ) : (
          <>
            <Mic size={17} color={GOLD} /> Speak
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
              borderRadius: 8, background: 'rgba(220,38,38,0.04)',
            }}>
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626' }}
              />
              <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 500 }}>Listening… just talk</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: 12, color: '#dc2626', margin: 0, fontWeight: 500 }}
          >{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}