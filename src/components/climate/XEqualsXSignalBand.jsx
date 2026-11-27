import React from 'react';
import useMorseSignal, { MORSE_GROUPS } from '@/hooks/useMorseSignal';

// ── THE MARK, IN ITS OTHER ALPHABET ─────────────────────────────────────────────
// Brian, 27 November: "Morse code not almost coolasfuck". Fair. It was a line of type
// that swapped to a smaller line of type — a caption pretending to be a signal.
//
// So the code is drawn as the thing it actually is: dots and dashes at a size you can
// count from across a room, on the record's ink, lighting up group by group as the
// rhythm runs. Three groups, because x = x is three letters, and the marks stay on the
// page after it has sounded so a reader can read the code back.
//
// Pressed, never automatic, and once, never looped — the record's own rule from the
// music room. The light runs whether or not the device can make a tone, so a reader on
// silent, or deaf, still gets the signal rather than a button that does nothing.
export default function XEqualsXSignalBand() {
  const { playing, lit, play } = useMorseSignal();

  return (
    <section className="covenant-signal" aria-label="x = x, in Morse code">
      <div className="covenant-signal-inner">
        <p className="covenant-signal-label">x = x &middot; in Morse</p>
        <button
          type="button"
          onClick={play}
          aria-busy={playing}
          aria-label="Press to hear x equals x in Morse code"
          className="covenant-signal-key"
        >
          <span className="covenant-signal-marks" aria-hidden="true">
            {MORSE_GROUPS.map((marks, group) => (
              <span key={group} className="covenant-signal-group" data-lit={lit === group ? '' : undefined}>
                {[...marks].map((mark, i) => (
                  <span key={i} className={mark === '-' ? 'covenant-signal-dash' : 'covenant-signal-dot'} />
                ))}
              </span>
            ))}
          </span>
          <span className="covenant-signal-press">{playing ? 'Sounding' : 'Press to hear it'}</span>
        </button>
      </div>
    </section>
  );
}