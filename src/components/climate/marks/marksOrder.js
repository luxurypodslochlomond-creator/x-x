import {
  MarkBrief,
  MarkRecord,
  MarkSignal,
  MarkHorizon,
  MarkSignature,
  MarkBaseOne,
  MarkXEqualsX,
  MarkMethod,
  MarkCorrection,
  MarkSeal,
  MarkCheckers,
  MarkRoll,
  MarkHandover,
  MarkMusic,
  MarkStudio,
  MarkWall,
  MarkPlan,
  MarkReadership,
  MarkHost,
  MarkSupport,
  MarkCovenant,
  MarkTerms,
  MarkPrivacy,
  MarkExplore,
} from '@/components/climate/RecordFootMarks';

// ── THE ALPHABET, AND WHAT EACH LETTER SAYS ───────────────────────────────────
// The marks can be joined at all because they are not illustrations of twenty-four
// different things: they are one hand, one forty-unit square, one weight of mass, and
// exactly one element in the record's red. That is a typeface, not a drawer of pictures,
// which is why laying them edge to edge makes a plate rather than a collage.
//
// ── WHAT BRIAN ASKED, AND WHAT IT CHANGED ────────────────────────────────────
// "The symbols have real content if an art critic got hold of them — subtly enough, or are
// we being dicks, ringing too hard?"
//
// He is asking the only question that matters about a set of drawings like this, and the
// honest answer was: half of them had content and half had a caption. The first draft said
// what each door was FOR ("who checks this record, in their own words") — which is a sign
// on a door, not a claim a critic could hold up. A critic holds up a thing that says
// something it did not have to say.
//
// So every line below is now built the same way, in this order: the drawing first, in the
// words of somebody describing the object rather than the product; then the one claim the
// object makes that it did not need to make. No adjectives, no "cool", no "we believe".
// Where the claim is a refusal it says what is refused, because a refusal is the hardest
// thing to fake and the easiest thing for a critic to test.
//
// And the answer to "are we ringing too hard": the marks ring hard only if the sentences
// under them shout. So the sentences are flat. "A spine and a shut page. The register stays
// closed until a person opens it." That is not a boast; it is a description of an object,
// and a reader can decide for themselves whether it is true of this record. Subtlety here
// is not modesty — it is the only register in which a claim can be checked.
//
// `door` is the third thing a mark cannot say by itself: which way it opens. It is the name
// of the place, not the word "open" — because "Open" was a button, and a button is a piece
// of interface standing where a caption belongs.
export const MARKS_IN_ORDER = [
  { name: 'The record', Mark: MarkRecord, to: '/TogetherChangeClimate', door: 'The register', means: 'A spine and a shut page. The register stays closed until a person opens it.' },
  { name: 'Signals', Mark: MarkSignal, to: '/ClimateWire', door: 'The wire', means: 'A flag on a pole. One dated change at a time, and the name of whoever says so.' },
  { name: 'The map', Mark: MarkHorizon, to: '/ClimateMap', door: 'The map', means: 'A horizon with one red point on it. Where it happened, never who was there.' },
  { name: 'The founder', Mark: MarkSignature, to: '/ClimateFounder', door: 'Who began it', means: 'A nib touching a line. Somebody signed this into being and can be held to it.' },
  { name: 'Base 1', Mark: MarkBaseOne, to: '/ClimateSearch', door: 'Ask the record', means: 'A square standing on red. The machine answers; it never signs.' },
  { name: 'x = x', Mark: MarkXEqualsX, to: '/XEqualsX', door: 'The covenant', means: 'Two lines crossing twice. What is done to one is done to all of us.' },
  { name: 'Method', Mark: MarkMethod, to: '/ClimateMethod', door: 'How it is kept', means: 'Ruled lines, the first one laid before the rest. The rule was written before it was needed.' },
  { name: 'Corrections', Mark: MarkCorrection, to: '/ClimateMethod#corrections', door: 'What we got wrong', means: 'A line struck through and left legible. The mistake stays readable.' },
  { name: 'Seals', Mark: MarkSeal, to: '/ClimateSeals', door: 'Check it yourself', means: 'A print taken and left where anyone can take it again. The words, never the author.' },
  { name: 'Witnesses', Mark: MarkCheckers, to: '/ClimateFellows', door: 'Who reads it first', means: 'Two readers and no mouth. A witness reads an entry and cannot sign it.' },
  { name: 'The roll', Mark: MarkRoll, to: '/ClimateRoll', door: 'The roll', means: 'Names in a column, each with its own line. Nobody is on it who did not write their own.' },
  { name: 'Handover', Mark: MarkHandover, to: '/ClimateHandover', door: 'What a host is given', means: 'One hand passing a thing to another. What travels, and what stays.' },
  { name: 'Music', Mark: MarkMusic, to: '/ClimateMusic', door: 'The music room', means: 'A work given whole. Heard here, never counted, never re-encoded, never sold.' },
  { name: 'Studio', Mark: MarkStudio, to: '/Studio', door: 'The studio', means: 'A slab with a tool driven into its edge. The cut is the proof a hand was here.' },
  { name: 'The wall', Mark: MarkWall, to: '/ClimateCartoons', door: 'The cartoons room', means: 'A sheet pinned up rather than filed. Drawings by hand, and no machine let near them.' },
  { name: 'The plan', Mark: MarkPlan, to: '/ClimateBrief', door: 'The short version', means: 'Steps, one of them missing. What is built, and the step nobody has laid yet.' },
  { name: 'Readership', Mark: MarkReadership, to: '/ClimateMap#reach', door: 'How far it went', means: 'A reading counted, never a reader. The figure is not the person.' },
  { name: 'The host', Mark: MarkHost, to: '/ClimateHost', door: 'What a host agrees', means: 'A door whose key is held by somebody else. The record travels; the building stays theirs.' },
  { name: 'Support', Mark: MarkSupport, to: '/ClimateSupport', door: 'Keep it free', means: 'An open bowl with the gift still in its mouth. Money given, and named for the giving.' },
  { name: 'The covenant', Mark: MarkCovenant, to: '/ExtractionProofCovenant', door: 'The promise', means: 'An open lock. Free to copy, and impossible to enclose.' },
  { name: 'Terms', Mark: MarkTerms, to: '/ClimateTerms', door: 'The terms', means: 'A page with a signature at the foot. A person agreed to this, and is named.' },
  { name: 'Privacy', Mark: MarkPrivacy, to: '/ClimatePrivacy', door: 'What is not printed', means: 'A page with a line taken out and the gap left showing. The absence is the evidence.' },
  { name: 'The brief', Mark: MarkBrief, to: null, door: null, means: 'A sentence, and where it stops. The red is the full stop.' },
  { name: 'Every door', Mark: MarkExplore, to: null, door: null, means: 'The whole drawer at once, in one plate. You are standing in it.' },
];