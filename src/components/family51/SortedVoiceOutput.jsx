import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Pause, Square } from 'lucide-react';
import { COLOR, haptic } from './sortedDesignSystem';

const { gold: GOLD, ink: INK, muted: MUTED } = COLOR;
const { tap } = haptic;

// Browser-native speech synthesis — free, instant, works offline.
// Reads the decoded result back to someone who can't read well.
export default function SortedVoiceOutput({ result, accentColor = GOLD }) {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const utterRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
    }
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const buildScript = useCallback((r) => {
    if (!r) return '';
    const parts = [];
    if (r.summary) parts.push(r.summary);
    if (r.what_it_means) parts.push(r.what_it_means);
    if (r.action_steps?.length) {
      parts.push('What to do.');
      r.action_steps.forEach((s, i) => parts.push(`Step ${i + 1}. ${s}`));
    }
    if (r.what_not_to_do?.length) {
      parts.push('Do not do this.');
      r.what_not_to_do.forEach(s => parts.push(s));
    }
    if (r.ready_reply) {
      parts.push('Here is a ready to send reply.');
      if (r.ready_reply.subject) parts.push(`Subject: ${r.ready_reply.subject}`);
      if (r.ready_reply.body) parts.push(r.ready_reply.body);
    }
    if (r.tip) parts.push(`One tip: ${r.tip}`);
    return parts.join('. ');
  }, []);

  const speak = () => {
    if (!supported || !result) return;
    window.speechSynthesis.cancel();
    const text = buildScript(result);
    if (!text) return;

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    u.rate = 0.92;     // slightly slower — calmer for stressed listeners
    u.pitch = 1.0;

    // Pick a calm voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => /en-GB/i.test(v.lang) && /female|samantha|serena|kate/i.test(v.name))
      || voices.find(v => /en-GB/i.test(v.lang))
      || voices.find(v => /en/i.test(v.lang));
    if (preferred) u.voice = preferred;

    u.onend = () => { setPlaying(false); setPaused(false); };
    u.onerror = () => { setPlaying(false); setPaused(false); };

    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setPlaying(true);
    setPaused(false);
  };

  const togglePause = () => {
    if (!supported) return;
    tap();
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  const stop = () => {
    if (!supported) return;
    tap();
    window.speechSynthesis.cancel();
    setPlaying(false);
    setPaused(false);
  };

  if (!supported) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      }}
    >
      {!playing ? (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => { tap(); speak(); }}
          style={{
            padding: '12px 18px', borderRadius: 12, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', border: `1px solid ${accentColor}30`,
            background: `${accentColor}0d`, color: INK,
            display: 'flex', alignItems: 'center', gap: 8,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Volume2 size={18} color={accentColor} />
          Hear the answer
        </motion.button>
      ) : (
        <>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={togglePause}
            style={{
              padding: '12px 18px', borderRadius: 12, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', border: `1px solid ${accentColor}30`,
              background: `${accentColor}0d`, color: INK,
              display: 'flex', alignItems: 'center', gap: 8,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {paused ? <Volume2 size={18} color={accentColor} /> : <Pause size={18} color={accentColor} />}
            {paused ? 'Resume' : 'Pause'}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={stop}
            style={{
              padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', border: '1px solid rgba(220,38,38,0.2)',
              background: 'rgba(220,38,38,0.04)', color: '#dc2626',
              display: 'flex', alignItems: 'center', gap: 6,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <Square size={15} color="#dc2626" />
            Stop
          </motion.button>
          {!paused && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>reading…</span>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}