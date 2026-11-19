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
// Brian, 19 November, on seeing the plate: "tell anyone what mark means and where it goes."
// Which is the right thing to want from a typeface — a letter nobody can read is a shape.
// So every entry carries the two facts a mark cannot say by itself: the sentence it stands
// for, and the door it opens. A mark with no door (the folio, which is the drawing any page
// without a mark of its own wears) carries null rather than a link to nowhere.
export const MARKS_IN_ORDER = [
  { name: 'The record', Mark: MarkRecord, to: '/TogetherChangeClimate', means: 'The register itself: a bound edge, held shut until somebody opens it.' },
  { name: 'Signals', Mark: MarkSignal, to: '/ClimateWire', means: 'Dated change, one entry at a time — what moved, where, and who says so.' },
  { name: 'The world', Mark: MarkHorizon, to: '/ClimateMap', means: 'Where it happened, and nothing about who was standing there.' },
  { name: 'The founder', Mark: MarkSignature, to: '/ClimateFounder', means: 'A nib laid to the line: somebody signed this into being.' },
  { name: 'Base 1', Mark: MarkBaseOne, to: '/ClimateSearch', means: 'The machine that answers, standing on a red base — never the author.' },
  { name: 'x = x', Mark: MarkXEqualsX, to: '/XEqualsX', means: 'The covenant: what is done to one is done to all of us.' },
  { name: 'Method', Mark: MarkMethod, to: '/ClimateMethod', means: 'How an entry earns its place, written down before it is needed.' },
  { name: 'Corrections', Mark: MarkCorrection, to: '/ClimateMethod#corrections', means: 'What we got wrong, said in daylight and dated.' },
  { name: 'Seals', Mark: MarkSeal, to: '/ClimateSeals', means: 'A fingerprint of the words, checkable in your own browser.' },
  { name: 'Witnesses', Mark: MarkCheckers, to: '/ClimateFellows', means: 'The pair of eyes that reads an entry before it goes up.' },
  { name: 'The roll', Mark: MarkRoll, to: '/ClimateRoll', means: 'Who checks this record, in their own words.' },
  { name: 'Handover', Mark: MarkHandover, to: '/ClimateHandover', means: 'What a host is given, and what is kept back.' },
  { name: 'Music', Mark: MarkMusic, to: '/ClimateMusic', means: 'Work given to the record, heard whole and never counted.' },
  { name: 'Studio', Mark: MarkStudio, to: '/Studio', means: 'The workshop: the one room where a thing is made, not read.' },
  { name: 'The wall', Mark: MarkWall, to: '/ClimateCartoons', means: 'Drawings sent in by hand, pinned up in the cartoons room.' },
  { name: 'The plan', Mark: MarkPlan, to: '/ClimateBrief', means: 'What is built, what comes next, and the step nobody has laid yet.' },
  { name: 'Readership', Mark: MarkReadership, to: '/ClimateMap#reach', means: 'How far it travelled: a reading counted, a reader never.' },
  { name: 'The host', Mark: MarkHost, to: '/ClimateHost', means: 'What an institution agrees to before it carries the record.' },
  { name: 'Support', Mark: MarkSupport, to: '/ClimateSupport', means: 'Money given into an open bowl, and named on the wall for it.' },
  { name: 'The covenant', Mark: MarkCovenant, to: '/ExtractionProofCovenant', means: 'Shared under an open lock: free to copy, impossible to enclose.' },
  { name: 'Terms', Mark: MarkTerms, to: '/ClimateTerms', means: 'The terms a person agreed to, with the signature at the foot.' },
  { name: 'Privacy', Mark: MarkPrivacy, to: '/ClimatePrivacy', means: 'What is not printed. The red bar is the line taken out.' },
  { name: 'The brief', Mark: MarkBrief, to: null, means: 'A page of the record in one sentence — and the red is where it stops.' },
  { name: 'The index', Mark: MarkExplore, to: null, means: 'Every door at once, in one plate. You are standing on it.' },
];