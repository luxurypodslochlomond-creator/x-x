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
// 3. The rhythm runs whether or not there is a tone. This is the fix from 26 November:
//    the sweep used to be scheduled inside the audio path, so a reader whose device has
//    no voice — or who simply has it on silent — pressed the button and nothing at all
//    happened. Now the groups light in time either way, and the tone rides along when
//    the device can make one. Brian asked whether it "can be heard by all"; the honest
//    answer is no, not by a deaf reader, so the ink sweep is the part everyone gets.
//
// The timing is the international ratio, not a taste: a dash is three dots, the gap
// inside a letter is one dot, and the gap between letters is three. Anyone who knows the
// code can check the rhythm the way they can check the dots.
//
// The pitch and level were raised on the same day for the same reason. 620 Hz at 0.16 is
// correct and quiet, and a phone speaker lying on a table in a room loses it. 660 Hz sits
// where small speakers actually work, and 0.22 is still a signal rather than a noise.
const DOT = 0.09; // seconds
const TONE = 660; // Hz — plain, and inside the range a phone speaker can carry
const LEVEL = 0.22;

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

  useEffect(
    () => () => {
      clearTimers();
      ctxRef.current?.close?.();
      ctxRef.current = null;
    },
    [clearTimers]
  );

  const play = useCallback(() => {
    if (playing) return;
    clearTimers();

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!ctxRef.current && AudioCtx) ctxRef.current = new AudioCtx();
    const ctx = ctxRef.current;
    if (ctx?.state === 'suspended') ctx.resume();

    setPlaying(true);
    setLit(0);

    let at = 0.06; // seconds from now — the same clock with or without a tone

    MORSE_GROUPS.forEach((marks, groupIndex) => {
      const startsAt = at;
      timers.current.push(setTimeout(() => setLit(groupIndex), startsAt * 1000));

      for (const mark of marks) {
        const length = mark === '-' ? DOT * 3 : DOT;

        if (ctx) {
          const t = ctx.currentTime + at;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.value = TONE;
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(LEVEL, t + 0.008);
          gain.gain.setValueAtTime(LEVEL, t + Math.max(length - 0.012, 0.02));
          gain.gain.linearRampToValueAtTime(0, t + length);

          osc.connect(gain).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + length + 0.02);
        }

        at += length + DOT; // one unit between the marks of a letter
      }

      at += DOT * 2; // plus the unit already added = three units between letters
    });

    timers.current.push(
      setTimeout(() => {
        setLit(-1);
        setPlaying(false);
      }, at * 1000 + 120)
    );
  }, [playing, clearTimers]);

  return { playing, lit, play };
}