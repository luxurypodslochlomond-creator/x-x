import React from 'react';

// ── THE MARK, IN MORSE ────────────────────────────────────────────────────────────
// Brian, 26 November: "Morse code should we include that in tongue bro or is that too
// mad bro". The honest answer is no, and this is where the code goes instead.
//
// Morse is not a tongue. It spells a tongue, letter by letter, and the tongue list
// translates sentences — there is nothing to translate *into*. Norse runes are the same
// trap: a script, not a language, so a reader would be offered a tongue that cannot keep
// a sentence. Cherokee, Ẹdo, Sumerian and Rongorongo are already on the list because they
// are languages, and they are the proof the record does a real script properly.
//
// So the code is printed on the mark, where a signal belongs. X is -..-, and the equals
// sign is -...- in the international code, so the principle spells itself in three groups.
// It says nothing a reader has to trust: count the dots and the dashes and it is x = x.
//
// Brian, 26 November: "I feel Morse but then I feel a lot of no sense and would feel it
// more if had reason". The first caption explained the joke, which is why it read flat —
// a thing that has to say "I am a code, not a tongue" is admitting it is decoration.
//
// There is a reason, and it is the record's own: Morse is the last signal standing when
// everything else has gone. No tongue to be translated, no font to be installed, no
// bandwidth worth the name, no power beyond a switch — a lamp, a wire, a hand on a pipe.
// Every page here argues that the record must reach anyone anywhere; this is the extreme
// case of that, printed at the foot of its most abstract claim. It is not a joke about
// code. It is the smallest possible signal that still means something, which is the whole
// argument, sent in three characters.
const MORSE = ['-..-', '-...-', '-..-'];

export default function XEqualsXMorseLine() {
  return (
    <div className="covenant-morse">
      <p className="covenant-morse-code" translate="no" aria-label="x = x, in Morse code">
        {MORSE.map((group, i) => (
          <span key={i}>{group}</span>
        ))}
      </p>
      <p className="covenant-morse-note">
        No tongue, no font, no power beyond a switch
      </p>
    </div>
  );
}