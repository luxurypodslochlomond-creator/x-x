import React from 'react';
import { Play, Radio } from 'lucide-react';
import useMorseSignal from '@/hooks/useMorseSignal';
import { MORSE_DRAWING, signalX, pulseWave } from '@/components/climate/morseDrawing';

export default function XEqualsXSignalDrawing() {
  const { playing, activeMark, play } = useMorseSignal();
  return (
    <figure className="covenant-signal-drawing">
      <div className="covenant-signal-scale" aria-hidden="true"><span>One message</span><span>Code + sound · same timing</span></div>
      <button type="button" className="covenant-signal-key" onClick={play} disabled={playing} aria-label="Play x equals x once in Morse code, with synchronized light and sound" aria-describedby="signal-drawing-caption">
        <svg viewBox="0 0 600 164" width="600" height="164" aria-hidden="true" focusable="false">
          <path d="M16 122H584" className="covenant-wave-axis" />
          {MORSE_DRAWING.map(({ group, start, end, pulses }) => (
            <g key={group}>
              <text x={signalX((start + end) / 2)} y="23" textAnchor="middle">{['x', '=', 'x'][group]}</text>
              {pulses.map(pulse => (
                <g key={pulse.key} data-sounding={activeMark === pulse.key ? '' : undefined}>
                  <rect x={signalX(pulse.start)} y="47" width={signalX(pulse.start + pulse.length) - signalX(pulse.start)} height="11" className="covenant-code-pulse" />
                  <path d={pulseWave(pulse)} className="covenant-tone-pulse" />
                </g>
              ))}
            </g>
          ))}
        </svg>
        <span className="covenant-signal-control">{playing ? <Radio aria-hidden="true" /> : <Play aria-hidden="true" />}<span>{playing ? 'Signal playing' : 'Hear x=x'}<small>660 Hz · one play</small></span></span>
      </button>
      <figcaption id="signal-drawing-caption">International Morse: <span translate="no">−··− / −···− / −··−</span>. The bars and sound wave light together. Timing to scale; wave cycles simplified. An illustration of the tone, not a radio-wave measurement.</figcaption>
      <span className="sr-only" role="status">{playing ? 'Playing x equals x.' : 'Ready to play x equals x.'}</span>
    </figure>
  );
}