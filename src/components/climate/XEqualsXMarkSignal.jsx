import React from 'react';
import useMorseSignal, { MORSE_GROUPS } from '@/hooks/useMorseSignal';

// ── THE MARK PLAYS ITSELF ─────────────────────────────────────────────────────────
// Brian, 26 November: "you think clicking x=x on x=x page should play morse bro and show
// morse could be x=x when click it turns to morse and plays bro".
//
// Yes — and it is the best version of the idea, because the reader is not watching a
// demonstration any more, they are pressing the mark and the mark answers in its own other
// alphabet. The glyph flips to the three groups, each one going to full ink as it sounds,
// and then it goes back to x = x. Same rhythm, same code, same button as the line at the
// foot: this is a second door onto one signal, not a second signal.
//
// The flip is a state, not an animation: while it sounds the mark IS the code, because for
// those two seconds that is what it is. Nothing is decorated; the letters are simply
// replaced by the thing they are in Morse.
//
// It is a button only where the mark has nowhere to go. On the principle page the footer
// mark would otherwise be a tap that reloads the page you are standing on — a dead tap —
// so there it plays instead. Everywhere else it still walks the reader to x = x.
export default function XEqualsXMarkSignal({
  className = '',
  style,
  playingStyle,
  label = 'x = x',
  ariaLabel = 'x = x — play the mark in Morse code',
}) {
  const { playing, lit, play } = useMorseSignal();

  // No `disabled`: the hook already ignores a second press, and a disabled button greys
  // its own label in some browsers — the mark going pale mid-signal would read as a fault.
  return (
    <button
      type="button"
      onClick={play}
      aria-busy={playing}
      aria-label={ariaLabel}
      data-playing={playing ? '' : undefined}
      translate="no"
      className={className}
      style={{
        background: 'none',
        border: 0,
        padding: 0,
        margin: 0,
        font: 'inherit',
        lineHeight: 1,
        cursor: 'pointer',
        ...style,
        ...(playing ? playingStyle : null),
      }}
    >
      {playing
        ? MORSE_GROUPS.map((group, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  opacity: lit === i ? 1 : 0.4,
                  transition: 'opacity 90ms linear',
                }}
              >
                {group}
              </span>
              {i < MORSE_GROUPS.length - 1 ? ' ' : null}
            </React.Fragment>
          ))
        : label}
    </button>
  );
}