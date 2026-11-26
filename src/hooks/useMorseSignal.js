import { useCallback, useEffect, useRef, useState } from 'react';

// ── THE SMALLEST SIGNAL, SAID OUT LOUD ──────────────────────────────────────────
// Morse is a rhythm before it is writing: a dot and a dash are lengths of a tone, and a
// reader who has only ever seen the dots has not met the thing. So the mark can be heard.
//
// Three rules, and they are the record's own rather than this hook's:
//
// 1. Pressed, never automatic. The music room already says it: a thing is pressed to
//    play, never played at anyone. A page that beeps when it opens is a page shouting.
// 2. Once, never on a loop. A loop turns a fact a reader can count into a ringtone.
// 3. Silent if the device has no voice. No fallback file, no apology, no error: a phone
//    with the sound off still shows the dots, and the dots are the record.
//
// The timing is the international ratio, not a taste: a dash is three dots, the gap
// inside a letter is one dot, and the gap between letters is three. Anyone who knows the
// code can check the rhythm the way they can check the dots.
const DOT = 0.09; // seconds
const TONE = 620; // Hz — a plain tone, the pitch of a signal rather than a note

export const MORSE_GROUPS = ['-..-', '-...-', '-..-']; // x = x

export default function useMorseSignal() {
  const ctxRef = useRef(null);
  const timers = useRef([]);
  const [playing, setPlaying] = useState(false);
  const [lit, setLit] = useState(-1);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const play = useCallback(() => {
    if (playing) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!ctxRef.current) ctxRef.current = new AudioCtx();
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    clearTimers();
    setPlaying(true);

    let t = ctx.currentTime + 0.06;
    const started = ctx.currentTime;

    MORSE_GROUPS.forEach((marks, groupIndex) => {
      timers.current.push(setTimeout(() => setLit(groupIndex), (t - started) * 1000));

      for (const mark of marks) {
        const length = mark === '-' ? DOT * 3 : DOT;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = TONE;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.16, t + 0.008);
        gain.gain.setValueAtTime(0.16, t + Math.max(length - 0.012, 0.02));
        gain.gain.linearRampToValueAtTime(0, t + length);

        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + length + 0.02);

        t += length + DOT;
      }

      t += DOT * 2; // the gap between letters
    });

    timers.current.push(setTimeout(() => {
      setLit(-1);
      setPlaying(false);
    }, (t - started) * 1000 + 120));
  }, [playing, clearTimers]);

  return { playing, lit, play };
}