import { useRef, useState, useEffect } from 'react';
import { fillSynthFreq, fillSynthWave } from './signal';

// Owns playback. Real track -> Web Audio analyser. No track -> generative signal.
// The render loop pulls data through apiRef every frame (no React re-renders).
export default function useTransmissionAudio(audioUrl) {
  const hasAudio = !!audioUrl;
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioElRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const playingRef = useRef(false);
  const t0Ref = useRef(0);
  const freq = useRef(new Uint8Array(128));
  const wave = useRef(new Uint8Array(256));
  const apiRef = useRef({});

  const setPlay = (v) => { playingRef.current = v; setPlaying(v); };

  const ensureAnalyser = async () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new Ctx();
      analyserRef.current = ctxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
      sourceRef.current = ctxRef.current.createMediaElementSource(audioElRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(ctxRef.current.destination);
    }
    if (ctxRef.current.state === 'suspended') await ctxRef.current.resume();
  };

  const toggle = async () => {
    if (playingRef.current) {
      audioElRef.current?.pause();
      setPlay(false);
      return;
    }
    if (hasAudio && audioElRef.current) {
      try {
        await ensureAnalyser();
        await audioElRef.current.play();
      } catch {
        return; // autoplay blocked
      }
    }
    t0Ref.current = performance.now();
    setPlay(true);
  };

  const toggleMute = () => {
    if (!audioElRef.current) return;
    audioElRef.current.muted = !audioElRef.current.muted;
    setMuted(audioElRef.current.muted);
  };

  apiRef.current = {
    isPlaying: () => playingRef.current,
    read: (now, energy) => {
      if (hasAudio && playingRef.current && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(freq.current);
        analyserRef.current.getByteTimeDomainData(wave.current);
      } else {
        const t = playingRef.current ? now - t0Ref.current : now;
        fillSynthFreq(freq.current, t, energy);
        fillSynthWave(wave.current, t, energy);
      }
      return { freq: freq.current, wave: wave.current };
    },
    getTime: () => {
      if (hasAudio && audioElRef.current) {
        return { cur: audioElRef.current.currentTime || 0, dur: audioElRef.current.duration || 0 };
      }
      return { cur: playingRef.current ? (performance.now() - t0Ref.current) / 1000 : 0, dur: 0 };
    },
  };

  useEffect(() => () => {
    audioElRef.current?.pause();
    try { sourceRef.current?.disconnect(); } catch { /* already gone */ }
    try { analyserRef.current?.disconnect(); } catch { /* already gone */ }
    try { ctxRef.current?.close(); } catch { /* already gone */ }
  }, []);

  return { hasAudio, playing, muted, toggle, toggleMute, audioElRef, apiRef };
}