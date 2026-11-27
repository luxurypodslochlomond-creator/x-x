import { MORSE_GROUPS } from '@/hooks/useMorseSignal';

// The hook's exact dot/dash/gap proportions, drawn on one shared time axis.
let unit = 0;
export const MORSE_DRAWING = MORSE_GROUPS.map((marks, group) => {
  const start = unit;
  const pulses = [...marks].map((mark, index) => {
    const pulse = { key: `${group}:${index}`, start: unit, length: mark === '-' ? 3 : 1 };
    unit += pulse.length + 1;
    return pulse;
  });
  const end = unit - 1;
  unit += 2;
  return { group, start, end, pulses };
});
export const MORSE_DRAWING_UNITS = unit - 3;
export const signalX = (at) => 16 + at * (568 / MORSE_DRAWING_UNITS);

// Two drawn cycles per dot, deliberately simplified, not a 660 Hz measurement.
export function pulseWave({ start, length }) {
  const points = Array.from({ length: length * 24 + 1 }, (_, i) => {
    const u = i / 24;
    return `${i ? 'L' : 'M'}${signalX(start + u).toFixed(2)},${(122 - Math.sin(u * Math.PI * 4) * 18).toFixed(2)}`;
  });
  return points.join(' ');
}