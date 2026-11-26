import React from 'react';
import useMorseSignal, { MORSE_GROUPS } from '@/hooks/useMorseSignal';

// ── THE MARK PLAYS ITSELF ─────────────────────────────────────────────────────────
// Brian, 26 November: "you think clicking x=x on x=x page should play morse bro and show
// morse could be x=x when click it turns to morse and plays bro".
//
// Yes — and it is the best version of the idea, because the reader is not watching a
// demonstration any more, they are pressing the mark and the mark answers in its own other
// alphabet. Same rhythm, same code, same button as the line at the foot: this is a second
// door onto one signal, not a second signal.
//
// ── WHY THERE ARE TWO LAYERS AND NOT ONE SWAP ────────────────────────────────────
// Brian, 26 November, the same evening: "why is it a wee bit jumpy". Because it was. The
// glyph and the code replaced one another in a single frame, and the code is set smaller
// than the glyph, so the mark's line box shrank and everything beneath it moved up and
// then back down. A flip that shoves the page is not a transmission, it is a glitch.
//
// So both states are always in the document, stacked in one grid cell. The box is
// therefore always as tall and as wide as the larger of the two, nothing on the page can
// move, and the two states dissolve through each other over a fifth of a second. The code
// keeps its own size, passed in as `codeStyle`, because a smaller layer in a shared cell
// no longer drags the layout with it.
//
// ── AND THE COLOUR DOES NOT CHANGE, ON PURPOSE ──────────────────────────────────
// Brian: "should colour change for right reason bro". No, and the reason is the whole
// point: the ink stays the mark's own red in both states, and only its strength rises and
// falls. A signal is a lamp going on and off — not a costume change. If the mark turned a
// different colour while it spoke, the colour would be decoration, and this page is the
// one place on the record where decoration is not allowed to stand in for a fact.
export default function XEqualsXMarkSignal({
  className = '',
  style,
  codeStyle,
  label = 'x = x',
  children,
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
      }}
    >
      <span className="x-eq-stack">
        <span className="x-eq-layer" style={{ opacity: playing ? 0 : 1 }} aria-hidden={playing ? 'true' : undefined}>
          {children ?? label}
        </span>

        <span
          className="x-eq-layer"
          style={{ opacity: playing ? 1 : 0, ...codeStyle }}
          aria-hidden={playing ? undefined : 'true'}
        >
          {MORSE_GROUPS.map((group, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  opacity: lit === i ? 1 : 0.32,
                  transition: 'opacity 200ms ease-out',
                }}
              >
                {group}
              </span>
              {i < MORSE_GROUPS.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </span>
      </span>
    </button>
  );
}