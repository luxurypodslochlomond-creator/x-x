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

        {/* ── WHY THE CODE, IN WORDS ────────────────────────────────────────────
            Brian, 27 November: "the Norse code is coolasfuck but what is this a symbol
            of… about communications and networks and signals and what we need to do as
            intelligent life on this planet". The marks were standing there unexplained,
            which made them a decoration with a good rhythm. This is the reason, in the
            shortest form that still carries it: where the code comes from, what it is
            made of, and the one promise in it the record is trying to keep.
            Two facts, both checkable: Maxwell and Bell were both Edinburgh men, and Bell
            was trying to send several Morse messages down one wire when he got the
            telephone instead. The rest is the argument, not a claim. */}
          <p className="covenant-signal-why-lead">
            Two states and an agreement at each end. That is a network. Everything since has been about who
            owns the wire.
          </p>
          <p className="covenant-signal-why">
            Morse put it on a line in 1844 and his first message was a question — <em>What hath God wrought</em>.
            Maxwell wrote the mathematics of that wave in Edinburgh. A dot and a dash are rhythm before they are
            data, which is why a musician hears what a machine has to spell out.
          </p>
          <p className="covenant-signal-why-strong">
            Neither of them needed to know who you were in order to carry what you said. That is the test this
            record exists to pass: what is sent arrives whole, the wire keeps no copy, and the carrier is not the
            owner. Agree the code. Send the truth. Keep nothing that was not given.
          </p>
        </div>
    </section>
  );
}