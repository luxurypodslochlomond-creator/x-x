import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// A big, calm, friendly mic for kids who can't type yet.
// Tap → speak in ANY language → Whisper transcribes → words appear quietly.
// Deliberately calm: no scores, no streaks, no confetti, no "you did it!" rush.
// Just a warm glow that breathes, listens, and writes it down. Anti-dopamine by design.
export default function ZappVoiceInput({ onTranscript }) {
  const [state, setState] = useState('idle'); // idle | recording | transcribing | error
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);
  const autoStopRef = useRef(null);

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mediaRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        clearTimeout(autoStopRef.current);
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        if (blob.size < 500) { setState('idle'); return; }
        setState('transcribing');
        try {
          const file = new File([blob], 'voice.webm', { type: 'audio/webm' });
          const up = await base44.integrations.Core.UploadFile({ file });
          const audio_url = up?.file_url;
          if (!audio_url) throw new Error('upload failed');
          const tr = await base44.integrations.Core.TranscribeAudio({ audio_url });
          const text = (typeof tr === 'string' ? tr : (tr?.text || tr?.transcript || '')).trim();
          if (text) onTranscript(text);
        } catch (e) {
          console.error('ZAPP voice transcribe error:', e);
        } finally {
          setState('idle');
        }
      };
      mr.start();
      setState('recording');
      // Safety: auto-stop at 20s so a kid who walks away never records forever
      autoStopRef.current = setTimeout(() => {
        if (mediaRef.current && mediaRef.current.state === 'recording') mediaRef.current.stop();
      }, 20000);
    } catch (e) {
      console.error('ZAPP mic error:', e);
      setState('error');
      setTimeout(() => setState('idle'), 2600);
    }
  };

  const stopRec = () => {
    if (mediaRef.current && mediaRef.current.state === 'recording') mediaRef.current.stop();
  };

  const handleTap = () => {
    if (state === 'recording') stopRec();
    else if (state === 'idle') startRec();
  };

  const recording = state === 'recording';
  const transcribing = state === 'transcribing';
  const error = state === 'error';

  const label = error
    ? 'no mic? just type instead'
    : recording
    ? 'listening… tap to stop'
    : transcribing
    ? 'writing it down…'
    : 'say it';

  const accent = recording ? '#fbbf24' : transcribing ? '#c4b5fd' : error ? '#f87171' : '#a78bfa';

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <motion.button
        onClick={handleTap}
        disabled={transcribing}
        whileTap={{ scale: 0.92 }}
        className="relative flex items-center justify-center"
        style={{
          width: 72, height: 72, borderRadius: '50%',
          background: recording
            ? 'radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0.05) 70%)'
            : 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.04) 70%)',
          border: `2px solid ${recording ? 'rgba(251,191,36,0.45)' : 'rgba(167,139,250,0.4)'}`,
          boxShadow: recording
            ? '0 0 36px rgba(251,191,36,0.3), inset 0 0 22px rgba(251,191,36,0.08)'
            : '0 0 26px rgba(167,139,250,0.22), inset 0 0 18px rgba(167,139,250,0.06)',
        }}
        aria-label={label}
        title={label}
      >
        {/* gentle breathing ring — invites the tap, calm not loud */}
        {!recording && !transcribing && !error && (
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: '2px solid rgba(167,139,250,0.35)' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {recording ? (
          // calm warm listening bars — soft breathing, NOT an exciting pulse
          <div className="flex items-center justify-center gap-[3px]" style={{ height: 26 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                style={{ width: 3, background: '#fbbf24', borderRadius: 2, height: 8 }}
                animate={{ height: [6, 22, 6] }}
                transition={{ duration: 0.95, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
              />
            ))}
          </div>
        ) : transcribing ? (
          <motion.span
            className="block rounded-full"
            style={{ width: 22, height: 22, border: '2.5px solid #c4b5fd', borderTopColor: 'transparent' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        )}
      </motion.button>

      <span
        className="text-xs font-bold tracking-wide"
        style={{ color: accent, opacity: error ? 0.8 : 1 }}
      >
        {label}
      </span>
    </div>
  );
}