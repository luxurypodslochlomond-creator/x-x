import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// Mic button: kid taps to record, taps again to stop. Audio is uploaded +
// transcribed (Whisper auto-detects ANY language) and the transcript is handed
// back. For kids who can't type yet — speak it in any language on Earth.
export default function ZappVoiceInput({ onTranscript }) {
  const [state, setState] = useState('idle'); // idle | recording | transcribing | error
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const autoStopRef = useRef(null);

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
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
      // Safety auto-stop at 20s so a kid who walks away doesn't record forever
      autoStopRef.current = setTimeout(() => {
        if (mediaRef.current && mediaRef.current.state === 'recording') mediaRef.current.stop();
      }, 20000);
    } catch (e) {
      console.error('ZAPP mic error:', e);
      setState('error');
      setTimeout(() => setState('idle'), 2500);
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

  return (
    <motion.button
      onClick={handleTap}
      disabled={transcribing}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center flex-shrink-0"
      style={{
        width: 42, height: 42, borderRadius: '50%',
        background: recording ? 'rgba(239,68,68,0.15)' : 'rgba(167,139,250,0.12)',
        border: `1.5px solid ${recording ? 'rgba(239,68,68,0.5)' : 'rgba(167,139,250,0.4)'}`,
      }}
      title={recording ? 'tap to stop' : 'tap and say your idea — any language'}
      aria-label={recording ? 'stop recording' : 'speak your idea'}
    >
      {recording ? (
        <motion.span
          className="block rounded-full"
          style={{ width: 14, height: 14, background: '#ef4444' }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      ) : transcribing ? (
        <motion.span
          className="block rounded-full"
          style={{
            width: 16, height: 16,
            border: '2px solid #a78bfa',
            borderTopColor: 'transparent',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      )}
    </motion.button>
  );
}